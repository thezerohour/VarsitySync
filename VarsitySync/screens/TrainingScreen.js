import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useRef} from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';


import { ArrowLeftIcon } from 'react-native-heroicons/solid'

export default function TrainingScreen() {
    const navigation =useNavigation();
   
  return (
    <View className= "flex-1 bg-white">
        <SafeAreaView className= "flex mt-5">
            <View className= "flex-row justify-start" style = {{width: 70, height: 70}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className= "ml-4 mt-2">
                    <ArrowLeftIcon size="30" color="#06213E"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
  )
}