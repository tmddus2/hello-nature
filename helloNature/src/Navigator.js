import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Home';
import ChattingScreen from './Chatting'
import LoginScreen from './Login'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="Chat" component={ChattingScreen} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator  initialRouteName="Root" screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Root" component={BottomTabs} />
    </Stack.Navigator>
  );
}

export default RootNavigator;