import { Dimensions, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AuthBackground from '../../assets/icons/AuthBackground.svg'
import AuthBG1 from '../../assets/icons/AuthBG1.svg'
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ScrollView } from 'react-native'
import { router } from 'expo-router'
import { useGlobalContext } from '../context/GlobalProvider';
import { StatusBar } from 'expo-status-bar';

const register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)  
    const {login, API_URL, expoPushToken} = useGlobalContext();
    const [errorMessage, setErrorMessage] = useState(null)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const { width , height } = Dimensions.get('screen');

    const signUp = async () => {
        setLoading(true)
        try {
            const response = await auth()
            .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    console.log('User account created & signed in! ');
                    loginSQL ();
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        setErrorMessage('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        setErrorMessage('That email address is invalid!');
                    }
                    if (error.code === 'auth/user-not-found') {
                        setErrorMessage('User not found! Please register to get started!');
                    }
                    if (error.code === 'auth/weak-password') {
                      setErrorMessage('Weak password! Please use at least 6 digits');
                  }
                    console.error(error);
                });
                console.log('create acc success '+ response);
                
        
    } catch (error) {
        console.log('Error at our backend server aAuth; '+error)
      }
}

    const loginSQL = async () => {
        const tokenId = await auth().currentUser.getIdToken();
        console.log('the token id is' + tokenId)               
        const createdUser = await createUser(tokenId, email, username, expoPushToken);
        console.log('sql user ' + JSON.stringify(createdUser) );
       
        if(createdUser){
            try{
                setLoading(false)
                 login(createdUser)
          router.push({
            pathname: `/OnboardScreenLayout`
          });
            } catch(error) {
                console.log('Error at our backend server aAuth; '+error)
            }
        }     
                     
    }

    const createUserJustInSql = async (firebaseUID, email, username, expoPushToken) => {


      const updatedUserData = {
        "username": username,
        "maxQuestions": 5,
        "email": email,
        "firebaseToken": expoPushToken,
        "subscriptionStatus": "free"
      } 

      try {
        const response = await fetch(API_URL + "users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(updatedUserData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log("user registered from backend:", data);
          return data;
        } else {
          const errorMessage = await response.text();
          console.error("Error from backend:", errorMessage);
        }
      }catch (error) {
        console.error("Error sending token to sql backend:", error);
      }
    }

const createUser = async (firebaseUID, email, username, expoPushToken) => {

    const updatedUserData = {
      "username": username,
      "maxQuestions": 5,
      "email": email,
      "firebaseToken": expoPushToken,
      "subscriptionStatus": "free"
    } 


    console.log('here:',JSON.stringify(updatedUserData))
    console.log('here is the UID :',firebaseUID)

    console.log('here is the API IRL : ', API_URL)
    try {
      console.log("Making fetch request with:");
      console.log("URL:", API_URL + "firebase/register");
      console.log("Headers:", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firebaseUID}`, // Send token in Authorization header
      });
      console.log("Body:", JSON.stringify(updatedUserData));
    
      const response = await fetch(API_URL + "firebase/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${firebaseUID}`, // Send token in Authorization header
        },
        body: JSON.stringify(updatedUserData),
      });
    
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
            if (response.ok) {
          const data = await response.json();
          console.log("user registered from backend:", data);
          return data;
        } else {
          const errorMessage = await response.text();
          console.error("Error from backend:", errorMessage);
        }
      } catch (error) {
        console.error("Error sending token to fireabse backend:", error);
      }
  };

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
                            Register
                        </Text>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.labelText}>
                                    Username
                                </Text>
                                <TextInput 
                                    style={styles.input}
                                    onChangeText={(text) => setUsername(text)}
                                />
                                </View>
                        
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
                                <Text style={{fontSize: RFPercentage(1), fontFamily:'cLight', color:'red'}} >
                                    {errorMessage}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.bottomSection}>
                        <View style={styles.buttonsOverlay}>
                            <View style={styles.loginLink}>
                            <Text style={styles.loginLinkText}>
                                Already a Member?
                            </Text>
                            <TouchableOpacity onPress={() => router.replace("/login")}>
                                <Text style={styles.loginText}>
                                {" "}Login
                                </Text>
                            </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                style={styles.registerButton}
                                onPress={signUp}
                                >
                                <Text style={styles.registerButtonText}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>    
                    </View>    
                </View>
            </ScrollView>
          </TouchableWithoutFeedback>  
        </KeyboardAvoidingView>
  )
}

export default register;

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
        gap:10,
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
        gap: 15,
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