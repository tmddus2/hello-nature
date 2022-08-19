import React from 'react';
import { Calendar } from "react-native-calendars";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View, StyleSheet} from 'react-native';

// 머티리얼 상단 탭 내비게이터
const Tab = createMaterialTopTabNavigator();

function DiaryScreen({navigation}) {
  return (
    <View>
      <Calendar style={styles.calendar} theme={{
        selectedDayBackgroundColor: 'red',
        arrowColor: '#6E8B3D',
        dotColor: 'green',
        todayTextColor: '#6E8B3D',
      }}/>
    </View>
  );
}

function PlantInfoScreen() {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}

export default function PlantProfileMainScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Diary"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: '#6E8B3D',
        },
        tabBarActiveTintColor: '#5b5b5b',
        tabBarLabelStyle :{
          fontSize:15,
          fontWeight:'bold',
        }
      }}>
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          tabBarLabel: '관리 일지',
        }}
      />
      <Tab.Screen
        name="PlantInfo"
        component={PlantInfoScreen}
        options={{
          tabBarLabel: '식물 정보',
        }}
      />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});