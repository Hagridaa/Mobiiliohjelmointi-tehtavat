
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default () => {
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState('');
  const plus = () => {
    setResult(Number(text) + (Number(text2)));
  };
  const minus = () => {
    setResult(Number(text) - (Number(text2)));
  };
  return (
    <View style={styles.container}>
      <Text>Calculator</Text>
      <Text>Result: {result}</Text>
      <TextInput
          style={{height: 40}}
          placeholder="Type here the first number"
          onChangeText={text => setText(text)}
         keyboardtype={'numeric'}
      />
      <TextInput
          style={{height: 40}}
          placeholder="Type here the second number"
          onChangeText={text2 => setText2(text2)}
          keyboardtype={'numeric'}
      />
      <View style={styles.buttonStyle}>
        <Button onPress={() => plus()} title="+"/>
        <Button onPress={() => minus()} title="-"/>
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
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
    height: 40
  }
});

