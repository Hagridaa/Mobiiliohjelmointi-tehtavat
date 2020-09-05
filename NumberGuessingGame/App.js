
import React from 'react';
import {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

export default function App() {
  const [randomNumber, setrandomNumber] = useState('');
  useEffect(() => {
    setrandomNumber(Math.floor(Math.random() * 100) + 1);
  }, []);
  const [guessed, setGuessed] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState('');

  const makeGuess = () => {
    setCount(count + 1);
    if (guessed < randomNumber) {
      setResult(`Your guess ${guessed} is too low`)
    } else if (guessed > randomNumber) {
      setResult(`Your guess ${guessed} is too high`)
    } else {
      Alert.alert(`You guessed the number in ${count} guesses`)
    }
  };

  return (
      <View style={styles.container}>
        <Text>{result}</Text>
        <TextInput
            style={styles.textInputStyle}
            onChangeText={guessed => setGuessed(guessed)}
            value={guessed}
            keyboardType={'numeric'}
        />
        <View style={styles.buttonStyle}>
          <Button onPress={() => makeGuess()} title="GUESS A NUMBER"/>
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
  textInputStyle: {
    textAlign: 'center',
    width: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#009',
    marginBottom: 10
  },
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    height: 50,
  }
});