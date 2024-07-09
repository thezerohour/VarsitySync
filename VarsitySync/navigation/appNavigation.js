import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import BottomTabNavigator from './tabNavigation';



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options= {{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options= {{headerShown: false}} name="SignUp" component={SignupScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'modal'}} name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen options= {{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options= {{headerShown: false}} name="Main" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}

{/* const TabNavigator = () => {
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
 )
} */}