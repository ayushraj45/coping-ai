import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import ProfileLogo from '../../assets/icons/ProfileLogo';
import OBScreen2 from '../../assets/icons/OBScreen2.svg';
import OBScreen3 from '../../assets/icons/OBScreen3.svg';
import OBScreen4 from '../../assets/icons/OBScreen4.svg';



const OnboardScreenContent = ({number,  title, content }) => {


  const { width , height } = Dimensions.get('window');


    const handleSVGImage = (num) => {
        switch(num) {
            case 1:
                return <ProfileLogo />;
            case 2:
                return <OBScreen2 width={width * 0.68} height={height*0.28}/>
            case 3:
                return <OBScreen3 width={width * 0.68} height={height*0.28}/>
            case 4:
                return <OBScreen4 width={width * 0.68} height={height*0.28}/>            
            default:
                return null; // Always good to have a default case
        }
    };

    return (
      <View style={styles.screenContent}>
        <View style={styles.imageContainer}>
      {handleSVGImage(number)}
        </View>
        <Text style={{fontSize: RFPercentage(3.5), paddingHorizontal:20, textAlign:'center', fontFamily:'bSemi'}} className="font-bSemi">{title}</Text>
       <View style={styles.content}>
            <Text style={{fontSize: RFPercentage(2.5), textAlign:'center', fontFamily:'cMedium'}} className="font-cMedium">{content}</Text>
       </View>
      </View>
    );
  };
export default OnboardScreenContent;

const styles = StyleSheet.create({
    screenContent:{
        flex:1,
        justifyContent:'center'
    },
    imageContainer:{
        alignItems:'center',
    }, 
    content:{
        marginTop:10,
        paddingHorizontal:20,
        alignItems:'center',
        textAlign:'center',
    }
})