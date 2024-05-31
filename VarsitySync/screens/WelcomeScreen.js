import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../theme '
import { SafeAreaView } from 'react-native'
import ScreenWrapper from '../components/screenWrapper'

export default function WelcomeScreen() {
  return (
  <SafeAreaView className = 'flex-1' style= {{backgroundColor: colors.background}}>
    <View className= 'flex-1 flex justify-around my-4'>
      <Text 
        className = 'text-slate-50 font-bold text-4xl text-center'>
        Let's Get Started !
      </Text>
      <View className ='flex-row justify-center mt-[-120px]'>
        <Image source={require("../assets/images/VarsitySync.png")}
          style={{width: 350, height: 550}} />
      </View>
      <View className= 'space-y-4 mt-[-100px]'>
        <TouchableOpacity
          className= "py-3 bg-slate-50 mx-7 rounded-xl">
            <Text
              className= 'text-xl font-bold text-center text-blue-950 '>
              Login
            </Text>
        </TouchableOpacity>
      </View>
      <View className= 'flex-row justify-center mt-[-70px]'>
        <Text className= 'text-slate-50 font-semibold'>Don't have an account?</Text>
        <TouchableOpacity>
          <Text className= 'font-semibold text-yellow-200'> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  )
}