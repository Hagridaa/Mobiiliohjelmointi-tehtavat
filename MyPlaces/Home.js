import { StatusBar } from 'expo-status-bar';
import { NavigationContainer} from "@react-navigation/native";

import ShowPlaces from "./ShowPlaces";
import {createStackNavigator} from "@react-navigation/stack";

import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView
} from 'react-native';

import * as SQLite from "expo-sqlite";

import {Input, Button, ListItem, Icon, Header} from "react-native-elements";
import {getBackgroundColor} from "react-native/Libraries/LogBox/UI/LogBoxStyle";

const db = SQLite.openDatabase('myplaces.db');

export default ( { navigation } ) => {
    const [adress, setAdress] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS myplaces (id integer primary key' +
                ' not null, adress text);');
        }, null, updateList);
    }, [])


    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM myplaces;', [], (_, { rows}) =>
                setData(rows._array)
            );
        });
    }
    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO myplaces (adress) VALUES (?);',
                [adress]);
        }, null, updateList);
        setAdress('')
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from myplaces where id = ?;',
                [id]);
        }, null, updateList);
    }

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.adress}</ListItem.Title>
            </ListItem.Content>
            <Text style={{color: 'black'}} onPress={() => navigation.navigate('ShowPlaces', { item })}>show on the map</Text>
            <ListItem.Chevron color="black" onPress={() => deleteItem(item.id)} />
        </ListItem>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Header
                backgroundColor={'white'}
                leftComponent={{text: 'My Places', style: {color: 'black', fontSize: 16, fontWeight: 'bold'}}}
            />
            <View style={styles.textStyles}>
                <Input
                    placeholder={'Type in a adress'}
                    label={'PlaceFinder'}
                    style={styles.inputStyles}
                    value={adress}
                    onChangeText={item => setAdress(item)}
                />

            </View>
            <View>
                <Button raised icon={{name: 'save', color:'white'}} buttonStyle={{backgroundColor: 'grey',height:60}} onPress={saveItem} title="SAVE"/>
            </View>

            <FlatList data={data} renderItem={renderItem} keyExtractor={keyExtractor}

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        /*justifyContent: 'center',
        alignItems: 'center',*/
        // padding: 10
    },
    textStyles: {
        /*alignItems: 'center',
        marginTop: 40*/
    },
    inputStyles: {
        /*borderColor: '#333',
        width: 300,
        height: 40,
        borderWidth: 2,
        paddingBottom: 20*/
    },

    shoppingStyle: {
        alignItems: 'center'
    },
    listcontainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
    }
});




