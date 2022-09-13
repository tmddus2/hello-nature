//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Platform, Text, View, Image, Switch, TextInput, TouchableOpacity } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TodayMemo({ route, navigation }) {
    const [isEnabledW, setIsEnabledW] = useState(false);
    const [isEnabledN, setIsEnabledN] = useState(false);
    const toggleSwitchW = () => setIsEnabledW(previousState => !previousState);
    const toggleSwitchN = () => setIsEnabledN(previousState => !previousState);
    const pnId = route?.params?.nowPlantId
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('')
    const [memo, setMemo] = useState('')
    const [theme, setTheme] = useState('')
    const [plants, setPlants] = useState([])

    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
     
        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var d = this;
         
        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
     
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};

    const handleConfirm = (date) => {
        hideDatePicker();
        setDate(date.format("yyyy-MM-dd"))
        onChangeText(date.format("yyyy-MM-dd"))
    };

    const placeholder = "날짜를 선택해주세요";
    const [text, onChangeText] = useState("");
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

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

    const onSubmit = async () => {
        var requestBody = {
            "id": pnId,
            "date": date,
            "water": isEnabledW ? 1 : 0,
            "nutrient": isEnabledN ? 1 : 0,
            "memo" : memo,
            "theme": memo,
        }


        await getData('accessToken')
            .then(data => data)
            .then(value => {
                axios.post("http://192.168.0.15:8080/api/user/schedule", requestBody, {
                    headers: {
                        Authorization: value
                    }
                })
                    .then(res => {
                        if (res.data) {
                            console.log("memo" +memo)
                            navigation.navigate('PlantProfile',{nowPlant: plants.name, nowPlantId : plants.id})
                        } else {
                            console.log("fail " + res.data.message)
                        }
                    }).catch(error => console.log(error));
            })
            .catch(err => console.log(value))
        
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
              return JSON.stringify(res?.data)
          }
        )
    
      });}
      
    
      useEffect(() => {
        
        getPlant();
        
    }, [])

    
  return (
    <View>
        <View style = {styles.topContainer}>
            <Text style={styles.topText}>기록하기</Text>
            <TouchableOpacity>
                <Image source = {{uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'}} style = {styles.image}/>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput
                pointerEvents="none"
                style={styles.textInput}
                placeholder={placeholder}
                underlineColorAndroid="transparent"
                editable={false}
                value={text} />
                <DateTimePickerModal
                headerTextIOS={placeholder}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker} />
            </TouchableOpacity>	
        </View>	
        <View style = {{flexDirection: 'row', marginTop : 10}}>
            <View style={styles.toggleCheckBox}>
                <Text style = {styles.toggleCheckBoxText}>물을 주셨나요 ? </Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabledW ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchW}
                    value={isEnabledW}
                />
            </View>
            <View style={styles.toggleCheckBox}>
                <Text style = {styles.toggleCheckBoxText}>영양제를 주셨나요 ? </Text>
                <Switch
                    trackColor={{false: '#767577', true: '#BD4228'}}
                    thumbColor={isEnabledN ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitchN}
                    value={isEnabledN}
                />
            </View>
        </View>
        <View style = {{alignItems :'center'}}>
            <TextInput multiline={true} onChangeText={(value) => setMemo(value)} placeholder="  오늘의 특이사항을 입력하세요" style={styles.inputText}/>
            <TouchableOpacity style = {styles.buttonStyle} onPress={onSubmit}>
                <Text style={styles.buttonTextStyle}>기록 저장하기</Text>
            </TouchableOpacity>
        </View>
        
        
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        fontSize: 16,
        fontWeight: 'bold',
        height: 50, 
        width: 300, 
        borderWidth: 1, 
        borderRadius: 12,
        padding: 10
    },
    buttonTextStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:15,
    },
    buttonStyle:{
        borderWidth:2,
        borderColor:'#6E8B3D',
        width:350,
        height:45,
        borderRadius:20,
        backgroundColor: '#6E8B3D',
        alignItems: "center",
        justifyContent :'center',
        marginTop:30,
    },
    toggleCheckBoxText:{
        fontSize : 15,
        marginBottom :10,
        fontWeight: 'bold'
    },
    toggleCheckBox :{
        marginLeft : '15%',
        alignItems: 'center',
    },
    topContainer:{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        marginBottom:40,
    },
    topText:{
        fontWeight:'bold',
        fontSize:20,
    },
    inputText:{
        width:'90%',
        height:150,
        marginTop:20,
        backgroundColor:'#E2E2E2',
        color:"gray",
        borderBottomWidth:2,
        borderColor:'#999999',
        fontWeight:'bold',
        fontSize:15,
        borderRadius:10,
        padding:10
    },
});
