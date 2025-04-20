import { View, Text, StyleSheet, Dimensions, Touchable, TouchableOpacity, Button, Share, ScrollView, Linking, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useGlobalContext } from './context/GlobalProvider';
import FeedbackPrompt from '../components/FeedbackPrompt';
import ExternalUriModal from '../components/ExternalUriModal';

const settings = () => {

  const { logout } = useGlobalContext();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTmmPopup, setShowTmmPopup ] = useState(false);
  const [showTermsPopup , setShowTermsPopup ] = useState(false);


  const onFeedbackPress = () => {
    setShowFeedback(true);
  }

  const onShare = async () => {

    const appStoreLink = "https://apps.apple.com/gb/app/id6739732540";
    const playStoreLink = "https://play.google.com/store/apps/details?id=com.ayushrajp.copingai";

    try {
      if(Platform.OS === 'ios') {

      }
      const result = await Share.share({
        message: `Finally, a journaling app that makes getting your thoughts out feel natural. Turns messy thoughts into meaningful insights so no more staring at blank pages! 🎯 Try Coping.ai download here: ${Platform.OS === 'ios' ? appStoreLink : playStoreLink}`
      });;
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

  const showPopups = (popup) => {
    if(popup === 'terms') {
      setShowTermsPopup(true)
    }
    else
      setShowTmmPopup(true)
  }

  const ProfileButton = ({icon, text, link, pressFunction}) => {
    return (
      <View style={styles.profileButtonContainer}> 
      <TouchableOpacity onPress={() => { (pressFunction) ? pressFunction() : router.push(link)}}>
            <View style={styles.pageButton}>
            <Ionicons name={icon} size={30} color="black" />
            <Text style={{fontSize: RFPercentage(3), fontFamily: 'bMedium'}}>  {text}</Text>
            </View>
            </TouchableOpacity>
            </View>
    )
  }

  const ExtraLink = ({text, popup}) => {
    return (
      <TouchableOpacity onPress={() => {showPopups(popup)}}>
        <View style={styles.extraLinks}>
          <Text style={{ fontSize: RFPercentage(2), fontFamily: 'cLight' }}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const handleRateApp = () => {
    // iOS store ID and Android package name - you'll need to replace these
    const iosStoreId = '6739732540';
    const androidPackageName = 'com.ayushrajp.copingai';
  
    // Store URLs
    const storeUrls = {
      ios: `itms-apps://itunes.apple.com/app/id${iosStoreId}?action=write-review`,
      android: `https://play.google.com/store/apps/details?id=${androidPackageName}`
    };
  
    // Fallback URLs (if store apps aren't installed)
    const fallbackUrls = {
      ios: `https://apps.apple.com/app/id${iosStoreId}?action=write-review`,
      android: `https://play.google.com/store/apps/details?id=${androidPackageName}`
    };
  
    const url = Platform.select({
      ios: storeUrls.ios,
      android: storeUrls.android
    });
  
    const fallback = Platform.select({
      ios: fallbackUrls.ios,
      android: fallbackUrls.android
    });
  
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        console.log('url here: ',url)
        Linking.openURL(url);
      } else {
        Linking.openURL(fallback);
      }
    }).catch(err => console.error('Error opening store:', err));
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
      <TouchableOpacity onPress={()=> {router.back()}}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
      <ExternalUriModal visible={showTermsPopup} onClose={() => {setShowTermsPopup(false)}} link={'https://www.coping-ai.com/terms.html'}/>   
      <ExternalUriModal visible={showTmmPopup} onClose={() => {setShowTmmPopup(false)}} link={'https://www.amazon.co.uk/Three-Minute-Mornings-Gratitude-Productivity/dp/B0D36ZC6YR/'}/>   

      <FeedbackPrompt visible={showFeedback} onClose={() => {setShowFeedback(false)}}/>
            <View style={styles.topText}>
              <Text style={{fontSize: RFPercentage(4), fontFamily: 'bSemi'}}>Settings </Text>
            </View>
            {/* <View style={styles.stroke}>
            </View> */}

            <View style={styles.limitButtonContainer}> 
              <TouchableOpacity onPress={() => { router.push("/subscribe")}}>
                <View style={styles.limitButton}>
                <Text style={{fontSize: RFPercentage(3.5), fontFamily: 'bSemi', color:"#FEF8EC"}}> Remove All Limits </Text>
                </View>
              </TouchableOpacity>
            </View>

            <ProfileButton icon="person-outline" text="Profile" link="/profile"/>
            <ProfileButton icon="pricetag-outline" text="Subscribe" link="/subscribe" />
            <ProfileButton icon="star-outline" text="Rate Us" pressFunction={handleRateApp}/>
            {/* <ProfileButton icon="notifications-outline" text="Notifications" /> */}
            <ProfileButton icon="call-outline" text="Feedback" pressFunction={onFeedbackPress} />
            <ProfileButton icon="share-outline" text="Share" pressFunction={onShare}/>
            <View style={styles.stroke}>
            </View>
            <ExtraLink text="Three Minute Mornings by Coping.ai" popup={'tmm'} /> 
            <ExtraLink text="Terms and Conditions" popup={'terms'}/>
            <ExtraLink text="Privacy and Refunds" popup={'terms'}/>
            <TouchableOpacity onPress={() => {router.push("/faqs")}}>
             <View style={styles.extraLinks}>
                <Text style={{ fontSize: RFPercentage(2), fontFamily: 'cLight' }}>Support and FAQs</Text>
              </View>
             </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => { logout();  router.replace("/login")}}>
            <View style={styles.pageButton}>
            <Ionicons name="log-out-outline" size={30} color="black" />
            <Text style={{fontSize: RFPercentage(3), fontFamily: 'bMedium'}}>Logout</Text>
            </View>
            </TouchableOpacity>          */}
            </ScrollView>       
    </SafeAreaView>
  )
}

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({

main: {
flex:1,
backgroundColor:"#FEF8EC",
},

topText: {
marginLeft: 20,
justifyContent:'center',
},

stroke: { 
minWidth: (0.9 * width),
paddingLeft: 15,
height: 2,
backgroundColor: "black",
margin:10,
},

profileButtonContainer:{
elevation: 2,
borderRadius:14,
backgroundColor: '#FFEECD',
margin:7,
marginHorizontal:15,
padding:1
},

pageButton: {
flexDirection:'row',
alignItems:'center',
padding:5,
},

limitButtonContainer:{
  elevation: 2,
  borderRadius:14,
  alignItems:'center',
  backgroundColor: '#011C2D',
  margin:5,
  marginHorizontal:15,
  padding:1
  },
  
  pageButton: {
  flexDirection:'row',
  alignItems:'center',
  padding:10,
  color:"#FEF8EC"
  },

extraLinks:{
flexDirection:'column',
paddingLeft: 15,
paddingTop:20,
}

});


export default settings;