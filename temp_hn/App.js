import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

import Register from './screens/Register'
import FirstScreen from './screens/FirstScreen'
import Home from './screens/Home'
import Login from './screens/Login'
import RegisterPlant from './screens/RegisterPlant';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name ="RegisterPlant" component={RegisterPlant}/>
        <Stack.Screen name ="Register" component={Register}/>
        <Stack.Screen name = "FirstScreen" component={FirstScreen}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
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