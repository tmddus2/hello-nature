//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)

  const onSubmit = async () => {
    await AsyncStorage.setItem('token', username)


    var requestBody = {
      username: username,
      password: password
    }
    axios.post("http://10.0.2.2:8080/api/signin", requestBody)
      .then(res => {
        //console.log("->", res.data)
        if (res.data) {
          AsyncStorage.multiSet([
            ['isLogin', 'true'],
            ['accessToken', `Bearer ${res.headers.auth_token}`],
            ['username', `${res.data.username}`]
          ])


        } else {
          console.log("fail " + res.data.message)
        }
      }).catch(error => console.log(error));

    await AsyncStorage.getItem('accessToken', (err, result) => {
      axios.defaults.headers.common['Authorization'] = result
    })

    navigation.navigate('Home')


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
