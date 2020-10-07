import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  SafeAreaView
} from 'react-native';
import { Header } from "react-native-elements";

import * as SQLite from "expo-sqlite";

import {Input, Button, ListItem, Icon} from "react-native-elements";

const db = SQLite.openDatabase('shoplist.db');

export default () => {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS shoplist (id integer primary key' +
          ' not null, product text, amount text);');
    }, null, updateList);
  }, [])


  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM shoplist;', [], (_, { rows}) =>
          setData(rows._array)
      );
    });
  }
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO shoplist (product, amount) VALUES (?, ?);',
          [product, amount]);
    }, null, updateList);
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('delete from shoplist where id = ?;',
          [id]);
    }, null, updateList);
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.product}</ListItem.Title>
          <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
        </ListItem.Content>
        <Text style={{color: 'black'}} onPress={() => deleteItem(item.id)}>bought</Text>
        <ListItem.Chevron color="black" onPress={() => deleteItem(item.id)} />
      </ListItem>
  )

  return (
      <SafeAreaView style={styles.container}>
        <Header
        centerComponent={{text: 'SHOPPING LIST', style: {color: 'white'}}}
        />
        <View style={styles.textStyles}>
          <Input
              placeholder={' Product'}
              label={'Product'}
              style={styles.inputStyles}
              value={product}
              onChangeText={item => setProduct(item)}
          />
          <Input
              label={'Amount'}
              placeholder={' Amount'}
              value={amount}
              style={styles.inputStyles}
              onChangeText={item => setAmount(item)}
          />
        </View>
        <View>
          <Button buttonStyle={{backgroundColor: 'grey',height:60}} onPress={saveItem} title="Save"/>
        </View>


        {/*<Text>My shopping List:</Text>
        <View style={styles.shoppingStyle}>
          <FlatList style={{marginLeft : "5%"}}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) =>
                        <View style={styles.listcontainer}><Text>{item.product}, {item.amount} </Text>
                          <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>done</Text>
                        </View>}
                    data={data}
          />
        </View>*/}
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
