//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(null)

  const onSubmit = async () => {
    await AsyncStorage.setItem('token', username)
        if(username === 'parkheesoo' && password === '123456'){
            console.log('Nice')
            navigation.navigate('Home')
        }else{
            console.log('pas tes nice')
        }

    // await AsyncStorage.setItem('token', username)
    // var requestBody = {
    //   username: username,
    //   password: password
    // }

    // axios.post("http://10.0.2.2:8080/api/signin", requestBody)
    //   .then(res => {
    //     //console.log("->", res.data)
    //     if (res.data) {
    //       AsyncStorage.multiSet([
    //         ['isLogin', 'true'],
    //         ['accessToken', `Bearer ${res.headers.auth_token}`],
    //         ['username', `${res.data.username}`]
            
    //       ])
    //     } else {
    //       console.log("fail " + res.data.message)
    //     }
    //   }).catch(error => console.log(error));

    // await AsyncStorage.getItem('accessToken', (err, result) => {
    //   axios.defaults.headers.common['Authorization'] = result
    // })
    // navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
        <Text style={styles.signupText}>SIGN-UP</Text>
        <TextInput onChangeText={(value) => setUsername(value)} placeholder="ID" style={styles.input}/>
        <TextInput onChangeText={(value) => setEmail(value)} placeholder="E-mail" style={styles.input}/>
        <TextInput secureTextEntry onChangeText={(value) => setPassword(value)} placeholder="Password" style={styles.input}/>
        
        <TouchableOpacity onPress={onSubmit} style = {styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>SIGN UP</Text>
        </TouchableOpacity>
      {/* <Text>username : {username}</Text>
      <Text>password : {password}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  signupText:{
        fontSize:50,
        fontWeight:'bold',
        color:'#6E8B3D',
        marginBottom:20,
      },
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
