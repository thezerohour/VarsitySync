import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import Ionicons from '@expo/vector-icons/Ionicons';
import {NewspaperIcon, PencilSquareIcon} from 'react-native-heroicons/solid'
import {QuestionMarkCircleIcon} from 'react-native-heroicons/outline'
import Profile1 from "../assets/images/profile1.png"
import Profile2 from "../assets/images/profile2.png"
import Profile3 from "../assets/images/profile3.png"
import Profile4 from "../assets/images/profile4.png"
import Profile5 from "../assets/images/profile5.png"
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const navigation =useNavigation();

  const [userData, setUserData] = useState(null);

  const profileImages = [
    Profile1,
    Profile2,
    Profile3,
    Profile4,
    Profile5,
  ];

const fetchUserData = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    console.log(`User ID: ${currentUser.uid}`);
    const uid = currentUser.uid;
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        console.log('User document data:', userDoc.data());
        setUserData(userDoc.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  } else {
    console.log('No user is currently logged in');
  }
};

useFocusEffect(
  useCallback(() => {
    fetchUserData();
  }, [])
);



  if (!userData) {
    return (
      <View style={styles.container}>
        <Text className= "text-white">Loading user data...</Text>
      </View>
    );
  }

  const renderBio = () => {
    return userData?.bio || "teamNUS"
  }
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('successful signout');
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome"}],
      });
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />

    <View className= "flex-row justify-end mb-[-10px] mt-[-10px]" style = {{width: 90, height: 90}}>
        <TouchableOpacity
            onPress={() => navigation.navigate("Feedback")}
                    className= "mr-[-125px] mt-12">
                    <QuestionMarkCircleIcon size="35" color="white"/>
        </TouchableOpacity>
    </View>
      
      <View style={{alignItems: "center", marginTop: -20}}>
        <Image source={ profileImages[userData.profileImage - 1] } style={styles.profileImage} />
        <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
                    <View style= {{height: 40, width: 40, borderRadius: 20, alignItems: "center" , marginLeft: 120, marginTop: -52}} className= " bg-white opacity-70 justify-center"  >
                        <PencilSquareIcon color="darkblue" size={30} />
                    </View>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.email}>{userData.email}</Text>
      
      <View className= " bg-white mt-1"
            style= {{borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius:20, width: 350, height:200 }}>
        
        <View className= 'pt-8 flex-row align-middle justify-center mr-5'>
          <Ionicons name="trophy" size={30} color="lightgrey" className='justify-center align-middle' />
          <Text className="text-slate-900 text-lg flex-row justify-center ml-2">CCA: {userData.cca}</Text>
        </View>

        <View className= 'pt-4 flex-row align-middle justify-center mr-5'>
          <Ionicons name="calendar" size={30} color="lightgrey" />
          <Text className="text-slate-900 text-lg flex-row ml-2">Year: {userData.year}</Text>
        </View>

        <View className= 'pt-4 flex-row align-middle justify-center mr-5'>
          <NewspaperIcon size={30} color="lightgrey" />
          <Text className="text-slate-900 text-lg flex-row ml-2">{renderBio()}</Text>
        </View>

      </View>

      <View className= 'space-y-4 mt-20 mb-8' style={{width: 400}}>
          <TouchableOpacity 
            onPress={handleLogout}
            className= "py-4 bg-slate-50 mx-8 rounded-xl">
              <Text
                className= 'text-2xl font-bold text-center text-blue-950 '>
                Logout
              </Text>
          </TouchableOpacity>
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
    marginTop:0,
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
