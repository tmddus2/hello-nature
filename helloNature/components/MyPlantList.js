import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MyPlantListItem from './MyPlantListItem';

const MyPlantList = ({plant, water}) => {
    return (
        <ul>
            {
                plant.map((item) => (<MyPlantListItem item={item} water={water}/>))
            } 
        </ul>
    );
};

export default MyPlantList;