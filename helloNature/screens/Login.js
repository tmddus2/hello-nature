//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const onSubmit = async() => {
    var requestBody = {
      username: username,
      password: password
    }

    await axios.post("http://192.168.0.15:8080/api/signin", requestBody)
            .then(res => {
                console.log("->",res.data)
                if (res.data) {
                    AsyncStorage.multiSet([
                        ['isLogin', 'true'],
                        ['accessToken', `Bearer ${res.headers.auth_token}`],
                        ['username', `${res.data.username}`]
                    ])
                    navigation.navigate('Home');
                } else {
                    console.log("fail " + res.data.message)
                }
            }).catch(error => console.log(error+requestBody.username));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>LOG-IN</Text>
      <TextInput onChangeText={(value) => setUsername(value)} placeholder="ID" style={styles.input}/>
      <TextInput secureTextEntry onChangeText={(value) => setPassword(value)} placeholder="Password" style={styles.input}/>
      <TouchableOpacity onPress={onSubmit} style = {styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>SIGN IN</Text>
      </TouchableOpacity>
      <Text style={styles.otherText}>Forgot your Password or Username?  |  Sign Up</Text>
      {/* <Text>username : {username}</Text>
      <Text>password : {password}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    width:'70%',
    color:"gray",
    fontWeight:'bold',
    backgroundColor:'white',
    fontSize:15,
    marginBottom:20,
    borderRadius:20,
    padding:10
  },
  loginText:{
    fontSize:50,
    fontWeight:'bold',
    color:'#6E8B3D',
    marginBottom:20,
  },
  otherText:{
    color:'gray',
    fontWeight:'bold',
    fontSize:12,
  },
  container: {
    flex: 1,
    backgroundColor:'#d9ead3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle:{
    color:'white',
    fontWeight:'bold',
    fontSize:15,
  },
  buttonStyle:{
    borderWidth:2,
    borderColor:'#6E8B3D',
    width:290,
    height:45,
    borderRadius:20,
    backgroundColor: '#6E8B3D',
    alignItems: "center",
    justifyContent :'center',
    marginBottom:10,
  },
});
