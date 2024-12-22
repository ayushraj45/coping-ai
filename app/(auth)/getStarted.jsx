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

// import AuthBackground from '../../assets/icons/AuthBackground'



const getStarted = () => {

  // const {isLoading, isLoggedIn} = useGlobalContext();

  const { width , height } = Dimensions.get('window');

  // if (!isLoading && isLoggedIn) return <Redirect href="/homepage" />;

  

  return (
    <View style={styles.container}>
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