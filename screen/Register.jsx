import {
  SafeAreaView, View,
  Text,
  TextInput,
  TouchableOpacity, Image, StyleSheet, Picker, KeyboardAvoidingView, Platform
} from 'react-native'
import React, { useContext, useState } from 'react'
import Lottie from 'lottie-react-native';
import { AuthContext } from '../src/context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import normalize from 'react-native-normalize';
import axios from 'axios';
import { BASE_URL } from '../src/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage  } from "react-native-flash-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Register = ({ navigation }) => {
  

  const [mobileNo, setMobileno] = useState('');
  const [userName, setUserName] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleMobNO = (text) => {
    const regex = /^[0-9]{0,10}$/;
    if (regex.test(text)) {
      setMobileno(text);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const registeruser = async (name, mobile, password) => {
    // const navigation = useNavigation();
    // const registeruser = async (name, email, mobile, password) => {

    
      setIsLoading(true);

      await axios.post(`${BASE_URL}/create-account`, 
      {
        name: userName,
        mobile: mobileNo,
        password: userPassword
      }).then(res => {
          let userInfo = res.data;
          console.log(userInfo);
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          // navigation.navigate('TabView');
          if(userInfo.status==false){
            showMessage({
              message: "invalid input" ,
              type: "danger",
              autoHide: true,
              duration: 3000,
              position: "top",
              style: {
                justifyContent: 'center',
                alignItems: 'center',
              },
              titleStyle: {
                textAlign: 'center',
              },
              descriptionStyle: {
                textAlign: 'center',
              },
            });
            setIsLoading(false);
          }else{
            showMessage({
              message: "Registration successful",
              type: "success",
              autoHide: true,
              duration: 3000,
              position: "top",
              style: {
                justifyContent: 'center',
                alignItems: 'center',
              },
              titleStyle: {
                textAlign: 'center',
              },
              descriptionStyle: {
                textAlign: 'center',
              },
            });
            setIsLoading(false);
            navigation.navigate('Login');
          }
          

      }).catch(er => {
          console.log(er);
          showMessage({
            message: "Invalid Input please fill valid input !",
            type: "danger",
            autoHide: true,
            duration: 3000,
            position: "top",
            style: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            titleStyle: {
              textAlign: 'center',
            },
            descriptionStyle: {
              textAlign: 'center',
            },
          });
          setIsLoading(false);
      });
  }


  return (
    <KeyboardAwareScrollView style={{backgroundColor:"#5cdb95"}} >
        
        <View style={styles.container}>
          
          <Spinner visible={isLoading}/>
          <View style={styles.img_container}>
            <Lottie style={styles.image} source={require('../assets/lottie/119220-create-account-letim.json')} autoPlay loop />
          </View>
          <View style={styles.content} >
            <View style={styles.textcontent} >
              <Text style={styles.login}>Create Account</Text>
            </View>
            <View style={styles.inpcontent}>
              <View style={styles.inpcon}>
                <TextInput
                  style={styles.inpfil}
                  placeholder='Full Name'
                  onChangeText={(text) => {
                    setUserName(text)
                  }}
                  value={userName}

                />
                {/* <TextInput
                  style={styles.inpfil}
                  placeholder='Email'
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  onChangeText={(text) => {
                    setUserEmail(text)
                  }}
                  value={userEmail}
                /> */}

                <TextInput
                  style={styles.inpfil}
                  placeholder='Mobile No'
                  keyboardType="numeric"
                  maxLength={10}
                  value={mobileNo}
                  onChangeText={handleMobNO}
                />

                <TextInput
                  style={styles.inpfil}
                  placeholder='Password'
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    setUserPassword(text)
                  }}
                  value={userPassword}

                />
                <TouchableOpacity style={styles.signbtn} onPress={()=>{
                  registeruser(userName,mobileNo,userPassword)
                  // registeruser(userName,userEmail,mobileNo,userPassword)
                }}>
                  <Text style={{ color: '#05386B', fontWeight: 'bold', fontSize: normalize(20) }}>Sign Up</Text>
                </TouchableOpacity>
                
              </View>
              <View style={styles.creatAcVi}>
                {/* <Text>Don't have an account Sign up</Text> */}
                <Text style={{ fontSize: normalize(18) }}>
                  Already have a account?
                  <Text style={{ color: '#05386B', fontWeight: 'bold', fontSize: normalize(20) }}
                    onPress={() => navigation.navigate('Login')}> Sign In
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor:"white",
      flexDirection: 'column',
    },
    img_container: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      padding:normalize(20)
    },
    image: {
      width: '100%',
      resizeMode: 'cover',
    },
    content: {
      flex: 7,
      backgroundColor:"#379683",
      flexDirection: 'column',
     borderTopLeftRadius: normalize(50), 
     borderTopRightRadius: normalize(50),
    },
    textcontent:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding:normalize(20)
      
    },
    inpcontent:{
      flex: 10,
      backgroundColor:"#5cdb95",
      flexDirection: 'column',
       borderTopRightRadius: normalize(50),
       borderTopLeftRadius: normalize(50), 
    },


    login:{
      fontSize:normalize(30),
      fontWeight: 'bold',
      color:"#edf5e1"
    },
    inpcon:{
      padding:normalize(50),
      flex:8,
      justifyContent: 'center',
      
    },
    inpfil:{
      borderBottomColor: 'white',
      borderBottomWidth: 1,
      marginTop:normalize(10),
      color:"white"
    },
    signbtn:{
      backgroundColor: 'white',
      borderRadius: normalize(22),
      paddingVertical: normalize(12),
      paddingHorizontal: normalize(20),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:normalize(20)
    },
    creatAcVi:{
      flex:2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom:20
    },
    
})
