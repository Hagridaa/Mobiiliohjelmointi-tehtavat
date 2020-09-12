import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';


export default function App() {

  const [desc, setDesc] = useState(' ');
  const [location, setLocation] = useState(' ');
  const [jobs, setJobs] = useState([]);

  const getJobs = () => {
    const url = 'https://jobs.github.com/positions.json?description='+ desc + '&location=' + location;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setJobs(data);
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
  }


  return (
      <View style={styles.container}>
        <Text>Find Jobs!</Text>
        <StatusBar style="auto" />
        <TextInput style={styles.textInput}
                   value={desc} placeholder="Description"
                   onChangeText={(desc) => setDesc(desc)} />

        <TextInput style={styles.textInput}
                   value={location} placeholder="Location"
                   onChangeText={(location) => setLocation(location)} />
        <Button onPress={getJobs} title="Find" />
        <FlatList
            style={{marginLeft : "5%"}}
            keyExtractor={item => item.id}
            renderItem={({item}) => <Text>{item.title}, {item.company} </Text> }
            data={jobs}
        />
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
});
