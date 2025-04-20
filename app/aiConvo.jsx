import { View, Text, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, BackHandler } from 'react-native'
import React, { Children, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RFPercentage } from 'react-native-responsive-fontsize'
import SmallLogo from '../assets/icons/SmallLogo'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { useGlobalContext } from './context/GlobalProvider'
import RotatingLogoLoader from '../components/RotatingLogoLoader'

const aiConvo = () => {
     const params = useLocalSearchParams();
     const [prompt, setPrompt] = useState('');
     const [entryID, setEntryID] = useState(params.id);
     const [question, setQuestion] = useState(params.prompt);
     const [text, setText] = useState('');
//     //const params = useLocalSearchParams();
     const router = useRouter();
     const {getGPTResponse, user, isLoading, refreshEntries} = useGlobalContext();
//     // const maxQuestions = 3; //Set this from user! 
    const [qCount, setQCount] = useState(params.qCount)
     const textInputRef = useRef('');

    const handleNextPrompt = async () => {
    
        const maxQuestions = user.maxQuestions;
        setPrompt(textInputRef.current)

        try {
          const data = await getGPTResponse(entryID, textInputRef.current);
          setQCount(data.questionCount);
    
          if (qCount < maxQuestions) {
            setQuestion(data.newQuestion);
// Clear user response after API call
            router.replace({
              pathname: `/aiConvo`,
              params: { id: entryID, prompt: data.newQuestion, qCount: data.questionCount },
              animation: 'none'
            });
          } else {
            await refreshEntries();
            router.replace({
              pathname: `/entry/[id]`,
              params: { id: entryID },
            });
            setPrompt(''); // Clear prompt on navigation to entry page
          }
        } catch (error) {
          console.error('Error fetching GPT response:', error);
        }
      };


      useFocusEffect(
        React.useCallback(() => {
          const onBackPress = () => {
            Alert.alert(
              'Entry Used',
              'You haveve used one of your 10 free journal entries(Free Plan only). Continue exploring or upgrade to unlock unlimited journaling.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => false // Prevents default back behavior
                },
                {
                  text: 'OK', 
                  onPress: () => router.back()
                }
              ]
            );
            return true; // Prevents default back behavior
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () => 
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
      );

    return (
        <SafeAreaView style={styles.safeArea}>
          <RotatingLogoLoader isLoading={isLoading}/>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 20}
          >
          <TouchableOpacity onPress={() => {
              Alert.alert(
                'Entry Used',
                'You have used one of your free journal entries(Free Plan Only). Continue exploring or upgrade to unlock unlimited journaling.',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'OK', 
                    onPress: () => router.back()
                  }
                ]
              );
            }}>
                <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity> 
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
                  {question}
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
                  onPress={() => handleNextPrompt()}
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