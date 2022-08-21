import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  requireNativeComponent,
  NativeModules,
  Button,
  ToastAndroid,
} from 'react-native';

const { RNNativeToastLibrary } = NativeModules;



function PlantInfoScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
          title="RNNativeToastLibrary"
          onPress={()=>{
            console.log("HEI");
            RNNativeToastLibrary.show('HELLO');
            }}/>
    </View>

  );
}

export default PlantInfoScreen;