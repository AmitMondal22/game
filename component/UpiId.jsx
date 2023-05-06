import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios';
import gPay from '../src/assets/gpay.png'
import phonePay from '../src/assets/phonepay.png'
import payTm from '../src/assets/payth.png'
import { BASE_URL } from '../src/config';
import { AuthContext } from '../src/context/AuthContext';
import normalize from 'react-native-normalize';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
// const BASE_URL = 'http://ghoshffplay.in/api';
const UpiId = () => {
    const [upiData, setUpiData] = useState({});
    const { userInfo, isLoading } = useContext(AuthContext);

    const get_upi = async () => {
        await axios.get(`${BASE_URL}/upi`, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`
          }
        }).then(res => {
          let upi_idd = res.data;
          setUpiData(upi_idd);
          console.log("form result ", upi_idd);
        }).catch(er => {
          console.log("result Network ", er);
        });
      }

      useEffect(() => {
        get_upi();
      }, []);

      if(!upiData){
        return(
          <ActivityIndicator size={32} />
        );
      }
console.log(upiData);

    return (
        <View style={styles.container}>
            <View style={styles.content_container}>
                <Text style={styles.textVie}>Send Money To</Text>
            </View>
            <View style={styles.content_container}>
                <Text style={{
                    color: "#ff001e",
                    fontWeight: "bold",
                    fontSize: responsiveFontSize(3),
                }}>{upiData.data}</Text>
            </View>
            <View style={styles.content_container2}>

                <View style={styles.img_container3}>
                    <Image source={gPay} style={styles.logo} />
                </View>
                <View style={styles.img_container3}>
                    <Image source={phonePay} style={styles.logo} />
                </View>
                <View style={styles.img_container3}>
                    <Image source={payTm} style={styles.logo} />
                </View>


            </View>

        </View>
    )
}

export default UpiId

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    textVie: {
        color: "#ff001e",
        fontWeight: "bold",
        fontSize: normalize(15),
    },
    content_container: {
        height:responsiveHeight(4),
        justifyContent: 'center',
        alignItems: 'center',

    },
    content_container2: {
        height:responsiveHeight(4),
        // justifyContent: 'center',
        flexDirection: 'row',
        // alignItems: 'center',

    },
    img_container: {
        flex: 1,

    },

    img_container3: {
        flex: 1,
        margin: normalize(1)
    },
    logo: {
        width: responsiveWidth(25),
        height: responsiveHeight(5),
        resizeMode: 'contain'
    }
})