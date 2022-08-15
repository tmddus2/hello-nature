import * as React from 'react';

import {Text, StyleSheet, View, Image} from 'react-native'

export default function TabOneScreen() {
  return (
    <View>
      <View style={styles.topContainer}>
        <Image source = {{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png'}} style = {styles.topImage} />
        <View style = {styles.rightContainer}>
          <Text style ={styles.topName}>parkheesoo</Text>
        </View>
      </View>
      <View style = {styles.rootContainer}></View>
      <View style={styles.container}>
        <Image source = {{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png'}} style = {styles.image} />
        <View style = {styles.rightContainer}>
          <View style = {styles.row}>
            <Text style ={styles.name}>parkheesoo</Text>
            <Text style = {styles.timetext}>11:11 AM</Text>
          </View>
          <Text numberOfLines = {1} style={styles.text}>안녕하세요 박희수 농부 입니다.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer:{
    width:'100%',
    height:10,
    backgroundColor: 'rightgrey',
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
    fontSize: 18,
  },
  topName:{
    fontWeight:'bold',
    fontSize: 20,
    marginLeft: 20,
  },
  image:{
    height :50,
    width : 50,
    borderRadius:10,
    marginRight:10,
  },
  topImage:{
    alignItems: "center",
    height :80,
    width : 80,
    borderRadius:30,
  },
  container:{
    flexDirection: 'row',
    padding:10
  },
  topContainer:{
    marginTop:20,
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