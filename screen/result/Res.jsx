import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../src/context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { BASE_URL } from '../../src/config';
import { useIsFocused } from "@react-navigation/native"
import normalize from 'react-native-normalize';

import FontAwesome from "react-native-vector-icons/FontAwesome5"
import HeaderComp from '../../component/HeaderComp';
import HomeCustComp from '../../component/HomeCustComp';


// const BASE_URL = 'http://ghoshffplay.in/api';
const Res = ({navigation,route }) => {
  const isFocused = useIsFocused();
  const [gameId, setGameId] = useState();
  const [bidRes, setBidRes] = useState({});
  const { userInfo, isLoading } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  // route.params.gameNameInfo.id
  const submitData = async () => {
    await axios.get(`${BASE_URL}/game_result`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      },
      params: { 'game_id': route.params.gameNameInfo.id }
    }).then(res => {
      let userInfodata = res.data;
      setBidRes(userInfodata);
      console.log("form result ", bidRes);
    }).catch(er => {
      console.log("result Network ", er);
    });
  }

  useEffect(() => {
    submitData();
  }, [isFocused]);

  const datF = (inpdate) => {
    let date = new Date(inpdate);
    let timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return timeString.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  }

  const RenderTable = ({ contactInfo }) => {
    const { res_a } = contactInfo;
    const { a_res } = contactInfo;
    const { res_b } = contactInfo;
    const { b_res } = contactInfo;
    const { res_c } = contactInfo;
    const { c_res } = contactInfo;
    const { res_d } = contactInfo;
    const { d_res } = contactInfo;

    const { res_e } = contactInfo;
    const { e_res } = contactInfo;
    const { res_f } = contactInfo;
    const { f_res } = contactInfo;
    const { res_g } = contactInfo;
    const { g_res } = contactInfo;
    const { res_h } = contactInfo;
    const { h_res } = contactInfo;
    const { date } = contactInfo;
    return (
      <LinearGradient colors={["black", "yellow"]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.cardGradient}>
        <View style={styles.card}>
          <View style={styles.infocon}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>{date}</Text>
          </View>
          <View style={styles.infocon}>


            <View style={styles.textCont}>
              <Text style={{ color:"#7ff8fa", marginBottom:normalize(10) }}>1 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_a}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{a_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.ares}</Text>
            </View>
            <View style={styles.textCont}>

              <Text style={{ color:"#7ff8fa",marginBottom:normalize(10) }}>2 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_b}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{b_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.bres}</Text>
            </View>
            <View style={styles.textCont}>

              <Text style={{ color:"#7ff8fa", marginBottom:normalize(10) }}>3 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_c}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{c_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.cres}</Text>
            </View>
            <View style={styles.textCont}>

              <Text style={{ color:"#7ff8fa", marginBottom:normalize(10) }}>4 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_d}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{d_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.dres}</Text>
            </View>
            <View style={styles.textCont}>

              <Text style={{ color:"#7ff8fa", marginBottom:normalize(10) }}>5 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_e}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{e_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.eres}</Text>
            </View>
            <View style={styles.textCont}>

              <Text style={{ color:"#7ff8fa", marginBottom:normalize(10) }}>6 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_f}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{f_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.fres}</Text>
            </View>
            <View style={styles.textCont}>

              <Text style={{ color:"#7ff8fa", marginBottom:normalize(10) }}>7 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_g}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{g_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.gres}</Text>
            </View>
            <View style={styles.textCont}>

              <Text style={{ color:"white",marginBottom:normalize(10) }}>8 Baji</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{res_h}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{h_res}</Text>
              <Text style={{ color: "white", fontWeight: 'bold' }}>{contactInfo.hres}</Text>
            </View>


          </View>

        </View>
      </LinearGradient>
    )
  }
  if (!bidRes) {
    return (
      <ActivityIndicator size={normalize(32)} />
    );
  }

  console.log(bidRes.data)
  return (
    <LinearGradient colors={['#0d00ff', '#e0ffe7']} style={styles.container}>
      <View style={styles.container}>
        <View style={styles.topVie}>
          <HeaderComp />
        </View>
        <View style={styles.topVieResPro2}>

          <View style={styles.upiview2}>
            <HomeCustComp />
          </View>
        </View>
        <View style={styles.gamelistcont}>
          <View style={styles.card_container1}>
            <View style={styles.card_container}>
              <FlatList
                data={bidRes.data}
                keyExtractor={(item) => item.result_id}
                renderItem={({ item }) => (



                  <RenderTable contactInfo={item} />



                )}
              />

            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Res

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topVie: {
    flex: 7,
  },
  topVieResPro2: {
    flex: 10,
    marginTop: normalize(12)
  },
  gamelistcont: {
    flex: 73,
    marginTop: normalize(5)
  },
  card: {
    borderRadius: normalize(10),
  },
  cardGradient: {
    borderRadius: normalize(10),
    padding: normalize(10),
    marginVertical: normalize(5),
    marginHorizontal: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: normalize(0), height: normalize(2, 'height') },
    shadowOpacity: 0.2,
    elevation: normalize(3),


  },






  infocon: {
    flexDirection: "row",
    alignItems: 'center',
    //   paddingVertical:5
    justifyContent: "center",
    
  },
  textCont: {
    fontSize: normalize(18),
    color: "white",
    flex: 7,
  },
  iconCont: {
    flex: 1,
    paddingVertical: normalize(5),
    //  color:'white',
    //  marginHorizontal:10,
    color: "black",
    fontWeight: 'bold',
  },
  icon: {
    borderRadius: normalize(25),
    aspectRatio: normalize(1),
    alignItems: "center",
    justifyContent: "center",
    marginRight: normalize(15),
    padding: normalize(1),
    backgroundColor: "green",
    flex: 1,
  },








  card_container: {
    flex: 1,
  
    borderTopRightRadius: normalize(10),
    borderTopLeftRadius: normalize(10)

  },
  card_container1: {
    flex: 1,
  },



  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: normalize(10),
    borderWidth: normalize(1),
    borderColor: '#ddd',
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
  },
  nameContainer: {
    flex: 1,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(15),
    borderRightWidth: normalize(1),
    borderRightColor: '#ddd',
  },
  ageContainer: {
    flex: 1,
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(10),
  },
  name: {
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
  age: {
    fontSize: normalize(16),
  },
  upiview2: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: normalize(20),
    borderRadius: normalize(5)

  }

})