import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import EmotionMatrix from '../../components/EmotionMatrix'
import MorningButton from '../../assets/icons/MorningButton'
import NightButton from '../../assets/icons/Nightbutton'
import VentButton from '../../assets/icons/VentButton'
import AddNew from '../../assets/icons/AddNew.svg'
import InstaPromptList from '../../components/InstaPromptList'
import { useGlobalContext } from '../context/GlobalProvider'
import { router } from 'expo-router'
import SubscribePrompt from '../../components/SubscribePrompt'
import RotatingLogoLoader from '../../components/RotatingLogoLoader'

const homepage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [triggerHandle, setTriggerHandle] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null); 
  const [isLoading, setIsloading] = useState(false)
  const [customFeeling, setCustomFeeling] = useState('');
  const [userId, setUserId] = useState(null);
  const [userFreeEntry, setUserFreeEntry]= useState(0);
  const [showSubsribeNotice, setShowSubscribeNotice ] = useState(false)

  //const { addEntry, getGPTResponse, getGPTInstaPrompt, user, isSubscribed , canMakeEntry} = useGlobalContext();

  const {addEntry, getGPTResponse, getGPTInstaPrompt, user} = useGlobalContext();

  useEffect(() => {
    if (selectedItem && triggerHandle) {
      handleNewEntry();
      setTriggerHandle(false);  // Reset the trigger
    }
  }, [selectedItem, triggerHandle]);

  useEffect(() => {
    if(user){
      setUserId(user.id); 
    }
  }, [user]);

  const isSelected = (buttonType) => 
    selectedButton === buttonType || 
  (selectedItem && selectedItem.listType === 'dailyButton' && selectedItem.type === buttonType) || (selectedButton === null && selectedItem === null);

  const handleSelection = (item, listType) => {
    setCustomFeeling('');
    const newItem = { ...item, listType };
    if(selectedItem && selectedItem.type === item.type && selectedItem.listType === listType && selectedItem.prompt === item.prompt){
      setSelectedItem(null)
    setSelectedButton(null);
    }
    else{
    setSelectedItem(newItem);
    setSelectedButton(null);
    console.log(selectedItem); // log the updated value
    }
  };

  const handleDailyEntry = (buttonType) => {
    setCustomFeeling('');
    setSelectedButton(buttonType);
    if(buttonType === 'morning') {
      handleSelection({ type: buttonType, listType: 'dailyButton', prompt: 'It is morning, help me aspire for things, prioritise and start my day with journaling'}, 'dailyButton');
    }
  else if (buttonType === 'night'){
    handleSelection({ type: buttonType, listType: 'dailyButton', prompt: 'It is night, help me reflect, ask me about my day what I want to improve and other things and help conclude my day' }, 'dailyButton');
  }
  else if (buttonType === 'vent'){
    handleSelection({ type: buttonType, listType: 'dailyButton', prompt: 'I want to vent or rant, ask me relevant questions and make this experience a mentally freeing but healthy for me, help me learn from my rants.' }, 'dailyButton');
  }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = now.toLocaleString('default', { month: 'short' });
    const year = String(now.getFullYear()).slice(-2);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  const handleNewEntry = async () => {
    console.log(selectedItem);
    setIsloading(true);
    setCustomFeeling('');
    const allowEntry = true;
    console.log(allowEntry)
    if(!allowEntry){
      setShowSubscribeNotice(true);
      setSelectedButton(null);
      setSelectedItem(null);
      setIsloading(false);
    }
    else {
    setIsloading(true);
    console.log(selectedItem);
    const currentDateTime = getCurrentDateTime();

    const initialEntry = {
      "userId": userId,
      "title": currentDateTime,
      "initFeeling": "",
      "questions": [],
      "answers": [],
      "content": "",
      "questionCount": 0
    }   

    const newEntryId = await addEntry(initialEntry);

    if(newEntryId) {
      if(selectedItem.listType === "instaprompt") {
        try{
          const data = await getGPTInstaPrompt(newEntryId, selectedItem.prompt);
          if(data) {
            setIsloading(false);
            router.push({
              pathname: `/entry/[id]`,
              params: { id: newEntryId }
            });
            setSelectedItem(null)
            setSelectedButton(null);
          } 
        } catch (error) {
          console.log('failed to create new entry at instaprompt')
          console.error(error)
        }
      }
      else {
        try{
          const data = await getGPTResponse(newEntryId, selectedItem.prompt);
          if(data) {
            setIsloading(false);  
            router.push({
              pathname: `/aiConvo`,
              params: { id: newEntryId, prompt: data.newQuestion, qCount: data.questionCount }
            });
            setSelectedItem(null)
            setSelectedButton(null);
          }
          else console.log('something was not right at creating new ai convo.');
        } catch (error) {
          console.error(error);
        }
      } 
    
    // } else {
    //   console.log('failed to create new entry to begin with, so we never got new ID')
    // }
  }
  }
}

  return (
    <SafeAreaView style={styles.main}>
            <SubscribePrompt visible={showSubsribeNotice} onClose={() => {setShowSubscribeNotice(false)}} text={"You have reached your weekly limit of free entries. Please subscribe to enjoy unlimited entries and more!"}/>
            <RotatingLogoLoader isLoading={isLoading}/>
      <View style={styles.upperSpace} />
      <View style={styles.topText}>
          <Text style={{fontSize: RFPercentage(3), fontFamily:'cMedium'}}>Hello@User</Text>
        </View>
      <View style={{paddingVertical:5, marginTop:5, }}>
      <TextInput
        style={[{
          marginVertical: RFPercentage(1),
          marginHorizontal: 12,
          backgroundColor: '#F1F1F1',
          borderRadius: 20,
          padding: 5,
          fontSize: 20,
          paddingVertical: 10,
          opacity:0.4
        },
        !selectedItem && {
          marginVertical: RFPercentage(1),
          marginHorizontal: 12,
          backgroundColor: '#F1F1F1',
          borderColor:'#011C2D',
          borderWidth:1,
          borderRadius: 20,
          padding: 5,
          fontSize: 20,
          paddingVertical: 10
      }]}
        placeholder='Start with anything...'
        editable={!selectedItem}        
        onChangeText={(text) => {
          //value={text};
        }}
        onSubmitEditing={(event) => {
          const text = event.nativeEvent.text;
          
          if (text.trim()) {
            setSelectedItem({
              id: 'custom',
              prompt: text,
              listType: 'emotion'
            });
            setTriggerHandle(true);
          } else {
            setSelectedItem(null);
          }
        }}
        placeholderTextColor={'black'}
      />
      </View>  

      <View style={styles.topText}>
        <Text style={{fontSize: RFPercentage(3), fontFamily:'cMedium'}}>Mood Journal: Explore</Text>
      </View>  
      <View >
        <EmotionMatrix
          onEmotionPress={(item) => handleSelection(item, 'emotion')}
          selectedEmotion={selectedItem && selectedItem.listType === 'emotion' ? selectedItem : null}
          isDisabled={selectedItem && selectedItem.listType !== 'emotion'}
          />
      </View>
      <View>
      <TextInput  
             style={[ {marginVertical:RFPercentage(1), marginHorizontal:12, backgroundColor:'#F1F1F1', borderRadius: 20, padding:5, fontSize:20,opacity:0.4}, !selectedItem && {marginVertical:RFPercentage(1), marginHorizontal:12, backgroundColor:'#F1F1F1', borderRadius: 20, padding:5, fontSize:20,borderColor:'#011C2D',borderWidth:1, } ]}
             placeholder='I feel...'
             
             editable={!selectedItem}
             onChangeText={(text) => {
              
             }}
             onSubmitEditing={(event) => {
               const text = event.nativeEvent.text;               
               if (text.trim()) {
                 setSelectedItem({
                   id: 'custom',
                   prompt: 'I feel ' + text,
                   listType: 'emotion'
                 });
                 setTriggerHandle(true);  // This will trigger the useEffect
               } else {
                 setSelectedItem(null);
               }
             }}
             placeholderTextColor={'grey'}
              />
      </View> 

      <View style={styles.topText}>
        <Text style={{fontSize: RFPercentage(3), fontFamily:'cMedium'}}>Daily Journal</Text>
      </View>

      <View style={styles.dailyButtons}>
        <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{flexGrow: 0,}}
            contentContainerStyle={styles.scrollContentContainer}
          >
          <TouchableOpacity 
           onPress={() => handleDailyEntry('morning')}
           style={[
             styles.buttonContainer,
             isSelected('morning') ? styles.selectedButton : styles.unselectedButton
            ]}
            >
            <MorningButton  />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => handleDailyEntry('night')}
          style={[
            styles.buttonContainer,
            isSelected('night') ? styles.selectedButton : styles.unselectedButton
          ]}
          >
            <NightButton />
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => handleDailyEntry('vent')}
          style={[
            styles.buttonContainer,
            isSelected('vent') ? styles.selectedButton : styles.unselectedButton
          ]}
          >
            <VentButton/>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.topText}>
        <Text style={{fontSize: RFPercentage(3), fontFamily:'cMedium'}}>Instant Prompts</Text>
      </View>

      <View>
        <InstaPromptList
          onPromptPress={(item) => handleSelection(item, 'instaprompt')}
          selectedEmotion={selectedItem && selectedItem.listType === 'instaprompt' ? selectedItem : null}
          isDisabled={selectedItem && selectedItem.listType !== 'instaprompt'}
          />
      </View>

      <View style={styles.customButton}>
        <View style={styles.AddNew}>
        {selectedItem ? (
          <TouchableOpacity onPress={handleNewEntry}>
            <AddNew width={RFPercentage(8)} height={RFPercentage(8)}/>
          </TouchableOpacity>
        ) : (
          <View style={styles.disabledAddNew}>
            <AddNew width={RFPercentage(8)} height={RFPercentage(8)} />
          </View>
        )}
      </View>  
      <View style={styles.CustomText}>
          <Text style={{fontSize: RFPercentage(2), fontFamily:'cMedium'}}>{selectedItem? 'Click on plus to get started' : 'Select an emotion or type something'}</Text>
          </View>
      </View>
      
    </SafeAreaView>
  )
}

export default homepage;

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:"#FEF8EC",
  },
  topText: {
    paddingLeft: 15,
    justifyContent:'center',
    marginBottom:RFPercentage(1)
  },
  dailyButtons:{
    flexDirection: 'row',
    paddingTop:RFPercentage(1),
    paddingHorizontal: 10,
  },
  selectedButton: {
    opacity: 1,
  },
  unselectedButton: {
    opacity: 0.3,
  },
  upperSpace: {
    //flex:0.01
  },
  customButton:{
   // flex:0.4,
    flexDirection:'column',
    justifyContent:'footer',
  },
  AddNew: {
    flexDirection:'row',
    alignSelf: 'center',
  },
  disabledAddNew: {
    opacity: 0.5,
  },
  CustomText:{
    flexDirection:'row',
    alignSelf: 'center',
    margin:7,
  },

})