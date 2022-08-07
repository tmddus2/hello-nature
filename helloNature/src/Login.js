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

function LoginScreen() { // 추후 다른 페이지를 파서 로그인 페이지로 확장
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{color:'black'}}>Login Screen</Text>
    </View>
  );
}


export default LoginScreen;