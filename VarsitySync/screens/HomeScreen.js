import { View, Text } from 'react-native'
import React from 'react'
import { auth } from '../firebaseConfig'

export default function HomeScreen() {
  const displayName = auth.currentUser.displayName;

  return (
    <View>
      <Text> {displayName} HomeScreen</Text>
    </View>
  )
}