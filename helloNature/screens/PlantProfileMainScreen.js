import React, { useContext, useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import axios from 'axios';
import {Text, View, StyleSheet,Dimensions,Animated, TouchableOpacity, ScrollView, Image, TextInput} from 'react-native';

const window = Dimensions.get("window");
// 머티리얼 상단 탭 내비게이터
const Tab = createMaterialTopTabNavigator();

function DiaryScreen({route, navigation }) {
  const water = {key: 'water', color: 'blue', selectedDotColor: 'blue'};
  const nutrients = {key: 'nutrients', color: 'green', selectedDotColor: 'blue'};
  const pnId = route?.params?.nowPlantId
  const [selectedDates, setMarkedDates] = React.useState(null);
  function addDates() {    
    let obj = dates.reduce(      
      (c, v) =>        
      Object.assign(c, {          
        [v]: { selectedDates: true},        
      }),      {},    );    
      console.log(obj);    
      setMarkedDates(obj);  
  }

  const [plants, setPlants] = useState([])
  const getData = async (key) => {
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

  const getPlant = async () => {
    let list = await getData('accessToken')
        .then(data => data)
        .then(value => {
            console.log("yourKey Value:  " + value)
            axios.get("http://10.0.2.2:8080/api/user/aplant?id=" +  pnId , {
      headers: {
          Authorization: value
      }
  }).then(
      res => {
        
        setPlants(res.data)
          return JSON.stringify(res?.data)
      }
    )

  });}
  

  useEffect(() => {
    
    getPlant();
    
  }, [])

  
  return (
    <View>
      <Calendar style={styles.calendar} 
            markingType={'multi-dot'}
            markedDates={{
              '2022-09-25': {dots: [water,nutrients]},
              '2022-09-01': {dots: [water], disabled: true}
            }}
            selectedDates={{selectedDates}}
            theme={{
              selectedDayBackgroundColor: '#009688',
              arrowColor: '#009688',
              dotColor: '#009688',
              todayTextColor: '#009688',
            }} 
            onDayPress={(day) => {
              addDates(day.dateString)
            }} />

        <View style={{position:'absolute' , alignItems :'center',marginTop:500, width:'100%'}}>
          <TouchableOpacity style = {styles.buttonStyle}>
            <Text style={styles.buttonTextStyle} onPress={() => navigation.navigate('TodayMemo', {nowPlantId: pnId} )}> 글쓰기 </Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.buttonStyle}>
            <Text style={styles.buttonTextStyle} onPress={() => navigation.navigate('ArScreen')}>{plants.name}와 AR로 대화</Text>
          </TouchableOpacity>
        </View>
    </View>
    
  );
}

function PlantInfoScreen({route, navigation }) {
  const pnId = route?.params?.nowPlantId
  const [plants, setPlants] = useState([])
  const getData = async (key) => {
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

  const getPlant = async () => {
    let list = await getData('accessToken')
        .then(data => data)
        .then(value => {
            console.log("yourKey Value:  " + value)
            axios.get("http://10.0.2.2:8080/api/user/aplant?id=" +  pnId , {
      headers: {
          Authorization: value
      }
  }).then(
      res => {
        //setPlants([JSON.stringify(res?.data), ...plants])
        setPlants(res.data)

          //console.log(plants)
          console.log("왕ㄴ마러;어베ㅐㄷ"+ (JSON.stringify(res.data)))
          return JSON.stringify(res?.data)
      }
    )

  });}
  

  useEffect(() => {
    
    getPlant();
    
  }, [])

  return (
    <View>
        <ScrollView style = {styles.scrollView}>
            <View style={{alignItems:'center'}}>
              <Image source = {{uri: plants.picture }} style = {styles.image}/>
            </View>
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>식물 종류</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>{plants.scientific_name}</Text>           
            </View> 
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>내가 부르는 이름</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>{plants.name}</Text>           
            </View>
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>데려온 날</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>{plants.bring_date}</Text>           
            </View>
            <View style={{marginLeft:'5%', marginTop:'5%'}}>
              <Text style={styles.titleText}>특이 사항</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.inputText}>{plants.memo}</Text>           
            </View>
        </ScrollView>
        
    </View>
  );
}

export default function PlantProfileMainScreen({route, navigation }) {
  console.log(route?.params?.nowPlantId)
  const pNId = route?.params?.nowPlantId

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
          initialParams ={{nowPlantId:pNId}}
          options={{
            tabBarLabel: '관리 일지',
      }}/>
      <Tab.Screen
        name="PlantInfo"
        component={PlantInfoScreen}
        initialParams ={{nowPlantId:pNId}}
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
    fontWeight :'bold',
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
    width:160,
    height:50,
    borderRadius:30,
    backgroundColor: '#6E8B3D',
    alignItems: "center",
    justifyContent :'center',
    marginBottom:10,
  },
  buttonTextStyle:{
    color :'#ffffff',
    fontWeight :'bold',
    fontSize:13,
  },
  image:{
    height:330,
    width:'90%',
  },
  inputText:{
    width:'90%',
    marginLeft :10,
    marginTop:'5%',
    fontSize:20,
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