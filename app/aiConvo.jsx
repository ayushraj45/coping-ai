import { View, Text, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { Children, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RFPercentage } from 'react-native-responsive-fontsize'
import SmallLogo from '../assets/icons/SmallLogo'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
//import { useGlobalContext } from './context/GlobalProvider'
import RotatingLogoLoader from '../components/RotatingLogoLoader'

const aiConvo = () => {
//     const params = useLocalSearchParams();
//     const [prompt, setPrompt] = useState('');
//     const [entryID, setEntryID] = useState(params.id);
//     const [question, setQuestion] = useState(params.prompt);
//     const [text, setText] = useState('');
//     //const params = useLocalSearchParams();
//     const router = useRouter();
//     const {getGPTResponse, isLoading, user} = useGlobalContext();
//     // const maxQuestions = 3; //Set this from user! 
//     const [qCount, setQCount] = useState(params.qCount)
     const textInputRef = useRef('');

//     // useEffect(() => {
         
//     //         console.log('Params received at aiConvo: ', params);
//     //         setQuestion(params.prompt)
//     //         setEntryID(params.id)
//     //         setQCount(params.qCount)
        
//     // }, []) 

//     const handleNextPrompt = async () => {
    
//         const maxQuestions = user.maxQuestions;
//         setPrompt(textInputRef.current)

//         try {
//           const data = await getGPTResponse(entryID, textInputRef.current);
//           setQCount(data.questionCount);
    
//           if (qCount < maxQuestions) {
//             setQuestion(data.newQuestion);
// // Clear user response after API call
//             router.replace({
//               pathname: `/aiConvo`,
//               params: { id: entryID, prompt: data.newQuestion, qCount: data.questionCount },
//               animation: 'none'
//             });
//           } else {
//             router.replace({
//               pathname: `/entry/[id]`,
//               params: { id: entryID },
//             });
//             setPrompt(''); // Clear prompt on navigation to entry page
//           }
//         } catch (error) {
//           console.error('Error fetching GPT response:', error);
//         }
//       };





//     useEffect(() => {
//     const fetchGPTResponse = async () => {
//         const maxQuestions = 2
       
//             console.log('the question count is ' + qCount)
//             console.log('this is going to gpt ' + entryID + ' ' + prompt)
//             try {
//                 const data = await getGPTResponse(entryID, prompt);
//                 console.log('this came after hitting submit on text ' + data)
//                 setQCount(data.questionCount)
//                 if (qCount < maxQuestions) {
//                 router.push({
//                     pathname: `/aiConvo`,
//                     params: { id: entryID, prompt: data.newQuestion, qCount: data.questionCount }})
//                 }
//                 else {
//                     console.log('the question count is ' + qCount)
//                     console.log('the entry is ' + entryID)
        
//                     router.push({
//                         pathname: `/entry/[id]`,
//                         params: { id: entryID }
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error fetching GPT response:', error);
//             }
//         } 
//     if (prompt){
//         fetchGPTResponse();
//     }
// }, [prompt, qCount, entryID]) 


    // const handleContentSizeChange = (event) => {
    //     setText(event.nativeEvent.text);
    //   };

    // const handleNextPrompt = () => {
    //     setPrompt(textInputRef.current)
    //     console.log('text before setting prompt: ' + textInputRef.current)
    //     console.log('this is the prompt now' + prompt)
    // }  

    return (
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
          >
            <ScrollView
              style={{flexGrow:1,}} 
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.mainContainer}>
                <View style={styles.aiQuestion}>
                  <Text 
                    style={[styles.questionText, { fontSize: RFPercentage(3), fontFamily:'bSemi' }]} 
                  >
                  {/* {question} */} JI
                  </Text>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.inputContainer}>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your answer here"
                  placeholderTextColor="grey"
                  multiline
                  onChangeText={(newText) => {
                    textInputRef.current = newText;
                  }}
                />
                <View style={styles.actionIconContainer}>
                  <TouchableOpacity 
                  //onPress={() => handleNextPrompt()}
                  >
                    <Ionicons name="arrow-forward-outline" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>

    );
  };
  
  const { width, height } = Dimensions.get('window');
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FEF8EC',

    },
    keyboardAvoid: {
      flex: 1,
    },
    scrollContainer: {
      //flexGrow: 1,
      paddingBottom: 20,
    },
    mainContainer: {
      borderRadius: 14,
      width: width,
      minHeight: height * 0.3,
      padding: 20,
    },
    aiQuestion: {
      //marginBottom: 10,
    },
    questionText: {
      lineHeight: 35,
    },
    inputContainer: {

      paddingHorizontal: 20,
      //paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    },
    inputBox: {
      borderRadius: 14,
      backgroundColor: '#D9D9D9',
      padding: 12,
    },
    textInput: {
      maxHeight: 100,
    },
    actionIconContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
  });

export default aiConvo