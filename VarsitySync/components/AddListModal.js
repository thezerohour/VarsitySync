import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../theme";
import { addDoc, collection, doc } from "firebase/firestore";
import tempData from "../tempData";
import { auth, db } from "../firebaseConfig";

export default class AddListModal extends Component {
    backgroundColors = [
        "#5CD859",
        "#24A6D9",
        "#595BD9",
        "#8022D9",
        "#D159D8",
        "#D85963",
        "#D88559",
    ];
    state = {
        name: "",
        color: this.backgroundColors[0],
    };

    handleAddList = async () => {
        if (!this.state.name) {
            alert("Please fill in a name.");
            return;
        }

        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userDocRef = doc(db, "users", uid);
            const taskCollectionRef = collection(userDocRef, "tasks");

            try {
                await addDoc(taskCollectionRef, {
                    color: this.state.color,
                    name: this.state.name,
                    todos: [],
                });
                console.log("Event added successfully!");
                alert("Event added successfully!");
                this.props.closeModal(); // Navigate back to previous screen
            } catch (error) {
                console.error("Error adding event:", error);
                alert(`An error occurred: ${error.message}`);
            }
        }
    };

    renderColors() {
        return this.backgroundColors.map((color) => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            );
        });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity
                    style={{ position: "absolute", top: 64, right: 32 }}
                    onPress={this.props.closeModal}
                >
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
                    <Text style={styles.title}>Create Todo List</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="List Name?"
                        onChangeText={(text) => this.setState({ name: text })}
                    />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                        }}
                    >
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.create,
                            { backgroundColor: this.state.color },
                        ]}
                        onPress={this.handleAddList}
                    >
                        <Text
                            style={{ color: colors.white, fontWeight: "600" }}
                        >
                            Create!
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginBottom: 16,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
});
