import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MoodSvg from '../assets/icons/MoodSvg.svg';
import Event from '../assets/icons/Event.svg';
import Today from '../assets/icons/Today.svg';
import Explore from '../assets/icons/Explore.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';

const EntryChoice = ({number, title, content, color}) => {

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
  return (
    <View style={[{backgroundColor:color}, styles.bigbtncontainer]}>
    <View style={styles.leftContent}>
        <Text style={{fontSize: RFPercentage(4), fontFamily: 'bSemi'}}>{title}</Text>
        <Text style={{fontSize: RFPercentage(1.6), fontFamily: 'cLight'}}>{content}</Text>
    </View>
    <View style={styles.rightContent}>
    {handleSVGImage(number)}
    </View>
  </View>
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