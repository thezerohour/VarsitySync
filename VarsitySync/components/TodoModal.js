import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    TextInput,
    Keyboard
} from "react-native";
import React, { Component } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { TrashIcon } from "react-native-heroicons/outline";

export default class TodoModal extends Component {
    state = {
        newTodo: "",
        list: this.props.list,
    };

    handleUpdateList = async () => {
        const currentUser = auth.currentUser;
        const taskID = this.state.list.id;
        console.log("Task ID: ", taskID);
        if (currentUser) {
            const uid = currentUser.uid;
            const taskDocRef = doc(db, "users", uid, "tasks", taskID);

            try {
                await updateDoc(taskDocRef, {
                    todos: this.props.list.todos,
                });
                console.log("Event updated successfully!");
            } catch (error) {
                console.error("Error updating event:", error);
                alert(`An error occurred: ${error.message}`);
            }
        }
    };

    deleteTodo = index => {
        let list = this.props.list;
        list.todos.splice(index, 1);
        this.handleUpdateList(list);
    }

    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;
        this.handleUpdateList(list);
    }

    addTodo = () => {
        let list = this.props.list;
        list.todos.push({ title: this.state.newTodo, completed: false });
        this.handleUpdateList(list);
        this.setState({ newTodo: "" });
        Keyboard.dismiss();
    }

    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.deleteTodo(index)}>
                        <TrashIcon marginRight='25' size="24" color="#06213E"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)} >
                    <Ionicons
                        name={

                            todo.completed ? "checkbox-outline" : "square-outline"
                        }
                        size={24}
                        color={colors.gray}
                        style={{ width: 32 }}
                    />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.todo,
                        {
                            textDecorationLine: todo.completed
                                ? "line-through"
                                : "none",
                            color: todo.completed ? colors.gray : colors.black,
                        },
                    ]}
                >
                    {todo.title}
                </Text>
            </View>
        );
    };

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(
            (todo) => todo.completed
        ).length;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            top: 64,
                            right: 32,
                            zIndex: 10,
                        }}
                        onPress={this.props.closeModal}
                    >
                        <AntDesign
                            name="close"
                            size={24}
                            color={colors.black}
                        />
                    </TouchableOpacity>
                    <View
                        style={[
                            styles.section,
                            styles.header,
                            { borderBottomColor: list.color },
                        ]}
                    >
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} tasks
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flex: 3 }]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({ item, index }) => this.renderTodo(item, index)}
                            keyExtractor={(item) => item.title}
                            contentContainerStyle={{
                                paddingHorizontal: 32,
                                paddingVertical: 64,
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={[styles.section, styles.footer]}>
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            onChangeText={(text) => this.setState({ newTodo: text })}
                            value={this.state.newTodo}
                        />
                        <TouchableOpacity
                            style={[
                                styles.addTodo,
                                { backgroundColor: list.color },
                            ]}
                            onPress={() => this.addTodo()}
                        >
                            <AntDesign
                                name="plus"
                                size={16}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        alignSelf: "stretch",
    },
    header: {
        padding: 16,
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.black,
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600",
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16,
    },
});
