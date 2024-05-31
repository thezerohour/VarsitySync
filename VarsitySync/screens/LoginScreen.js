import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../theme '
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'


export default function LoginScreen() {
    const navigation =useNavigation();
  return (
    <View className= "flex-1 bg-white" style={{backgroundColor: colors.background}}>
        <SafeAreaView className= "flex">
            <View className= "flex-row justify-start">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className= "ml-4">
                    <ArrowLeftIcon size="24" color="white"/>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-[-16px]">
                <Image source={require("../assets/images/AppName2.png")}
                    style= {{width: 350, height: 300}} />
            </View>
        </SafeAreaView>

        <View className= "flex-1 bg-white px-8 pt-8 mt-[-20px]"
            style= {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
            
            <View className= "from space-y-2">
                <Text className="text-slate-900 ml-4 mt-2">NUSNET ID</Text>
            </View>
            <TextInput
                className= "p-4 bg-gray-100 text-slate-900 rounded-2xl mt-1" 
                placeholder='exxxxxxx@u.nus.edu'
            />
            <View className= "from space-y-2">
                <Text className="text-slate-900 ml-4 mt-10">Password</Text>
            </View>
            <TextInput
                className= "p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2" 
                secureTextEntry
                placeholder='Enter Password'
            />
             <View className= "from space-y-2 mb-2">
                <Text className=" text-slate-900 ml-2 text-xs">Password must be be at least 8 characters in length. consist of a mix of alpha, at least one numeric and special characters</Text>
            </View>
            
            <TouchableOpacity className= "flex items-end mb-5">
                <Text className="text-slate-900 text-sm">Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                className= "py-3 mx-1 rounded-xl mt-7" style= {{backgroundColor: colors.background}}>
                <Text className="text-center text-white font-bold text-xl">
                    Login
                </Text>
            </TouchableOpacity>

            <View className= 'flex-row justify-center mt-7'>
                <Text className= 'text-slate-900 font-semibold'>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text className= 'font-semibold text-blue-500'> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}