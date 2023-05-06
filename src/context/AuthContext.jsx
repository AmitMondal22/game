import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage  } from "react-native-flash-message";

import { Alert } from 'react-native'
// import { useNavigation } from '@react-navigation/native';

// const BASE_URL = 'http://ghoshffplay.in/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    
    const registeruser = async (name, mobile, password) => {
      // const navigation = useNavigation();
      // const registeruser = async (name, email, mobile, password) => {
        setIsLoading(true);

        await axios.post(`${BASE_URL}/create-account`, {
            name, mobile, password
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            // navigation.navigate('TabView');
            setIsLoading(false);
            // navigation.navigate('Login');

        }).catch(er => {
            console.log(er);
            setIsLoading(false);
        });
    }


    const loginUser = async (email, password) => {
     
        setIsLoading(true);
        await axios.post(`${BASE_URL}/login`, {
            email, password
        }).then(res => {
            let userInfo = res.data;
            

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
              setUserInfo(userInfo);
              AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
              setIsLoading(false);
            }
            console.log("login Statue ",userInfo);
        }).catch(er => {
            console.log("login Network ",er);
            setIsLoading(false);
        });

    }

    const logout = () => {
        setIsLoading(true);
    
        axios.post(`${BASE_URL}/logout`,
            {},
            {
              headers: {Authorization: `Bearer ${userInfo.token}`},
            },
          ).then(res => {
            console.log(res.data);
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            setIsLoading(false);
          }).catch(e => {
            console.log(`logout error ${e}`);
            setIsLoading(false);
          });
      };



    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
    
          let userInfo = await AsyncStorage.getItem('userInfo');
          userInfo = JSON.parse(userInfo);
          //console.log(`is logged Data${userInfo}`);
          if (userInfo) {
            setUserInfo(userInfo);
          }
    
          setIsLoading(false);


          
            await axios.get(`${BASE_URL}/offer`).then(res => 
              {
              let offe = res.data;
              if(offe.data==1){
                Alert.alert(offe.url);
              }
              console.log("update Status",offe);
            }).catch(er => {
              console.log("login Network ", er);
            });



        } catch (e) {
            setIsLoading(false);
            console.log(`is logged in error ${e}`);
        }
      };


      
  useEffect(() => {
    isLoggedIn();
  }, []);

    return (
        <AuthContext.Provider value={{ isLoading, userInfo, registeruser, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
