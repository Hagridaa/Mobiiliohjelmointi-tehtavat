import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, Alert, Image } from 'react-native';



export default function App() {

  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
      // const url = 'https://jobs.github.com/positions.json?description='+ desc + '&location=' + location;
      const url = 'http://www.recipepuppy.com/api/?i='+ ingredient;
      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              setRecipes(data.results);
          })
          .catch((error) => {
              Alert.alert('Error', error);
          });
  }

  
  return (
    <View style={styles.container}>
      <Text>Find recipes!</Text>
      <StatusBar style="auto" />
      <TextInput style={styles.textInput}
                 value={ingredient} placeholder="Ingredient"
                 onChangeText={(ingredient) => setIngredient(ingredient)} />


       <Button onPress={getRecipes} title="Find" />
        <FlatList
            data={recipes}
            style={{marginLeft : "5%"}}
            keyExtractor={item => item.id}
            renderItem={({item}) =>

                <View>
                <Text>{item.title} </Text>

                <Image style={styles.img}
                source={{uri: item.thumbnail}}/>
                </View>
            }/>
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
});
