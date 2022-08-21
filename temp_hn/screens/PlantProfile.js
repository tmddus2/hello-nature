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
    
  }

  return (
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
