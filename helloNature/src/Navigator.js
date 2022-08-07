import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Home';
import ChattingScreen from './Chatting'
import LoginScreen from './Login'
//import UserProvider from './shared/UserContext';
//import useUserState from './shared/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {globalStyles} from '../styles/global';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={ChattingScreen} />
    </Tab.Navigator>
  );
}

function SplashScreen({navigation}){

  const [animating, setAnimating] = useState(true);
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState(false)
  useEffect(() => {

    AsyncStorage.getItem('isLogin', (err, result) => {

      console.log("getItem isLogin return: " + result)
      if (result) {
        console.log("login success")
        AsyncStorage.getItem('username', (err, result) => {
          setUsername(result)
          console.log("login success", result)
        })
        setLogin(true)
        setAnimating(false);

        navigation.replace(result === null ? 'Login' : 'Root');

      } else {
        console.log("login fail")
      }
    })

    AsyncStorage.getItem('isLogin', (err, result) => {
      if (result) {
        AsyncStorage.getItem('accessToken', (err, result) => {
          axios.defaults.headers.common['Authorization'] = result
        })
      }
    })

  }, []);

   return (
      <View>
        <Image
          source={require('./green.png')}
          style={{width: 55, resizeMode: 'contain', margin: 30}}
        />
        <ActivityIndicator
          animating={animating}
          color="#6990F7"
          size="large"
          style={globalStyles.activityIndicator}
        />
      </View>
    );

 }


function RootNavigator() {
  //const { user } = useUserState();


  return (
    //<UserProvider>
    <Stack.Navigator>

          <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Root" component={BottomTabs} />

    </Stack.Navigator>
    //</UserProvider>
  );
}

//screenOptions={{headerTitleAlign: 'center'}}
export default RootNavigator;