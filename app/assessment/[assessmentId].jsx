import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router'; // Assuming expo-router for route params
import { useGlobalContext } from '../context/GlobalProvider';
import RotatingLogoLoader from '../../components/RotatingLogoLoader';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

// Helper component for individual domain progress indicators
const DomainProgressIndicator = ({ label, score, color }) => {
  const progress = score / 100; // Assuming scores are out of 100

  return (
    <View style={domainProgressStyles.container}>
      <Text style={domainProgressStyles.label}>{label}</Text>
      <View style={domainProgressStyles.progressBarContainer}>
         <Progress.Bar
            progress={progress}
            width={width * 0.6} // Dynamic width for horizontal bars
            height={height * 0.008} // Dynamic height
            color={color} // Dynamic color based on prop
            unfilledColor="#FFEECD" // Unfilled color from your theme
            borderWidth={0}
            borderRadius={4}
         />
         <Text style={domainProgressStyles.scoreText}>{score}</Text>
      </View>
    </View>
  );
};

const domainProgressStyles = StyleSheet.create({
  container: {
    width: '100%', // Take full width
    marginBottom: height * 0.015, // Dynamic margin between domains
  },
  label: {
    fontSize: RFPercentage(1.8), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    marginBottom: height * 0.005, // Small margin below label
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space out progress bar and score
  },
  scoreText: {
    fontSize: RFPercentage(1.8), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    marginLeft: width * 0.02, // Dynamic margin to the left of the score
  },
});


