import React, { useRef, useState } from 'react';
import { 
    View, 
    ScrollView, 
    Dimensions, 
    StyleSheet, 
    TouchableOpacity, 
    Text 
  } from 'react-native';

import DotIndicator from '../../components/DotIndicator';
import OnboardTop from '../../assets/icons/OnboardTop';
import OnboardBottom from '../../assets/icons/OnboardBottom';
import ProfileLogo from '../../assets/icons/ProfileLogo';
import { RFPercentage } from 'react-native-responsive-fontsize';
import OnboardScreenContent from './OnboardScreenContent';
import { useRouter } from 'expo-router';


const { width , height } = Dimensions.get('window');

const Screen1 = ProfileLogo; 

const OnboardScreenLayout = ({ navigation }) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const scrollViewRef = useRef(null);
    const router = useRouter();

    // Example screen data - replace with your actual screens
    const screens = [
      
      {
        number:1,
        title: 'Welcome to Coping.ai',
        content: "Your Personal Journey Begins Here",
      },
      {
        number:2,
        title: "Write with Purpose",
        content: "Transform your thoughts into clarity as you write. Simple, guided, and meaningful.",
      },
      {
        number:3,
        title: "Discover Yourself",
        content: "Express your emotions freely with personalized prompts tailored just for you.",
      },
      {
        number:4,
        title: "How are you feeling?",
        content: "Choose an emotion to begin your first entry.",
      },
    ];
  
    const handleScroll = (event) => {
      const contentOffset = event.nativeEvent.contentOffset;
      const currentIndex = Math.round(contentOffset.x / width);
      setCurrentScreen(currentIndex);
    };
  
    const goToNextScreen = () => {
      if (currentScreen < screens.length - 1) {
        scrollViewRef.current?.scrollTo({
          x: (currentScreen + 1) * width,
          animated: true
        });
        setCurrentScreen(currentScreen + 1);
      } else {
        router.replace('/homepage'); // Navigate to homepage after last screen
      }
    };
  
    const goToPrevScreen = () => {
      if (currentScreen > 0) {
        scrollViewRef.current?.scrollTo({
          x: (currentScreen - 1) * width,
          animated: true
        });
        setCurrentScreen(currentScreen - 1);
      }
    };
  
    const renderNavigationButtons = () => {
        const isLastScreen = currentScreen === screens.length - 1;
    
        return (
          <View style={styles.navigationButtons}>
            {currentScreen > 0 && (
              <TouchableOpacity 
                style={styles.button} 
                onPress={goToPrevScreen}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]} 
              onPress={goToNextScreen}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>
                {isLastScreen ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
     
          </View>
        );
      };
    
      return (
        <View style={styles.container}>

          <View style={styles.topContainer}>
              <OnboardTop/>
          </View>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={16}
          >
        {screens.map((screen, index) => (
                    <View key={index} style={styles.screen}>
                    <OnboardScreenContent
                       number={screen.number}
                        title={screen.title}
                        content={screen.content}
                    />
                    </View>
          ))}
      </ScrollView>

          <View style={styles.bottomContainer}>
            <OnboardBottom />
          </View>
          <View style={styles.footer}>
            <DotIndicator 
              totalDots={screens.length} 
              currentIndex={currentScreen} 
            />
          
            {renderNavigationButtons()}
           
  
          </View>
  
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      screen: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'visible'
  
      },
      footer: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
   
        
      },
      navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      button: {
        padding: 15,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
      },
      primaryButton: {
        backgroundColor: '#0B243C', // Change to match your theme
        marginLeft: 'auto',
      },
      buttonText: {
        fontSize: 16,
        color: '#FEF8EC',
      },
      topContainer:{
          zIndex:-1,
          width:width, 
          height:height*0.20
      },
      bottomContainer:{
        width: width,
        zIndex:-1,
      },
      primaryButtonText: {
        color: '#FEF8EC',
      },
    //   title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    //   },
    //   content: {
    //     fontSize: 16,
    //     textAlign: 'center',
    //     paddingHorizontal: 20,
    //   },
    });

export default OnboardScreenLayout;