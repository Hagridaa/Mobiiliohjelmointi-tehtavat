import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  SafeAreaView
} from 'react-native';


import * as SQLite from "expo-sqlite";

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

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.textStyles}>
          <TextInput
              placeholder={' Product'}
              style={styles.inputStyles}
              value={product}
              onChangeText={item => setProduct(item)}
          />
          <TextInput
              placeholder={' Amount'}
              value={amount}
              style={styles.inputStyles}
              onChangeText={item => setAmount(item)}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Button onPress={saveItem} title="Save"/>
        </View>

        <Text>My shopping List:</Text>
        <View style={styles.shoppingStyle}>
          <FlatList style={{marginLeft : "5%"}}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) =>
                        <View style={styles.listcontainer}><Text>{item.product}, {item.amount} </Text>
                          <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>done</Text>
                        </View>}
                    data={data}
          />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 130
  },
  textStyles: {
    alignItems: 'center',
    marginTop: 40
  },
  inputStyles: {
    borderColor: '#333',
    width: 300,
    height: 40,
    borderWidth: 2,
    paddingBottom: 20
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
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