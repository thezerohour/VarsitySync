import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Keyboard, Image, ScrollView} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import { db, auth } from '../firebaseConfig';
import { doc, collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AddGradeScreen = () => {
  const navigation = useNavigation();
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [year, setYear] = useState('1');
  const [semester, setSemester] = useState('1');

  const handleCourseNameChange = (text) => {
    setCourseName(text.toUpperCase());
  };

  const handleGradeChange = (text) => {
    setGrade(text.toUpperCase());
  };

  const handleAddGrade = async () => {

    if (!courseName || !grade) {
        alert('Please fill in all fields.');
        return;
      }

    const currentUser = auth.currentUser;
    if (currentUser) {
        const uid = currentUser.uid;
        const userDocRef = doc(db, 'users', uid);
        const gradesCollectionRef = collection(userDocRef, 'grades');
  
        try {
          await addDoc(gradesCollectionRef, {
            courseName,
            grade,
            year,
            semester, // Save semester as a plain string
          });
          console.log('Grade added successfully!');
          alert('Grade added successfully!');
          navigation.goBack(); // Navigate back to previous screen
        } catch (error) {
          console.error('Error adding grade:', error);
          alert(`An error occurred: ${error.message}`);
        }
      }
    };

  return (
    <View className= "flex-1" style= {{backgroundColor: '#38466E'}}>
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className= "flex-1  px-8 pt-2 mt-4">

        <View className= "space-y-2">
                <Text className="text-white ml-4 mt-2 text-lg font-bold">
                    Course Name
                </Text>
            </View>
            
            <View className= 'p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row'>
                    <TextInput
                        className= "flex ml-1 justify-center text-base mt-[-6px] py-3"
                        value={courseName}
                        onChangeText={handleCourseNameChange}
                        placeholder="Enter course name"
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
            </View>
            
            <View className= "space-y-2">
                <Text className="text-white ml-4 mt-2 text-lg font-bold">
                    Grade
                </Text>
            </View>
            
            <View className= 'p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row'>
                    <TextInput
                        className= "flex ml-1 justify-center text-base mt-[-6px] py-3"
                        value={grade}
                        onChangeText={handleGradeChange}
                        placeholder="Enter grade"
                        autoCapitalize='characters'
                        autoCorrect={false}
                    />
            </View>
     
            <View className= "space-y-2">
                <Text className="text-white ml-4 mt-2 text-lg font-bold">
                    Year
                </Text>
            </View>
            <View className= 'p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row' style={{alignContent:"flex-start"}}>
                <Picker
                selectedValue={year}
                onValueChange={(itemValue) => setYear(itemValue)}
                style= {styles.yearPicker}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                </Picker>
            </View>

            <View className= "space-y-2">
                <Text className="text-white ml-4 mt-2 text-lg font-bold">
                    Semester
                </Text>
            </View>
            <View className= 'p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row' style={{alignContent:"flex-start"}}>
                <Picker
                    selectedValue={semester}
                    style={styles.semPicker}
                    onValueChange={(itemValue) => setSemester(itemValue)}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                </Picker>
            </View>
            

        <View className= "flex-row mb-6 mt-[-45px] justify-center">
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
                onPress={handleAddGrade}
                className= "py-4  bg-green-500 mx-8 rounded-xl">
                  <Text
                    className= 'text-xl font-bold text-center text-white '>
                    Add Grade
                  </Text>
              </TouchableOpacity>
            </View>
        </View>

        </View>
        </TouchableWithoutFeedback>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  yearPicker: {
    height: 100,
    width: 310,
    marginBottom: 30,
    paddingTop: 30,
    justifyContent: "center",
    alignSelf: "center",
    color: "black"
  },
  semPicker: {
    height: 80,
    width: 310,
    marginBottom: 30,
    paddingTop: 30,
    justifyContent: "center",
    alignSelf: "center",
    color: "black"
  },
});

export default AddGradeScreen;
