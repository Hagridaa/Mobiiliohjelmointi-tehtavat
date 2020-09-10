import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';


export default function SettingScreen({ navigation }) {
    const [text, setText] = useState('');
    const [result, setResult] = useState([]);

    const buttonPressed = () => {
        setResult([...result,{key: text}]);
        setText('');
    }

    const buttonPressed2 = () => {
        setResult('');
    }
    return (
        <View style={styles.container}>
            <Text>Shoppinglist</Text>
            <TextInput style={styles.textInput} onChangeText={text => setText(text)} value={text}/>
            <StatusBar style="auto" />

            <View style={styles.buttons}  >
                <Button onPress={buttonPressed} title="add"/>
                <Button onPress={buttonPressed2} title="clear"/>
                <Button onPress={() => navigation.navigate('HOME', {result: result})} title="show list on homepage"/>
            </View>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 100
    },

    textInput: {
        width: 200,
        borderBottomColor: 'black',
        borderWidth: 2,
        height: 50,

    },

    list: {
        flex:1,
        alignItems: 'center',
        paddingTop:50
    },

    buttons: {
        flexDirection: 'row',
        paddingTop: 20
    }
});
