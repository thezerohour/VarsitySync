import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { TrashIcon, PlusIcon } from "react-native-heroicons/outline";

export default function TrainingScreen() {
    const [workout, setWorkout] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchWorkout();
    });

    const fetchWorkout = async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                setWorkout(userData.workout || []);
            }
        }
    };

    const handleDeleteWorkout = async (item) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);

            try {
                await updateDoc(userDocRef, {
                    workout: arrayRemove(item),
                });
                fetchWorkout(); // Refresh the list
            } catch (error) {
                console.error("Error deleting workout:", error);
                alert(`An error occurred: ${error.message}`);
            }
        }
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="mt-5">
                <View
                    className="flex-row justify-start"
                    style={{ width: 70, height: 70 }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="ml-4 mt-2"
                    >
                        <ArrowLeftIcon size="30" color="#06213E" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>My Workout</Text>

                <View style={{ marginTop: 15 }}>
                    <FlatList
                        data={workout}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.workout}>
                                <View style={styles.block}></View>

                                <Text style={styles.exercise}>
                                    {item.exercise} - {item.description}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => handleDeleteWorkout(item)}
                                    style={styles.thrash}
                                >
                                    <TrashIcon size="28" color="#06213E" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>

            <TouchableOpacity
                onPress={() => navigation.navigate("AddWorkout")}
                style={styles.circleButton}
            >
                <PlusIcon
                    size="50"
                    color="white"
                    style={{ alignSelf: "center" }}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: "row",
        color: "#06213E",
        alignSelf: "center",
        justifyContent: "center",
        fontSize: 30,
        fontWeight: "bold",
        padding: 2,
        marginTop: -67,
    },
    workout: {
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        padding: 15,
        marginHorizontal: 10,
        marginTop: 9,
    },
    block: {
        flexDirection: "row",
        borderRadius: 7,
        backgroundColor: "#90c1f8",
        padding: 8,
        alignSelf: "flex-start",
        marginTop: 1,
    },
    thrash: {
        flexDirection: "row",
        marginLeft: 315,
        marginTop: -22,
        marginBottom: -9,
    },
    exercise: {
        flexDirection: "row",
        fontSize: 22,
        fontWeight: "900",
        alignSelf: "flex-start",
        marginLeft: 14,
        marginTop: -5,
    },
    circleButton: {
        borderRadius: 60,
        backgroundColor: "#38466E",
        paddingHorizontal: 20,
        marginHorizontal: 150,
        paddingVertical: 20,
        alignContent: "center",
        justifyContent: "center",
        marginTop: 670,
        position: "absolute",
    },
});
