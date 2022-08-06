/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigator from './src/Navigator';
//import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const AuthUserContext = React.createContext('user');


function App() {
  // const [message, setMessage] = useState("")
  /*useEffect(() => {
    axios.get("http://10.0.2.2:8080/test")
      .then((response) => {
        setMessage(response)
      })
      .catch((error) => {
        console.log("error: " + error)
      })

  }, [])*/

  return (
   <NavigationContainer>
        <RootNavigator/>
   </NavigationContainer>
  )
    /* // Stack 이 제공하는 기능
     Using a render callback removes those optimizations. So if you use a render callback, you'll need to ensure that you use
     React.memo or React.PureComponent for your screen components to avoid performance issues.*/
};



export default App;
