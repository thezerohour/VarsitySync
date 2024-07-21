import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { db, auth } from '../firebaseConfig';
import { doc, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

const GradesScreen = () => {
  const navigation = useNavigation();
  const [year, setYear] = useState('1');
  const [semester, setSemester] = useState('1');
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch grades based on selected year and semester
    const fetchGrades = async () => {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const userDocRef = doc(db, 'users', uid);
        const gradesCollectionRef = collection(userDocRef, 'grades');
        
        const q = query(gradesCollectionRef, where('year', '==', year), where('semester', '==', semester));
        const querySnapshot = await getDocs(q);
        
        const fetchedGrades = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setGrades(fetchedGrades);
      }
      setLoading(false);
    };

    fetchGrades();
  }, [year, semester]);

  const renderGradeItem = ({ item }) => (
    
    <View style={styles.gradeItem} className= "flex-row">
      <Ionicons name="document-text-outline" size={30} color="black" />
      <Text style={styles.courseName}>{item.courseName}: {item.grade}</Text>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>


     <View className= "flex-1 px-8" style= {{marginTop: -10, marginLeft:0}}>
        <View>
            <Text className="text-white ml-4 mt-2 text-2xl font-bold">
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
            <Text className="text-white ml-4 mt-2 text-2xl font-bold">
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
     </View>

      <View style= {{marginTop: 160, marginLeft: 35, marginBottom: -100}}>
            <Text className="text-white ml-4 mt-2 text-2xl font-bold">
                Grades
            </Text>
            
        </View>
     <View className='p-3 bg-gray-100 text-white rounded-2xl mb-3 mt-28 mx-8 flex-1' style={{alignContent: "center"}}>
        
      {loading ? (
        <Text style= {styles.loading}>Loading...</Text>
      ) : grades.length > 0 ? (
        <FlatList
        data={grades}
        renderItem={renderGradeItem}
        keyExtractor={(item) => item.id}
      />
      ) : (
        <View style={styles.noData}></View>
      )}


                <TouchableOpacity
                    onPress={() => navigation.navigate("AddGrades")}
                    className= "ml-4 mt-2" style= {{alignSelf: "center", marginTop:0}}>
                    <Ionicons name="add-outline" size="30" color="#06213E" style= {{height: 30, width:30}}/>
                </TouchableOpacity>
           

     </View>
    

     <TouchableOpacity 
        onPress={() => navigation.goBack()}
        className= "py-3 mx-8 rounded-xl mt-3  bg-slate-500">
        <Text className="text-center text-white font-bold text-2xl">
            Back 
        </Text>
    </TouchableOpacity>
     
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#06213E',
    alignContent: "center"
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  gradeItem: {
    padding: 1,
    marginVertical: 5,
    borderColor: "lightgray",
    borderRadius: 5,
    marginHorizontal:5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    justifyContent: "center",
    flex: "row",
  },
  courseName: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: '600',
    marginBottom:10
  },
  loading: {
    fontSize: 25, 
    fontWeight: "500",
    alignSelf:'center',
    marginVertical: 100,
  },
  noData: {
    justifyContent:"center",
    marginTop: 70,
    marginHorizontal: 50,
    paddingBottom: 25,
    alignSelf: "center"
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

export default GradesScreen;
