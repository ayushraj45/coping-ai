import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SmallLogo from '../assets/icons/SmallLogo';

const QPopUp = ({ visible, questions , onClose }) => {

  const Message = ({ text, type }) => {
    const isSystem = text.startsWith("system:");
    const isUser = text.startsWith("User:");
    const isCoping = text.startsWith("Coping:");
  
    if (isSystem) return null; // We don't display system messages
  
    const getMessage = () => {
      if (isUser) {
        return text.split(":")[1].trim();
      } else if (isCoping) {
        const [, ...rest] = text.split(":");
        return rest.join(":").trim();
      } else {
        return text;
      }
    };
  
    return (
      <View style={[styles.messageContainer, type === 'user' ? styles.userMessageContainer : styles.copingMessageContainer]}>
        {type !== 'user' && <SmallLogo style={styles.logo} />}
        <View style={[styles.message, type === 'user' ? styles.userMessage : styles.copingMessage]}>
          <Text style={styles.messageText}>
            {getMessage()}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <ScrollView style={styles.conversationContainer} contentContainerStyle={{
            paddingBottom: 130,
          }}>
            {questions.map((text, index) => (
              <Message 
                key={index} 
                text={text} 
                type={text.startsWith("User:") ? 'user' : 'coping'} 
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,


  },
  modalView: {
    margin: 20,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    padding: 35,
    minWidth:'80%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  conversationContainer: {
    width: '100%',
    height: '100%',
   
  },
  message: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
   
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#ECECEC',
  },
  copingMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#83CFFF',
  },
  messageText: {
    fontSize: 16,
  },
  logo: {
    marginRight: 8,
    marginTop:8,
    width: 30,
    height: 30,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  copingMessageContainer: {
    justifyContent: 'flex-start',
  },
})

export default QPopUp
