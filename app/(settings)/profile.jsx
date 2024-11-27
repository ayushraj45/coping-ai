import { Dimensions, StyleSheet, Text, View , TouchableOpacity,} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import GradiBackground from '../../components/GradiBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileLogo from '../../assets/icons/ProfileLogo';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useFocusEffect } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';

const profile = () => {

  const [enableEdit, setEnableEdit] = useState(false);
  const [updatedAt, setUpdatedAt] = useState('Edit');
  const [remainingEntry, setRemainingEntry] = useState('Edit');
  const [username, setUsername] = useState('Username');
  const [tempUsername, setTempUsername] = useState('');
  const [value, setValue] = useState(2);
  const [tempValue, setTempValue] = useState(2);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const { user , isLoggedIn, updateUser, entriesLength, refreshUserData} = useGlobalContext();
  const [isLoading, setIsLoading] =useState(false)
  const [currentEntryLength, setCurrentEntryLength] = useState(`${value}`);


const handleEdit = useCallback(() => {
  setEnableEdit(prevState => !prevState);
  if (!enableEdit) {
    setTempUsername(username);
    setTempValue(value) // Store the current username when entering edit mode
  }

}, [enableEdit, username, value]);

const handleSave = async () => {
  setIsLoading(true)

  const currentUser = await refreshUserData();
  console.log('current user '+ JSON.stringify(currentUser))
  const updatedUser = {...currentUser, 
    username: tempUsername,
    maxQuestions: tempValue,
  }
  console.log(updateUser);
  const data = await updateUser(updatedUser)
  if(data){
    console.log(data)
    setValue(data.maxQuestions);
    setSubscriptionStatus(data.subscriptionStatus);
    setRemainingEntry(data.remainingFreeEntries);
    setUpdatedAt(daysSinceLastReset(data.updatedAt));
    setIsLoading(false);
    setEnableEdit(false)
  }
}

const setUpProfile = async () => {
  const thisUser = await refreshUserData();
  console.log('user at useEffect: ' + thisUser)
    setValue(thisUser.maxQuestions); 
    setTempValue(thisUser.maxQuestions); 
    setUsername(thisUser.username);
    setTempUsername(thisUser.username);
    setRemainingEntry(thisUser.remainingFreeEntries);
    setSubscriptionStatus(thisUser.subscriptionStatus);
    setUpdatedAt(daysSinceLastReset(thisUser.updatedAt));
    setCurrentEntryLength((thisUser.entryIds).length)
}

useFocusEffect(
  useCallback(() => {
    setUpProfile();
  }, [])
);

useEffect(() => {
  setUpProfile();
}, []);


const daysSinceLastReset = (updatedAt) => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const updatedAtDate = new Date(updatedAt);
  const now = new Date()
  const diffTime = Math.abs(now - updatedAtDate);
  const diffDays = Math.ceil(diffTime / msPerDay);
  const daysToUpdate = 7-diffDays
  return daysToUpdate;
};

const increment = () => {
  if (tempValue < 10) {
    const newValue = tempValue + 1;
    setTempValue(newValue);
  }
};

const decrement = () => {
  if (tempValue > 2) {
    const newValue = tempValue - 1;
    setTempValue(newValue);
  }
};


return (   
    <SafeAreaView style={{
      flex:1,
      backgroundColor:"#FEF8EC",
  }}>
      <View style={styles.logoContainer}>
        <ProfileLogo />
      </View>
      <View style={styles.usernameText}>
        <Text style={{fontSize: RFPercentage(2), fontFamily: 'bSemi'}} className="font-bSemi" >  Coping</Text>
      </View>
      <View style={styles.stroke} />
      
      <View style={styles.infoRow}>
        <Text style={{fontSize: RFPercentage(2)}}>Plan:</Text>
        <Text style={{fontSize: RFPercentage(2)}}>{subscriptionStatus}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={{fontSize: RFPercentage(2)}}>Total Entries:</Text>
        <Text style={{fontSize: RFPercentage(2)}}>{currentEntryLength}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={{fontSize: RFPercentage(2)}}>Free Entries Left:</Text>
        <Text style={{fontSize: RFPercentage(2)}}>{remainingEntry}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={{fontSize: RFPercentage(2)}}>Free Entries Reset in</Text>
        <Text style={{fontSize: RFPercentage(2)}}>{updatedAt} Days</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={{fontSize: RFPercentage(2)}}>Max Questions:</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity 
            onPress={decrement} 
            disabled={!enableEdit}
          >
          <Ionicons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          {enableEdit ? <Text style={styles.value}> {tempValue} </Text> : <Text style={styles.value}> {value} </Text>  }
          <TouchableOpacity 
            onPress={enableEdit ? increment : undefined} 
            disabled={!enableEdit}
          >
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
      </View>
      </View>
      <View style={styles.infoRow}>
        <View style={!enableEdit ? styles.button : styles.cancelbutton}>
        <TouchableOpacity onPress={handleEdit}>
          {!enableEdit ? <Text style={{fontSize: RFPercentage(2)}} className="font-bSemi"> Edit </Text> : <Text style={{fontSize: RFPercentage(2)}} className="font-bSemi"> Cancel </Text>  }
        </TouchableOpacity>
        </View>

        <View style={enableEdit ? styles.button : styles.buttondisable}>
        <TouchableOpacity onPress={handleSave}>
          <Text style={{fontSize: RFPercentage(2)}} className="font-bSemi"> Save </Text>
        </TouchableOpacity>
        </View>

      </View>
      <View style={styles.infoRow}>
        <TouchableOpacity>
          <Text style={{fontSize: RFPercentage(2.5)}} className="font-bSemi"> Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>  

)}

const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  logoContainer:{
    alignItems:'center',
    padding:10,
  },

  usernameText:{
    alignItems:'center',
    padding:10,
  },
  stroke: { 
    minWidth: (0.7 * width),
    paddingLeft: 15,
    height: 2,
    backgroundColor: "black",
  },
  infoRow:{
    flexDirection:'row',
    alignItems:'baseline',
    padding:5,
    justifyContent:'space-between',
    marginHorizontal:15,
    marginTop:15,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttondisable:{
    opacity:0.5,
    backgroundColor: '#007AFF',
    borderRadius: 15,
    paddingHorizontal:10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelbutton:{
    backgroundColor: '#FF6F6F',
    borderRadius: 15,
    paddingHorizontal:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    marginHorizontal: 20,
  },
})

export default profile
