import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ToDoList from '../screens/ToDoList';
import { auth } from '../firebaseConfig';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {

  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  if(user){
    return (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options= {{headerShown: false, presentation: 'fullScreenModal'}} name="Login" component={LoginScreen} />
          <Stack.Screen options= {{headerShown: false}} name="Home" component={HomeScreen} />
          <Stack.Screen options= {{headerShown: false}} name="ToDoList" component={ToDoList} />
        </Stack.Navigator>
    );
  } else {
    return (
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options= {{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'fullScreenModal'}} name="Login" component={LoginScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'fullScreenModal'}} name="SignUp" component={SignupScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'modal'}} name="ForgetPassword" component={ForgetPasswordScreen} />
        </Stack.Navigator>
    );
  }
}
