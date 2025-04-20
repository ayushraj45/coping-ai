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

const { width, height } = Dimensions.get('screen');

const homepage2 = () => {
    const bottomSheetRef = useRef(null);
    const [index, setIndex] = useState(-1);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const snapPoints = ['25%', '50%', '75%'];
    const [username, setUserName] = useState('');
    const {canMakeEntry, user} = useGlobalContext();
    const [showSubsribeNotice, setShowSubscribeNotice ] = useState(false)
    const [allowEntry, setAllowEntry ] = useState(false)


    // callbacks
    // const handleSheetChanges = useCallback((index) => {
    //   console.log('handleSheetChanges', index);
    // }, []);

    useEffect(() => {
        if(user){
          setUserName(user.username)
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
  
    // renders
    return (
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.main}>
        <SubscribePrompt visible={showSubsribeNotice} onClose={() => {setShowSubscribeNotice(false)}} text={"You have reached your weekly limit of free entries. Please subscribe to enjoy unlimited entries and more!"}/>
{/* android change */}
          <View style={styles.topGraphic}>
            <HomepageTop width={width} height={height * 0.20} />
          </View>
          <View style={styles.midSection}>
            <View style={{alignSelf:'center'}}>
                <Text style={{fontSize: RFPercentage(3.3), fontFamily:'bSemi'}}>Hello, {username}</Text>
            </View>
            <TouchableOpacity onPress={handleOpenSheet}>
                <View style={styles.promptBtn}> 
                    <Text style={{fontSize: RFPercentage(2.7), fontFamily:'bSemi', color:'#FEF8EC', textAlign:'center'}}>Get a prompt</Text>
                </View>
            </TouchableOpacity>
           
            <View style={styles.btnContainers}> 
                <TouchableOpacity onPress={() => {router.push('/allEntries')}}>  
                    <View style={styles.button}>
                        <Ionicons name="book-outline" size={30} color="#011C2D" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.push('/settings')}}>  
                    <View style={styles.button}>
                        <Ionicons name="settings-outline" size={30} color="#011C2D" />
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity onPress={() => {router.push('/faqs')}}>  
                    <View style={styles.button}>
                        <Ionicons name="help-circle-outline" size={30} color="#011C2D" />
                    </View>
                </TouchableOpacity>    
            </View>
          </View>
          <View style={styles.botGraphic}>
            <HomepageBot width={width} height={height*0.705} />
          </View>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={index}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          handleStyle={styles.handleStyle}
        >
          <BottomSheetView style={styles.contentContainer}>
          <EntryChoice number={1} title={'Mood'} content={'Start with how you are feeling'} color={'#FFD788'}/>
          <EntryChoice number={2} title={'Event'} content={'Something on your mind? Share away'} color={'#FF8C88'}/>
          <EntryChoice number={3} title={'Explore'} content={'Choose a theme and explore your thoughts with Instant Prompts'} color={'#BBD8FF'}/>
          <EntryChoice number={4} title={'Today'} content={'Plan, reflect or vent (and more) about your day'} color={'#FFB778'}/>

          {/* <ScrollView>
                    <EntryChoice number={1} title={'Mood'} content={'Start with how you are feeling'} color={'#FFD788'}/>
                </ScrollView>               */}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent:'center'
    },
    handleStyle:{
        backgroundColor: "#ECE0C8",
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: "#ECE0C8",
    },
    main: {
        flex: 1,
        height: height,
        backgroundColor: "#FEF8EC",
        justifyContent: 'space-between',
        alignItems:'center',
       },
       topGraphic: {
        flex: 1,
        alignSelf: 'flex-start'
       },
       botGraphic: {
         flex: 1,
         alignSelf: 'flex-end',
       },
       promptBtn:{
         backgroundColor:'#011C2D',
         padding:9,
         paddingHorizontal:30,
         borderRadius: 14,
         margin:6,
         marginBottom:15,
       },
       btnContainers:{
         flexDirection:'row',
         justifyContent:'space-around'
       },
       button:{
         backgroundColor:'#FFEECD',
         borderWidth:2,
         borderRadius:10,
         padding:5,
 
       }
  });

export default homepage2;