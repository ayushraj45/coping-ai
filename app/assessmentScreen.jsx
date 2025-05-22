import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AssessmentQuestionComponent from '../components/AssessmentQuestionComponent';
import { useGlobalContext } from './context/GlobalProvider';
import { router, useLocalSearchParams } from 'expo-router';
import RotatingLogoLoader from '../components/RotatingLogoLoader';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';


const AssessmentScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Store answers by question ID
  const [loading, setLoading] = useState(true);
  const [assessmentId, setAssessmentId] = useState();
  const {addAssessment, getQuestionsForAssessments, calculateAssessmentResults} = useGlobalContext();
  const params = useLocalSearchParams();
  const analytics = getAnalytics();

  

  // --- You will implement this part to fetch your questions ---
  useEffect(() => {
    const fetchQuestions = async () => {
     

      try {
        const assessment = await addAssessment(params.id);

        // Check if assessment creation was successful AND returned a valid object with an ID
        if (assessment && typeof assessment === 'object' && assessment.id) {
            console.log('Assessment object received:', assessment); // This will now show the full object
            console.log('Assessment ID is:', assessment.id); // This will now correctly log the ID
            setAssessmentId(assessment.id);
            // Now call the second function using the ID from the created assessment object
            const fetchedQuestions = await getQuestionsForAssessments(assessment.id);
    
            // Check if questions were fetched successfully
            if (fetchedQuestions) { // getQuestionsForAssessments returns [] on error
                console.log('Successfully fetched questions.');
                setQuestions(fetchedQuestions);
            } else {
                console.warn('Failed to fetch questions.');
                setQuestions([]); // Default to empty array if fetching failed
                // You might want to show an error message to the user here
                // setErrorMessage('Could not load questions.');
            }
    
        } else {
            // Handle the case where assessment creation failed
            console.error('Failed to create assessment or received invalid response.');
            setQuestions([]); // Clear questions on failure
            // Show an error message to the user
            // setErrorMessage('Failed to start assessment. Please try again.');
        }
    
        // This log still just shows the original params.id
        console.log('Original params.id:', params.id);

        // Initialize answers state
        // const initialAnswers = {};
        // fetchedQuestions.forEach(q => {
        //   initialAnswers[q.id] = q.qAnswer; // Initialize with default or fetched answer
        // });
        // setAnswers(initialAnswers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false); // Handle error state appropriately
      }
      finally{
        setLoading(false);
        await logEvent(analytics,'init_assessment');
      }
    };

    fetchQuestions();
  }, []); // Empty dependency array means this runs once on mount


  const handleAnswerSelect = (questionId, answerValue) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answerValue,
    }));
    console.log('answers', answers);
  };

  // Handler to move to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      // End of assessment, submit answers
      handleSubmitAssessment();
    }
  };

  const handleBackPress = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  }

  // Handler to submit all answers
  const handleSubmitAssessment = async () => {
    console.log('Submitting Answers:', answers);
        try {
            const lowest = await calculateAssessmentResults(assessmentId,answers);
            router.push({pathname: `/assessment/[id]`, params: { path: lowest, id: assessmentId}})
            console.log('Assessment submitted successfully!');
    } catch (error) {
      console.error('Error submitting assessment:', error);
    }
  };

  if (loading) {
    return (
      <RotatingLogoLoader isLoading={loading} />
    );
  }

  if (questions.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <Text>No questions available.</Text>
        </View>
      );
  }
  // Display the current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <AssessmentQuestionComponent
      question={currentQuestion}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNextQuestion}
      totalQuestions={questions.length}
      currentQuestionIndex={currentQuestionIndex}
      results={handleSubmitAssessment}
      onBack={handleBackPress}
    />
  );
};

export default AssessmentScreen; // Export this component to use in your app's navigation