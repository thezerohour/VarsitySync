import { View, Text, Image, TouchableOpacity, StatusBar, Al } from 'react-native'
import React, { useRef } from 'react'
import { colors } from '../theme '
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native';
import { auth } from '../firebaseConfig';
import { logoutUser } from '../redux/slices/userActions';
import { useDispatch } from 'react-redux';



export default function HomeScreen() {
  const navigation =useNavigation();
  const animation = useRef(null);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await dispatch(logoutUser());
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  return (
  <SafeAreaView className = 'flex-1' style= {{backgroundColor: colors.background}}>
    <StatusBar barStyle="light-content" backgroundColor={colors.background} />
    <View className= 'flex-1 flex justify-around my-4'>
      <Text 
        className = 'text-slate-50 font-bold text-4xl text-center'>
        Welcome {auth.currentUser.displayName}!
      </Text>
      <View className ='flex-row justify-center mt-[-120px]'>
      <LottieView
        className = ''
        autoPlay
        ref={animation}
        style={{
          width: 350,
          height: 350,
          backgroundColor: colors.background,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/lottie /sport.json')}
      />
      </View>
      <View className= 'space-y-4 mt-[-100px]'>
        <TouchableOpacity 
          onPress={() => navigation.navigate("ToDoList")}
          className= "py-3 bg-slate-50 mx-7 rounded-xl">
            <Text
              className= 'text-xl font-bold text-center text-blue-950 '>
              To Do List
            </Text>
        </TouchableOpacity>
      </View>
      <View className= 'space-y-4 mt-[-100px]'>
        <TouchableOpacity 
          onPress={() => handleLogOut()}
          className= "py-3 bg-slate-50 mx-7 rounded-xl">
            <Text
              className= 'text-xl font-bold text-center text-blue-950 '>
              Log Out
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  )
}