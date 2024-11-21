import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AuthBG1 from '../../assets/icons/AuthBG1.svg'

import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ScrollView } from 'react-native'
import { router } from 'expo-router'

const login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)  

    const { width , height } = Dimensions.get('window');

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
        >
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
            <View style={styles.backgroundContainer}>
                <AuthBG1 width={width} height={height}/>
            </View>
                <View style={styles.contentContainer}>
                    <View style={styles.formSection}>
                        <Text style={styles.headerText}>
                            Login
                        </Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.labelText}>
                                    Email
                                </Text>
                                <TextInput 
                                    style={styles.input}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.labelText} className="font-cLight">
                                    Password
                                </Text>
                                <TextInput 
                                    style={styles.input}
                                    secureTextEntry={true}
                                    onChangeText={(text) => setPassword(text)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => router.push("/forgetPassword")}>
                                <Text style={[ {fontSize: RFPercentage(2), fontWeight: 'bold', paddingVertical:20, fontFamily:'cLight'}]} >
                                    Forgot password?
                                </Text>
                            </TouchableOpacity>
                        
                        </View>
                    </View>

                    <View style={styles.bottomSection}>
                        <View style={styles.buttonsOverlay}>
                            <View style={styles.loginLink}>
                            <Text style={styles.loginLinkText}>
                                New here?
                            </Text>
                            <TouchableOpacity onPress={() => router.replace("/register")}>
                                <Text style={styles.loginText}>
                                {" "}Register
                                </Text>
                            </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                style={styles.registerButton}
                                // onPress={signUp}
                                >
                                <Text style={styles.registerButtonText}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>    
                    </View>    
                
            </ScrollView>
          </TouchableWithoutFeedback>  
        </KeyboardAvoidingView>
  )
}

export default login;

const { width , height } = Dimensions.get('window');

const styles = StyleSheet.create({

    
    container: {
        flex: 1,
        backgroundColor: '#FEF8EC',
      },
      backgroundContainer: {
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 1,
      },
      contentContainer: {
        flex: 1,
        zIndex: 1,
        //alignContent:'center',
      },
      
      scrollContent: {
        flexGrow: 1,
        minHeight: '100%',
        justifyContent: 'space-between',
      },
      
      formSection: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: width*0.02, // Adjust this value to shift the form up or down if needed
        gap:20,
    },
      
      bottomSection: {
        marginTop: 'auto',
        alignItems: 'baseline',
         // Pushes section to bottom
       // height: Dimensions.get('window').height * 0.26,
      },

      headerText: {
        fontSize: RFPercentage(3.5),
        marginBottom: RFPercentage(2.5),
        fontFamily: 'bSemi',
      },
      
      inputGroup: {
        gap: 25,
      },
      
      inputContainer: {
        gap: 5,
      },
      
      labelText: {
        fontSize: RFPercentage(1.5),
        fontFamily:'cLight'
      },
      
      input: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4FC4E7',
        height: 35,
        paddingHorizontal: 10,
      },
      

      
      buttonsOverlay: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 50 : 25,
        left: 20,
        right: 20,
        flexDirection: 'row',
        
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
      },
      
      loginLink: {
        flexDirection: 'row',
        alignItems: 'baseline',
      },
      
      loginLinkText: {
        color: '#E2E9E2',
        marginTop:'15',
        alignItems: 'baseline',
        fontSize: RFPercentage(1.7),
        fontFamily:'cLight'

      },
      
      loginText: {
        color: '#E2E9E2',
        fontSize: RFPercentage(2),
        
        fontFamily:'cMedium',
        fontWeight: 'bold',
      },
      
      registerButton: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E2E9E2',
        paddingHorizontal: 20,
        paddingVertical: 12,
      },
      
      registerButtonText: {
        fontSize: RFPercentage(2.3),
        fontFamily: 'bSemi',
        color:'#E2E9E2'
      },
})