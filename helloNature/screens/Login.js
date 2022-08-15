//import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  const onSubmit = async () => {
    await AsyncStorage.setItem('token', username)
    /*
    if (username === 'parkheesoo' && password === '123456') {
      console.log('Nice')
      navigation.navigate('Home')
    } else {
      console.log('pas tes nice')
    }
    */
    var requestBody = {
      username: username,
      password: password
    }
    axios.post("http://10.0.2.2:8080/api/signin", requestBody)
      .then(res => {
        console.log("->", res.data)
        if (res.data) {
          AsyncStorage.multiSet([
            ['isLogin', 'true'],
            ['accessToken', `Bearer ${res.headers.auth_token}`],
            ['username', `${res.data.username}`]
          ])
          navigation.navigate('Home')
        } else {
          console.log("fail " + res.data.message)
        }
      }).catch(error => console.log(error));

  }

  return (
    <View style={styles.container}>
      <TextInput onChangeText={(value) => setUsername(value)} placeholder="Username" />
      <TextInput secureTextEntry onChangeText={(value) => setPassword(value)} placeholder="Password" />
      <Button onPress={onSubmit} title="Se connecter" />
      <Text>username : {username}</Text>
      <Text>password : {password}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
