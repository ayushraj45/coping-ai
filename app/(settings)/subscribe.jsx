import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GradiBackground from '../../components/GradiBackground'
import { RFPercentage } from 'react-native-responsive-fontsize'
import IndexLogo from '../../assets/icons/IndexLogo'
import PricingPanel from '../../components/PricingPanel'
import Purchases, { LOG_LEVEL, PurchasesOffering } from 'react-native-purchases';
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'



const subscribe = () => {

  return (
    <SafeAreaView style={styles.container}>

    
      <View style={styles.container}>
                  <TouchableOpacity onPress={()=> {router.back()}} style={{alignSelf:'flex-start'}}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={{fontSize: RFPercentage(4), fontFamily:'bSemi'}}> Get Coping Pro</Text>
        </View>
        <View style={styles.subHeaderText}>
          <Text style={{fontSize: RFPercentage(1.7), fontFamily:'cMedium'}}> Get the full Coping Experience, unlimited 
            entries, increase max questions and more!</Text>
        </View>
        <View style={styles.logoCont}>
          <IndexLogo width={185} height={185} />
        </View>
        <PricingPanel/>       
      </View>
    </SafeAreaView>
  )
}

export default subscribe;

const styles = StyleSheet.create({
  container:{
    flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: '#FEF8EC',
     paddingTop: Platform.OS === 'android' ? 10 : 0
  },
  headerText:{
    alignItems: "center",
  },
  subHeaderText:{
    alignItems: "center",
    marginHorizontal:50,
    paddingBottom:15,
  },
  logoCont:{
    marginVertical:15,
  }

})