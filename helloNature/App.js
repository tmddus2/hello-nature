/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
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

  const googleLogin = ({ url }) => {
    useCallback(async () => {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Alert.alert("can not open URL")
      }
    }, [url])

    //Linking.openURL("http://localhost:8080/login/oauth2/code/google")
  }


  return (<>
    <Text>{message.data}</Text>
    <Button title="google-login" onPress={googleLogin("http://localhost:8080/login/oauth2/code/google")}></Button>
  </>)

};



export default App;
