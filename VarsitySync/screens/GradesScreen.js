import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, StatusBar } from 'react-native'
import React, { useRef} from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ArrowLeftIcon } from 'react-native-heroicons/solid'

import LottieView from 'lottie-react-native';


export default function GradesScreen() {
    const navigation =useNavigation();
    const animation = useRef(null);

  return (
    <View className= "flex-1 bg-white" style={{backgroundColor: "#06213E"}}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView className= "flex mt-[-10px]">
            <View className= "flex-row justify-start" style = {{width: 70, height: 70}}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className= "ml-4 mt-2">
                    <ArrowLeftIcon size="30" color="white"/>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-[-30px] mb-5">
            <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 500,
          height: 350,
          backgroundColor: "#06213E",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/lottie /grades.json')}
      />
            </View>
        </SafeAreaView>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className= "flex-1 bg-white px-8 pt-2 mt-[-40px]"
            style= {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>

            <TouchableOpacity 
                // onPress={() => )}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-500">
                <Text className="text-center text-white font-bold text-xl">
                    Y1S1
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                // onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-400">
                <Text className="text-center text-white font-bold text-xl">
                    Y1S2
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                // onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-500">
                <Text className="text-center text-white font-bold text-xl">
                    Y2S1
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                // onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-400">
                <Text className="text-center text-white font-bold text-xl">
                    Y2S2
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                // onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-500">
                <Text className="text-center text-white font-bold text-xl">
                    Y3S1
                </Text>
            </TouchableOpacity>


            <TouchableOpacity 
                // onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-400">
                <Text className="text-center text-white font-bold text-xl">
                    Y3S2
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                // onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-500">
                <Text className="text-center text-white font-bold text-xl">
                    Y4S1
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                // onPress={submitFeedback}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-400">
                <Text className="text-center text-white font-bold text-xl">
                    Y4S2
                </Text>
            </TouchableOpacity>

        </ScrollView>
        </TouchableWithoutFeedback>

    </View>
  )
}