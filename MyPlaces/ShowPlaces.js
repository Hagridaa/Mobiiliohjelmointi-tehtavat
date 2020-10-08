import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Geocoder from 'react-native-geocoding';
import {Button} from "react-native-elements";



export default function App( { route } ) {
    const { item } = route.params;

    const [latitude, setLatitude] = useState(60.200692)
    const [longitude, setLongitude] = useState(24.934302)

    Geocoder.init('AIzaSyBaNI5rqPLOI5HNe4LnFK6GDfShszmg3OU',{language:'fi'})
    const find = async () => {
        Geocoder.from(item.adress)
            .then(json => {
                const cordinates = json.results[0].geometry.location
                setLatitude(cordinates.lat)
                setLongitude(cordinates.lng)
            })
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
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude}}
                    title={item.adress} />
            </MapView>

            {/*<TextInput placeholder="type address" value={address} style={styles.textInput}
                       onChangeText={address => setAddress(address)}
            />*/}

            <Button title={'show'}
                    onPress={find}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        /*alignItems: 'center',
        justifyContent: 'center',*/
    },

    textInput: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        paddingTop: 10,
        marginBottom: 10,
        borderBottomWidth: 2
    }     ,

});
