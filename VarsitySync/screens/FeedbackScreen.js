import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useRef} from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../firebaseConfig'
import { addDoc, collection } from 'firebase/firestore';

import { Ionicons } from '@expo/vector-icons';
import { ArrowLeftIcon, TagIcon } from 'react-native-heroicons/solid'

import LottieView from 'lottie-react-native';


export default function FeedbackScreen() {
    const navigation =useNavigation();
    const animation = useRef(null);

    

    const [category, setCategory] = useState('');
    const [feedback, setFeedback] = useState('');
   

    const submitFeedback = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
          const userID = currentUser.uid;
          try {
              const feedbackCollectionRef = collection(db, 'feedback');
              await addDoc(feedbackCollectionRef, {
                  category: category,
                  feedback: feedback,
                  userId: userID,
              });
              console.log('Feedback submitted successfully!');
              alert('Thank you for your feedback!');
              navigation.goBack(); // Navigate back to previous screen
          } catch (error) {
              console.error('Error submitting feedback:', error);
          }
      }
  };

  return (
    <View className= "flex-1 bg-white">
        <SafeAreaView className= "flex">
            <View className= "flex-row justify-start" style = {{width: 70, height: 70}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className= "ml-4 mt-2">
                    <ArrowLeftIcon size="30" color="#06213E"/>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-[-35px]">
            <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 350,
          height: 350,
          backgroundColor: "white",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/lottie /feedback.json')}
      />
            </View>
        </SafeAreaView>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className= "flex-1 bg-slate-900 px-8 pt-2 mt-[-40px]"
            style= {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
     
            <View className= "space-y-2">
                <Text className="text-white ml-4 mt-2 text-lg font-bold">
                    Category
                </Text>
            </View>
            
            <View className= 'p-4 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row'>
                    <TagIcon size={30} color="lightgrey" className='mr-8 justify-center' />
                    <TextInput
                        className= "flex ml-1 justify-center text-base mt-[-6px]"
                        placeholder='Suggestion or Issue'
                        onChangeText={value=>setCategory(value)}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
            </View>
            
            <View className= "space-y-2 mt-[-40px]">
                <Text className="text-white ml-4 mt-10 text-lg font-bold">Feedback</Text>
            </View>

            <View className= 'p-4 bg-gray-100 text-slate-900 rounded-2xl mb-3 mt-2 flex-row' style={{height:150}}>
            <Ionicons name="megaphone-outline" size={32} color="lightgrey" className='mr-8 justify-center' />
                <TextInput
                    className= "flex-1 ml-2 justify-center text-base mt-[-4px]"
                    placeholder='Feedback'
                    multiline={true}
                    onChangeText={value=>setFeedback(value)}
                    autoCapitalize= 'none'
                    autoCorrect={false}
                />
            </View>
            

            <TouchableOpacity 
                onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-green-500">
                <Text className="text-center text-white font-bold text-xl">
                    Submit
                </Text>
            </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>

    </View>
  )
}