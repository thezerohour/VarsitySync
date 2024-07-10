import { View, Text, Platform, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../theme'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';


export default function LoginScreen() {
    const navigation =useNavigation();

    
    const [visible, setVisible] = useState(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // setLoading(true);
        if (email && password) {
            try {
              await signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  const user = userCredential.user;
              })
              console.log('login successful')
              navigation.navigate("Main");
            } catch (error) {
                console.log(error);
                alert('Invalid email address or password.');
        // } finally {
          // setLoading(false); // Stops the loading indicator
            } 
        } else {
            Alert.alert('Error', 'Please enter both email and password');
        };
    };

  return (
    <View className= "flex-1 bg-white" style={{backgroundColor: colors.background}}>
        <SafeAreaView className= "flex">
            <View className= "flex-row justify-start" style = {{width: 70, height: 70}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className= "ml-4 mt-2">
                    <ArrowLeftIcon size="30" color="white"/>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-[-35px]">
                <Image source={require("../assets/images/AppName2.png")}
                    style= {{width: 350, height: 300}} />
            </View>
        </SafeAreaView>

        <View className= "flex-1 bg-white px-8 pt-8 mt-[-20px]"
            style= {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
     
            <View className= "space-y-2">
                <Text className="text-slate-900 ml-4 mt-2">
                    Email
                </Text>
            </View>
            
            <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <EvilIcons name="envelope" size={35} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex ml-1 justify-center text-base mt-[-6px]"
                        placeholder='Enter Email'
                        onChangeText={value=>setEmail(value)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
            </View>
            
            <View className= "space-y-2 mt-[-30px]">
                <Text className="text-slate-900 ml-4 mt-10">Password</Text>
            </View>

            <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <AntDesign name="lock" size={32} color="lightgrey" className='mr-8 justify-center' />
                <TextInput
                    className= "flex-1 ml-1 justify-center text-base mt-[-4px]"
                    placeholder='Enter Password'
                    secureTextEntry ={visible}
                    onChangeText={value=>setPassword(value)}
                    autoCapitalize= 'none'
                    autoCorrect={false}
                />
                <TouchableOpacity className="absolute left-72 mt-[22px]"
                    onPress={() => {
                        setVisible(!visible)}
                        
                }>
                    <Feather name= {visible ? "eye-off" : "eye"} size={25} color="lightgrey"/>
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity className= "flex items-end mb-5"
                onPress={() => navigation.navigate("ForgetPassword")}>
                <Text className="text-slate-900 text-sm">Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={handleLogin}
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