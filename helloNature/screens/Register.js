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
    var requestBody = {
      username: username,
      password: password,
      email: email,
      profile : 'https://cdn-icons-png.flaticon.com/512/747/747545.png',
    }

    axios.post("http://10.0.2.2:8080/api/signup", requestBody)
      .then(res => {
        if (res.data) {
          navigation.navigate('FirstScreen')
        } else {
          console.log("fail " + res.data.message)
        }
      }).catch(error => console.log(error));
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
