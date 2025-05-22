import { View, Text, SafeAreaView, StyleSheet , TouchableWithoutFeedback, TextInput, Keyboard, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView, Platform, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
//import GradiBackground from '../../components/GradiBackground';
import { RFPercentage } from 'react-native-responsive-fontsize';
import JPPopUp from '../../components/JPPopUp';
import QPopUp from '../../components/QPopUp';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import RotatingLogoLoader from '../../components/RotatingLogoLoader';

const userEntry = () => {


 // const route = useRoute();
  const params = useLocalSearchParams();
  const router = useRouter();
  const { getEntry, updateEntry , getEntryById, getGPTEntryForUser, checkIfSub } = useGlobalContext();
  const [entry, setEntry] = useState(null);
const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [text, setText] = useState('');
  const [showJPPopUp, setShowJPPopUp] = useState(true);
  const [showJPPopUpText, setShowJPPopUpText] = useState(null);
  const [showQPopUpText, setShowQPopUpText] = useState([]);
  const [showQPopUp, setShowQPopUp] = useState(false);
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAiUpdating, setIsAiUpdating] = useState(false);

  useEffect(()  => {
   // console.log('Params received at entryid]:', params);
    //console.log('ID from params at entryId]:', params.entryid);
    setIsLoading(true)
    loadEntry();

    if (entry) {
      
        setIsLoading(false);
      
    }
  }, []);

  // const loadEntry = async () => {
  //   try {
  //     const fetchedEntry = await getEntryById(params.entryid);
  //     const localEntry = await AsyncStorage.getItem(`entry_${params.entryid}`);
  //     if (localEntry) {
  //       const parsedLocalEntry = JSON.parse(localEntry);
  //       setTitle(parsedLocalEntry.title);
  //       setContent(parsedLocalEntry.content);
  //       setHasLocalChanges(true);
  //       if (fetchedEntry) {
  //         setShowJPPopUpText(fetchedEntry.answers[0]);
  //         setShowQPopUpText(fetchedEntry.questions);
  //       }
  //     }
  //     else {
  //       if (fetchedEntry) {
  //         setEntry(fetchedEntry);
  //         setTitle(fetchedEntry.title);
  //         setContent(fetchedEntry.content);
  //         setShowJPPopUpText(fetchedEntry.answers[0]);
  //         setShowQPopUpText(fetchedEntry.questions);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching entry:', error);
  //   } finally {
  //     setIsLoading(false); // Make sure this is in the finally block
  //   }
  // };

  const loadEntry = async () => {
    try {
    const fetchedEntry = await getEntryById(params.entryid);
    if (fetchedEntry) {   
    setEntry(fetchedEntry);
    setTitle(fetchedEntry.title);
    setContent(fetchedEntry.content);    
    setShowJPPopUpText(fetchedEntry.answers[0]);        
    setShowQPopUpText(fetchedEntry.questions);

     const localEntry = await AsyncStorage.getItem(`entry_${params.entryid}`);

    if (localEntry) {
    const parsedLocalEntry = JSON.parse(localEntry);    
    setTitle(parsedLocalEntry.title);
    setContent(parsedLocalEntry.content);
    setHasLocalChanges(true);
    }}
    } catch (error) {
    console.error('Error fetching entry:', error);
    }}

useEffect(() => {
  const updateInterval = setInterval(() => {
    if (hasLocalChanges && !isAiUpdating) {
      handleApiUpdate();
    }
  }, 3000); // 30 seconds

  return () => clearInterval(updateInterval);
}, [hasLocalChanges, title, content]);

const saveLocally = async ({ title, content }) => {
  try {
    const localEntry = { title, content };
    await AsyncStorage.setItem(`entry_${params.entryid}`, JSON.stringify(localEntry));
  } catch (error) {
    console.error('Error saving locally:', error);
  }
};

const handleApiUpdate = async () => {
  try {
    const updatedEntry = { ...entry, title, content };
    await updateEntry(updatedEntry);
    setHasLocalChanges(false);
    // Optionally, update the entry state here if needed
    setEntry(updatedEntry);
  } catch (error) {
    console.error('Error updating entry:', error);
  }
};

//     const DismissKeyboard = ({ children }) => (
//     <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
//         {children}    
//     </TouchableWithoutFeedback>
//     );

//     const handleContentSizeChange = (event) => {
//         setText(event.nativeEvent.text);
//       };

      const handleJPPress = () => {
        setShowJPPopUp(true);
      }
      const handleQPress = () => {
        setShowQPopUp(true);
      }

      const handleAIEntryPress = async () => {
        const allowAiEntry = await checkIfSub();
        if(allowAiEntry){
          console.log('allow is true')
          if( entry.questions.length < 7 ){
            Alert.alert(
                          'Not enough responses',
                          'AI Entries are only possible when you have longer conversations. Please set Max Entry more than 5 in Profile to use this feature',
                          [
                            {
                              text: 'Cancel',
                              style: 'cancel',
                              onPress: () => false // Prevents default back behavior
                            },
                            {
                              text: 'OK', 
                              onPress: () => router.push({pathname: `/profile`})
                            }
                          ]
                        );
          }
          else {
            try{
              console.log('we came here')
              setLoading(true)
              setIsAiUpdating(true);
              const contentToAdd = await getGPTEntryForUser(params.entryid);
              if(contentToAdd){
                setContent(content + '\n' + contentToAdd)
                const newContent = content + '\n' + contentToAdd; 
                const updatedEntryAfterAi = { ...entry, content:newContent };
                await updateEntry(updatedEntryAfterAi);
                await saveLocally({ title, content: newContent });
              }
            }
            catch(error) {
              console.error('Error saving locally:', error);
            }
            finally{
              setIsAiUpdating(false);
              
              setLoading(false);
            }
          }
        }
        else {
          Alert.alert(
            'Remove all limits',
            'AI Entries are only possible for pro users, please subscribe to use this feature.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => false // Prevents default back behavior
              },
              {
                text: 'OK', 
                onPress: () => router.push({pathname: `/subscribe`})
              }
            ]
          );
        }
      }

  return (
    
      <View style={styles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      style={{ flex: 1 }}
      >
       <RotatingLogoLoader isLoading={loading} />  
            <SafeAreaView style={{ flex: 1,  marginTop: Platform.OS === 'ios' ? 0 : 20} }>
            <TouchableOpacity onPress={()=> {router.back()}}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
                <View style={styles.title}>
                    <TextInput
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{fontSize: RFPercentage(3), fontFamily: 'bSemi'}} 
                    value={title} 
                    //defaultValue="Enter title" 
                    placeholder="Enter title"
                    onChangeText={(text) => {
                      setTitle(text);
                      setHasLocalChanges(true);
                       saveLocally({ title: text, content });
                    }}                                   
                />
                </View>
                <View style={styles.promptButtonContainer}>
                    <TouchableOpacity onPress={handleJPPress}>
                        <View style={styles.promptButton}>
                            <Text>View Prompt</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleQPress}>
                        <View style={styles.promptButton}>
                            <Text>View Questions</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleAIEntryPress}>
                        <View style={styles.promptButton}>
                            <Text>Generate Entry with AI</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                
                <JPPopUp visible={showJPPopUp} text={showJPPopUpText} onClose={() => setShowJPPopUp(false)} />  
                <QPopUp visible={showQPopUp} questions={showQPopUpText} onClose={() => setShowQPopUp(false)}/>
                <ScrollView showsVerticalScrollIndicator={true}>
                {/* <DismissKeyboard/> */}
                <View style={styles.input}>
                <TextInput
                    value={content}
                    placeholder="Enter content"
                    onChangeText={(text) => {
                      setContent(text);
                      setHasLocalChanges(true);
                      saveLocally({ title, content: text });
                    }}
                    placeholderTextColor={'grey'}
                    multiline={true}
                    
                >
                    </TextInput>
                </View>
                
                

                </ScrollView>
            </SafeAreaView>
            </KeyboardAvoidingView>
            </View>
  )
}

const styles = StyleSheet.create({ 

    title:{
        paddingHorizontal:15,
        paddingBottom: 5,
    },
    container: {
      backgroundColor: '#FEF8EC',
      flex: 1, // This makes the container take up the full available height
    },
    promptButtonContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        padding:5,
        paddingLeft:15,
    },
    promptButton:{
        borderRadius:14,
        backgroundColor:'#D9D9D9',
        padding:5,
        paddingHorizontal:7,
        marginRight:10,
    },

input:{
    padding:15, 
    paddingHorizontal:15,
    fontSize: RFPercentage(3),
    // borderColor: '#ffffff',
    // borderWidth:3,
    // borderRadius:20,
    flex:1,
},
centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    padding: 35,
    minWidth:'80%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }

})

export default userEntry 