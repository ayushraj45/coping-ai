 import 'react-native-gesture-handler';
 import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import GlobalProvider from "./context/GlobalProvider"
import * as Notifications from "expo-notifications";
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "cMedium": require("../assets/fonts/Commissioner-Medium.ttf"),
    "cLight": require("../assets/fonts/Commissioner-Light.ttf"),
    "bMedium": require("../assets/fonts/Baloo2-Medium.ttf"),
    "bRegular": require("../assets/fonts/Baloo2-Regular.ttf"),
    "bSemi": require("../assets/fonts/Baloo2-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  return (
   
    <GlobalProvider>
      <Stack initialRouteName= "index">
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="homepage2" options={{headerShown: false}}/>
        <Stack.Screen name="allEntries" options={{headerShown: false}}/>
        <Stack.Screen name="settings" options={{headerShown: false}}/>
        <Stack.Screen name="preAiConvo" options={{headerShown: false}}/>
        {/* <Stack.Screen name="(tabs)" options={{headerShown: false}}/> */}
        <Stack.Screen name="(settings)" options={{headerShown: false}}/>
        <Stack.Screen name="entry/[entryid]" options={{headerShown: false}}/>
        <Stack.Screen name="aiConvo" options={{headerShown: false}}/>

        
        {/* <Stack.Screen name="subscribe" options={{headerShown: false}}/>  */}

      </Stack>
    </GlobalProvider>
  );
}

export default RootLayout;