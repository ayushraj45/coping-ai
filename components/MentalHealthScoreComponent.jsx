import { Dimensions, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('screen');

const MentalHealthScoreComponent = ({ score, currentPath, lastPlanId }) => {
    const progress = score / 100; // Calculate progress percentage
  
    return (
      <View style={mentalHealthStyles.container}>
        <Text style={mentalHealthStyles.title}>Mental Health Score</Text>
        <Text style={mentalHealthStyles.score}>{score}</Text>
        <Progress.Bar
          progress={progress}
          width={width * 0.7} // Dynamic width for the progress bar
          height={height * 0.008} // Dynamic height
          color="#011C2D" // Color of the filled progress
          unfilledColor="#FFEECD" // Color of the unfilled progress (from original styles)
          borderWidth={0} // No border
          borderRadius={4} // Rounded ends for the progress bar
          style={{ marginVertical: height * 0.01 }} // Dynamic vertical margin
        />
        <Text style={mentalHealthStyles.currentPathLabel}>Current Path</Text>
        <TouchableOpacity onPress={()=>{router.push({pathname: `/plan/[id]`, params: { id: lastPlanId}})}} >
        <View style={mentalHealthStyles.currentPathBox}>
          <Ionicons name="sparkles" size={24} color="black" />
          <Text style={mentalHealthStyles.currentPathText}> {currentPath}</Text>
        </View>
        </TouchableOpacity>
      </View>
    );
  };

export default MentalHealthScoreComponent

const mentalHealthStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: height * 0.03, // Dynamic vertical margin
      width: '100%', // Take full width for centering content
    },
    title: {
      fontSize: RFPercentage(2), // Dynamic font size
      fontFamily: 'bSemi',
      color: '#011C2D',
      marginBottom: height * 0.01, // Dynamic margin bottom
    },
    score: {
      fontSize: RFPercentage(8), // Large dynamic font size for the score
      fontFamily: 'bSemi',
      color: '#011C2D',
      marginBottom: height * 0.01, // Dynamic margin bottom
    },
    currentPathLabel: {
      fontSize: RFPercentage(1.8), // Dynamic font size
      fontFamily: 'bSemi',
      color: '#011C2D',
      marginTop: height * 0.01, // Dynamic margin top
    },
    currentPathBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFEECD', // Light yellow color from original styles
      borderRadius: 10,
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.01,
    },
    currentPathText: {
      fontSize: RFPercentage(2.2), // Dynamic font size
      fontFamily: 'bSemi',
      color: '#011C2D',
    },
  });