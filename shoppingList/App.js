import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';
;

export default function App() {

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
