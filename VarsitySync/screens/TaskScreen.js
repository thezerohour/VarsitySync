import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Modal,
} from "react-native";
import { colors } from "../theme ";
import { AntDesign } from "@expo/vector-icons";
import TodoList from "../components/TodoList";
import AddListModal from "../components/AddListModal";
import tempData from "../tempData";
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

addList = async (list) => {
    try {
        const userListsRef = doc(db, "users", auth.currentUser.uid, "lists");
        const userListsSnapshot = await getDoc(userListsRef);
        if (userListsSnapshot.exists()) {
            const lists = userListsSnapshot.data().lists;
            const updatedLists = [...lists, list];
            await setDoc(userListsRef, { lists: updatedLists });
            this.setState({ lists: updatedLists });
        } else {
            await setDoc(userListsRef, { lists: [list] });
            this.setState({ lists: [list] });
        }
    } catch (error) {
        console.log(error);
    }
}

updateList = async (list) => {
    try {
        const userListsRef = doc(db, "users", auth.currentUser.uid, "lists");
        const userListsSnapshot = await getDoc(userListsRef);
        if (userListsSnapshot.exists()) {
            const lists = userListsSnapshot.data().lists;
            const updatedLists = lists.map((item) => {
                return item.id === list.id ? list : item;
            });
            await setDoc(userListsRef, { lists: updatedLists });
            this.setState({ lists: updatedLists });
        }
    } catch (error) {
        console.log(error);
    }
}

export default class ToDoList extends React.Component {
    state = {
        addTodoVisible: false,
        user: auth.currentUser,
        lists: []
    };


    fetchLists = async () => {
        try {
            const userListsRef = doc(db, "tasks", auth.currentUser.uid);
            const userListsSnapshot = await getDoc(userListsRef);
            if (userListsSnapshot.exists()) {
                const lists = userListsSnapshot.data();
                this.setState({ lists: lists });
                console.log(lists);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, 'todos');

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos = [];
                snapshot.docs.forEach((doc) => {
                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                setTodos(todos);
            }
        });

        // // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    componentDidMount() {
        this.fetchLists();


        
    }
    
    toggleAddTodoModal() {
        this.setState({ addTodoVisible: !this.state.addTodoVisible });
    }

    renderList = (list) => {
        return <TodoList list={list} updateList={this.updateList} />;
    };

    addList = (list) => {
        this.setState({
            lists: [
                ...this.state.lists,
                { ...list, id: this.state.lists.length + 1, todos: [] },
            ],
        });
    };

    updateList = (list) => {
        this.setState({
            lists: this.state.lists.map((item) => {
                return item.id === list.id ? list : item;
            }),
        });
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    visible={this.state.addTodoVisible}
                    onRequestClose={() => this.toggleAddTodoModal()}
                >
                    <AddListModal
                        closeModal={() => this.toggleAddTodoModal()}
                        addList={this.addList}
                    />
                </Modal>

                <View>
                    <Text>User: {this.state.user.displayName}</Text>
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
                        onPress={() => this.toggleAddTodoModal()}
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
                        data={this.state.lists}
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
