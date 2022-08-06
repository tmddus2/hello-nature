import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function ChattingScreen() { // 추후 다른 페이지로 이동
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:'black'}}>Chat Screen</Text>
    </View>
  );
}

export default ChattingScreen;