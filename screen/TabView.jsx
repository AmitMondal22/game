import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import FontAwesome from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import LinearGradient from 'react-native-linear-gradient'


import Home from './Home';
import Contact from './Contact';
import MyBid from './MyBid';
import Result from './Result';
import Winings from './Winings';


const Tab = createBottomTabNavigator();
const TabView = () => {
  return (
    
    <Tab.Navigator screenOptions={() => ({
      headerShown: false,
      tabBarInactiveTintColor: 'white',
      tabBarActiveTintColor: 'yellow',
      tabBarStyle: {
        height: 70,
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom:15,
        backgroundColor: 'rgba(34,36,40,1)',
        borderTopWidth: 0,
    },
    tabBarBackground:() =>(
      <LinearGradient  colors={['#AD3231',  '#2757C3']} style={{height:70}}/>
    )
  })}
    >
        <Tab.Screen name="Home" component={Home}  options={{
                headerShown:false,
                tabBarLabel: 'Home',
                
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="home" color={color} size={size} />
                    
                ),
            }}/>
        <Tab.Screen name="MyBid" component={MyBid} options={{
                headerShown:false,
                tabBarLabel: 'My Bid',
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="stacked-bar-chart" color={color} size={size} />
                    
                ),
            }}/>
        <Tab.Screen name="Result" component={Result} options={{
                headerShown:false,
                tabBarLabel: 'Result',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="trophy" color={color} size={size} />
                    
                ),
            }}/>
        <Tab.Screen name="Contact" component={Contact} options={{
                headerShown:false,
                tabBarLabel: 'Contacts',
                tabBarIcon: ({ color, size }) => (
                  <MaterialIcons name="help-center" color={color} size={size} />
                ),
            }}/>
        <Tab.Screen name="Winings" component={Winings} options={{
                headerShown:false,
                tabBarLabel: 'Winings',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="heart" color={color} size={size} />
                    
                ),
            }}/>
    </Tab.Navigator>
  )
}

export default TabView

const styles = StyleSheet.create({})