import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

import HomeScreen from './Home';
import ChattingScreen from './Chatting'
import LoginScreen from './Login'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {globalStyles} from '../styles/global';


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
    setTimeout(() => {

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

            navigation.replace(result === true ? 'Login' : 'Root');

          } else {
            console.log("login fail")
            navigation.replace('Login');

          }
        })

        AsyncStorage.getItem('isLogin', (err, result) => {
          if (result) {
            AsyncStorage.getItem('accessToken', (err, result) => {
              axios.defaults.headers.common['Authorization'] = result
            })
          }
        })
     }, 1000);
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
    <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Root" component={BottomTabs} />
    </Stack.Navigator>
    //</UserProvider>
  );
}

//screenOptions={{headerTitleAlign: 'center'}}
export default RootNavigator;