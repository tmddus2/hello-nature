
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, NativeModules } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Login from './Login';

const { RNNativeToastLibrary } = NativeModules;


const getData = async (key) => {
  // get Data from Storage
  try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
          console.log(data);
          return data;
      }
  } catch (error) {
      console.log(error);
  }
};


export default function ARScreen({ route, navigation }) {
  console.log("==>", typeof(route?.params?.PlantId),  typeof(route?.params?.PlantName))

  const arStart = async () => {
    await getData('accessToken')
            .then(data => data)
            .then(value => {
                console.log("yourKey Value:  " + value)
                RNNativeToastLibrary.show((route?.params?.PlantName).toString(), (route?.params?.PlantId).toString(), value); // 식물 ID 넘겨주기 

            })

  };

  arStart();

  return (
    <Text>AR screen</Text>
  );
}

const styles = StyleSheet.create({
  
});
