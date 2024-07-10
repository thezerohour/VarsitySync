import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import {sendPasswordResetEmail} from 'firebase/auth'
import { auth } from '../firebaseConfig'

export default function ForgetPasswordScreen() {
    const navigation =useNavigation();

    const [email, setEmail] = useState('');
    
    // forget password link
    const forgetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                Alert.alert(
                    "Success",
                    "Password reset email sent! Please check your inbox.",
                    [{ text: "OK" }]
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
    
                // Provide feedback based on the error code
                let userMessage;
                switch (errorCode) {
                    case 'auth/invalid-email':
                        userMessage = "The email address is not valid.";
                        break;
                    case 'auth/user-not-found':
                        userMessage = "No user found with this email address.";
                        break;
                    case 'auth/missing-email':
                        userMessage = "Oops! You forgot to put in your email.";
                        break;
                    default:
                        userMessage = errorMessage;
                        break;
                }
    
                Alert.alert(
                    "Error",
                    userMessage,
                    [{ text: "OK" }]
                );
            });
    };
      
  return (
    <View className= "flex-1 bg-white" style={{backgroundColor: colors.background}}>
        <SafeAreaView className= "flex">
            <View className= "flex-row justify-start mt-5" style = {{width: 60, height: 60}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className= "ml-4 mt-5">
                    <ArrowLeftIcon size="30" color="white"/>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-[-20px] mb-5">
                <Image source={require("../assets/images/forgetPassword.png")}
                    style= {{width: 450, height: 300}} />
            </View>
        </SafeAreaView>

        < View className= "flex-1 bg-white px-8 pt-8 mt-[-10px]"
            style= {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
            
            <Text className=" flex-row text-4xl font-bold text-slate-900 justify-center text-center">
                Forget Password
            </Text> 
            
            <TextInput
                className= "p-4 bg-gray-100 text-slate-900 rounded-2xl justify-center mt-9" 
                placeholder='Enter Email'
                onChangeText={value=>setEmail(value)}
                autoCapitalize= 'none'
                autoCorrect={false}
            />
            <Text className=" flex text-xs text-slate-900 justify-center mt-4 ml-1">
                Enter your email and we'll send you a link to reset your password
            </Text>

            <TouchableOpacity
                onPress={() => forgetPassword()}
                className= "py-3 mx-1 rounded-xl mt-24" style= {{backgroundColor: colors.background}}>
                
                <Text className="text-center text-white font-bold text-xl">
                    Send Link
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}