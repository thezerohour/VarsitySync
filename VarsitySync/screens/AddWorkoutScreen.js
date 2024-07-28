import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function AddWorkoutScreen() {
    const navigation = useNavigation();

    const [exercise, setExercise] = useState("");
    const [description, setDescription] = useState("");

/**
 * Add workout to the TrainingScreen 
 * 
 * @async
 * @function handleAddWorkout
 * @param {string} exercise - name of exercise 
 * @param {string} description - description of exercise
 * @returns {Promise<void>}
 */

    const handleAddWorkout = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            console.log("Adding workout...");
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);

            try {
                await updateDoc(userDocRef, {
                    workout: arrayUnion({ exercise, description }),
                });
                navigation.goBack(); // Navigate back to the workout screen
            } catch (error) {
                console.error("Error adding workout:", error);
                alert(`An error occurred: ${error.message}`);
            }
        }
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex">
                <View
                    className="flex-row justify-start"
                    style={{ width: 70, height: 70 }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="ml-2 mt-[31px]"
                    >
                        <ArrowLeftIcon size="35" color="#06213E" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>Add Workout</Text>

                <View className="flex-row justify-center mt-5">
                    <Image
                        source={require("../assets/images/training.png")}
                        style={{ width: 350, height: 300 }}
                    />
                </View>
            </SafeAreaView>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    className="flex-1 bg-slate-900 px-8 pt-2 mt-5"
                    style={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                    }}
                >
                    <View className="space-y-2">
                        <Text className="text-white ml-4 mt-2 text-xl font-bold">
                            Exercise
                        </Text>
                    </View>

                    <View className="p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row">
                        <TextInput
                            className="flex ml-1 justify-center text-base mt-[-5px] py-2"
                            placeholder="Enter exercise"
                            value={exercise}
                            onChangeText={setExercise}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View className="space-y-2 mt-[-40px]">
                        <Text className="text-white ml-4 mt-10 text-xl font-bold">
                            Description
                        </Text>
                    </View>

                    <View className="p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row">
                        <TextInput
                            className="flex ml-1 justify-center text-base mt-[-5px] py-2"
                            placeholder="Enter description"
                            value={description}
                            onChangeText={setDescription}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleAddWorkout}
                        className="py-3 mx-1 rounded-xl mt-7 bg-green-500"
                    >
                        <Text className="text-center text-white font-bold text-2xl">
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: "row",
        color: "#06213E",
        alignSelf: "center",
        justifyContent: "center",
        fontSize: 40,
        fontWeight: "bold",
        padding: 2,
        marginTop: -47,
        marginRight: -15,
    },
});
