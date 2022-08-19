import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity , Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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

export default function RegisterPlant({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const placeholder = "  입양한 날짜를 입력해주세요";
    const [text, onChangeText] = useState("");

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
        hideDatePicker();
        onChangeText(date.format("yyyy/MM/dd"))
    };

    state = {
        avatar: ''
    }

  return (
    <View>
        <ScrollView style = {styles.scrollView}>
            <View style = {styles.topContainer}>
                <Text style={styles.topText}>식물 추가</Text>
                <TouchableOpacity>
                    <Image source = {{uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'}} style = {styles.image}/>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity style = {styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>식물 이름으로 정보 검색</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center'}}>
                <View style={styles.imageBox}>
                    <TouchableOpacity>
                        <Image source = {{uri: 'https://cdn-icons-png.flaticon.com/512/685/685686.png'}} style = {styles.inputImage}/>
                    </TouchableOpacity>
                    <Text>사진을 눌러 변경</Text>
                </View>
                <TextInput placeholder="  식물의 종을 입력하세요" style={styles.inputText}/>
                <TextInput placeholder="  내가 부르는 이름" style={styles.inputText}/>
                <TouchableOpacity style = {{width:'100%', marginLeft:35}} onPress={showDatePicker}>
                    <TextInput placeholder={placeholder} editable={false} value={text} style={styles.inputText}/>
                    <DateTimePickerModal
                        headerTextIOS={placeholder}
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </TouchableOpacity>
                
                <TextInput placeholder="  특이사항" style={styles.inputTextS}/>  
                <TouchableOpacity style = {styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>식물 등록</Text>
                </TouchableOpacity>
            </View>                  
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
        marginBottom:30,
    },
    image: {
        height: 20,
        width: 20,
    },
    inputImage: {
        height: 50,
        width: 50,
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
    imageBox:{
        backgroundColor:'#e9e9e9',
        height:330,
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
    },
    inputText:{
        width:'90%',
        marginTop:20,
        backgroundColor:'#cfcfcf',
        color:"gray",
        borderBottomWidth:2,
        borderColor:'#999999',
        fontWeight:'bold',
        fontSize:15,
        borderRadius:10,
        padding:10
    },
    datebox:{
        width:'90%',
        height:50,
        marginTop:20,
        backgroundColor:'#cfcfcf',
        color:"gray",
        borderBottomWidth:2,
        borderColor:'#999999',
        borderRadius:10,
        padding:10
    },
    text:{
        fontSize:15,
        fontWeight:'bold',
    },
    dateText:{
        fontSize:15,
        borderRadius:10,
        padding:10
    },
    scrollView: {
        marginHorizontal: 20,
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
