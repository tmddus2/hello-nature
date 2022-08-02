/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
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


const App = () => {
  const [message, setMessage] = useState("")


  useEffect(() => {
    axios.get("http://10.0.2.2:8080/test")
      .then((response) => {
        setMessage(response)
      })
      .catch((error) => {
        console.log("error: " + error)
      })

  }, [])



  return (<Text>{message.data}</Text>)

};



export default App;
