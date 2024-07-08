import { View, Text, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { colors } from '../theme'

import Profile1 from "../assets/images/profile1.png"
import Profile2 from "../assets/images/profile2.png"
import Profile3 from "../assets/images/profile3.png"
import Profile4 from "../assets/images/profile4.png"
import Profile5 from "../assets/images/profile5.png"

import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"

import { auth, db } from '../firebaseConfig'
import { getFirestore, collection, query, doc, where, getDocs, setDoc, addDoc } from 'firebase/firestore';

import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import {ArrowLeftIcon} from 'react-native-heroicons/solid'


export default function SignupScreen() {
    const navigation =useNavigation();
       
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(true);

    const [profileImage, setProfileImage] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [cca, setCCA] = useState('');
    const [loading, setLoading] = useState(false);

    const checkUsernameExists = async (username) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
      };
    
    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
      };
    
    const signUp = async () => {
        if (!email || !password || !confirmPassword || !year || !name || !cca) {
          alert("Please fill in all fields.");
          return;
        }
    
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
    
        if (!validatePassword(password)) {
          alert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
          return;
        }
    
        setLoading(true);
        try {
    
          const response = await createUserWithEmailAndPassword(auth, email, password);
    
          await sendEmailVerification(response.user);
          console.log(response);
    
          // Store user data in Firebase Firestore
          await setDoc(doc(db, "users", response.user.uid), {
            year: year,
            CCA: cca,
            email: email,
            name: name,
            profileImage: profileImage,
          });
    
          alert('User registered successfully! Please check your email inbox for a verification link to complete your account setup.');
          navigation.navigate('Login');
        } catch (error) {
          console.error('Error during sign-up:', error);
          alert(`An error occurred: ${error.message}`);
        } finally {
          setLoading(false);
        }
      };

    const profileImages = [
        Profile1,
        Profile2,
        Profile3,
        Profile4,
        Profile5,
    ];

  return (
    <View className= "flex-1 bg-white" style={{backgroundColor: colors.background}}>
        <SafeAreaView className= "flex">
            <View className= "flex-row justify-start" style = {{width: 60, height: 60}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className= "ml-4">
                    <ArrowLeftIcon size="24" color="white"/>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-[-45px]">
                <Image source= {profileImages[profileImage - 1]}
                    style= {{width: 200, height: 200}} />
                <TouchableOpacity onPress={() => setProfileImage((profileImage % 5) + 1)}>
                    <View style= {{height: 40, width: 40, borderRadius: 20, alignItems: "center", marginTop: 120, marginLeft: -65}} className= "bg-white justify-center"  >
                        <Ionicons name={'swap-horizontal'} color={colors.background} size={25} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

        <KeyboardAvoidingView className= "flex-1 bg-white px-8 pt-8 mt-[-20px]"
                style= {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
            <ScrollView>
            
                <View className= "from space-y-2">
                    <Text className="text-slate-900 ml-4 mt-2">Email</Text>
                </View>
            
                <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                        <EvilIcons name="envelope" size={35} color="lightgrey" className='mr-8 justify-center' />
                        <TextInput
                            className= "flex ml-1 justify-center text-base mt-[-6px]"
                            placeholder='steven123@gmail.com'
                            onChangeText={value=>setEmail(value)}
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
                        onChangeText={value=>setName(value)}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                    />
                </View>

                <View className= "space-y-2 mt-[-10px]">
                    <Text className="text-slate-900 ml-4 mt-5">CCA</Text>
                </View>
                
                <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <Ionicons name="trophy" size={25} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex ml-1 justify-center text-base mt-[-7px]" 
                        placeholder='Enter CCA'
                        onChangeText={value=>setCCA(value)}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                    />
                </View>

                <View className= "space-y-2 mt-[-10px]">
                    <Text className="text-slate-900 ml-4 mt-5">Year</Text>
                </View>
                
                <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <Ionicons name="calendar" size={25} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex ml-1 justify-center text-base mt-[-7px]" 
                        placeholder='Enter Year with CCA'
                        onChangeText={value=>setYear(value)}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                    />
                </View>

                <View className= "space-y-2 mt-[-30px]">
                    <Text className="text-slate-900 ml-4 mt-10">Password</Text>
                </View>
    
                <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <AntDesign name="lock" size={27} color="lightgrey" />
                    <TextInput
                        className= "flex-1 ml-1 justify-center text-base mt-[-4px]"
                        placeholder='Enter Password'
                        secureTextEntry ={visible}
                        onChangeText={value=>setPassword(value)}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                    />
                    <TouchableOpacity className="absolute left-72 mt-[20px]"
                        onPress={() => {
                            setVisible(visible => !visible)}
                    }>
                        <Feather name= {visible ? "eye-off" : "eye"} size={25} color="lightgrey"/>
                    </TouchableOpacity>
                </View>

                <View className= "space-y-2 mt-[-30px]">
                    <Text className="text-slate-900 ml-4 mt-10">Confirm Password</Text>
                </View>

                <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <AntDesign name="lock" size={27} color="lightgrey" />
                    <TextInput
                        className= "flex-1 ml-1 justify-center text-base mt-[-4px]"
                        placeholder='Confirm Password'
                        secureTextEntry ={show}
                        onChangeText={value=>setConfirmPassword(value)}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                    />
                    <TouchableOpacity className="absolute left-72 mt-[20px]"
                        onPress={() => {
                            setShow(show => !show)}
                    }>
                        <Feather name= {show ? "eye-off" : "eye"} size={25} color="lightgrey"/>
                    </TouchableOpacity>
                </View>

                <View className= "space-y-2 mb-2">
                    <Text className=" text-slate-900 ml-2 text-xs">Password must be be at least 8 characters in length. consist of a mix of alpha, at least one numeric and special characters</Text>
                </View>

                <TouchableOpacity onPress={signUp}
                    className= "py-3 mx-1 rounded-xl mt-4" style= {{backgroundColor: colors.background}}>
                    <Text className="text-center text-white font-bold text-xl">
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
  )
}