import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'

import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

import { ClipboardDocumentCheckIcon, CalendarDaysIcon} from 'react-native-heroicons/outline'

import ImageSlider from '../components/ImageSlider';
import { sliderImages } from '../constants';

import { query, where, collection } from 'firebase/firestore';
import { getDocs, count } from 'firebase/firestore';
import dayjs from 'dayjs';



export default function HomeScreen() {
  const navigation =useNavigation();

  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchUserName = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        try {
          const userDocRef = doc(db, 'users', uid);
          const userDocSnapshot = await getDoc(userDocRef);
          const taskCollectionRef = collection(userDocRef, 'tasks');
          const eventCollectionRef = collection(userDocRef, 'schedules');

          // Count incomplete tasks
          const taskQ = query(taskCollectionRef);
          const taskCountSnapshot = await getDocs(taskQ);
          setTaskCount(taskCountSnapshot.size);

          // Count future events
          const dateQ = query(eventCollectionRef, where('date', '>', dayjs(Date.now()).format('YYYY-MM-DD')));
          const eventCountSnapshot = await getDocs(dateQ);
          setEventCount(eventCountSnapshot.size);
  
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
      source={require('../assets/images/homescreen.png')}
      style={{width: 480, height: 550, marginTop: -35, marginLeft: -30}}
    >
      <SafeAreaView>
        <Text style={{
          paddingHorizontal: 10,
          paddingTop: 50,
          fontSize: 35,
          fontWeight: "800" ,
          color: "white",
          marginLeft: 30,
        }}>
          Welcome back, 
        </Text>
        <Text style={{
          paddingHorizontal: 10,
          paddingTop: 0,
          fontSize: 35,
          fontWeight: "800" ,
          color: "white",
          marginLeft: 30,
        }}>
          {userName}!
        </Text>

        {/* image slider*/ }
        <View style={{marginTop: 30, backgroundColor: "rgba(240, 240, 240, 0.8)", borderRadius: 20, paddingHorizontal: 10, marginLeft: 38, marginRight: 33,}}>
          <ImageSlider data={sliderImages}/>
        </View>

        {/* task */}
        <View style={styles.container1}>
          <ClipboardDocumentCheckIcon size='30' style={{color: '#06213E', marginTop: 1, marginLeft: -25}} />
          <Text style={styles.text}> Tasks: {taskCount} tasks</Text>
        </View>

        {/* schedule */}
        <View style={styles.container2}>
          <CalendarDaysIcon size='30' style={{color: '#06213E', marginLeft: -25}} />
          <Text style={styles.text}> Schedule: {eventCount} upcoming</Text>
        </View>
        

      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container1 : {
    marginTop: 30, 
    backgroundColor: "rgba(200, 200, 200, 0.8)", 
    borderRadius: 20, 
    padding: 40, 
    marginLeft: 37, 
    marginRight: 65,
    flexDirection: "row",
  },
  container2 : {
    marginTop: 30, 
    backgroundColor: "rgba(180, 180, 180, 0.8)", 
    borderRadius: 20, 
    padding: 40, 
    marginLeft: 38, 
    marginRight: 65,
    flexDirection: "row" 
  },
  text: {
    fontSize: 27,
    fontWeight: "bold",
    color: '#06213E',
    alignSelf:"flex-start"
  }
})