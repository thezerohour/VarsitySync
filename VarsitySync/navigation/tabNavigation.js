import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    // Schedule Screen
    // Task Screen
    // Home Screen 
    // Progress Screen 
    // Profile Screen
    return (
    <Tab.Navigator 
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#f8f9fa' }, // Background color of the tab bar
        tabBarActiveTintColor: '#24A6D9', // Active tab color
        tabBarInactiveTintColor: '#06213E', // Inactive tab color
        tabBarShowLabel: true, // Show or hide tab labels
        tabBarIcon: ({ focused }) => {
          let iconName;
          let tintColor = focused ? '#24A6D9' : '#06213E'; // Color of the icon based on focus state

          if (route.name === 'Home') {
            iconName = require("../assets/images/home.png");
          } else if (route.name === 'Schedule') {
            iconName = require("../assets/images/schedule.png");
          } else if (route.name === 'Task') {
            iconName = require("../assets/images/todo.png");
          } else if (route.name === 'Progress') {
            iconName = require("../assets/images/progress.png");
          } else if (route.name === 'Profile') {
            iconName = require("../assets/images/profile.png");
          }

          return <Image source={iconName} style={{ width: 70, height: 70, tintColor: tintColor }} />;
        }
      })}
    >
      <Tab.Screen name='Schedule' component={ScheduleScreen} options={{ headerShown: false, title: 'Schedule' }} />
      <Tab.Screen name='Task' component={TaskScreen} options={{ headerShown: false, title: 'Tasks' }} />
      <Tab.Screen name='Home' component={HomeScreen} options={{ headerShown: false, title: 'Home' }} />
      <Tab.Screen name='Progress' component={ProgressScreen} options={{ headerShown: false, title: 'Progress' }} />
      <Tab.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false, title: 'Profile' }} />
    </Tab.Navigator>
  );
}

  export default BottomTabNavigator;