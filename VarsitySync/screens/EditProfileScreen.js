import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'

import Ionicons from '@expo/vector-icons/Ionicons';
import {NewspaperIcon} from 'react-native-heroicons/solid'


import Profile1 from "../assets/images/profile1.png"
import Profile2 from "../assets/images/profile2.png"
import Profile3 from "../assets/images/profile3.png"
import Profile4 from "../assets/images/profile4.png"
import Profile5 from "../assets/images/profile5.png"

import { SafeAreaView } from 'react-native-safe-area-context';



export default function EditProfileScreen() {
    const navigation =useNavigation();

    const [profileImage, setProfileImage] = useState(null);
    const [cca, setCCA] = useState('');
    const [year, setYear] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const profileImages = [
        Profile1,
        Profile2,
        Profile3,
        Profile4,
        Profile5,
    ];

    useEffect(() => {
        // Fetch user data on component mount
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const uid = currentUser.uid;
                try {
                    const userDocRef = doc(db, 'users', uid);
                    const userDocSnapshot = await getDoc(userDocRef);
    
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        setEmail(userData.email);
                        setName(userData.name);
                        setProfileImage(userData.profileImage);
                        setCCA(userData.cca || '');
                        setYear(userData.year || '');
                        setBio(userData.bio || '');
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
        }
    
        fetchUserData();
      }, []);

    const updateUserProfile = async () => {
        try {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          await setDoc(userDocRef, {
            profileImage,
            name,
            cca,
            year,
            email,
            bio
          })
          console.log('User profile updated successfully!');
          navigation.goBack(); // Navigate back to previous screen
        } catch (error) {
          console.error('Error updating user profile:', error);
        }
    };


    
    return (
        <SafeAreaView style={styles.container}>
          <View style={{alignItems: "center", marginTop: -20}}>
            <Image source={ profileImages[profileImage - 1] } style={styles.profileImage} />
            <TouchableOpacity onPress={() => setProfileImage((profileImage % 5) + 1)}>
                        <View style= {{height: 40, width: 40, borderRadius: 20, alignItems: "center" , marginLeft: 120, marginTop: -52}} className= " bg-white opacity-70 justify-center"  >
                            <Ionicons name={'swap-horizontal'} color="darkblue" size={30} />
                        </View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className= " bg-white mt-1 p-2"
                style= {{borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, width: 350, height:350 }}>
            
            <View className= 'p-3 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <Ionicons name="trophy" size={25} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex-1 ml-1 justify-center text-base mt-[-7px]" 
                        placeholder='CCA'
                        value={cca}
                        onChangeText={setCCA}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                    />
            </View>

            <View className= 'p-3 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row'>
                    <Ionicons name="calendar" size={25} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex-1 ml-1 justify-center text-base mt-[-7px]" 
                        placeholder='Year with CCA'
                        value={year}
                        onChangeText={setYear}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                    />
            </View>

            <View className= 'p-3 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row' style={{height: 180}}>
                    <NewspaperIcon size={25} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex-1 ml-1 justify-start align-top text-base mt-[-7px]" 
                        placeholder='About you...'
                        onChangeText={setBio}
                        autoCapitalize= 'none'
                        autoCorrect={false}
                        multiline = {true}
        
                    />
            </View>
          </View>
          </TouchableWithoutFeedback>

        <View className= "flex-row mb-6 mt-[-25px]">
            <View className= 'space-y-4 mt-20' style={{width: 200}}>
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                className= "py-4 bg-red-500 mx-8 rounded-xl">
                  <Text
                    className= 'text-xl font-bold text-center text-white '>
                    Cancel
                  </Text>
              </TouchableOpacity>
           </View>

            <View className= 'space-y-4 mt-20' style={{width: 200}}>
              <TouchableOpacity 
                onPress={() => updateUserProfile()}
                className= "py-4 bg-green-500 mx-8 rounded-xl">
                  <Text
                    className= 'text-xl font-bold text-center text-white '>
                    Update
                  </Text>
              </TouchableOpacity>
            </View>
        </View>
    
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#06213E',
      },
      profileImage: {
        width: 250,
        height: 250,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: -30,
      },
      text: {
        fontSize: 18,
        marginBottom: 5,
        color:"#FFFFFF",
      },
      name: {
        fontSize: 23,
        marginBottom: 3,
        fontWeight:"bold",
        color:"#FFFFFF",
      },
      email: {
        fontSize: 16,
        marginBottom: 40,
        color:"#FFFFFF",
      },
    });
    