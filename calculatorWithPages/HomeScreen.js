
import React from "react";
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';


export default function HomeScreen({ route, navigation }) {
    const { result } = route.params;
    return (
        <View style={styles.container}>
            <Text>This is homescreen</Text>
            <View style={styles.list}>
                <Text>Shoppinglist:</Text>
                <FlatList
                    data={result}
                    renderItem={({item}) =>
                        <Text>{item.key}</Text>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100
    }
});