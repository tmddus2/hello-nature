import * as React from 'react';

import {Text, StyleSheet, View, Image} from 'react-native'

export default function Home({navigation}) {
  return (
    <View>
      <View style={styles.topContainer}>
        <Image source = {{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png'}} style = {styles.topImage} />
        <View style = {styles.rightContainer}>
          <Text style ={styles.topName}>Park heesoo</Text>
        </View>
      </View>
      <View style = {styles.rootContainer}></View>
      <Text style = {styles.myPlantText}>         나의 반려 식물</Text>
      <View style={styles.container}> 
        <Image source = {{ uri: 'https://cdn-icons-png.flaticon.com/512/892/892926.png'}} style = {styles.image} />
        <View style = {styles.rightContainer}>
          <View style = {styles.row}>
            <Text style ={styles.name}>   Fejka</Text>
            <Image source = {{uri: 'https://cdn-icons-png.flaticon.com/512/427/427112.png'}} style = {styles.waterImage} />
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Image source = {{ uri: 'https://cdn-icons-png.flaticon.com/512/892/892907.png'}} style = {styles.image} />
        <View style = {styles.rightContainer}>
          <View style = {styles.row}>
            <Text style ={styles.name}>   Alice</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waterImage:{
    height : 20,
    width : 20,
    marginRight:20,
  },
  myPlantText:{
    marginTop:10,
    fontWeight:'bold',
    fontSize: 10,
    color: 'gray'
  },
  rootContainer:{
    width:'100%',
    height:1,
    backgroundColor: 'rightgray',
  },
  rightContainer:{
    flex:1,
    justifyContent: "center",
  },
  row:{
    flexDirection: 'row',
    width:'100%',
    justifyContent:'space-between',
  },
  timetext:{
    marginTop : 3,
    color:'grey',
    fontSize: 12,
  },
  name:{
    fontWeight:'bold',
    fontSize: 15,
  },
  topName:{
    fontWeight:'bold',
    fontSize: 20,
    marginLeft: 20,
  },
  image:{
    height :40,
    width : 40,
    borderRadius:15,
    marginRight:10,
  },
  topImage:{
    alignItems: "center",
    height :80,
    width : 80,
    borderRadius:30,
  },
  container:{
    marginTop:10,
    marginLeft:20,
    flexDirection: 'row',
    padding:10
  },
  topContainer:{
    marginTop:20,
    marginBottom:20,
    marginLeft: 50,
    flexDirection: 'row',
    padding:10
  },
  text: {
    color: 'grey',
    fontSize: 15,
    marginTop : 5,
  }
})