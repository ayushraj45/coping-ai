import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import EmotionMatrix from '../../components/EmotionMatrix'
import MorningButton from '../../assets/icons/MorningButton'
import NightButton from '../../assets/icons/Nightbutton'
import VentButton from '../../assets/icons/VentButton'
import Aspire from '../../assets/icons/Aspire.svg'

const homepage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [triggerHandle, setTriggerHandle] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null); 

  const isSelected = (buttonType) => 
    selectedButton === buttonType || 
  (selectedItem && selectedItem.listType === 'dailyButton' && selectedItem.type === buttonType) || (selectedButton === null && selectedItem === null);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.topText}>
          <Text style={{fontSize: RFPercentage(3), fontFamily:'cMedium'}}>Hello@User</Text>
        </View>
      <View style={{paddingVertical:5, marginTop:5, }}>
      <TextInput
        style={[{
          marginVertical: 3,
          marginHorizontal: 12,
          backgroundColor: '#F1F1F1',
          borderRadius: 20,
          padding: 5,
          fontSize: 20,
          paddingVertical: 10,
          opacity:0.4
        },
        !selectedItem && {
          marginVertical: 3,
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
        //editable={!selectedItem}        
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
             style={[ {marginVertical:10, marginHorizontal:12, backgroundColor:'#F1F1F1', borderRadius: 20, padding:5, fontSize:20,opacity:0.4}, !selectedItem && {marginVertical:10, marginHorizontal:12, backgroundColor:'#F1F1F1', borderRadius: 20, padding:5, fontSize:20,borderColor:'#011C2D',borderWidth:1, } ]}
             placeholder='I feel...'
             
             //editable={!selectedItem}
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
          <Text style={{fontSize: RFPercentage(3)}} className="font-cMedium">Daily Journal</Text>
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
            <MorningButton/>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => handleDailyEntry('night')}
          style={[
            styles.buttonContainer,
            isSelected('night') ? styles.selectedButton : styles.unselectedButton
          ]}
          >
            <Aspire />
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
  },
  dailyButtons:{
    flexDirection: 'row',
    //marginLeft:-15,
    paddingTop:20,
    maxHeight: '20%'
  },
  selectedButton: {
    opacity: 1,
  },
  unselectedButton: {
    opacity: 0.3,
  },
})