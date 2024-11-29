import { Link, router } from "expo-router";
import { Alert, SafeAreaView, Text } from "react-native";
import auth from '@react-native-firebase/auth';
import { useGlobalContext } from "./context/GlobalProvider";
import RotatingLogoLoader from "../components/RotatingLogoLoader";
import { useEffect } from "react";
import messaging from '@react-native-firebase/messaging';

export default function Index() {

 
    const {user, initializing, isLoading, expoPushToken, notification, error} = useGlobalContext();



    useEffect(() => {
        console.log('token from expo: ' + expoPushToken);
        if(notification){console.log('notif received: ', notification)}
        console.log('user here at the first page ' + JSON.stringify(user))
        if (initializing) return; // Wait for Firebase initialization
        if (user) {
          
          router.replace("/homepage");
        } else {
            router.replace("/getStarted");
        }
      }, [user, initializing]);

    //   useEffect(() => {
    //     // Get token
    //     messaging().getToken().then((token) => {
    //         console.log('token for notification: ' + token)
    //     });
    
    //     // Request permission and get token
    //     if(requestUserPermission()){
    //         messaging().getToken().then((token) => {
    //             console.log('token for notification: ' + token);
    //         })
    //     } else {
    //         console.log('permission not granted: ' + authStatus);
    //     }
    
    //     // Handle initial notification
    //     messaging().getInitialNotification().then(async (remoteMessage) => {
    //         if(remoteMessage) {
    //             console.log('app opened ' + remoteMessage.notification)
    //         }
    //     });
    
    //     // Correct way to use onNotificationOpenedApp
    //     messaging().onNotificationOpenedApp((remoteMessage) => {
    //         if(remoteMessage) {
    //             console.log('app opened from background state ' + remoteMessage.notification)
    //         }
    //     });
    
    //     // Correct way to set background message handler
    //     messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //         if(remoteMessage) {
    //             console.log('message handled in the background from background state ' + remoteMessage)
    //         }
    //     });
    
    //     // Handle foreground messages
    //     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
    //         Alert.alert('a new message is here: ', JSON.stringify(remoteMessage))
    //     });
    
    //     return unsubscribe;
    // }, []);

    //   const requestUserPermission = async () => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }
    //   }

      if (isLoading) {
        return (
          <RotatingLogoLoader isLoading={isLoading} />
        );
      }
    
      return null; // Navigation handles the view
    

    // return (
    //   <SafeAreaView>
    //     <Text style={{fontFamily: 'bSemi'}}>Edit app/index.tsx to edit this screen.</Text>
    //     <Link href="/homepage" style={{ color: 'blue'}}>Go to home</Link>
    //     <Link href="/getStarted" style={{ color: 'blue'}}>Go to Get Started </Link>
    //     <Link href="/OnboardScreenLayout" style={{ color: 'blue'}}>Go to Onboard Screen Layout page</Link>
    //     <Link href="/aiConvo" style={{ color: 'blue'}}>Go to AI CONVO PAGE </Link>

      

    //   </SafeAreaView> 
    // );
  }