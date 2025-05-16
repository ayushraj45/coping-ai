import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import HomepageTop from '../assets/icons/HomepageTop.svg';
import HomepageBot from '../assets/icons/HomepageBot.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import EntryChoice from '../components/EntryChoice';
import { router } from 'expo-router';
import preAiConvo from './preAiConvo';
import { useGlobalContext } from './context/GlobalProvider';
import SubscribePrompt from '../components/SubscribePrompt';
import MentalHealthScoreComponent from '../components/MentalHealthScoreComponent';
import DashboardComponent from '../components/DashboardComponent';

const { width, height } = Dimensions.get('screen');

const homepage2 = () => {
    const bottomSheetRef = useRef(null);
    const bottomSheetProRef = useRef(null);

    const [index, setIndex] = useState(-1);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const snapPoints = ['25%', '50%', '75%'];
    const [username, setUserName] = useState('');
    const [userId, setUserId] = useState();
    const {canMakeEntry, user, createEmotionalPlan, isSubscribed} = useGlobalContext();
    const [showSubsribeNotice, setShowSubscribeNotice ] = useState(false)
    const [allowEntry, setAllowEntry ] = useState(false)
    const [streak, setStreak] = useState(0);
    const [wordsWritten, setWordsWritten] = useState(0);
    const [entyLength, setEntryLength] = useState(0);
    const [currentPath, setCurrentPath] = useState("Start an assessment to get path");
    const [mhScore, setMhScore] = useState(0);
    const[lastId, setLastId] = useState(0);

    // callbacks
    // const handleSheetChanges = useCallback((index) => {
    //   console.log('handleSheetChanges', index);
    // }, []);

    useEffect(() => {
        if(user){
          setUserName(user.username)
          setUserId(user.id);
          setStreak(user.streak); 
          setWordsWritten(user.wordsWritten)
          const entriesLength = Array.isArray(user.entryIds) ? user.entryIds.length : 0;
          setEntryLength(entriesLength);
          setMhScore(user.currentDomainScore);
          
          if(user.currentEmotionPlan){
            setCurrentPath(user.currentEmotionPlan);
            const lastIdNow = user.emotionPlanIds[user.emotionPlanIds.length - 1];
            console.log(lastIdNow)
            setLastId(lastIdNow)
          }
        }
      }, [user]);



    const handleOpenSheet = useCallback( async () => {
        const allowEntry = await canMakeEntry();
        console.log('can make entry here: ',allowEntry)

        if(allowEntry){
           setTimeout(() => {
      bottomSheetRef?.current?.expand();
    }, 100);
            setAllowEntry(false);
        }
        else{
            setShowSubscribeNotice(true);
        }
      }, []);

      const handleOpenProSheet = useCallback( async () => {
        // const allowEntry = await canMakeEntry();
        // console.log('can make entry here: ',allowEntry)

        
           setTimeout(() => {
            bottomSheetProRef?.current?.expand();
    }, 100);
            setAllowEntry(false);
       
  
      }, []);


  
    // renders
    return (
      <GestureHandlerRootView style={styles.container}>
        <ScrollView>
        <View style={styles.main}>
            <SubscribePrompt visible={showSubsribeNotice} onClose={() => {setShowSubscribeNotice(false)}} text={"You have reached your weekly limit of free entries. Please subscribe to enjoy unlimited entries and more!"}/>
            {/* Header and Text */}
            <View style={styles.headerSection}>
                <Text style={styles.appName}>Coping.ai</Text>
                <Text style={styles.welcomeText}>Welcome Back,</Text>
                <Text style={styles.usernameText}>{username}</Text> 
            </View>
            <DashboardComponent
                streak={streak}
                words={wordsWritten}
                entries={entyLength}
            />
            {/* Start Assessment Button */}
            <TouchableOpacity onPress={() => {
                                router.push({
                                  pathname: `/assessmentScreen`,
                                  params: { id: userId }
                                })}} style={styles.startAssessmentBtn}>
                <Text style={styles.startAssessmentBtnText}>Start Assessment</Text>
            </TouchableOpacity>
            {/* Mental Health Score Section */}
            <MentalHealthScoreComponent
                score={mhScore} // Pass placeholder or actual score
                currentPath={currentPath} 
                lastPlanId={lastId}// Pass placeholder or actual path
            />
            {/* Buttons Section */}
            <View style={styles.buttonsSection}>
                <View style={styles.topButtonsRow}>
                    <TouchableOpacity onPress={() => {handleOpenSheet()}} style={styles.smallButton}>
                        <Ionicons name="pencil-outline" size={RFPercentage(3)} color="#011C2D" />
                        <Text style={styles.smallButtonText}>New Entry</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {router.push('/allEntries')}} style={styles.smallButton}>
                        <Ionicons name="book-outline" size={RFPercentage(3)} color="#011C2D" />
                        <Text style={styles.smallButtonText}>Past Entries</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomButtonsRow}>
                     <TouchableOpacity onPress={() => {router.push('/settings')}} style={styles.smallButton}>
                        <Ionicons name="settings-outline" size={RFPercentage(3)} color="#011C2D" />
                         <Text style={styles.smallButtonText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {router.push('/faqs')}} style={styles.smallButton}>
                        <Ionicons name="help-circle-outline" size={RFPercentage(3)} color="#011C2D" />
                         <Text style={styles.smallButtonText}>Help / FAQs</Text>
                    </TouchableOpacity>
                </View>
            </View>
             {/* Pro Features Button */}
            <TouchableOpacity onPress={() => {handleOpenProSheet()}} style={styles.proFeaturesBtn}>
                <Text style={styles.proFeaturesBtnText}>Pro Features</Text>
            </TouchableOpacity>
          
        </View>
        </ScrollView>
        {/* Bottom Sheet remains for the entry choices */}
        <BottomSheet
          ref={bottomSheetRef}
          index={index}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleStyle={styles.handleStyle}
        >
          <BottomSheetView style={styles.contentContainer}>
          {/* Assuming EntryChoice component is correctly implemented */}
          <EntryChoice number={1} title={'Mood'} content={'Start with how you are feeling'} color={'#FFD788'}/>
          <EntryChoice number={2} title={'Event'} content={'Something on your mind? Share away'} color={'#FF8C88'}/>
          <EntryChoice number={3} title={'Explore'} content={'Choose a theme and explore your thoughts with Instant Prompts'} color={'#BBD8FF'}/>
          <EntryChoice number={4} title={'Today'} content={'Plan, reflect or vent (and more) about your day'} color={'#FFB778'}/>
          </BottomSheetView>
        </BottomSheet>

        <BottomSheet
          ref={bottomSheetProRef}
          index={index}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleStyle={styles.handleStyle}
        >
          <BottomSheetView style={styles.contentContainer}>
          {/* Assuming EntryChoice component is correctly implemented */}
          <EntryChoice number={5} title={'New Path'} content={'Start a new 14 Days Path Program'} color={'#FFD788'}/>
          <EntryChoice number={6} title={'AI Entry'} content={'Convert your answers to an AI journal Entry'} color={'#FF8C88'}/>
          <EntryChoice number={7} title={'All Paths'} content={'See your previous path programs'} color={'#BBD8FF'}/>
          <EntryChoice number={8} title={'Scores'} content={'See your past assessments and their scores'} color={'#FFB778'}/>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    handleStyle:{
        backgroundColor: "#ECE0C8", // Color from original styles
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    contentContainer: {
      flex: 1,
      padding: width * 0.05, // Dynamic padding
      alignItems: 'center',
      backgroundColor: "#ECE0C8", // Color from original styles
    },
    main: {
        flex: 1,
        backgroundColor: "#FEF8EC", // Color from original styles
        alignItems:'center',
        paddingTop: height * 0.05, // Dynamic padding top
        paddingBottom: height * 0.02, // Dynamic padding bottom to leave space for bottom sheet handle if visible
        justifyContent: 'space-between', // Distribute space between sections
       },
       headerSection: {
        alignItems: 'center',
        marginBottom: height * 0.02, // Dynamic margin below header
       },
       appName: {
        fontSize: RFPercentage(3.5),
        fontFamily: 'bSemi',
        color: '#011C2D',
       },
       welcomeText: {
        fontSize: RFPercentage(2.5),
        fontFamily: 'bSemi',
        color: '#011C2D',
        marginTop: height * 0.01,
       },
       usernameText: {
        fontSize: RFPercentage(3.3),
        fontFamily: 'bSemi',
        color: '#011C2D',
       },
       startAssessmentBtn:{
         backgroundColor:'#011C2D', // Color from original styles
         paddingVertical: height * 0.02, // Dynamic vertical padding
         paddingHorizontal: width * 0.1, // Dynamic horizontal padding
         borderRadius: 14,
         marginVertical: height * 0.02, // Dynamic vertical margin
         width: '80%', // Make button wider
         alignSelf: 'center',
         alignItems: 'center',
       },
       startAssessmentBtnText:{
         fontSize: RFPercentage(2.7),
         fontFamily:'bSemi',
         color:'#FEF8EC', // Color from original styles
         textAlign:'center',
       },
       buttonsSection: {
        width: '90%', // Control the width of the button section
        marginVertical: height * 0.02, // Dynamic vertical margin
       },
       topButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Distribute space between buttons
        marginBottom: height * 0.015, // Dynamic margin between rows
       },
       bottomButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Distribute space between buttons
       },
       smallButton:{        
         backgroundColor:'#FFEECD', // Color from original styles
         borderWidth:2,
         borderColor: '#011C2D', // Border color from original styles
         borderRadius:10,
         paddingVertical: height * 0.015, // Dynamic padding
         paddingHorizontal: width * 0.03, // Dynamic padding
         alignItems: 'center',
         width: '45%', // Make buttons take up roughly half the width
       },
       smallButtonText: {
         fontSize: RFPercentage(1.8),
         fontFamily: 'bSemi',
         color: '#011C2D',
         marginTop: height * 0.005,
         textAlign: 'center',
       },
        proFeaturesBtn:{
         backgroundColor:'#011C2D', // Color from original styles
         paddingVertical: height * 0.02, // Dynamic vertical padding
         paddingHorizontal: width * 0.1, // Dynamic horizontal padding
         borderRadius: 14,
         marginVertical: height * 0.02, // Dynamic vertical margin
         width: '80%', // Make button wider
         alignSelf: 'center',
         alignItems: 'center',
       },
       proFeaturesBtnText:{
         fontSize: RFPercentage(2.7),
         fontFamily:'bSemi',
         color:'#FEF8EC', // Color from original styles
         textAlign:'center',
       },

  });


export default homepage2;