import { Link } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { View } from "react-native";

export default function Index() {

    return (
      <SafeAreaView>
        <Text style={{fontFamily: 'bSemi'}}>Edit app/index.tsx to edit this screen.</Text>
        <Link href="/homepage" style={{ color: 'blue'}}>Go to home</Link>
      

      </SafeAreaView> 
    );
  }