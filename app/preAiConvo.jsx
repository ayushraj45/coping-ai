import { View, Text, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { Children, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RFPercentage } from 'react-native-responsive-fontsize'
import SmallLogo from '../assets/icons/SmallLogo'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useGlobalContext } from './context/GlobalProvider'
import RotatingLogoLoader from '../components/RotatingLogoLoader'
import EmotionButton from '../components/EmotionButton'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'

const preAiConvo = () => {
     const params = useLocalSearchParams();
     const [userId, setUserId] = useState(null);
     const [isLoading, setIsloading] = useState(false)
     const router = useRouter();
     const {getGPTResponse, user, refreshEntries, addEntry,getGPTInstaPrompt} = useGlobalContext();

    useEffect(() => {
    if(user){

        setUserId(user.id);     
    }
    }, [user]);  

    const getCurrentDateTime = () => {
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' });
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
    };  

    const handleEmotionPress = async (prompt,text) =>{
        setIsloading(true);
        
        const currentDateTime = getCurrentDateTime();

        const initialEntry = {
        "userId": userId, // add from gc
        "title": currentDateTime,
        "initFeeling": (text) ? text : prompt,
        "questions": [],
        "answers": [],
        "content": "",
        "questionCount": 0
        }

        const newEntryId = await addEntry(initialEntry); //add from GC

        if(newEntryId) {
            if(params.id === '3') {
              try{
                const data = await getGPTInstaPrompt(newEntryId, prompt); //add from GC
                if(data) {
                  setIsloading(false);
                  router.push({
                    pathname: `/entry/[id]`,
                    params: { id: newEntryId }
                  });
                } 
              } catch (error) {
                console.error(error)
              }
            }
            else {
              try{
                const data = await getGPTResponse(newEntryId, prompt);
                if(data) {
                  setIsloading(false);  
                  router.push({
                    pathname: `/aiConvo`,
                    params: { id: newEntryId, prompt: data.newQuestion, qCount: data.questionCount }
                  });
                }
                else console.log('something was not right at creating new ai convo.');
              } catch (error) {
                console.error(error);
              }
            }           
          } else {
            console.log('failed to create new entry to begin with, so we never got new ID')
          }
    }
    
    const returnDataSet = (number) => {
        switch(Number(number)) {
          case 1:
            return emotions;
          case 2:
            return events;
          case 3:
            return theme;
          case 4:
            return days;
          default:
            return days; // Return an empty array instead of null
        }
    };
    const returnTitleSet = (number) => {
        
        switch(Number(number)) {
          case 1:
            return 'Choose a feeling or type anything';
          case 2:
            return 'Whatever is on your mind!';
          case 3:
            return 'Choose a theme and start with a prompt instantly!';
          case 4:
            return 'Get more in touch with your thoughts through the day';
          default:
            return 'Start with anything'; // Return an empty array instead of null
        }
    };
    const events = [];
    const theme = [
        { id: '1', text: 'Gratitude', color: '#FFD88D', prompt: 'Gratitude' },
        { id: '2', text: 'Disappointment', color: '#BCCBFF' , prompt: 'Disappointment'},
        { id: '3', text: 'Goals', color: '#FFFA8A', prompt: 'Goals' },
        { id: '4', text: 'Relationships', color: '#FFB0B0' ,prompt: 'Relationships' },
        { id: '5', text: 'Fear', color: '#AEA7A7', prompt: 'Fear' },
        { id: '6', text: 'Motivation', color: '#D8B1FF' , prompt: 'Motivation'},
    ]
    const days = [
        { id: '1', text: 'Plan', color: '#FFD88D', prompt: 'It is morning, help me aspire for things, prioritise and start my day with journaling' },
        { id: '2', text: 'Reflect', color: '#BCCBFF' , prompt: 'It is night, help me reflect, ask me about my day what I want to improve and other things and help conclude my day'},
        { id: '3', text: 'Vent', color: '#FFFA8A', prompt: 'I want to vent or rant, ask me relevant questions and make this experience a mentally freeing but healthy for me, help me learn from my rants.' },
        { id: '4', text: 'Learn', color: '#FFB0B0' ,prompt: 'Ask about my day and help me learn from my day, ask questions about events that could help me learn, help me understand insights about my day that I would normally miss' },
        { id: '5', text: 'Challenge', color: '#A3D9A5', prompt: 'Ask me about the biggest challenge I faced today or expect to face, and help me break it down to understand and tackle it better.' },
        { id: '6', text: 'Wins', color: '#E6A57D', prompt: 'Help me recognize my small and big wins today, even the ones I might overlook. Guide me to celebrate progress.' },
        { id: '7', text: 'Connections', color: '#CAB8FF', prompt: 'Ask me about my social interactions today—who I spoke to, how those interactions felt, and what I learned from them.' }  
        ,{ id: '8', text: 'Intentions', color: '#AAB9FF', prompt: 'Help me set my intentions for the day, guide me in defining how I want to approach my tasks, interactions, and mindset.' }

    ]
    const emotions = [
        { id: '1', text: 'Happy', color: '#FFD88D', prompt: 'I feel happy' },
        { id: '2', text: 'Sad', color: '#BCCBFF' , prompt: 'I feel sad'},
        { id: '3', text: 'Excited', color: '#FFFA8A', prompt: 'I feel excited' },
        { id: '4', text: 'Angry', color: '#FFB0B0' ,prompt: 'I am angry' },
        { id: '5', text: 'Worry', color: '#AEA7A7', prompt: 'I am worried' },
        { id: '6', text: 'Anxious', color: '#D8B1FF' , prompt: 'I feel anxious'},
        { id: '7', text: 'Insecure', color: '#849457' , prompt: 'I feel insecure'},
        { id: '8', text: 'Triggered', color: '#8CA5FF' , prompt: 'I feel triggered'},
        { id: '9', text: 'Panic', color: '#FFFFFF' , prompt: 'I feel panicked'},
        { id: '10', text: 'Grateful', color: '#A3D9A5', prompt: 'I feel grateful' },
        { id: '11', text: 'Lonely', color: '#C3BABA', prompt: 'I feel lonely' },
        { id: '12', text: 'Hopeful', color: '#B7E3FF', prompt: 'I feel hopeful' },
        { id: '13', text: 'Frustrated', color: '#E6A57D', prompt: 'I feel frustrated' },
        { id: '14', text: 'Overwhelmed', color: '#CAB8FF', prompt: 'I feel overwhelmed' },
        { id: '15', text: 'Content', color: '#F4C2C2', prompt: 'I feel content' },
       
      ]; 
      
    const OptionButton = ({text, color, prompt}) => {
        return (
           <TouchableOpacity onPress={() => {handleEmotionPress(prompt, text)}}>
                <View style={[{backgroundColor:color}, styles.optionButton]}>
                    <Text style={{ fontSize: RFPercentage(2), fontFamily:'cMedium'}}>
                    {text}
                    </Text>
                </View>
           </TouchableOpacity> 
        )
    }  

    return (
        <GestureHandlerRootView>
        <SafeAreaView style={styles.safeArea}>
          <RotatingLogoLoader isLoading={isLoading}/>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
            <TouchableOpacity onPress={()=> {router.back()}}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text 
                    style={[styles.questionText, { fontSize: RFPercentage(3), fontFamily:'bSemi' }]} 
                    >
                {returnTitleSet(params.id)}
            </Text>
            <FlatList
                data={returnDataSet(params.id)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <OptionButton 
                    text={item.text} 
                    color={item.color}
                    prompt={item.prompt} 
                    />
                )}
                numColumns={3}
                columnWrapperStyle={styles.columnWrapper}
            />
            <TextInput
                style={{
                    marginVertical: RFPercentage(1),
                    marginHorizontal: 12,
                    backgroundColor: '#F1F1F1',
                    borderColor:'#011C2D',
                    borderWidth:1,
                    borderRadius: 10,
                    padding: 10,
                    fontSize: 20,
                    paddingVertical: 20
                }}
                placeholder='Start with anything...'
                placeholderTextColor={'grey'}
                onSubmitEditing={(event) => {
                    const text = event.nativeEvent.text;
                    handleEmotionPress(text);
                }}    
            />       
          </KeyboardAvoidingView>
        </SafeAreaView>
    </GestureHandlerRootView> 

    );
  };
  
  const { width, height } = Dimensions.get('window');
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FEF8EC',
      //  justifyContent:'center',
      
    },
    keyboardAvoid: {
      //flex: 1,
    },
    scrollContainer: {
      //flexGrow: 1,
      paddingBottom: 20,
    },
    optionButton:{
        borderWidth:2,
        borderRadius: 20,
        padding:9,
        paddingHorizontal:15,
        margin:2,
        margingVertical:3,

        alignSelf:'center'
    },
    mainContainer: {
      borderRadius: 14,
      width: width,
      minHeight: height * 0.3,
      padding: 20,
    },
    columnWrapper:{
        padding:10,
        justifyContent:'space-between',


    },
    aiQuestion: {
      //marginBottom: 10,
    },
    questionText: {
        padding: 10,
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
     
    },
    actionIconContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
  });

export default preAiConvo;