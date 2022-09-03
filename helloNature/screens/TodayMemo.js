//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Switch, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TodayMemo({ navigation }) {
    const [isEnabledW, setIsEnabledW] = useState(false);
    const [isEnabledN, setIsEnabledN] = useState(false);
    const toggleSwitchW = () => setIsEnabledW(previousState => !previousState);
    const toggleSwitchN = () => setIsEnabledN(previousState => !previousState);

  return (
    <View>
        <View style = {styles.topContainer}>
                <Text style={styles.topText}>오늘의 기록</Text>
                <TouchableOpacity>
                    <Image source = {{uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png'}} style = {styles.image}/>
                </TouchableOpacity>
        </View>
        <View style = {{flexDirection: 'row', marginTop : 10}}>
            <View style={styles.toggleCheckBox}>
                <Text style = {styles.toggleCheckBoxText}>오늘 물을 주셨나요 ? </Text>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={isEnabledW ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchW}
                    value={isEnabledW}
                />
            </View>
            <View style={styles.toggleCheckBox}>
                <Text style = {styles.toggleCheckBoxText}>오늘 영양제를 주셨나요 ? </Text>
                <Switch
                    trackColor={{false: '#767577', true: '#BD4228'}}
                    thumbColor={isEnabledN ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={toggleSwitchN}
                    value={isEnabledN}
                />
            </View>
        </View>
        <View style = {{alignItems :'center'}}>
            <TextInput onChangeText={(value) => setType(value)} placeholder="  오늘의 특이사항을 입력하세요" style={styles.inputText}/>
            <TouchableOpacity style = {styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>오늘의 기록 저장하기</Text>
            </TouchableOpacity>
        </View>
        
        
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
        marginTop:30,
    },
    toggleCheckBoxText:{
        fontSize : 15,
        marginBottom :10,
        fontWeight: 'bold'
    },
    toggleCheckBox :{
        marginLeft : '10%',
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
