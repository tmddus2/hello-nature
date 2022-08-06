import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import CalenderScreen from './Calender';
import PlantInfoScreen from './PlantInfo';

const SlidingTab = createMaterialTopTabNavigator();

function HomeScreen() {
  return (
    <SlidingTab.Navigator initialRouteName="Calender">
      <SlidingTab.Screen name="Calender" component={CalenderScreen} options={{ headerShown: false }}/>
      <SlidingTab.Screen name="PlantInfo" component={PlantInfoScreen} options={{ headerShown: false }}/>
    </SlidingTab.Navigator>
  );
}

export default HomeScreen;