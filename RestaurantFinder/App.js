import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Alert} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Geocoder from 'react-native-geocoding';



export default function App() {

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(60.200692)
  const [longitude, setLongitude] = useState(24.934302)
  const [restaurants, setRestaurants] = useState([])

  Geocoder.init('YourOwnKeyHere',{language:'fi'})
  const find = async () => {
    await Geocoder.from(address)
        .then(json => {
          const cordinates = json.results[0].geometry.location
          setLatitude(cordinates.lat)
          setLongitude(cordinates.lng)
        })
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&type=restaurant&key=YourOwnKeyHere`
        console.log('fetching from ', url)
            await fetch(url)
                .then(data => data.json())
            .then(restaurant => console.log(restaurant))
            .then(restaurant => setRestaurants(restaurant.results)
            ).catch(message => console.log('Restaurant fetching went wrong ', message))
  }
  return (
      <View style={styles.container}>
        <MapView
            style={{ flex: 1,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
            }}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            }}
        >
            {restaurants.map(marker => (
                <Marker
                    description={marker.vicinity}
                    key={marker.place_id}
                    coordinate={{
                        latitude: marker.geometry.location.lat,
                        longitude: marker.geometry.location.lng
                    }}
                    title={marker.name}/>
            ))}


        </MapView>

        <TextInput placeholder="type address" value={address} style={styles.textInput}
                   onChangeText={address => setAddress(address)}
        />

        <Button style={styles.button} title={'FIND'}
                onPress={find}
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
    backgroundColor: 'white',
    width: '100%',
    height: 60,
    paddingTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2
  }     ,

  button: {
    backgroundColor: 'grey'
  }
});
