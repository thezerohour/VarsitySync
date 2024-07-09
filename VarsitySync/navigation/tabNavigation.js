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
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen 
        name='Schedule' 
        component={ScheduleScreen}
        options={{headerShown: false, title: 'Schedule', tabBarIcon: ({focused}) => (
          <Image source={require("../assets/images/schedule.png")} style= {{width: 70, height: 70}} />)}} />
      
      <Tab.Screen 
        name='Task' 
        component={TaskScreen}
        options={{headerShown: false, title: 'Tasks', tabBarIcon: ({focused}) => (
          <Image source={require("../assets/images/todo.png")} style= {{width: 70, height: 70}} />)}} />
      
      <Tab.Screen 
        name='Home' 
        component={HomeScreen}
        options={{headerShown: false, title: 'Home', tabBarIcon: ({focused}) => (
          <Image source={require("../assets/images/home.png")} style= {{width: 70, height: 70}} />)}} />
  
      <Tab.Screen 
        name='Progress' 
        component={ProgressScreen}
        options={{headerShown: false, title: 'Progress', tabBarIcon: ({focused}) => (
          <Image source={require("../assets/images/progress.png")} style= {{width: 70, height: 70}} />)}} />
  
      <Tab.Screen 
        name='Profile' 
        component={ProfileScreen}
        options={{headerShown: false, title: 'Profile', tabBarIcon: ({focused}) => (
          <Image source={require("../assets/images/profile.png")} style= {{width: 70, height: 70}} />)}} />
  
    </Tab.Navigator>
   );
  };

  export default BottomTabNavigator;