import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="LIST" component={SettingScreen} />
          <Tab.Screen name="HOME" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};



