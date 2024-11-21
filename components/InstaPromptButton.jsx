import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';

const InstaPromptButton = ({text, color, prompt, onPress, isSelected, isDisabled}) => {
    return (
  <TouchableOpacity 
        style={[
          styles.box, 
          { backgroundColor: color },
          isSelected && styles.selected,
          isDisabled && styles.disabled
        ]}
        onPress={onPress}
        activeOpacity={0.7}
        //disabled={isDisabled}
      >
        <Text style={[styles.text, isDisabled && styles.disabledText, {fontSize: RFPercentage(1.5)}]}>{text}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    box: {
      padding: RFPercentage(1),
      borderRadius: 20,
      marginHorizontal: 10,
      marginVertical: RFPercentage(0.5),
      width: RFPercentage(21),
      minWidth:100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
    },
    selected: {
      borderWidth: 2,
      borderColor: 'black',
    },
    disabled: {
      opacity: 0.5,
    },
    disabledText: {
      color: 'gray',
    },
  });
export default InstaPromptButton