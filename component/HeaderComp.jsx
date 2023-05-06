import { StyleSheet, Text, View, Animated,Image,NativeModules,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState, useEffect,useContext } from 'react'
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation,useIsFocused } from '@react-navigation/native';
import normalize from 'react-native-normalize';


import AnimatedText from "./AnimatedText";
import myImage from "../src/assets/logo.png"
import axios from 'axios';
import { BASE_URL } from '../src/config';
import { AuthContext } from '../src/context/AuthContext';


import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";


const HeaderComp = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [wlBal,setWlBal]=useState();
  const { userInfo } = useContext(AuthContext);
  useEffect(() => {
    if (isFocused) {
      getGameNameData();
    }
  }, [navigation.isFocused()]);

  const getGameNameData = async() => {
    await axios.get(`${BASE_URL}/total_money_Wallet`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }).then(res => {
      let resData = res.data;
      setWlBal(resData);
      console.log('wb Blance',resData);
    }).catch(er => {
      console.log("login Network ",er);
    });
  }

  if(!wlBal){
    return(
      <ActivityIndicator size={32} />
    );
  }
  console.log('wb Blance',wlBal.data[0].total_value_amount);
  

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.logoView}>
          <Image source={myImage} style={styles.logo} />
        </View>
        <View style={styles.iconview}>
          <View style={styles.userIcon}>
            <Ionicons name="reload" color={"white"} size={normalize(20)} onPress={()=>{
              NativeModules.DevSettings.reload();
            }}/>
          </View>
          <View style={styles.userIcon}>
            <Text style={{color:"white",fontSize:responsiveFontSize(1.8)}}><FontAwesome name="wallet" color={"white"} size={20} /> ₹{(wlBal.data[0].total_value_amount)?wlBal.data[0].total_value_amount:0}
            </Text>
            {/* <Text style={{color:"white"}}><FontAwesome name="wallet" color={"white"} size={20} /> 100</Text> */}
          </View>
          <TouchableOpacity style={styles.userIcon} onPress={() => navigation.navigate('Profile')}>
            <FontAwesome name="user-circle" color={"white"} size={normalize(30)} />
            </TouchableOpacity>
        </View>

      </View>
      {/* <View style={styles.topView2}> */}
        {/* <Text style={{color:"black"}}>hello</Text> */}
        {/* <AnimatedText text={"Hello World"}/> */}
      {/* </View> */}

    </View>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    flex: 1,
    backgroundColor: '#ff0055',
    flexDirection: 'row',
  },
  topView2: {
    flex: 1,
    // backgroundColor:'white',

  },
  logoView:{
    flex:1,
    // alignItems: 'center',
   justifyContent: 'center',

  },
  logo:{
    width: responsiveWidth(10),
    height:responsiveHeight(5, 'height'),
    borderRadius:normalize(40), 
    margin:normalize(5)
  },
  iconview:{
    flex:1,
    justifyContent: 'center',
    // alignItems: 'flex-end',
    flexDirection: 'row',
    alignItems:"center",
    
  },
  userIcon:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
})