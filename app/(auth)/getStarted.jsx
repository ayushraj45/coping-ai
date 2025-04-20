import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform, SafeAreaView } from 'react-native'
import React from 'react'
// import LoginBg from '../../assets/icons/LoginBg'
import IndexLogo from '../../assets/icons/IndexLogo'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Redirect, router } from 'expo-router'
// import { useGlobalContext } from '../context/GlobalProvider'
// import RotatingLogoLoader from '../../components/RotatingLogoLoader'
// import FPBGGraphic from '../../assets/icons/FPBGGraphic'
// import RegisterBG from '../../assets/icons/RegisterBg'
import GetStartedBG from '../../assets/icons/GetStartedBG.svg'
import { StatusBar } from 'expo-status-bar'

// import AuthBackground from '../../assets/icons/AuthBackground'



const getStarted = () => {

  // const {isLoading, isLoggedIn} = useGlobalContext();

  //const { width , height } = Dimensions.get('window');
  const {width, height} = Dimensions.get('screen');

  // if (!isLoading && isLoggedIn) return <Redirect href="/homepage" />;

  
  const getusers = async () => {
    console.log('we are here')
    try{
      const userFound = await getUserById(1);
      console.log('the user found: ', userFound)
    } catch (error) {console.log(error)}
}  


const getUserById = async (id) => {
  try {
    console.log('Attempting fetch to:', 'http://coping-ai-app-env.eba-2n96bri8.eu-north-1.elasticbeanstalk.com/users/' + id);
    const response = await fetch('http://coping-ai-app-env.eba-2n96bri8.eu-north-1.elasticbeanstalk.com/users/' + id);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Full error object:', error);
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    throw error;
  }
}

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={true} backgroundColor="transparent" /> 
      {/* Background Container */}
      <View style={styles.backgroundContainer}>
        <GetStartedBG width={width} height={height} />
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Logo and Text Section */}
        <View style={styles.formSection}>
          <IndexLogo width={185} height={185} />
          <Text style={styles.titleText}>Coping.ai</Text>
          <Text style={styles.subtitleText}>AI-assisted Journaling</Text>
        </View>

        {/* Get Started Button */}
        <View style={styles.getStartedContainer}>
          <TouchableOpacity onPress={() => router.push("/register")}>
          {/* <TouchableOpacity onPress={getusers}> */}
            <View style={styles.getStarted}>
              <Text style={styles.buttonText}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF8EC',
  },
  backgroundContainer: {
    position: 'absolute',
    flex:1,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
    alignSelf:'center'
  },
  formSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingHorizontal: 20,
    //marginTop: 290,
  },
  titleText: {
    fontSize: RFPercentage(3),
    fontFamily: 'bSemi',
  },
  subtitleText: {
    fontSize: RFPercentage(2),
    fontFamily: 'bSemi',
  },
  getStartedContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  getStarted: {
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E2E9E2',
    padding: 13,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: RFPercentage(2),
    fontFamily: 'bSemi',
    color: '#E2E9E2',
  },
});
    
export default getStarted;