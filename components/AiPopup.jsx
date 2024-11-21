import React, { useState } from 'react';
import { Modal, View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import GradiBackground from './GradiBackground';

const AiPopup = ({ visible, onClose, text, onSubmit }) => {

    const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
    };


  return (
    <Modal visible={visible} transparent>
        <SafeAreaView style={{ backgroundColor: '#FEF8EC', }}>
                <View style={styles.aiQuestion}>
                    <Text style={{ fontFamily: 'bSemi'}}> Coping.ai</Text>
                </View>
        </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
    aiQuestion:{
        alignContent: 'center',
    },
})

export default AiPopup