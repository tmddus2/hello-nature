import React, { useContext, useState } from "react";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View, StyleSheet,  TouchableOpacity} from 'react-native';



// 머티리얼 상단 탭 내비게이터
const Tab = createMaterialTopTabNavigator();



function DiaryScreen({navigation}) {


  const water = {key: 'water', color: 'blue', selectedDotColor: 'blue'};
  const nutrients = {key: 'nutrients', color: 'green', selectedDotColor: 'blue'};

  const [value, onChange] = useState(new Date());

  const posts = [
    {
      id: 1,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-08-26",
    },
    {
      id: 2,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-08-27",
    }
  ];


  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});
  

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }


  return (
    <View>
      <Calendar style={styles.calendar} 
      markedDates={markedSelectedDates}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }} 
      onDayPress={(day) => {
        setSelectedDate(day.dateString)
      }} />

      <View style={{position:'absolute' , alignItems :'center',marginTop:500, width:'100%'}}>
        <TouchableOpacity style = {styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}> +  오늘 기록 하기</Text>
        </TouchableOpacity>
      </View>
      
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
    height:350,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  buttonStyle:{
    borderWidth:2,
    borderColor:'#6E8B3D',
    width:150,
    height:60,
    borderRadius:30,
    backgroundColor: '#6E8B3D',
    alignItems: "center",
    justifyContent :'center',
    marginBottom:10,
  },
  buttonTextStyle:{
    color:'gray',
    fontWeight:'bold',
    fontSize:15,
  },
});