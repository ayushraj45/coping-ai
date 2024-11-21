import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import React from 'react'

const EmotionButton = ({text, color, prompt, onPress, isSelected, isDisabled}) => {
  return (
    <TouchableOpacity   
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[
        styles.box, 
        { backgroundColor: color },
        isSelected && styles.selected,
        isDisabled && styles.disabled
      ]}>
        <Text style={[styles.text, isDisabled && styles.disabledText, {fontSize: RFPercentage(1.5)}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: RFPercentage(1),
    minWidth: 100,
    borderRadius: 20,
    marginHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: RFPercentage(0.5),

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

export default EmotionButton
