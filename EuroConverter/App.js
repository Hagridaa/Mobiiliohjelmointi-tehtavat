import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, Picker } from 'react-native';



export default function App() {

  const [resultEuros, setResultEuros] = useState('');
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [index, setIndex] = useState('');

  useEffect(() => {
    getRates()
  }, []);



  const getRates = () => {

    const url = 'http://data.fixer.io/api/latest?access_key=KEY&format=1';
    fetch(url)
        .then((response) => response.json())
        /*.then(json => console.log(json))*/
        .then((data) => {
          setRates(data.rates);

        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
  }

  const convert = () => {
    const calculateEuros = (Number(amount / rate).toFixed(2))

    setResultEuros(calculateEuros);
  }


  return (
      <View style={styles.container}>
        <Text>Find rates!</Text>
        <StatusBar style="auto" />

        <Text>{resultEuros}€</Text>
        <TextInput style={styles.textInput}
                   keyboardType={"numeric"}
                   value={amount} placeholder="give amount in Euros"
                   onChangeText={(amount) => setAmount(amount)} />
        <Picker
            style={styles.picker}
            selectedValue={rate}
            onValueChange={
              (itemValue, itemIndex) => {
                setRate(itemValue);
                setIndex(itemIndex);
              }
            }>
          {Object.keys(rates).map((key) => {
            return <Picker.Item label={key} value={rates[key]} key={index}/>
          })
          }
        </Picker>


        <Button onPress={convert} title="Convert" />

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
  textInput: {
    width: 200,
    borderBottomColor: 'black',
    borderWidth: 2,
    height: 50,

  },
  img: {
    width: 60,
    height: 60
  },

    picker: {
      width: 100,
        height: 50
    }
});
