import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal } from "react-native";
import { colors } from '../theme '
import { AntDesign } from '@expo/vector-icons';
import TodoList from '../components/TodoList';

export default function ToDoList() {  
    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row"}}>
                <View style={styles.divider} />
                <Text style={styles.title}>
                    Todo <Text style={{fontWeight: "300", color: colors.blue }}>Lists</Text>
                </Text>
                <View style={styles.divider} />
            </View>

            <View style={{marginVertical:48}}>
                <TouchableOpacity style={styles.addList}>
                    <AntDesign name="plus" size={16} color={colors.blue} />
                </TouchableOpacity>

                <Text style={{color: colors.blue, fontWeight: "600", marginTop: 8}}>Add List</Text>
            </View>

            <View style={{height: 275, paddingLeft: 32}}>
                <FlatList
                    data={tempData}
                    keyExtractor={item => item.name}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => <TodoList list={item} />}
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
    }
})

const tempData = [
    {
        name: "Plan a Trip",
        color: "#24A6D9",
        todos: [
            { title: "Book Flight", completed: false },
            { title: "Passport Check", completed: true },
            { title: "Reserve Hotel Room", completed: true },
            { title: "Pack Luggage", completed: false }
        ]
    },
    {
        name: "Errands",
        color: "#8022D9",
        todos: [
            { title: "Buy Milk", completed: false },
            { title: "Go to Gym", completed: true },
            { title: "Pay Bills", completed: true }
        ]
    },
    {
        name: "Birthday Party",
        color: "#595BD9",
        todos: [
            { title: "Buy Gift", completed: false },
            { title: "Send Invites", completed: false },
            { title: "Make Dinner Reservations", completed: true }
        ]
    }
]