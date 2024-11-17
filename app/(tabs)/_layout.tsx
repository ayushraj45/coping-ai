import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


const TabLayout = () => {

  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel: false, 
      tabBarStyle: {
        backgroundColor: '#E2E9E2',
        //height:'auto'
      }
    }} >
     <Tabs.Screen
                name="allEntries"
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? 'journal' : 'journal-outline'}
                      size={28}
                      color={color}
                    />
                  ),
                  tabBarActiveTintColor: '#011C2D',
                  tabBarInactiveTintColor: 'gray',
                  tabBarShowLabel: false,
                  
                  headerShown: false
                }}
                />
            <Tabs.Screen
                name="homepage"
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? 'home' : 'home-outline'}
                      size={28}
                      color={color}
                    />
                  ),
                  tabBarActiveTintColor: '#011C2D',
                  tabBarInactiveTintColor: 'gray',
                  title: 'Home',
                  headerShown: false
                }}
                />
                            <Tabs.Screen
                name="settings"
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? 'settings' : 'settings-outline'}
                      size={28}
                      color={color}
                    />
                  ),
                  tabBarActiveTintColor: '#011C2D',
                  tabBarInactiveTintColor: 'gray',
                  title: 'Home',
                  headerShown: false
                }}
                />
    </Tabs>
  );
}

export default TabLayout;