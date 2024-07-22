import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Calendar, CalendarList, Agenda, calendarTheme } from 'react-native-calendars';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function ScheduleScreen() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        try {
          const userDocRef = doc(db, 'users', uid, 'schedules', '1');
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            console.log('data fetched');
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
    console.log(userData);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={{
          '2024-07-13': [{ name: 'item 1 - any js object' }],
          '2024-07-14': [{ name: 'item 2 - any js object', height: 80 }],
          '2024-07-15': [],
          '2024-07-16': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
        }}
        loadItemsForMonth={(month) => {
          console.log('trigger items loading')
        }}
        selected={'2024-07-13'}
        renderItem={(item) => {
          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});