import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MoodSvg from '../assets/icons/MoodSvg.svg';
import Event from '../assets/icons/Event.svg';
import Today from '../assets/icons/Today.svg';
import Explore from '../assets/icons/Explore.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { router } from 'expo-router';

const EntryChoice = ({number, title, content, color}) => {

    const [titleNext, setTitleNext] = useState(''); 
    const [numberNext, setNumberNext] = useState(number);

    const setTheTitle = (number) => {
    switch(number){
        case 1: setTitleNext('Choose a feeling or type anything'); 
        case 2: setTitleNext('Whatever is on your mind!');
        case 3: setTitleNext('Choose a theme and start with a prompt instantly!'); 
        case 4: setTitleNext('Get more in touch with your thoughts through the day'); 
    }}

  const handleSVGImage = (num) => {
    switch(num) {
        case 1:         
            return <MoodSvg width={'105%'} height={'100%'}/>;
        case 2:      
            return <Event width={'90%'} height={'100%'}/>
        case 3:      
            return <Explore width={'100%'} height={'100%'}/>
        case 4:
            return <Today width={'100%'} height={'100%'}/>       
        default:
            return null; // Always good to have a default case
    }
  };

  const handleChoicePress = () => {
    setTheTitle
    console.log(titleNext,numberNext );
    router.push({
        pathname:'/preAiConvo',
        params: { id: numberNext ,title: titleNext}
  })}


  return (
    <TouchableOpacity onPress={handleChoicePress}>
    <View style={[{backgroundColor:color}, styles.bigbtncontainer]}>
    <View style={styles.leftContent}>
        <Text style={{fontSize: RFPercentage(4), fontFamily: 'bSemi'}}>{title}</Text>
        <Text style={{fontSize: RFPercentage(1.6), fontFamily: 'cLight'}}>{content}</Text>
    </View>
    <View style={styles.rightContent}>
    {handleSVGImage(number)}
    </View>
  </View>
    </TouchableOpacity>
  )
}

export default EntryChoice

const styles = StyleSheet.create({
    bigbtncontainer:{
        width:RFPercentage(43),
        height:RFPercentage(17.5),
        alignSelf:'center',
        borderRadius:14,
        flexDirection: 'row',
        marginHorizontal:10,
        shadowOffset: {
            width:0,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 9,
        marginBottom:20,
    },
    leftContent:{
        width:'50%',
        paddingLeft:RFPercentage(2.6),
        alignItems:'left',
        justifyContent: 'center'
    },
    rightContent:{
        width:'49%',
        alignItems: 'center',
        paddingRight:10
    },
})