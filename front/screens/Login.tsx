import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}: {navigation: any}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    const onSubmit = async() => {
        await AsyncStorage.setItem('token', username)
        if(username === 'parkheesoo' && password === '123456'){
            console.log('Nice')
            navigation.navigate('Home')
        }else{
            console.log('pas tes nice')
        }
    }

  return (
    <View style={styles.container}>
        <TextInput onChangeText = {(value) => setUsername(value)} placeholder="Username" />
        <TextInput secureTextEntry onChangeText = {(value) => setPassword(value)} placeholder="Password" />
        <Button onPress = {onSubmit} title = "Se connecter" />
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
