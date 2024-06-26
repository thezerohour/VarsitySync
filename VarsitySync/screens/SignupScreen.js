import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../theme '
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from '../firebaseConfig'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';


export default function SignupScreen() {
    const navigation =useNavigation();
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const handleAddUser = async () => {
        if (email && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                Alert.alert('Success', 'User account created successfully', 
                    [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
                    );
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        } else {
            Alert.alert('Error', 'Please enter both email and password');
        }
    };

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
                <Text className="text-slate-900 ml-4 mt-2">Email</Text>
            </View>
            
            <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <EvilIcons name="envelope" size={35} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex ml-1 justify-center text-base mt-[-6px]"
                        placeholder='steven123@gmail.com'
                        onChangeText={value=>setemail(value)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
            </View>
            
            <View className= "space-y-2 mt-[-10px]">
                <Text className="text-slate-900 ml-4 mt-5">Name</Text>
            </View>
            
            <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                <Ionicons name="person" size={25} color="lightgrey" className='mr-8 justify-center' />
                <TextInput
                    className= "flex ml-1 justify-center text-base mt-[-7px]" 
                    placeholder='Enter Name'
                    autoCapitalize= 'none'
                    autoCorrect= 'none'
                />
            </View>

            <View className= "space-y-2 mt-[-30px]">
                <Text className="text-slate-900 ml-4 mt-10">Password</Text>
            </View>
    
            <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                <AntDesign name="lock" size={27} color="lightgrey" className='mr-8 justify-center' />
                <TextInput
                    className= "flex ml-1 justify-center text-base mt-[-4px]"
                    placeholder='Enter Password'
                    secureTextEntry ={visible}
                    onChangeText={value=>setpassword(value)}
                    autoCapitalize= 'none'
                    autoCorrect= 'none'
                />
                <TouchableOpacity className="absolute left-72 mt-[20px]"
                    onPress={() => {
                        setVisible(!visible)
                        setShow(!show)}
                }>
                    <Feather name= {show === false ? "eye" : "eye-off"} size={25} color="lightgrey"/>
                </TouchableOpacity>
            </View>
             <View className= "space-y-2 mb-2">
                <Text className=" text-slate-900 ml-2 text-xs">Password must be be at least 8 characters in length. consist of a mix of alpha, at least one numeric and special characters</Text>
            </View>

            <TouchableOpacity onPress={handleAddUser}
                className= "py-3 mx-1 rounded-xl mt-4" style= {{backgroundColor: colors.background}}>
                <Text className="text-center text-white font-bold text-xl">
                    Sign Up
                </Text>
            </TouchableOpacity>

        </View>
    </View>
  )
}