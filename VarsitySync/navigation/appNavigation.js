import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options= {{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'modal'}} name="Login" component={LoginScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignupScreen} />
          <Stack.Screen options= {{headerShown: false}} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
