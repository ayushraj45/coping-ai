import { Link } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { View } from "react-native";

export default function Index() {

    return (
      <SafeAreaView>
        <Text style={{fontFamily: 'bSemi'}}>Edit app/index.tsx to edit this screen.</Text>
        <Link href="/homepage" style={{ color: 'blue'}}>Go to home</Link>
        <Link href="/getStarted" style={{ color: 'blue'}}>Go to Get Started </Link>
        <Link href="/OnboardScreenLayout" style={{ color: 'blue'}}>Go to Onboard Screen Layout page</Link>
        <Link href="/aiConvo" style={{ color: 'blue'}}>Go to AI CONVO PAGE </Link>

      

      </SafeAreaView> 
    );
  }