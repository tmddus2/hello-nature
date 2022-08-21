import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

import PlantProfile from './screens/PlantProfile'
import Register from './screens/Register'
import FirstScreen from './screens/FirstScreen'
import ArScreen from './screens/ArScreen';
import Home from './screens/Home'
import Login from './screens/Login'
import RegisterPlant from './screens/RegisterPlant';
import ChattingRoomScreen from './chatbot/ChattingRoomScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="ArScreen" component={ArScreen} />
        <Stack.Screen name="PlantProfile" component={PlantProfile} />
        <Stack.Screen name="RegisterPlant" component={RegisterPlant} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChattingRoomScreen" component={ChattingRoomScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})