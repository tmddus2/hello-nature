import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Home';
import ChattingScreen from './Chatting'
import LoginScreen from './Login'
//import UserProvider from './shared/UserContext';
//import useUserState from './shared/UserContext';

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

const isLogin = false;

function RootNavigator() {
  //const { user } = useUserState();

  return (
    //<UserProvider>
        <Stack.Navigator>
            { isLogin?(
                <Stack.Screen name="Login" component={LoginScreen}/>
            ):(
                <Stack.Screen name="Root" component={BottomTabs} />
            )}
        </Stack.Navigator>
    //</UserProvider>
  );
}

//screenOptions={{headerTitleAlign: 'center'}}
export default RootNavigator;