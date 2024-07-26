import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Modal,
    StatusBar,
} from "react-native";
import { colors } from "../theme";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "../components/TodoList";
import AddListModal from "../components/AddListModal";
import tempData from "../tempData";
import { auth } from "../firebaseConfig";
import { getDocs, collection, query } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

export default function ToDoList() {
    state = {
        user: {},
    };

    const [tasks, setTasks] = useState([]);
    const [addTodoVisible, setTodoVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);
            const taskCollectionRef = collection(userDocRef, "tasks");

            setLoading(true);

            // Create a listener using onSnapshot
            const unsubscribe = onSnapshot(
                taskCollectionRef,
                (querySnapshot) => {
                    const fetchedTasks = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setTasks(fetchedTasks);
                    setLoading(false); // Set loading to false after data is fetched
                }
            );

            // Store the unsubscribe function for later cleanup
            return () => {
                unsubscribe(); // Unsubscribe when the component unmounts
                console.log("Cleanup: Unsubscribed from tasks listener");
            };
        }
    }, []);

    renderList = (list) => {
        return <TodoList list={list} updateList={this.updateList} />;
    };

    /* addList = (list) => {
        this.setState({
            lists: [
                ...this.state.lists,
                { ...list, id: this.state.lists.length + 1, todos: [] },
            ],
        });
    }; 

    UpdateList = (list) => {
        this.setState({
            lists: this.state.lists.map((item) => {
                return item.id === list.id ? list : item;
            }),
        });

    addList = async (list) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);
            const taskCollectionRef = collection(userDocRef, "tasks");

            const newTaskRef = await addDoc(taskCollectionRef, list);
            const newList = { ...list, id: newTaskRef.id, todos: [] };

            setTasks([...tasks, newList]);
        }
    };

    updateList = async (list) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);
            const taskCollectionRef = collection(userDocRef, "tasks");

            const taskDocRef = doc(taskCollectionRef, list.id);
            await updateDoc(taskDocRef, list);

            const updatedTasks = tasks.map((task) =>
                task.id === list.id ? list : task
            );

            setTasks(updatedTasks);
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                visible={addTodoVisible}
                onRequestClose={() => setTodoVisible(false)}
            >
                <AddListModal
                    closeModal={() => setTodoVisible(false)}
                    addList={this.addList}
                />
            </Modal>

            <View>
                <Text>User: {auth.currentUser.displayName}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
                <View style={styles.divider} />
                <Text style={styles.title}>
                    Todo{" "}
                    <Text style={{ fontWeight: "300", color: colors.blue }}>
                        List
                    </Text>
                </Text>
                <View style={styles.divider} />
            </View>

            <View style={{ marginVertical: 48 }}>
                <TouchableOpacity
                    style={styles.addList}
                    onPress={() => setTodoVisible(true)}
                >
                    <AntDesign name="plus" size={16} color={colors.blue} />
                </TouchableOpacity>

                <Text
                    style={{
                        color: colors.blue,
                        fontWeight: "600",
                        marginTop: 8,
                    }}
                >
                    Add List
                </Text>
            </View>

            <View style={{ height: 275, paddingLeft: 32 }}>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.name}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => this.renderList(item)}
                    keyboardShouldPersistTaps="always"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    divider: {
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf: "center",
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal: 64,
    },
    addList: {
        borderWidth: 2,
        borderColor: colors.lightBlue,
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    add: {
        color: colors.blue,
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
    },
});
