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
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useCallback } from "react";
import { addDoc, collection } from "firebase/firestore";

export default function AddEventScreen() {
    const navigation = useNavigation();

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(dayjs());

    const onChange = useCallback((params) => {
        setDate(dayjs(params.date).format("YYYY-MM-DD"));
    });

    const handleAddEvent = async () => {
        if (!eventName || !description || !date) {
            alert("Please fill in all fields.");
            return;
        }

        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);
            const eventCollectionRef = collection(userDocRef, "schedules");

            try {
                await addDoc(eventCollectionRef, {
                    eventName,
                    description,
                    date,
                });
                console.log("Event added successfully!");
                alert("Event added successfully!");
                navigation.goBack(); // Navigate back to previous screen
            } catch (error) {
                console.error("Error adding event:", error);
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

                <Text style={styles.heading}>Add Event</Text>
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
                            Event Name
                        </Text>
                    </View>

                    <View className="p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row">
                        <TextInput
                            className="flex ml-1 justify-center text-base mt-[-5px] py-2"
                            placeholder="Enter name"
                            value={eventName}
                            onChangeText={setEventName}
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

                    <View className="space-y-2 mt-[-40px]">
                        <Text className="text-white ml-4 mt-10 text-xl font-bold">
                            Date
                        </Text>
                    </View>

                    <View className="p-2 bg-gray-100 text-white rounded-2xl mb-3 mt-2 flex-row">
                        <DateTimePicker
                            mode="single"
                            date={date}
                            onChange={onChange}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleAddEvent}
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
