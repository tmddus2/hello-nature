
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity,
        NativeModules, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { RNNativeToastLibrary } = NativeModules;

export default function ARScreen({ navigation }) { // 식물 ID 넘겨주기 

   RNNativeToastLibrary.show('HELLO'); // 식물 ID 넘겨주기 

  return (
    <Text>AR screen</Text>

  );
}

const styles = StyleSheet.create({
  
});
