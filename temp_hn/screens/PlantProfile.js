import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Animated } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlantProfileMainScreen from './PlantProfileMainScreen';

export default function PlantProfile({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(null)

  const Stack = createNativeStackNavigator();

  const onSubmit = async () => {
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
    // <View style>
    //     <Animated.View>
    //         <View style={styles.topContainer}>
    //             <View style={{flexDirection:'row', alignItems:'center'}}>
    //                 <Image source = {{uri:'https://cdn-icons-png.flaticon.com/512/892/892926.png'}} style={styles.PlantProfileimage}></Image>
    //                 <Text style={styles.topText}>    Fejka</Text>
    //             </View>
    //             <TouchableOpacity>
    //                 <Image source = {{uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'}} style = {styles.image}/>
    //             </TouchableOpacity>
    //         </View>  
    //         <View component={MainScreen}></View>
    //     </Animated.View> 
    // </View>
    <Stack.Navigator>
        <Stack.Screen style={styles.topText}
          name="Fejka"
          component={PlantProfileMainScreen}
          options={{
            headerShown: true, // 머티리얼 상단 내비게이터는 기본 헤더가 없음
            headerTintColor: '#5b5b5b',
            headerTitleAlign:'center',
          }}
        />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    
});
