import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FirstScreen({navigation}) {
  return (
    <View style = {styles.container}>
        <Image source = {{uri: 'https://cdn-icons-png.flaticon.com/512/3090/3090490.png'}} style = {styles.image}/>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style = {styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style = {styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>SIGN UP</Text>
        </TouchableOpacity>
        <Text style = {styles.otherText}>계정 찾기  |  버전 정보</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
        marginTop:100,
        height: 300,
        width: 300,
    },
    container:{
        height: '100%',
        width: '100%',
        backgroundColor:'#d9ead3',
        flex:1,
        alignItems: "center",
    },
    buttonTextStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:15,
    },
    otherText:{
        color:'#444444',
        fontWeight:'bold',
        fontSize:12,
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
        marginBottom:30,
    }
});
