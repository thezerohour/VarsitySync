import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebaseConfig';
import { setUser } from '../redux/slices/user';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoList from '../components/TodoList';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, (u) => {
    dispatch(setUser(u));
  });

  if(user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen options= {{headerShown: false, presentation: 'fullScreenModal'}} name="Login" component={LoginScreen} />
          <Stack.Screen options= {{headerShown: false}} name="Home" component={TabNavigator} />
          <Stack.Screen options= {{headerShown: false}} name="Task" component={TaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options= {{headerShown: false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'fullScreenModal'}} name="Login" component={LoginScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'fullScreenModal'}} name="SignUp" component={SignupScreen} />
          <Stack.Screen options= {{headerShown: false, presentation: 'modal'}} name="ForgetPassword" component={ForgetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const TabNavigator = () => {
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
}