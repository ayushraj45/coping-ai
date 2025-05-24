import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator, FlatList, Platform } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router'; // Assuming expo-router for route params
import { useGlobalContext } from '../context/GlobalProvider';
import RotatingLogoLoader from '../../components/RotatingLogoLoader';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';


const { width, height } = Dimensions.get('screen');

const StepItem = ({ step, index, currentStepIndex, totalSteps, id }) => {
    const isActive = step.active; // Use 'active' field from EmotionalStep
    const isCompleted = step.completed; // Use 'isCompleted' field from EmotionalStep
    const isCurrent = index === currentStepIndex; // Check if this is the current step based on index
    const {checkIfSub } = useGlobalContext(); // Get user data from global context
  
    // Determine dot and line color based on status
    const dotColor = isCompleted ? '#8FD19E' : (isActive ? '#011C2D' : '#FFEECD'); // Completed green, Active dark blue, Inactive light yellow
    const lineColor = isCompleted ? '#8FD19E' : (isActive || index < currentStepIndex ? '#C8E8EA' : '#FFEECD'); // Completed green, Active/Past light blue, Future light yellow
  
    // Determine step box background color and opacity
    const boxBackgroundColor = isCompleted ? '#8FD19E' : '#C8E8EA'; // Completed green, Active/Inactive light blue
    const boxOpacity = isActive ? 1 : (isCompleted ? 1 : 0.6); // Full opacity for active/completed, reduced for inactive
  
    const allowPage = async () => {
      const allow = await checkIfSub();
      if (!allow) {
        router.replace("/subscribe");
      }
      else {
        if (step.completed || step.active) 
          {router.push({ pathname: `/step/[id]`, params: { id: id } });}
    }}
  
    return (
      <View style={stepItemStyles.container}>
        {/* Left side: Dot and Line */}
        <View style={stepItemStyles.leftContainer}>
          <View style={[stepItemStyles.dot, { backgroundColor: dotColor }]}>
             {isCompleted} 
          </View>
          {/* Render line if not the last step */}
          {index < totalSteps - 1 && (
            <View style={[stepItemStyles.line, { backgroundColor: lineColor }]} />
          )}
        </View>
  
        {/* Right side: Step Rectangle */}
        <TouchableOpacity onPress={() => {
               allowPage();
            }} style={[stepItemStyles.rightContainer, { backgroundColor: boxBackgroundColor, opacity: boxOpacity }]}>
        <View>
          <Text style={stepItemStyles.stepInfo}>Step: {step.stepNumber} Day: {step.actionDay}</Text>
          <Text style={stepItemStyles.stepTitle}>{step.title}</Text>  
        </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  const stepItemStyles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Arrange dot/line and rectangle horizontally
      alignItems: 'flex-start', // Align items to the top
      marginBottom: height * 0.02, // Dynamic margin between step items
      width: '100%', // Take full width
    },
    leftContainer: {
      width: width * 0.1, // Fixed width for the dot/line area
      alignItems: 'center', // Center dot and line horizontally
      paddingTop: height * 0.005, // Small padding to align dot with text baseline
    },
    dot: {
      width: width * 0.04, // Dynamic size for the dot
      height: width * 0.04, // Dynamic size for the dot
      borderRadius: width * 0.02, // Make it round
      borderWidth: 1,
      borderColor: '#011C2D', // Border color from your theme
      justifyContent: 'center',
      alignItems: 'center',
    },
    line: {
      width: 2, // Fixed width for the line
      flex: 1, // Allow line to take up available vertical space
      backgroundColor: '#FFEECD', // Default line color
      marginTop: 2, // Small margin to connect with dot
    },
    rightContainer: {
      flex: 1, // Allow rectangle to take up remaining width
      backgroundColor: '#C8E8EA', // Default background color
      borderRadius: 10, // Rounded corners
      paddingVertical: height * 0.015, // Dynamic vertical padding
      paddingHorizontal: width * 0.04, // Dynamic horizontal padding
      borderWidth: 1,
      borderColor: '#011C2D', // Border color from your theme
      marginRight: 10,
    },
    stepInfo: {
      fontSize: RFPercentage(1.6), // Dynamic font size
      fontFamily: 'bSemi', // Your specified font
      color: '#011C2D', // Color from your theme
      marginBottom: height * 0.005, // Small margin below info
    },
    stepTitle: {
      fontSize: RFPercentage(2.2), // Dynamic font size
      fontFamily: 'bSemi', // Your specified font
      color: '#011C2D', // Color from your theme
      fontWeight: 'bold', // Bold text for title
    },
  });

  const PlanPage = () => {
    const { planId } = useLocalSearchParams(); // Get planId from route parameters
    const { fetchPlanDetails, fetchPlanById, checkIfSub } = useGlobalContext(); // Get user data from global context
  
    const [planData, setPlanData] = useState(null);
    const [stepsData, setStepsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const analytics = getAnalytics();


    // useEffect(() => {
    //   const allowPage = async () => {
    //     const allow = await checkIfSub();
    //     if (!allow) {
    //       router.replace("/subscribe");
    //     }
    //   }
    //   allowPage();
    // }, [router]);

    useEffect(() => {
        console.log(planId);

      const fetchData = async () => {

        try {
          setLoading(true);
            const steps = await fetchPlanDetails(planId); // Or pass plan.emotionActionStepIds
            setStepsData(steps);
            const plan = await fetchPlanById(planId);
            console.log(plan)
            setPlanData(plan)
  
        } catch (err) {
          setError("Failed to load plan details.");
          console.error(err);
        } finally {
          await logEvent(analytics,'init_newPath');

          setLoading(false);
        }
      };
  
      if (planId) {
        fetchData();
      } else {
        setError("No plan ID provided.");
        setLoading(false);
      }
    }, [planId]); // Re-run effect if planId changes
  
  
    const handleBackPress = () => {
      router.push({ pathname: `/homepage2`}); // Navigate back
    };
  
    // Calculate plan progress percentage
    const totalSteps = stepsData.length;
    const currentStepIndex = planData?.currentStep || 0; // Use currentStep from plan data
    const completedSteps = Array.isArray(stepsData) ? stepsData.filter(step => step.completed).length : 0;
    const domainName = planData?.domain|| 'Loading Domain...';

    // Calculate progress based on completed steps out of total steps
    const planProgress = totalSteps > 0 ? completedSteps / totalSteps : 0;
    const daysSinceTimeTaken = planData?.timeTaken ? Math.floor((new Date().getTime() - new Date(planData.timeTaken).getTime()) / (1000 * 60 * 60 * 24)) : 0;
    // Get user stats from global context
    console.log('days since from backend', planData?.timeTaken);
    console.log('days since', daysSinceTimeTaken);
  
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
          <Text style={styles.headerTitle}>Current Path</Text> 
        </View>
  
        {/* Top Section: Progress and Stats */}
        <View style={styles.topSection}>
          {/* Left Part: Circular Progress */}
          <View style={styles.progressContainer}>
             <Progress.Circle
                size={width * 0.25} // Dynamic size for the circle
                progress={planProgress} // Use calculated plan progress
                showsText={true}
                formatText={() => `${Math.round(planProgress * 100)}%`} // Display percentage
                textStyle={styles.circularProgressText}
                color="#0B243C" // Light blue color
                unfilledColor="#FFEECD" // Unfilled color
                borderWidth={0}
                thickness={width * 0.02} // Dynamic thickness
                strokeCap="round" // Rounded ends
             />
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Step: {currentStepIndex} out of {totalSteps}</Text>
            <Text style={styles.statText}>Day: {daysSinceTimeTaken}</Text> 

          </View>
        </View>
  
        <Text style={styles.domainTitle}>{domainName}</Text>
    
        <FlatList
          data={stepsData}
          keyExtractor={(item) => item.id.toString()} // Use step ID as key
          renderItem={({ item, index }) => (
            <StepItem
              step={item}
              index={index}
              currentStepIndex={currentStepIndex} // Pass current step index
              totalSteps={totalSteps}
              id={item.id} // Pass total steps
            />
          )}
          contentContainerStyle={styles.stepsListContainer}
          showsVerticalScrollIndicator={false} // Hide scroll indicator
        />
  
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FEF8EC", // Background color from your theme
      paddingHorizontal: width * 0.05, // Dynamic horizontal padding
      paddingTop: Platform.OS === 'android' ? height * 0.05 : height * 0.02, // Dynamic padding top
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
      //flex: 1, // Allow title to take up available space
    },
    topSection: {
      flexDirection: 'row', // Arrange progress and stats horizontally
      alignItems: 'center', // Align items vertically
      marginBottom: height * 0.03, // Dynamic margin below top section
      backgroundColor: '#C8E8EA', // Light blue background
      borderRadius: 15,
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.05,
      marginHorizontal:10,
    },
    progressContainer: {
      marginRight: width * 0.05, // Dynamic margin between progress and stats
    },
    circularProgressText: {
      fontSize: RFPercentage(2.5), // Dynamic font size for percentage
      fontFamily: 'bSemi', // Your specified font
      color: '#011C2D', // Color from your theme
    },
    statsContainer: {
      flex: 1, 
      marginHorizontal:10,// Allow stats to take up remaining space
    },
    statText: {
      fontSize: RFPercentage(1.8), // Dynamic font size
      fontFamily: 'bSemi', // Your specified font
      color: '#011C2D', // Color from your theme
      marginBottom: height * 0.005, // Small margin between stats
    },
     domainTitle: {
      fontSize: RFPercentage(2.2), // Dynamic font size
      fontFamily: 'bSemi', // Your specified font
      color: '#011C2D', // Color from your theme
      textAlign: 'center', // Center the domain title
      marginBottom: height * 0.03, // Dynamic margin below domain title
      backgroundColor: '#FFEECD', // Light yellow background
      borderRadius: 10,
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.04,
      alignSelf: 'center', // Center the box
    },
    stepsListContainer: {
      paddingBottom: height * 0.02, // Add padding at the bottom of the list
    },
  });
  
  export default PlanPage;