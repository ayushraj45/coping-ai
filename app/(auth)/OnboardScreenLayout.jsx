// OnboardScreenLayout.js
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
import { RFPercentage } from 'react-native-responsive-fontsize';
import OnboardScreenContent from './OnboardScreenContent';
import { useRouter } from 'expo-router';

const { width , height } = Dimensions.get('window');

const OnboardScreenLayout = ({ navigation, onStartAssessment, onStartJournal }) => {
    const [currentScreen, setCurrentScreen] = useState(0);
    const scrollViewRef = useRef(null);
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (option) => {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    };

    const screens = [
      {
        number: 1,
        title: 'Welcome to Coping.ai',
        content: "Your Personal Companion to\nCope, Explore and Improve your mental health.",
      },
      {
        number: 2,
        title: "What is most affecting your mental health?",
        content: "Select all that apply.",
        multiOptions: ["Stress", "Relationships", "Lack of purpose", "Sleep issues", "Self-doubt", "Other"]
      },
      {
        number: 3,
        title: "What will you use Coping for?",
        content: "Select all that apply.",
        multiOptions: ["Let it write for me", "Get my emotional state score", "Start a 14-day guided plan", "Have private, insightful conversations", "Explore gratitude, love etc", "Make a habit of journaling", "Other"]
      },
      {
        number: 4,
        title: "AI that Reflects with You",
        content: "Have a conversation and let Coping.AI turn it into your journal entry.\n\nGet a personalised 14-day plan based on your Emotional State Assessment.",
      },
      {
        number: 5,
        title: "Let us get started",
        content: "Take your mental health score or start journaling now.\n\n Click on 'Start Asessment' or\n 'New Entry' to begin!",
        action: true
      }
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
        router.replace('/homepage2');
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
            {/* <OnboardTop/> */}
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
                multiOptions={screen.multiOptions}
                selectedOptions={selectedOptions}
                toggleOption={toggleOption}
                onAction={screen.action ? (screen.number === 4 ? onStartAssessment : null) : null}
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomContainer}>
          <OnboardBottom />
        </View>

        <View style={styles.footer}>
          <DotIndicator totalDots={screens.length} currentIndex={currentScreen} />
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
    backgroundColor: '#0B243C',
    marginLeft: 'auto',
  },
  buttonText: {
    fontSize: 16,
    color: '#FEF8EC',
  },
  topContainer:{
    zIndex:-1,
    width:width, 
    height:height*0.05
  },
  bottomContainer:{
    width: width,
    zIndex:-1,
  },
  primaryButtonText: {
    color: '#FEF8EC',
  },
});

export default OnboardScreenLayout;
