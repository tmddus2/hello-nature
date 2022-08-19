import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
/*
export default function Home({ navigation }) {

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    navigation.navigate('Login')
  }
*/
export default function Home({ navigation }) {
  const [username, setUsername] = useState('')
  const [plantList, setPlantList] = useState('')
  const [plants, setPlants] = useState('')

  const todayTime = () =>{
    let now = new Date();
    let todayYear = now.getFullYear() - 2000;
    let todayMonth = now.getMonth() +  1;
    let todayDate = now.getDate();
    const week = ['sun', 'mon', 'tue','wed','thu','fri', 'sat']
    let dayOfWeek =week[now.getDay()];

    return todayYear + '-' + todayMonth +'-' +todayDate +' ' + dayOfWeek;
  }
  useEffect(() => {
    //setTimeout(() => {
    AsyncStorage.getItem('isLogin', (err, result) => {

      console.log("getItem isLogin return: " + result)
      if (result) { // login success
        console.log("login success")
        AsyncStorage.getItem('username', (err, result) => {
          setUsername(result)
          console.log("login success", result)
        })

        //navigation.replace(result === true ? 'Login' : 'Home');

      } else {
        console.log("login fail")
        // navigation.replace('Login');
      }
    })

    axios.get("http://10.0.2.2:8080/api/user/plant").then(
      res => {
        setPlants(res.data)
      }
    )

    //}, 10000000);
  }, [])

  return (
    <View>
      <View style = {styles.DateBox}>
        <Text style = {styles.DateText}> {todayTime()} </Text>
        <View style = {styles.justRow}>
          <TouchableOpacity>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/107/107122.png'}} style={styles.waterImage}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterPlant')}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/753/753317.png'}} style={styles.waterImage}></Image>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.topContainer}>
        <Image source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png' }} style={styles.topImage} />
        <View style={styles.rightContainer}>
          {/* <Text style={styles.topName}>{username}</Text> */}
          <Text style={styles.topName}>Park HeeSoo</Text>
        </View>
      </View>
      <View style={styles.rootContainer}/>
      <Text style={styles.myPlantText}>         나의 반려 식물</Text>
      <View style={styles.container}>
        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/892/892926.png' }} style={styles.image} />
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('PlantProfile')}>
            <View style={styles.row}>
              {/* <Text style={styles.name}>   {plant.name}</Text> */}
              <Text style={styles.name}>   Fejka</Text>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/427/427112.png' }} style={styles.waterImage} />
            </View>
          </TouchableOpacity>   
        </View>
      </View>
      {/* {
        plants.map((plant) => {
          (
            <View style={styles.container}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/892/892926.png' }} style={styles.image} />
              <View style={styles.rightContainer}>
                <View style={styles.row}>
                  <Text style={styles.name}>   {plant.name}</Text>
                  <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/427/427112.png' }} style={styles.waterImage} />
                </View>
              </View>
            </View>
          )
        })
      } */}
    </View>
  );
}

const styles = StyleSheet.create({
  justRow:{
    flexDirection: 'row',
  },
  DateBox:{
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  DateText:{
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    color: 'gray',
  },
  waterImage: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  myPlantText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 10,
    color: 'gray'
  },
  rootContainer: {
    width: '100%',
    height: 1.5,
    backgroundColor: '#999999',
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  topName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    color: 'gray',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  topImage: {
    alignItems: "center",
    height: 70,
    width: 70,
    borderRadius: 20,
  },
  container: {
    marginTop: 10,
    marginLeft: 20,
    flexDirection: 'row',
    padding: 10
  },
  topContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 50,
    flexDirection: 'row',
    padding: 10
  },
  text: {
    color: 'gray',
    fontSize: 15,
    marginTop: 5,
  }
})