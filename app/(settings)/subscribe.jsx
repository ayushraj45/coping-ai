import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import GradiBackground from '../../components/GradiBackground'
import { RFPercentage } from 'react-native-responsive-fontsize'
import IndexLogo from '../../assets/icons/IndexLogo'
import PricingPanel from '../../components/PricingPanel'



const subscribe = () => {

  return (
    
      <View style={styles.container}>
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
   
  )
}

export default subscribe;

const styles = StyleSheet.create({
  container:{
    flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: '#FEF8EC',
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

