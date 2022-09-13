import React, { useContext, useState, useEffect, useCallback } from "react";
import { Calendar } from "react-native-calendars";
import { format } from "date-fns";
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import axios from 'axios';
import {Text, View, StyleSheet,Dimensions,SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput} from 'react-native';
var DOMParser = require('xmldom').DOMParser


const window = Dimensions.get("window");
// 머티리얼 상단 탭 내비게이터
const Tab = createMaterialTopTabNavigator();

function DiaryScreen({route, navigation }) {
  const water = {key: 'water', color: 'blue', selectedDotColor: 'blue'};
  const nutrients = {key: 'nutrients', color: 'green', selectedDotColor: 'blue'};
  const pnId = route?.params?.nowPlantId
  const [selectedDates, setMarkedDates] = React.useState(null);

  const posts = [
    {
      id: 1,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-09-26",
    },
    {
      id: 2,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-09-27",
    }
  ];

  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true, dots: [water, nutrients]};
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

  const [plantScheduleList, setPlantScheduleList] = useState([])
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
            axios.get("http://192.168.0.15:8080/api/user/aplant?id=" +  pnId , {
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
  
  const getPlantSchedule = async () => {
    let list = await getData('accessToken')
        .then(data => data)
        .then(value => {
            console.log("yourKey Value:  " + value)
            axios.get("http://192.168.0.15:8080/api/user/schedule/month?id="+pnId+"&year=2022&month=09 ", {
      headers: {
          Authorization: value
      }
  }).then(
      res => {
        //setPlants([JSON.stringify(res?.data), ...plants])
        setPlantScheduleList(res.data)
          console.log((JSON.stringify(res.data)))
          return JSON.stringify(res?.data)
      }
    )

  });}
  
  const renderItem = useCallback(({item}) => {
    console.log(item)
    return (
      <View>
        <View style={{borderRadius:10, borderWidth:1, bordercolor:'gray', padding :10, margin :'2%'}}>
          <Text style = {{fontWeight:'bold'}}>2022-09-{item.date}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail">{item.theme}</Text>
        </View>
          
      </View>
    )
  })
  

  useEffect(() => {
    getPlantSchedule();
    getPlant();
    
  }, [])

  
  return (
    <View>
      <Calendar style={styles.calendar} 
        markingType={'multi-dot'}
        markedDates={markedSelectedDates}
      theme={{
        selectedDayBackgroundColor: '#009688',
        arrowColor: '#009688',
        dotColor: '#009688',
        todayTextColor: '#009688',
      }} 
      onDayPress={(day) => {
        setSelectedDate(day.dateString)
      }}>
      </Calendar>
      <View style={{height:330}}>
        <FlatList
          keyExtractor={item => item.id}
          data={plantScheduleList}
          renderItem={renderItem}>
        </FlatList>
      </View>
      

      <View style={{position:'absolute' , alignItems :'center',marginTop:500, width:'100%'}}>
        <TouchableOpacity style = {styles.buttonStyle}>
            <Text style={styles.buttonTextStyle} onPress={() => navigation.navigate('TodayMemo', {nowPlantId: pnId} )}> 글쓰기 </Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonStyle}>
          <Text style={styles.buttonTextStyle} onPress={() => navigation.navigate('ArScreen', {PlantId: pnId, PlantName: plants.name})}>{plants.name}와 AR로 대화</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

function PlantInfoScreen({route, navigation }) {
  const pnId = route?.params?.nowPlantId
  const [wtkplantname, setWtkPlantName] = useState('')
    const [wtkplantscientificname, setWtkPlantScientificName] = useState('')
    const [wtkplantnutrient, setWtkPlantNutrient] = useState('')
    const [wtkplantmanage, setWtkPlantManage] = useState('')
    const [wtkplantsmell, setWtkPlantSmell] = useState('')
    const [wtkplantspring, setWtkPlantSpring] = useState('')
    const [wtkplantsummer, setWtkPlantSummer] = useState('')
    const [wtkplantautumn, setWtkPlantAutumn] = useState('')
    const [wtkplantwinter, setWtkPlantWinter] = useState('')

    const [wtkplantcntntsNo, setWtkPlantCntntsNo] = useState('')
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
            axios.get("http://192.168.0.15:8080/api/user/aplant?id=" +  pnId , {
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

  const getPlantInfo = () => {
    axios.get("http://api.nongsaro.go.kr/service/garden/gardenDtl?apiKey=20220816QZULAZXDLRRFRNZZXG2CQA&cntntsNo=" + wtkplantcntntsNo).then(
      res => {
        var xmlDoc = new DOMParser().parseFromString(res.data, 'text/xml')
        var x = xmlDoc.getElementsByTagName("item");
            
        for(var i = 0;i<x.length;i++){
          var nodeList = x[i].childNodes
              
          for(var j = 0; j < nodeList.length;j++){
            var item = nodeList[j]
            if(item.firstChild){
              if(item.nodeName == 'distbNm'){
                setWtkPlantName(item.childNodes[0].nodeValue)
              }
              else if(item.nodeName == 'plntbneNm'){
                setWtkPlantScientificName(item.childNodes[0].nodeValue)
              }
              else if(item.nodeName == 'frtlzrInfo'){
                setWtkPlantNutrient(item.childNodes[0].nodeValue)
              }
              else if(item.nodeName == 'managelevelCodeNm'){
                setWtkPlantManage(item.childNodes[0].nodeValue + '도 가능')
              }
              else if(item.nodeName == 'smellCodeNm'){
                setWtkPlantSmell(item.childNodes[0].nodeValue)
              }
              else if(item.nodeName == 'watercycleSprngCodeNm'){
                setWtkPlantSpring(item.childNodes[0].nodeValue)
              }
              else if(item.nodeName == 'watercycleSummerCodeNm'){
                setWtkPlantSummer(item.childNodes[0].nodeValue)
              }
              else if(item.nodeName == 'watercycleAutumnCodeNm'){
                setWtkPlantAutumn(item.childNodes[0].nodeValue)
              }
              else if(item.nodeName == 'watercycleWinterCodeNm'){
                setWtkPlantWinter(item.childNodes[0].nodeValue)
              }
            }
          }
        }
          return JSON.stringify(res?.data)
      }
    )
}

  const getPlantInfoAtPlantAPI = () => {
    axios.get("http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=20220816QZULAZXDLRRFRNZZXG2CQA&sType=sCntntsSj&sText=" + plants.scientific_name).then(
      res => {
        var xmlDoc = new DOMParser().parseFromString(res.data, 'text/xml')
        var x = xmlDoc.getElementsByTagName("item");
            
        for(var i = 0;i<x.length;i++){
          var nodeList = x[i].childNodes
          var item = nodeList[0]
          setWtkPlantCntntsNo(item.childNodes[0].nodeValue)
          console.log(wtkplantcntntsNo)
        }     
        return JSON.stringify(res?.data)
      }
    )
    getPlantInfo();
};

  useEffect(() => {
    getPlantInfoAtPlantAPI()
    getPlant();
  }, [])

  return (
    <View>
      <View style={{height:'95%'}}>
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
          <View style={{marginLeft:'5%', marginTop:'5%'}}>
            <Text style={styles.titleText}>가을 물주기</Text>
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={styles.inputText}>{wtkplantautumn}</Text>           
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default function PlantProfileMainScreen({route, navigation }) {
  //console.log(route?.params?.nowPlantId)
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