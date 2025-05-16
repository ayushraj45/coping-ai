import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router'; // Assuming expo-router for route params
import RotatingLogoLoader from '../../components/RotatingLogoLoader';
import { useGlobalContext } from '../context/GlobalProvider';

const { width, height } = Dimensions.get('screen');

const StepDetailPage = () => {
  const { stepId } = useLocalSearchParams(); // Get stepId from route parameters
const { fetchStepDetails, updateStep } = useGlobalContext();
  const [stepData, setStepData] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(stepId);

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchStepDetails(stepId);
        console.log(data)
        setStepData(data);
        // Initialize textContent with existing content if available
        setTextContent(data?.textContent || '');

      } catch (err) {
        setError("Failed to load step details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (stepId) {
      fetchData();
    } else {
      setError("No step ID provided.");
      setLoading(false);
    }
  }, [stepId]); // Re-run effect if stepId changes

  // Handler for the Save and Proceed button
  const handleSaveAndProceed = async () => {
      //setLoading(true); // Show loading indicator while saving
      const step = {
        ...stepData,
        textContent: textContent
      }
      const saveSuccessful = await updateStep(step);

      if (saveSuccessful && stepData?.emotionActionPlanId) {
          // Navigate back to the plan page, passing the plan ID
          router.push({ pathname: `/plan/[planId]`, params: { planId: stepData.emotionActionPlanId } });
      } else {
          // Handle save failure or missing plan ID
          setError("Failed to save content or navigate back.");
          setLoading(false); // Hide loading indicator on error
      }
  };

  const handleBackPress = () => {
    router.back(); // Navigate back to the previous screen (likely the plan page)
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
       <RotatingLogoLoader isLoading={loading}/>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
         <TouchableOpacity onPress={handleBackPress} style={styles.backButtonError}>
             <Ionicons name="chevron-back" size={RFPercentage(3)} color="#011C2D" />
             <Text style={styles.backButtonErrorText}>Go Back</Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
           <Ionicons name="chevron-back" size={RFPercentage(3)} color="#011C2D" />
        </TouchableOpacity>
        {/* Title - using questionText field */}
        
      </View>
      <View>
          <Text style={styles.headerTitle}>{stepData?.actionText || 'Loading Title...'}</Text>
      </View>

      {/* Step Number Reminder */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* This View contains the step number and the text input */}
        <View style={styles.contentArea}>
          {/* Step Number Reminder */}
          <Text style={styles.stepNumberText}>Step: {stepData?.stepNumber || '-'}</Text>

          {/* Content Box (TextInput) */}
          {/* KeyboardAvoidingView helps prevent the keyboard from covering the input */}
          <KeyboardAvoidingView
            style={styles.textInputContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 20} // Adjust offset as needed
          >
            <TextInput
              style={styles.textInput}
              multiline={true} // Allow multiple lines
              textAlignVertical="top" // Align text to the top
              placeholder="Write your thoughts here..." // Placeholder text
              placeholderTextColor="#011C2D60" // Placeholder color with some opacity
              value={textContent}
              onChangeText={setTextContent} // Update state with text changes
              autoCorrect={true} // Enable autocorrection
              spellCheck={true} // Enable spell check
            />
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>


      {/* Save and Proceed Button - Outside the TouchableWithoutFeedback */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveAndProceed}
        disabled={loading} // Disable button while loading/saving
      >
        {loading ? (
           <RotatingLogoLoader size="small" color="#FEF8EC" />
        ) : (
           <Text style={styles.saveButtonText}>Save and proceed</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF8EC", // Background color from your theme
    paddingHorizontal: width * 0.05, // Dynamic horizontal padding
    paddingTop: height * 0.02, // Dynamic padding top
    justifyContent: 'space-between', // Distribute space vertically
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FEF8EC",
  },
  contentArea: {
    flex: 1, // Allow content area to take up available vertical space
    width: '100%', // Ensure content area takes full width
  },
  loadingText: {
    marginTop: height * 0.02,
    fontSize: RFPercentage(2),
    fontFamily: 'bSemi',
    color: '#011C2D',
  },
   errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FEF8EC",
     paddingHorizontal: width * 0.05,
  },
  errorText: {
    fontSize: RFPercentage(2),
    fontFamily: 'bSemi',
    color: 'red', // Indicate error with red color
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
   backButtonError: {
     flexDirection: 'row',
     alignItems: 'center',
     marginTop: height * 0.02,
   },
    backButtonErrorText: {
     fontSize: RFPercentage(2),
     fontFamily: 'bSemi',
     color: '#011C2D',
     marginLeft: width * 0.01,
   },
  header: {
    flexDirection: 'COLUMN',
    alignItems: 'center',
    justifyContent: 'center', // Center the title area
    marginBottom: height * 0.02, // Dynamic margin below header
    position: 'relative', // Needed for absolute positioning of back button
    width: '100%', // Ensure header takes full width for positioning
  },
  backButton: {
    position: 'absolute', // Position absolutely
    left: 0, // Align to the left edge
    // Adjust top if needed to align with title vertically
  },
  headerTitle: {
    fontSize: RFPercentage(2.8), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    textAlign: 'left', // Ensure title is centered
    //flex: 1, // Allow title to take up available space
    marginHorizontal: 10, // Add horizontal margin to prevent overlap with back button
  },
  stepNumberText: {
    fontSize: RFPercentage(1.9), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    marginBottom: height * 0.02, // Dynamic margin below step number
    alignSelf: 'left', // Center the text
    marginHorizontal: 10, // Add horizontal margin to prevent overlap with back button

  },
  textInputContainer: {
    flex: 1, // Allow container to take up available vertical space
    marginBottom: height * 0.03, // Dynamic margin below text input
    //width: '100%',
    marginHorizontal: 10, // Add horizontal margin to prevent overlap with back button
     // Ensure container takes full width
  },
  textInput: {
    flex: 1, // Allow text input to expand within its container
    backgroundColor: '#FFEECD', // Background color from your theme
    borderRadius: 10, // Rounded corners
    paddingVertical: height * 0.015, // Dynamic vertical padding
    paddingHorizontal: width * 0.04, // Dynamic horizontal padding
    fontSize: RFPercentage(2), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    borderWidth: 1,
    borderColor: '#011C2D', // Border color from your theme
  },
  saveButton: {
    backgroundColor: '#011C2D', // Background color from your theme
    paddingVertical: height * 0.02, // Dynamic vertical padding
    paddingHorizontal: width * 0.1, // Dynamic horizontal padding
    borderRadius: 14,
    marginVertical: height * 0.02, // Dynamic vertical margin
    width: '80%', // Make button wider
    alignSelf: 'center', // Center the button
    alignItems: 'center',
    justifyContent: 'center', // Center content (text or activity indicator)
  },
  saveButtonText: {
    fontSize: RFPercentage(2.7), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#FEF8EC', // Color from your theme
    textAlign: 'center',
  },
});

export default StepDetailPage;
