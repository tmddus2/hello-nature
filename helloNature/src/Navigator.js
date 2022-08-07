import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Home';
import ChattingScreen from './Chatting'
import LoginScreen from './Login'
//import UserProvider from './shared/UserContext';
//import useUserState from './shared/UserContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {




  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Chat" component={ChattingScreen} />
    </Tab.Navigator>
  );
}

const isLogin = false;

function RootNavigator() {
  //const { user } = useUserState();

  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState(false)
  useEffect(() => {
    //AsyncStorage.getItem('isLogin').then((value) => { console.log("isLogin: " + value) })
    //console.log("here!! " + AsyncStorage.getItem('isLogin'))
    /*
    if (AsyncStorage.getItem('isLogin') == 'true') {
      console.log("success login")
      console.log("username" + AsyncStorage.getItem('username'))
      axios.defaults.headers.common['Authorization'] = AsyncStorage.getItem('accessToken')

    } else {
      console.log("fail login")
    }
    */
    AsyncStorage.getItem('isLogin', (err, result) => {
      console.log("getItem isLogin return: " + result)
      if (result) {
        console.log("login success")
        AsyncStorage.getItem('username', (err, result) => {
          setUsername(result)
        })
        setLogin(true)
      } else {
        console.log("login fail")
      }
    })

    AsyncStorage.getItem('isLogin', (err, result) => {
      if (result) {
        AsyncStorage.getItem('accessToken', (err, result) => {
          axios.defaults.headers.common['Authorization'] = result
        })
      }
    })

  }, [])



  return (
    //<UserProvider>
    <Stack.Navigator>
      {login ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Root" component={BottomTabs} />
      )}
    </Stack.Navigator>
    //</UserProvider>
  );
}

//screenOptions={{headerTitleAlign: 'center'}}
export default RootNavigator;