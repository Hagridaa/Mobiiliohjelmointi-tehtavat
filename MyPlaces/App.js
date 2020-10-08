import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from "@react-navigation/native";
import Home from "./Home";
import ShowPlaces from "./ShowPlaces";
import {createStackNavigator} from "@react-navigation/stack";


const Stack = createStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="ShowPlaces" component={ShowPlaces} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};



