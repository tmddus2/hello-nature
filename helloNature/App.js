/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigator from './src/Navigator';
//import type {Node} from 'react';

//global.Buffer = global.Buffer || require('buffer').Buffer; // Buffer 추가


const App = () => {
  /*
  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState(false)

  useEffect(() => {
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

  */
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )

};



export default App;
