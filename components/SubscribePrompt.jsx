import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { router } from 'expo-router'

const SubscribePrompt = ({ visible , onClose, text }) => {

    const redirectToSubscribe = () => {
       
    }

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
        <View>
            <Text style={{fontSize: RFPercentage(3)}} className="font-cMedium">Subscribe To Continue
            </Text>
        </View>
        <View style={{paddingVertical:10, paddingBottom:20}}>
            <Text style={{fontSize: RFPercentage(1.7)}} className="font-cMedium">{text}</Text>
        </View>
        <TouchableOpacity onPress={() => { router.push({pathname: `/subscribe`})}}>
        <View style={styles.subscribeButton}>
        <Text style={{fontSize: RFPercentage(2.7)}} className="font-cMedium text-slate-100">Remove all limits</Text>
        </View>
        </TouchableOpacity>
        
            </View>
        </View>
    </Modal>
  )
}

export default SubscribePrompt

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "#FEF8EC",
        borderRadius: 20,
        borderWidth:4,
        borderColor: "#035081",
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
        elevation: 5
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
      subscribeButton: {
        backgroundColor:"#01588F",
        paddingHorizontal:50,
        paddingVertical:7,
        borderRadius: 20,
        alignContent:'center'
      }
})