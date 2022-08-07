/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigator from './src/Navigator';
//import type {Node} from 'react';

import {
  Alert,
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './src/Login';


const App = () => {
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState(false)
  useEffect(() => {
    //AsyncStorage.getItem('isLogin').then((value) => { console.log("isLogin: " + value) })
    //console.log("here!! " + AsyncStorage.getItem('isLogin'))
    /*
    if (AsyncStorage.getItem('isLogin') == 'true') {
      console.log("success login")
      console.log("username" + AsyncStorage.getItem('username'))
      axios.defaults.headers.common['Authorization'] = AsyncStorage.getItem('accessToken')

    } else {
      console.log("fail login")
    }
    */
    AsyncStorage.getItem('isLogin', (err, result) => {
      console.log("getItem isLogin return: " + result)
      if (result) {
        console.log("login success")
        AsyncStorage.getItem('username', (err, result) => {
          setUsername(result)
        })
        setLogin(true)
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

  }, [])
  return (<>
    {
      login ? <Text>{username}</Text> : <Text>fail</Text>
    }
    <Login></Login>
  </>)

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
  /* // Stack 이 제공하는 기능
   Using a render callback removes those optimizations. So if you use a render callback, you'll need to ensure that you use
   React.memo or React.PureComponent for your screen components to avoid performance issues.*/
};



export default App;
