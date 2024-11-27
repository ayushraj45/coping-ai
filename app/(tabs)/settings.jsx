import { View, Text, StyleSheet, Dimensions, Touchable, TouchableOpacity, Button, Share } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import FeedbackPrompt from '../../components/FeedbackPrompt';

const settings = () => {

  const { logout } = useGlobalContext();
  const [showFeedback, setShowFeedback] = useState(false);

  const onFeedbackPress = () => {
    setShowFeedback(true);
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          ' Finally, a journaling app that makes getting your thoughts out feel natural.  Turns messy thoughts into meaningful insights so no more staring at blank pages! 🎯 Try Coping.ai download here: #link here in the future'

        
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };


  const ProfileButton = ({icon, text, link, pressFunction}) => {
    return (
      <TouchableOpacity onPress={() => { (pressFunction) ? pressFunction() : router.push(link)}}>
            <View style={styles.pageButton}>
            <Ionicons name={icon} size={30} color="black" />
            <Text style={{fontSize: RFPercentage(3), fontFamily: 'bMedium'}}>  {text}</Text>
            </View>
            </TouchableOpacity>
    )
  }

  const ExtraLink = ({text}) => {
    return (
      <TouchableOpacity>
        <View style={styles.extraLinks}>
          <Text style={{ fontSize: RFPercentage(2), fontFamily: 'cLight' }}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.main}>
      <FeedbackPrompt visible={showFeedback} onClose={() => {setShowFeedback(false)}}/>
            <View style={styles.topText}>
              <Text style={{fontSize: RFPercentage(4), fontFamily: 'bSemi'}}>Settings </Text>
            </View>
            <View style={styles.stroke}>
            </View>
            <ProfileButton icon="person-outline" text="Profile" link="/profile"/>
            <ProfileButton icon="pricetag-outline" text="Subscribe" link="/subscribe" />
            <ProfileButton icon="star-outline" text="Rate Us" />
            <ProfileButton icon="notifications-outline" text="Notifications" />
            <ProfileButton icon="call-outline" text="Feedback" pressFunction={onFeedbackPress} />
            <ProfileButton icon="share-outline" text="Share" pressFunction={onShare}/>
            <View style={styles.stroke}>
            </View>
            <ExtraLink text="Terms and Conditions" />
            <ExtraLink text="Privacy and Refunds" />
            <ExtraLink text="Support and FAQs" />
            <ExtraLink text="Three Minute Mornings by Coping.ai" />
            <TouchableOpacity onPress={() => { logout();  router.replace("/login")}}>
            <View style={styles.pageButton}>
            <Ionicons name="log-out-outline" size={30} color="black" />
            <Text style={{fontSize: RFPercentage(3), fontFamily: 'bMedium'}}>Logout</Text>
            </View>
            </TouchableOpacity>          
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

main: {
    flex:1,
    backgroundColor:"#FEF8EC",
},

topText: {
paddingLeft: 15,
justifyContent:'center',
},

stroke: { 
minWidth: (0.9 * width),
paddingLeft: 15,
height: 2,
backgroundColor: "black",
},

pageButton: {
flexDirection:'row',
alignItems:'center',
padding:15,
},

extraLinks:{
flexDirection:'column',
paddingLeft: 15,
paddingTop:20,
}

});


export default settings;