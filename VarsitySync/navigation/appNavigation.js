import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebaseConfig';
import { setUser } from '../redux/slices/user';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, u => {
    console.log('user: ',u);
    dispatch(setUser(u));
  })

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options= {{headerShown: false}} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options= {{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'modal'}} name="Login" component={LoginScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'modal'}} name="SignUp" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
