import { Dimensions, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import ProfileLogo from '../../assets/icons/ProfileLogo';
import OBScreen2 from '../../assets/icons/OBScreen2.svg';
import OBScreen3 from '../../assets/icons/OBScreen3.svg';
import OBScreen4 from '../../assets/icons/OBScreen4.svg';

const OnboardScreenContent = ({ number, title, content, multiOptions, onAction, selectedOptions,toggleOption }) => {
  const { width , height } = Dimensions.get('window');

  const handleSVGImage = (num) => {
    switch(num) {
      case 1:
        return <ProfileLogo />;
      case 2:
        return <View style={{paddingBottom:RFPercentage(30)}}/>
      case 3:
        //
        return <View style={{paddingBottom:RFPercentage(20)}}/>

      case 4:
        return <OBScreen3 width={width * 0.68} height={height*0.28}/>       
      case 5:
        return <OBScreen2 width={width * 0.68} height={height*0.28}/>  
      default:
        return null;
    }
  };

  return (
    <View style={styles.screenContent}>
      <View style={styles.imageContainer}>
        {handleSVGImage(number)}
      </View>

      <Text style={{
        fontSize: RFPercentage(3.5),
        paddingHorizontal: 20,
        textAlign: 'center',
        fontFamily: 'bSemi'
      }} className="font-bSemi">{title}</Text>

      <View style={styles.content}>
        <Text style={{
          fontSize: RFPercentage(2.5),
          textAlign: 'center',
          fontFamily: 'cMedium'
        }} className="font-cMedium">{content}</Text>

        {multiOptions && (
          <FlatList
            data={multiOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => toggleOption(item)}
              style={[
                styles.optionButton,
                selectedOptions?.includes(item) && { backgroundColor: '#0B243C' }
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOptions?.includes(item) && { color: '#FEF8EC' }
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
            )}
            style={{ marginTop: 20 }}
          />
        )}

        {onAction && !multiOptions && (
          <TouchableOpacity onPress={onAction} style={styles.actionButton}>
            <Text style={styles.actionText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OnboardScreenContent;

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 6,
    alignSelf: 'stretch',
  },
  optionText: {
    textAlign: 'center',
    fontSize: RFPercentage(2.2),
    fontFamily: 'cMedium'
  },
  actionButton: {
    backgroundColor: '#0B243C',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  actionText: {
    color: '#FEF8EC',
    fontSize: RFPercentage(2.2),
    textAlign: 'center',
    fontFamily: 'cMedium'
  }
});
