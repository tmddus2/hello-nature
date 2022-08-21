import React, { useContext, useState } from "react";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, View, StyleSheet,  TouchableOpacity, ScrollView, Image, TextInput} from 'react-native';



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
        <ScrollView style = {styles.scrollView}>
            <View style={{alignItems:'center'}}>
              <Image source = {{uri:'https://cdn-icons-png.flaticon.com/512/892/892926.png' }} style = {styles.image}/>
            </View>
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>식물 종류</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>몬스테라</Text>           
            </View> 
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>내가 부르는 이름</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>Fejka</Text>           
            </View>
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>데려온 날</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>2022 - 08 - 01</Text>           
            </View>
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>특이 사항</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>이 아이는 엄마에게 선물로 받은 아이이다 물을 자주 주지 않아도 되니까 게으른 나와 오래 함께 할 수 있지 않을까 하는 생각을 가져본다
              이파리가 푸릇 푸릇 한게 아주 맘에 든다
              얼른 더 많이 자라서 우리 집의 공기를 맑게 해줬으면 하는게 나의 바램이다.</Text>           
            </View>
        </ScrollView>
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
  titleText:{
    color: '#6E8B3D',

    fontSize:20,
  },
  scrollView: {
    marginTop:20,
    marginHorizontal: 20,
  },
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
  image:{
    height:330,
    width:'90%',
  },
  inputText:{
    width:'90%',
    marginTop:'5%',
    fontSize:25,
  },
  inputTextS:{
    width:'90%',
    height:150,
    marginTop:20,
    marginBottom:20,
    backgroundColor:'#cfcfcf',
    color:"gray",
    borderBottomWidth:2,
    borderColor:'#999999',
    fontWeight:'bold',
    fontSize:15,
    borderRadius:10,
    padding:10
},
});