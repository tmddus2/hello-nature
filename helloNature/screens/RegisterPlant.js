import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TextInput, TouchableOpacity, Image, PermissionsAndroid } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
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

String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
Number.prototype.zf = function (len) { return this.toString().zf(len); };

export default function RegisterPlant({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const placeholderForA = "  입양한 날짜를 입력해주세요";
    const [picture, setPicture] = useState('https://ifh.cc/g/jzaHC6.png')
    const [bring_date, setBring_Date] = useState('')
    const [water_cycle, setWater_Cycle] = useState('')
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [scientific_name, setScientific_Name] = useState('')
    const [memo, setMemo] = useState('')

    const [text, onChangeText] = useState("");

    // const setPhoto = (picture) => {
    //     if(picture == 'https://cdn-icons-png.flaticon.com/512/685/685686.png' || picture == null){
    //         return(
    //             <View style={styles.imageBox}>
    //                 <TouchableOpacity onPress={showPicker}>
    //                     <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/685/685686.png' }} style={styles.inputImage} />
    //                 </TouchableOpacity>
    //                 <Text>사진을 눌러 변경</Text>
    //             </View>
    //         )
    //     }
    //     else{
    //         <View style={styles.imageBox}>
    //             <TouchableOpacity onPress={showPicker}>
    //                 <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/685/685686.png' }}  style={styles.inputImage} />
    //             </TouchableOpacity>
    //         </View>
    //     }
    // }

    const showPicker = async () => {
        const grantedcamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "Ok"
            }
        );
        const grantedstorage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "App Camera Permission",
                message: "App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "Ok"
            }
        );
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED || grantedstorage === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera & storage permission given");
            Alert.alert(
                "뭘로 올릴래?",
                "선택해",
                [
                    {
                        text: "카메라로 찍기",
                        onPress: async () => {
                            const result = await launchCamera({
                                mediaType: 'photo',
                                cameraType: 'back',
                            });
                            if (result.didCancel) {
                                return null;
                            }
                            const localUri = result.assets[0].uri;
                            const uriPath = localUri.split("//").pop();
                            const imageName = localUri.split("/").pop();
                            setPicture("file://" + uriPath)
                            console.log("picture :" + picture)
                            setPhoto("file://" + uriPath);
                        }
                    },
                    {
                        text: "앨범에서 선택",
                        onPress: async () => {
                            const result = await launchImageLibrary();
                            if (result.didCancel) {
                                return null;
                            }
                            const localUri = result.assets[0].uri;
                            const uriPath = localUri.split("//").pop();
                            const imageName = localUri.split("/").pop();
                            setPicture("file://" + uriPath)
                            setPhoto("file://" + uriPath);
                        }
                    },
                ],
                { cancelable: false }
            );
        }
        else {
            console.log("Camera permission denied")
        }
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
            "picture": picture,
            "type": type,
            "water_cycle": water_cycle,
            "name": name,
            "bring_date": bring_date,
            "scientific_name": scientific_name,
            "memo": memo,
        }


        await getData('accessToken')
            .then(data => data)
            .then(value => {
                console.log("yourKey Value:  " + value)
                axios.post("http://192.168.0.15:8080/api/user/plant", requestBody, {
                    headers: {
                        Authorization: value
                    }
                })
                    .then(res => {

                        if (res.data) {
                            navigation.navigate('Home')
                        } else {
                            console.log("fail " + res.data.message)
                        }
                    }).catch(error => console.log(error));
            })
            .catch(err => console.log(value))


    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("dateFormat: ", date.format("yyyy/MM/dd"));
        hideDatePicker();
        setBring_Date(date.format("yyyy/MM/dd"))
        onChangeText(date.format("yyyy/MM/dd"))
    };


    return (
        <View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.topContainer}>
                    <Text style={styles.topText}>식물 추가</Text>
                    <TouchableOpacity>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png' }} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('SearchPlant')}>
                        <Text style={styles.buttonTextStyle}>식물 이름으로 정보 검색</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.imageBox}>
                        <TouchableOpacity onPress={showPicker}>
                            <Image source={{ uri: picture }} style={styles.inputImage} />
                        </TouchableOpacity>
                    </View>
                    <TextInput onChangeText={(value) => setType(value)} placeholder="  식물의 종을 입력하세요" style={styles.inputText} />
                    <TextInput onChangeText={(value) => setScientific_Name(value)} placeholder="  식물의 학명을 입력하세요" style={styles.inputText} />
                    <TextInput onChangeText={(value) => setName(value)} placeholder="  내가 부르는 이름" style={styles.inputText} />
                    <TextInput onChangeText={(value) => setWater_Cycle(value)} placeholder="  물 주는 주기" style={styles.inputText} />
                    <TouchableOpacity style={{ width: '100%', marginLeft: 35 }} onPress={showDatePicker}>
                        <TextInput onChange={(value) => setBring_Date(value)} placeholder={placeholderForA} editable={false} value={text} style={styles.inputText} />
                        <DateTimePickerModal
                            headerTextIOS={placeholderForA}
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </TouchableOpacity>
                    <TextInput onChangeText={(value) => setMemo(value)} placeholder="  특이사항" style={styles.inputTextS} />
                    <TouchableOpacity style={styles.buttonStyle} onPress={onSubmit}>
                        <Text style={styles.buttonTextStyle}>식물 등록</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    buttonStyle: {
        borderWidth: 2,
        borderColor: '#6E8B3D',
        width: 350,
        height: 45,
        borderRadius: 20,
        backgroundColor: '#6E8B3D',
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 30,
    },
    image: {
        height: 20,
        width: 20,
    },
    inputImage: {
        height: 330,
        width: 330,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 40,
    },
    topText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    imageBox: {
        backgroundColor: '#e9e9e9',
        height: 330,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputText: {
        width: '90%',
        marginTop: 20,
        backgroundColor: '#cfcfcf',
        color: "gray",
        borderBottomWidth: 2,
        borderColor: '#999999',
        fontWeight: 'bold',
        fontSize: 15,
        borderRadius: 10,
        padding: 10
    },
    datebox: {
        width: '90%',
        height: 50,
        marginTop: 20,
        backgroundColor: '#cfcfcf',
        color: "gray",
        borderBottomWidth: 2,
        borderColor: '#999999',
        borderRadius: 10,
        padding: 10
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 15,
        borderRadius: 10,
        padding: 10
    },
    scrollView: {
        marginHorizontal: 20,
    },
    inputTextS: {
        width: '90%',
        height: 150,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#cfcfcf',
        color: "gray",
        borderBottomWidth: 2,
        borderColor: '#999999',
        fontWeight: 'bold',
        fontSize: 15,
        borderRadius: 10,
        padding: 10
    },
});
