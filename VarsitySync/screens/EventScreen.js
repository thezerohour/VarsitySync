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
import { doc, getDocs, updateDoc, arrayRemove, orderBy } from "firebase/firestore";
import { collection, query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";

import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { TrashIcon, PlusIcon } from "react-native-heroicons/outline";

export default function EventScreen() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);
            const eventCollectionRef = collection(userDocRef, "schedules");
    
            const q = query(
                eventCollectionRef,
                orderBy("date", "asc"),
            );
    
            // Introduce a loading state
            setLoading(true);
    
            // Create a listener using onSnapshot
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedEvents = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setEvents(fetchedEvents);
                setLoading(false); // Set loading to false after data is fetched
            });
    
            // Cleanup function to unsubscribe from the listener
            return () => {
                unsubscribe();
                console.log("Cleanup: Unsubscribed from events listener");
            };
        }
    }, []);
    

    const handleDeleteEvent = async (item) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid, "schedules", item.id);

            try {
                await deleteDoc(userDocRef);
                console.log("Event deleted");
            } catch (error) {
                console.error("Error deleting events:", error);
                alert(`An error occurred: ${error.message}`);
            }
        }
    };

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="mt-5">
                <View
                    className="flex-row justify-start"
                    style={{ height: 70 }}
                >
                </View>

                <Text style={styles.heading}>My Events</Text>

                <View style={{ marginTop: 15 }}>
                    <FlatList
                        data={events}
                        keyExtractor={(item, index) => index.toString()}
                        
                        renderItem={({ item }) => (
                            <View style={styles.events}>
                                <TouchableOpacity
                                    onPress={() => handleDeleteEvent(item)}
                                    style={styles.thrash}
                                >
                                    <TrashIcon size="28" color="#06213E" />
                                </TouchableOpacity>

                                <Text style={styles.exercise}>
                                    {item.eventName} - {item.description} - {item.date}
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>

            <TouchableOpacity
                onPress={() => navigation.navigate("AddEvent")}
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
    events: {
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
        marginTop: -3,
        marginLeft: 0,
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