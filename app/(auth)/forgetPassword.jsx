import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AuthBG1 from '../../assets/icons/AuthBG1.svg'
import AuthBackground from '../../assets/icons/AuthBackground.svg'
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ScrollView } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar';

const login = () => {

    const [email, setEmail] = useState('')
    const [buttonText, setButtonText] = useState('')
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
      
    const forgotPassword = async (email) => {
        auth().sendPasswordResetEmail(email)
        .then(() => {
            console.log('password reset email sent ');
            setButtonText("Reset email sent to " + email);
        })
        .catch(error => {
  
            if (error.code === 'auth/invalid-email') {
                setErrorMessage('That email address is invalid!');
            }
            if (error.code === 'auth/user-not-found') {
                setErrorMessage('User not found! Please register to get started!');
            }
            console.error(error);
        });
    }

    const { width , height } = Dimensions.get('screen');

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // Set keyboard visibility to True when keyboard is visible
        }
      );
  
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false);  // Set keyboard visibility to False when keyboard is not visible
        }
      );
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  
  
    const renderBackground = () => {
      if (isKeyboardVisible) {
        return <AuthBackground width={width} height={height} />;  // Render a different background
      } else {
        return <AuthBG1 width={width} height={height} />; // Original background
      }
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -10 : 0}
        >
          <StatusBar style="light" translucent={true} backgroundColor="transparent" /> 
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
            <View style={styles.backgroundContainer}>
               {renderBackground()}
            </View>
                <View style={styles.contentContainer}>
                    <View style={styles.formSection}>
                        <Text style={styles.headerText}>
                            Reset Password
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

                            <View style={styles.inputter}>
                                {buttonText? <Text style={{fontSize: RFPercentage(2), textAlign:'center', textAlignVertical:'center'}} className="font-cLight">{buttonText}</Text> : 
                                    <TouchableOpacity onPress={()=>forgotPassword(email)}>
                                        <Text style={{fontSize: RFPercentage(2), textAlign:'center', textAlignVertical:'center'}} className="font-cLight">Send password reset link</Text>
                                    </TouchableOpacity>
                                    }
                            </View>
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
                                onPress={() => router.replace("/login")}
                                >
                                <Text style={styles.registerButtonText}>
                                    Back to Login
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
        color: '#0A0A0A',
        marginTop:'15',
        alignItems: 'baseline',
        fontSize: RFPercentage(1.7),
        fontFamily:'cLight'

      },
      
      loginText: {
        color: '#0A0A0A',
        fontSize: RFPercentage(2),
        
        fontFamily:'cMedium',
        fontWeight: 'bold',
      },
      
      registerButton: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0A0A0A',
        paddingHorizontal: 20,
        paddingVertical: 12,
      },
      
      registerButtonText: {
        fontSize: RFPercentage(2.3),
        fontFamily: 'bSemi',
        color:'#0A0A0A'
      },
})