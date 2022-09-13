import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput,Text, TouchableOpacity, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import convert from 'xml-js';
var DOMParser = require('xmldom').DOMParser


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
    const [wtkplanttp, setWtkPlantTp] = useState('')
    const [wtkplant, setWtkPlant] = useState('')
    const [wtkplantmanagetip, setWtkPlantManageTip] = useState('')
    const [wtkplantcntntsNo, setWtkPlantCntntsNo] = useState('')

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
                            console.log(item.nodeName + " : " +item.childNodes[0].nodeValue)
                            if(item.nodeName == 'distbNm'){
                                setWtkPlantName(item.childNodes[0].nodeValue)
                            }
                            else if(item.nodeName == 'grwhTpCodeNm'){
                                setWtkPlantTp(item.childNodes[0].nodeValue)
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
                            else if(item.nodeName == 'fncltyInfo'){
                                setWtkPlantManageTip(item.childNodes[0].nodeValue)
                            }
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
        <View style={{marginBottom : '5%',flexDirection: 'row', marginTop:'5%'}}>
            <TextInput onChangeText={(value) => setWtkPlant(value)} style={styles.textInput} placeholder="  식물 이름으로 검색하세요"/>
            <TouchableOpacity onPress = {getTodo} style = {styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>검색</Text>
            </TouchableOpacity>
        </View>
        <View style = {{height : '85%'}}>
            <ScrollView style = {styles.scrollView}>
                <Text style={styles.titleText}>이름</Text>
                <Text style={styles.inputText}>{wtkplantname}</Text> 
                <Text style={styles.titleText}>학명</Text>
                <Text style={styles.inputText}>{wtkplantscientificname}</Text>   
                <Text style={styles.titleText}>영양 정보</Text>
                <Text style={styles.inputText}>{wtkplantnutrient}</Text>
                <Text style={styles.titleText}>생육 적정 온도</Text>
                <Text style={styles.inputText}>{wtkplanttp}</Text>
                <Text style={styles.titleText}>관리 난이도</Text>
                <Text style={styles.inputText}>{wtkplantmanage}</Text>
                <Text style={styles.titleText}>향</Text>
                <Text style={styles.inputText}>{wtkplantsmell}</Text>  
                <Text style={styles.titleText}>봄 물주기</Text>
                <Text style={styles.inputText}>{wtkplantspring}</Text> 
                <Text style={styles.titleText}>여름 물주기</Text>
                <Text style={styles.inputText}>{wtkplantsummer}</Text>  
                <Text style={styles.titleText}>가을 물주기</Text>
                <Text style={styles.inputText}>{wtkplantautumn}</Text> 
                <Text style={styles.titleText}>겨울 물주기</Text>
                <Text style={styles.inputText}>{wtkplantwinter}</Text>
                <Text style={styles.titleText}>관리 Tip!</Text>
                <Text style={styles.inputText}>{wtkplantmanagetip}</Text>
            </ScrollView>
        </View>        
    </View>

  );
}

const styles = StyleSheet.create({
    scrollView: {  
        marginTop:30,
    },
    inputText:{
        width:'80%',
        marginLeft:'12%',
        marginTop:'5%',
        marginBottom : '5%',
        fontSize:20,
    },
    textInput: {
        fontSize: 16,
        fontWeight: 'bold',
        height: 50, 
        width: 250, 
        borderWidth: 1, 
        borderRadius: 12,  
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
        marginLeft :'5%',     
    },
    titleText:{
        width:'85%',
        marginLeft:'10%',
        color: '#6E8B3D',
        fontWeight :'bold',
        fontSize:20,
    },
});