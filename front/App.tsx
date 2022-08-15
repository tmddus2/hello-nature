// import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation'


// export default function App(){
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();

//   if(!isLoadingComplete){
//     return null;
//   }else{
//     return(
//       <SafeAreaProvider>
//         <Navigation colorScheme={colorScheme}/>
//         <StatusBar />
//       </SafeAreaProvider>
//     )
//   }
// }

import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import Home from './screens/Home'
import Login from './screens/Login'

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login" screenOptions = {{
        headerShown:false
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name ="Login" component={Login}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
} 

const styles = StyleSheet.create({
  container:{
    flex : 1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  }
})