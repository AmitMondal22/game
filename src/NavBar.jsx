import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect,useState } from 'react'

import TabView from '../screen/TabView';
import Register from '../screen/Register';
import Login from '../screen/Login';
import GameTime from '../screen/GameTime';
import { AuthContext } from './context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BidGame from '../screen/BidGame';
import MyBidGameTime from '../screen/MyBidGameTime';
import MybidResult from '../screen/MybidResult';
import SplashScreen from '../component/SplashScreen';
import Deposit from '../screen/deposit_withdral/Deposit';
import Withdral from '../screen/deposit_withdral/Withdral';
import Profile from '../screen/Profile';
import Transaction from '../screen/deposit_withdral/Transaction';
import Res from '../screen/result/Res';
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

const LodPage=()=>{
  return(
    <SplashScreen/>
  )
}
const NavBar = () => {
  const { userInfo,isLoading } = useContext(AuthContext);
  console.log("navbar token",isLoading);
  return (
    
      <NavigationContainer>
        <FlashMessage />
        <Stack.Navigator>
        {userInfo.token ? (
          <>
          
            <Stack.Screen name="TabView" component={TabView} options={{
              headerShown: false
            }} />
            <Stack.Screen name="GameTimePage" component={GameTime} options={{
              headerShown: false
            }} />
            <Stack.Screen name="BidGame" component={BidGame} options={{
               headerShown: false,
              
            }} />
            <Stack.Screen name="MybidResult" component={MybidResult} options={{
               headerShown: false,
            }} />
            <Stack.Screen name="MyBidGameTime" component={MyBidGameTime} options={{
               headerShown: false,
              
            }} />
            <Stack.Screen name="Deposit" component={Deposit} options={{
               headerShown: false,
              
            }} />

            <Stack.Screen name="Withdral" component={Withdral} options={{
               headerShown: false,
              
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{
               headerShown: false,
              
            }} />
            <Stack.Screen name="Transaction" component={Transaction} options={{
               headerShown: false,
              
            }} />
            <Stack.Screen name="Res" component={Res} options={{
               headerShown: false,
              
            }} />
            </>
          ) : (
            <>
            <Stack.Screen name="Login" component={Login} options={{
                headerShown:false,
                animation: 'none'
              }} />
               
             <Stack.Screen name="Register" component={Register} options={{
                    headerShown:false,
                    animation: 'none'
              }} />
              
              </>
          )}
        </Stack.Navigator>

      </NavigationContainer>
  )
}

export default NavBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})