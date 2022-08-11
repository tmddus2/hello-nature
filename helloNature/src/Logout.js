import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button } from "react-native";

const Logout = () => {
    const logout = () => {
        AsyncStorage.removeItem('isLogin')
        AsyncStorage.removeItem('accessToken')
        AsyncStorage.removeItem('username')
    }

    return (<><Button onPress={logout}>Logout</Button></>)
}

export default Logout