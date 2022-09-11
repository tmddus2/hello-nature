import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput,Text, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import convert from 'xml-js';
var DOMParser = require('xmldom').DOMParser
var parseString = require('react-native-xml2js').parseString;


export default function SearchPlant({navigation }) {
    const [searchplant, setSearchPlant] = useState([])
    const [wtkplantname, setWtkPlantName] = useState('')
    const [wtkplantscientificname, setWtkPlantScientificName] = useState('')
    const [wtkplantnutrient, setWtkPlantNutrient] = useState('')
    const [wtkplantmanage, setWtkPlantManage] = useState('')
    const [wtkplantsmell, setWtkPlantSmell] = useState('')
    const [wtkplantspring, setWtkPlantSpring] = useState('')
    const [wtkplantsummer, setWtkPlantSummer] = useState('')
    const [wtkplantautumn, setWtkPlantAutumn] = useState('')
    const [wtkplantwinter, setWtkPlantWinter] = useState('')

    const [wtkplant, setWtkPlant] = useState('')
    const [wtkplantcntntsNo, setWtkPlantCntntsNo] = useState('')
    const converter = require("xml-js")
    var parseString = require('react-native-xml2js').parseString

    const getPlantInfo = () => {
        axios.get("http://api.nongsaro.go.kr/service/garden/gardenDtl?apiKey=20220816QZULAZXDLRRFRNZZXG2CQA&cntntsNo=" + wtkplantcntntsNo).then(
            res => {
                var xmlDoc = new DOMParser().parseFromString(res.data, 'text/xml')
                var x = xmlDoc.getElementsByTagName("item");
                
                for(var i = 0;i<x.length;i++){
                    var nodeList = x[i].childNodes
                    
                    // const item = nodeList[1]
                    // setWtkPlantName(item.childNodes[0].nodeValue)
                    // item = nodeList[28]
                    // setWtkPlantScientificName(item.childNodes[0].nodeValue)
                    // console.log(item.childNodes[0].nodeValue)
                    // item = nodeList[9]
                    // setWtkPlantNutrient(item.childNodes[0].nodeValue)
                    // item = nodeList[26]
                    // setWtkPlantManage(item.childNodes[0].nodeValue)
                    // item = nodeList[32]
                    // setWtkPlantSmell(item.childNodes[0].nodeValue)
                    // item = nodeList[39]
                    // setWtkPlantSpring(item.childNodes[0].nodeValue)
                    // item = nodeList[41]
                    // setWtkPlantSummer(item.childNodes[0].nodeValue)
                    // item = nodeList[37]
                    // setWtkPlantAutumn(item.childNodes[0].nodeValue)
                    // item = nodeList[43]
                    // setWtkPlantWinter(item.childNodes[0].nodeValue)
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
                                setWtkPlantManage(item.childNodes[0].nodeValue)
                            }
                            console.log(item.nodeName + " : " +item.childNodes[0].nodeValue)
                        }
                    }
                }
                            
                
                return JSON.stringify(res?.data)
            }
        )

    }

    const getTodo = () => {
        axios.get("http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=20220816QZULAZXDLRRFRNZZXG2CQA&sType=sCntntsSj&sText=" + wtkplant).then(
            res => {
                var xmlDoc = new DOMParser().parseFromString(res.data, 'text/xml')
                var x = xmlDoc.getElementsByTagName("item");
                
                for(var i = 0;i<x.length;i++){
                    var nodeList = x[i].childNodes
                    var item = nodeList[0]
                    setWtkPlantCntntsNo(item.childNodes[0].nodeValue)
                    console.log(wtkplantcntntsNo)
                    // for(var j = 0; j < nodeList.length;j++){
                    //     var item = nodeList[j]
                    //     if(item.firstChild){
                    //         console.log(item.nodeName + " : " +item.childNodes[0].nodeValue)
                    //     }
                    // }
                }
                
                return JSON.stringify(res?.data)
            }
        )
        getPlantInfo();
    };

    useEffect(() => {
        
        
    }, []);

  return (
    <View style={{alignItems :'center'}}>
        <TextInput onChangeText={(value) => setWtkPlant(value)} style={styles.textInput} placeholder="검색어를 입력하세요"/>
        <TouchableOpacity onPress = {getTodo} style = {styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>검색</Text>
        </TouchableOpacity>
        <Text>이름 : {wtkplantname}</Text>
        <Text>학명 : {wtkplantscientificname}</Text>
        <Text>영양 정보 : {wtkplantnutrient}</Text>
        <Text>관리 난이도 : {wtkplantmanage}도 가능</Text>
        <Text>향 : {wtkplantsmell}</Text>
        <Text>봄 물주기 : {wtkplantspring}</Text>
        <Text>여름 물 주기 : {wtkplantsummer}</Text>
        <Text>가을 물주기 : {wtkplantautumn}</Text>
        <Text>겨울 물 주기 : {wtkplantwinter}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: 16,
        marginTop : '7%',
        fontWeight: 'bold',
        height: 50, 
        width: 350, 
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
        width:100,
        height:45,
        borderRadius:20,
        backgroundColor: '#6E8B3D',
        alignItems: "center",
        justifyContent :'center',
        marginTop:10,
    },
});