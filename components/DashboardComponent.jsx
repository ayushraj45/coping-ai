import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';

const { width, height } = Dimensions.get('screen');

const DashboardComponent = 
    ({ streak, words, entries }) => {
        return (
            <View style={dashboardStyles.container}>
              {/* Streak Item with Circle */}
              <View style={dashboardStyles.statItem}>
                <View style={dashboardStyles.circle}>
                  <Text style={dashboardStyles.number}>{streak}</Text>
                  <Text style={dashboardStyles.label}>Streak</Text>
                </View>
              </View>
              {/* Words Item with Circle */}
              <View style={dashboardStyles.statItem}>
                 <View style={dashboardStyles.circle}>
                  <Text style={dashboardStyles.number}>{words}</Text>
                  <Text style={dashboardStyles.label}>Words</Text>
                </View>
              </View>
              {/* Entries Item with Circle */}
              <View style={dashboardStyles.statItem}>
                <View style={dashboardStyles.circle}>
                  <Text style={dashboardStyles.number}>{entries}</Text>
                  <Text style={dashboardStyles.label}>Entries</Text>
                </View>
              </View>
            </View>
          );
        };
        
  export default DashboardComponent
        
        const dashboardStyles = StyleSheet.create({
          container: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#C8E8EA', // Light blue color
            borderRadius: 15, // Rounded corners
            paddingVertical: height * 0.02, // Dynamic vertical padding
            paddingHorizontal: width * 0.05, // Dynamic horizontal padding
            marginVertical: height * 0.02, // Dynamic vertical margin
            width: '90%', // Take up 90% of the screen width
            alignSelf: 'center', // Center the component
          },
          statItem: {
            alignItems: 'center',
          },
          circle: {
            width: width * 0.2, // Dynamic circle width
            height: width * 0.2, // Dynamic circle height (make it a circle)
            borderRadius: width * 0.1, // Half of width/height for a circle
            backgroundColor: '#FEF8EC', // Background color for the circle
            justifyContent: 'center', // Center content vertically
            alignItems: 'center', // Center content horizontally
            padding: width * 0.01, // Small padding inside the circle
            marginBottom: height * 0.005, // Small margin below the circle
          },
          number: {
            fontSize: RFPercentage(2.5), // Dynamic font size, slightly smaller for circle
            fontFamily: 'bSemi', // Using the specified font style
            color: '#011C2D', // Dark blue color from original styles
            textAlign: 'center', // Center text
          },
          label: {
            fontSize: RFPercentage(1.5), // Dynamic font size, smaller for label
            fontFamily: 'bSemi', // Using the specified font style
            color: '#011C2D', // Dark blue color
            textAlign: 'center', // Center text
            marginTop: height * 0.002, // Very small dynamic margin top
          },
        });
