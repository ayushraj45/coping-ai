import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

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

  return (

    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      <Stack.Screen name="(settings)" options={{headerShown: false}}/>
      <Stack.Screen name="entry/[entryid]" options={{headerShown: false}}/>
      <Stack.Screen name="(onboarding)" options={{headerShown: false}}/>
      <Stack.Screen name="aiConvo" options={{headerShown: false}}/>

      
      {/* <Stack.Screen name="subscribe" options={{headerShown: false}}/>  */}

    </Stack>
  
  );
}

export default RootLayout;