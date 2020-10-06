import React, { useState,} from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [say, setSaying] = useState('');

  const speak = () => {

    Speech.speak(say);
  }

  {
    return (
        <View style={styles.container}>

          <TextInput placeholder="type thinks to say" value={say} style={styles.textInput}
                     onChangeText={ say => setSaying(say)}
          />
          <Button title="Press to hear some words" onPress={speak} />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    paddingTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2
  }
});
