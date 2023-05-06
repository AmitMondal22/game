import { StyleSheet, Text, View,StatusBar,Image } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import logoImg from '../src/assets/logo.png'

const SplashScreen = () => {
 
  return (
    <View style={styles.container}>
      <StatusBar hidden={true}  backgroundColor="#ffffff"/>
      <Image source={logoImg} style={styles.logo} />
      {/* <LottieView
                    source={require('../src/assets/lottieFiles/17658-lamsa-splash-screen.json')}
                    autoPlay
                    loop
                    resizeMode="contain"
                    style={styles.logo}
                /> */}
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  SplashScreen: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"red",
    color:'red',
  },
  container: {
    backgroundColor: '#7d7979',
    flex:1,
  },
  stBar:{
    backgroundColor:"#7d7979",
  },
  logo:{
    width: "100%",
    height: "100%",
    resizeMode: 'contain'
  }
})