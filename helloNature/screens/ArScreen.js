
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity,
        NativeModules, } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { RNNativeToastLibrary } = NativeModules;

export default function ARScreen({ navigation }) {

   RNNativeToastLibrary.show('HELLO');

  return (
    <Text>AR screen</Text>

  );
}

const styles = StyleSheet.create({
  
});
