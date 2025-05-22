import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native'; // Using ProgressBarAndroid for example, you might need a different one for iOS or cross-platform
import * as Progress from 'react-native-progress';
import { RFPercentage } from 'react-native-responsive-fontsize';

// Define your colors
const { width, height } = Dimensions.get('screen');

// Placeholder for answer options structure - adjust based on your actual data structure
// Example: const answerOptions = [{ value: 1, text: 'Strongly Agree' }, ...];
// Assuming 'question' prop includes an array like 'options' or similar.
// For this component to work, you'll need to pass an 'answerOptions' array prop
// or ensure 'question' prop contains the options data.
// For now, I'll use a placeholder array structure similar to the image.
const answerOptions = [
  { value: 5, text: 'Strongly Agree' },
  { value: 4, text: 'Agree' },
  { value: 3, text: 'Neutral' },
  { value: 2, text: 'Disagree' },
  { value: 1, text: 'Strongly Disagree' },
];

// Empty function to be called on the last question - implement your logic here
const doDifferentThing = () => {
  console.log("Reached the last question! Implement final action here.");
  // Example: Navigate to results screen, submit assessment, etc.
};

const AssessmentQuestionComponent = ({ question, onAnswerSelect, onNext, onBack, totalQuestions, currentQuestionIndex, results }) => { // Added onBack prop
    const [selectedAnswer, setSelectedAnswer] = useState(question?.qAnswer || 0); // Use initial answer if available, default to 0
  
    // Effect to update selectedAnswer when the question prop changes (navigating next/back)
    useEffect(() => {
      setSelectedAnswer(question?.qAnswer || 0);
    }, [question]); // Re-run effect when the question object changes
  
    // Handler for selecting an answer
    const handleAnswerSelect = (value) => {
      setSelectedAnswer(value);
      // Pass the selected answer and question ID back to the parent immediately
      onAnswerSelect(question.id, value);
    };
  
    // Handler for the next button
    const handleNextPress = () => {
      // onAnswerSelect(question.id, selectedAnswer); // Answer is already sent on select
      if (currentQuestionIndex === totalQuestions - 1) {
        results(); // Call the specific function for the last question
      } else {
        onNext(); // Otherwise, proceed to the next question
        // setSelectedAnswer(0); // Reset selected answer after moving next - Handled by useEffect
      }
    };
  
    // Handler for the back button
    const handleBackPress = () => {
      if (currentQuestionIndex > 0) { // Check if not the first question
        // onAnswerSelect(question.id, selectedAnswer); // Answer is already sent on select
        onBack(); // Call the parent's back handler
        // setSelectedAnswer(0); // Reset selected answer after moving back - Handled by useEffect
      } else {
        console.log("Cannot go back from the first question.");
        // Optional: Add logic for what happens when back is pressed on the first question (e.g., close assessment)
      }
    };
  
    // Calculate progress percentage
    const progress = (currentQuestionIndex ) / totalQuestions;
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          {/* Back button - Using Ionicons as per your previous style */}
          {/* Conditionally render back button if not on the first question */}
          {currentQuestionIndex > 0 && (
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
               <Ionicons name="chevron-back" size={RFPercentage(3)} color="#011C2D" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>AssessmentQuestions</Text>
        </View>
  
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            progress={progress}
            width={width * 0.75} // Dynamic width
            height={height * 0.008} // Dynamic height
            color="#011C2D" // Color from your theme
            unfilledColor="#FFEECD" // Color from your theme
            borderWidth={0}
            borderRadius={4}
          />
          <Text style={styles.progressText}>{Math.round(progress * 100)} %</Text>
        </View>
  
        <View style={styles.questionContainer}>
          {/* Ensure question.questionText exists and is a string */}
          <Text style={styles.questionText}>{question?.questionText || 'Loading Question...'}</Text>
        </View>
  
        <View style={styles.optionsContainer}>
          {/* Map over the answerOptions array to render radio buttons */}
          {answerOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.optionButton}
              onPress={() => handleAnswerSelect(option.value)}
            >
              <View style={styles.radioButton}>
                {selectedAnswer === option.value && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
  
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextPress}
          disabled={selectedAnswer === 0} // Disable next until an answer is selected (assuming 0 is initial/no selection)
        >
          <Text style={styles.nextButtonText}>{currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}</Text>
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
    //marginHorizontal:10,
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
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space out progress bar and text
    marginBottom: height * 0.03, 
    paddingHorizontal:10,// Dynamic margin below progress bar
    width: '100%', // Ensure container takes full width
  },
  progressBar: {
    // Specific styles for the progress bar component itself if needed,
    // but width, height, color, unfilledColor, borderWidth, borderRadius
    // are typically set as props directly on the component.
  },
  progressText: {
    fontSize: RFPercentage(1.8), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    marginLeft: width * 0.02, // Dynamic margin to the left of the text
  },
  questionContainer: {
    flex: 1, // Allow question container to take up available vertical space
    justifyContent: 'center', // Center question text vertically
    marginBottom: height * 0.03, // Dynamic margin below question
  },
  questionText: {
    fontSize: RFPercentage(3), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    textAlign: 'center', // Center the question text
    lineHeight: height * 0.04, // Dynamic line height for readability
  },
  optionsContainer: {
    paddingHorizontal:10,
    marginBottom: height * 0.04, // Dynamic margin below options
  },
  optionButton: {
    flexDirection: 'row', // Arrange radio button and text horizontally
    alignItems: 'center', // Align items vertically
    paddingVertical: height * 0.015, // Dynamic vertical padding
    // paddingHorizontal: width * 0.03, // Dynamic horizontal padding if needed
    marginBottom: height * 0.015, // Dynamic margin between options
    backgroundColor: '#FFEECD', // Background color for options (from your theme)
    borderRadius: 10, // Rounded corners
    borderWidth: 1,
    borderColor: '#011C2D', // Border color from your theme
    width: '100%', // Make options take full width
    paddingLeft: width * 0.04, // Dynamic left padding for alignment
  },
  radioButton: {
    height: width * 0.05, // Dynamic size for radio button
    width: width * 0.05, // Dynamic size for radio button
    borderRadius: width * 0.025, // Make it round
    borderWidth: 2,
    borderColor: '#011C2D', // Border color from your theme
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.03, // Dynamic margin to the right of the radio button
  },
  radioButtonSelected: {
    height: width * 0.03, // Dynamic size for selected indicator
    width: width * 0.03, // Dynamic size for selected indicator
    borderRadius: width * 0.015, // Make it round
    backgroundColor: '#011C2D', // Color when selected (from your theme)
  },
  optionText: {
    fontSize: RFPercentage(2), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#011C2D', // Color from your theme
    flexShrink: 1, // Allow text to shrink and wrap
  },
  nextButton: {
    backgroundColor: '#011C2D', // Background color from your theme
    paddingVertical: height * 0.02, // Dynamic vertical padding
    paddingHorizontal: width * 0.1, // Dynamic horizontal padding
    borderRadius: 14,
    marginVertical: height * 0.02, // Dynamic vertical margin
    width: '80%', // Make button wider
    alignSelf: 'center', // Center the button
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: RFPercentage(2.7), // Dynamic font size
    fontFamily: 'bSemi', // Your specified font
    color: '#FEF8EC', // Color from your theme
    textAlign: 'center',
  },
});

export default AssessmentQuestionComponent;