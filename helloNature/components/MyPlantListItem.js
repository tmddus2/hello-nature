// components/MyPlantListItem.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const MyPlantListItem = ({plant, water}) => {
  
  return (
    <View style={styles.container}>
      <Image source={plant.picture} style={styles.image} />
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('PlantProfile')}>
          <View style={styles.row}>
            {/* <Text style={styles.name}>   {plant.name}</Text> */}
            <Text style={styles.name}>   {plant.name}</Text>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/427/427112.png' }} style={styles.waterImage} />
          </View>
        </TouchableOpacity>   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 20,
    flexDirection: 'row',
    padding: 10
  },
  waterImage: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 15,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default MyPlantListItem;