const AssessmentResultPage = () => {
    const param = useLocalSearchParams(); // Get all params
    const assessmentId = param?.assessmentId; // Access assessmentId from params
    const initialSuggestedPath = param?.path; // Access path from params
      const {fetchAssessmentDetails, createEmotionalPlan} = useGlobalContext();
    
    const [assessmentData, setAssessmentData] = useState(null);
    const [suggestedPath, setSuggestedPath] = useState(initialSuggestedPath || 'Calculating...'); // Use initial path from params
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        console.log('params',param);
      const fetchResults = async () => {
        console.log('params',param);

        try {
          const data = await fetchAssessmentDetails(assessmentId);
          setAssessmentData(data);
  
        } catch (err) {
          setError("Failed to load assessment results.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      // Only fetch if assessmentId is available
      if (assessmentId) {
        fetchResults();
      } else {
        console.log('params',param);

        setError("No assessment ID provided.");
        setLoading(false);
      }
    }, [assessmentId]);

  const handleBackPress = () => {
    router.push({ pathname: `/homepage2`}); // Example: go back one screen
  };

 const handleCreatePlan = async () => {
    try {
        
        const planId = await createEmotionalPlan(suggestedPath);
        if (planId) {
            console.log('Plan created with ID:', planId);
            router.push({ pathname: `/plan/${planId}`, params: { planId: planId } });
           
        } else {
            console.log('Failed to create plan: API did not return a valid ID.');
        }
    } catch (error) {
        console.error('Error creating plan:', error);
    }
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

  // Use optional chaining (?.) in case assessmentData is null or properties are missing
  const averageScore = assessmentData?.averageScore || 10;
  const purposeScore = assessmentData?.purposeScore || 0;
  const relationshipsScore = assessmentData?.relationshipsScore || 0;
  const stressScore = assessmentData?.stressScore || 0;
  const emotionalRegulationScore = assessmentData?.emotionalRegulationScore || 0;
  const energyScore = assessmentData?.energyScore || 0;
  const selfEsteemScore = assessmentData?.selfEsteemScore || 0;


  return (
   
    <GestureHandlerRootView style={styles.container}>
         <SafeAreaView style={styles.containerMargin}>
        <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        {/* Back button */}
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
           <Ionicons name="chevron-back" size={RFPercentage(3)} color="#011C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Assessment Results</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Overall Score - Circular Progress */}
        <Text style={styles.overallScoreTitle}>Your Overall Score</Text>
        <View style={styles.circularProgressContainer}>
        <Progress.Circle
              size={width * 0.4} // Dynamic size for the circle
              progress={averageScore / 100} // Use averageScore divided by 100 for progress (assuming score is out of 100)
              showsText={true}
              formatText={() => `${Math.round(averageScore)}`} // Format text to show the averageScore directly
              textStyle={styles.circularProgressText}
              color="#C8E8EA" // Light blue color from your theme
              unfilledColor="#FFEECD" // Unfilled color from your theme
              borderWidth={0}
              thickness={width * 0.03} // Dynamic thickness
              strokeCap="round" // Rounded ends for the progress
           />
        </View>



        <View style={styles.domainScoresContainer}>
           <DomainProgressIndicator label="Purpose & Fulfillment" score={purposeScore} color="#8FD19E" /> 
           <DomainProgressIndicator label="Relationships / Social" score={relationshipsScore} color="#FFB6C1" /> 
           <DomainProgressIndicator label="Stress & Burnout" score={stressScore} color="#FF6347" />
           <DomainProgressIndicator label="Emotional Regulation" score={emotionalRegulationScore} color="#ADD8E6" />
           <DomainProgressIndicator label="Sleep / Energy" score={energyScore} color="#9370DB" />
           <DomainProgressIndicator label="Self-esteem / Self-talk" score={selfEsteemScore} color="#FFFF00" />
        </View>

        {/* Suggested Path */}
        <View style={styles.suggestedPathContainer}>
            <Text style={styles.suggestedPathTitle}>Suggested Path: Click to Start</Text>
             <TouchableOpacity onPress={handleCreatePlan}>
             <View style={styles.suggestedPathBox}>
                <Ionicons name="sparkles" size={24} color="black" />
                <Text style={styles.suggestedPathText}> {suggestedPath}</Text>
            </View>
             </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF8EC", // Background color from your theme
    paddingHorizontal: width * 0.05, // Dynamic horizontal padding
    paddingTop: height * 0.02, // Dynamic padding top
  },
  containerMargin:{
    marginHorizontal:10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FEF8EC",
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the title
    marginBottom: height * 0.02, // Dynamic margin below header
    position: 'relative', // Needed for absolute positioning of back button
  },
  backButton: {
    position: 'absolute', // Position absolutely
    left: 0, // Align to the left edge
    // Adjust top if needed to align with title vertically
  },
  headerTitle: {
    fontSize: RFPercentage(2.5), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    textAlign: 'center', // Ensure title is centered
   // flex: 1, // Allow title to take up available space
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center', // Center content horizontally
  },
  overallScoreTitle: {
    fontSize: RFPercentage(2), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    marginBottom: height * 0.02, // Dynamic margin below title
  },
  circularProgressContainer: {
    alignItems: 'center',
    marginBottom: height * 0.04, // Dynamic margin below circular progress
     position: 'relative', // Needed for absolute positioning of percentage sign
  },
  circularProgressText: {
    fontSize: RFPercentage(5), // Dynamic font size for the score inside the circle
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
  },
  circularProgressPercentage: {
    fontSize: RFPercentage(2), // Dynamic font size for the percentage sign
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    position: 'absolute', // Position percentage sign
    bottom: height * 0.06, // Adjust position as needed
    right: width * 0.08, // Adjust position as needed
  },
  domainScoresContainer: {
    width: '100%', // Take full width
    marginBottom: height * 0.04, // Dynamic margin below domain scores
  },
  suggestedPathContainer: {
     width: '100%', // Take full width
     alignItems: 'center', // Center content horizontally
  },
  suggestedPathTitle: {
    fontSize: RFPercentage(2), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    marginBottom: height * 0.01, // Dynamic margin below title
  },
   suggestedPathBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEECD', // Light yellow color from original styles
    borderRadius: 10,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    marginTop: height * 0.01,
  },
  suggestedPathText: {
    fontSize: RFPercentage(2.2), // Dynamic font size
    fontFamily: 'bSemi',
    color: '#011C2D',
  },
});

export default AssessmentResultPage;
