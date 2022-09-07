import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Animated } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlantProfileMainScreen from './PlantProfileMainScreen';


export default function PlantProfile({route, navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(null)

  const Stack = createNativeStackNavigator();
  const onSubmit = async () => {
    
  }

  const nowPlant = route?.params?.nowPlant
  const nowPlantIdId = route?.params?.nowPlantId

  return (
    <Stack.Navigator>
        <Stack.Screen style={styles.topText}
          name = {nowPlant}
          component={PlantProfileMainScreen}
          initialParams ={{nowPlantname:nowPlant, nowPlantId: nowPlantIdId}}
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