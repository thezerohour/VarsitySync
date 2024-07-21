import { View, Text, TouchableOpacity, StatusBar, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'

import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';



export default function HomeScreen() {
  const navigation =useNavigation();

  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        try {
          const userDocRef = doc(db, 'users', uid);
          const userDocSnapshot = await getDoc(userDocRef);
  
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserName(userData.name);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <ImageBackground 
    source= {require('../assets/images/homescreen.png')}
    style= {{width: 450, height: 550, marginTop: -30, marginLeft: -30}}
    >
      <SafeAreaView>
        <Text style= {{
          paddingHorizontal: 10,
          paddingTop: 40,
          fontSize: 35,
          fontWeight:"800" ,
          color: "white",
          marginLeft: 30,
        }}>
          Welcome back 
        </Text>
        <Text style= {{
          paddingHorizontal: 10,
          paddingTop: 0,
          fontSize: 35,
          fontWeight:"800" ,
          color: "white",
          marginLeft: 30,
        }}>
        {userName} !
        </Text>
      </SafeAreaView>


    </ImageBackground>
 
  )
}