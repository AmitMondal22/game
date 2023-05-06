import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome5"

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native';
import normalize from 'react-native-normalize';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

const HomeCustComp = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.containerIcon} onPress={() => navigation.navigate('Deposit')}>
       
            <FontAwesome name="wallet" color={"#3E54AC"} size={normalize(30)} />
            <Text style={{color:"black", fontSize:responsiveFontSize(1.8)}}>Deposit</Text>
       
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerIcon} onPress={() => navigation.navigate('Withdral')}>
            <FontAwesome name="rupee-sign" color={"#088395"} size={normalize(30)} />
            <Text style={{color:"black", fontSize:responsiveFontSize(1.8)}}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerIcon} onPress={() => navigation.navigate('Transaction')}>
            <MaterialIcons name="stacked-bar-chart" color={"#FF6969"} size={normalize(30)} />
            <Text style={{color:"black", fontSize:responsiveFontSize(1.8)}}>Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerIcon} onPress={() => navigation.navigate('Profile')}>
            <FontAwesome name="user" color={"#77037B"} size={normalize(30)} />
            <Text style={{color:"black", fontSize:responsiveFontSize(1.8)}}>Profile</Text>
        </TouchableOpacity>
      
    </View>
  )
}

export default HomeCustComp

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row"
    },
    containerIcon:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#ECF2FF",
        marginHorizontal:normalize(5),
        marginVertical:normalize(5),
        borderRadius:normalize(5)
    }
})