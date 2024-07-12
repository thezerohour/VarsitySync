import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native'
import React, { useRef} from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { FontAwesome6 } from '@expo/vector-icons';
import { AcademicCapIcon} from 'react-native-heroicons/solid'

import LottieView from 'lottie-react-native';


export default function ProgressScreen() {
    const navigation =useNavigation();
    const animation = useRef(null);

  return (
    <View className= "flex-1 bg-white">
      <StatusBar barStyle="light-content"/>
        <SafeAreaView className= "flex mt-[-30px] mb-7">

            <View className="flex-row justify-center mt-10 mb-7">
            <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "white",
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/lottie /analytics.json')}
      />
            </View>
        </SafeAreaView>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className= "flex-1 bg-slate-900 px-7 pt-1 mt-[-20px] justify-center"
            style= {{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
          
            <TouchableOpacity 
                onPress={() => navigation.navigate("Grades")}
                className= "py-3 mx-1 my-5 rounded-xl  bg-blue-500 flex-row justify-center" >
                <AcademicCapIcon size="30" color="white" />
                <Text className="text-center text-white font-bold text-2xl" style= {{marginLeft: 5, marginRight: 10}}>
                    Grades
                </Text>
            </TouchableOpacity>
  

            <TouchableOpacity 
                onPress={() => navigation.navigate("Training")}
                className= "py-3 mx-1 rounded-xl mt-7 bg-blue-500 flex-row justify-center">
                <FontAwesome6 name="dumbbell" size="30" color="white" />
                <Text className="text-center text-white font-bold text-2xl" style= {{marginLeft: 5, marginRight: 10}}>
                    Training
                </Text>
            </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>

    </View>
  )
}