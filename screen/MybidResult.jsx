import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList,ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../src/context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { BASE_URL } from '../src/config';

import HeaderComp from '../component/HeaderComp';
import HomeCustComp from '../component/HomeCustComp';

// const BASE_URL = 'http://ghoshffplay.in/api';
const MybidResult = ({ navigation, route }) => {

  const [gameId, setGameId] = useState();
  const [bidRes, setBidRes] = useState({});
  const { userInfo, isLoading } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);

  const submitData = async () => {
    await axios.get(`${BASE_URL}/my-bid`, {
      params: {
        game_id: route.params.gameNameInfo.id,
      },
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }).then(res => {
      let userInfodata = res.data;
      setBidRes(userInfodata);
      console.log("form submit ", bidRes);
    }).catch(er => {
      console.log("form submit Network ", er);
    });
  }

  useEffect(() => {
    submitData();
  }, [route.params.gameNameInfo.id]);

  const datF=(inpdate)=>{
    let date = new Date(inpdate);
    let timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return timeString.replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  }

  const RenderTable = ({contactInfo}) => {
        const {single} = contactInfo;
        const {jodi} = contactInfo;
        const {patti} = contactInfo;
        const {single_amt} = contactInfo;
        const {jodi_amt} = contactInfo;
        const {patti_amt} = contactInfo;
        const {created_at} = contactInfo;
    return (
      <LinearGradient  colors={["black", "yellow"]} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.cardGradient}>
      <View style={styles.card}>
      <View style={styles.infocon}>
         
              <View style={styles.textCont}>
                  <Text style={{ color: "white", fontWeight: 'bold',fontSize:18 }}>Date</Text>

                  <Text style={{ color: "white", fontWeight: 'bold' }}>{datF(created_at)}</Text>
              </View>
              <View style={styles.textCont}>
                  <Text style={{ color: "white", fontWeight: 'bold',fontSize:18 }}>Single</Text>
                  <Text  style={{ color: "white", fontWeight: 'bold' }}>{single}</Text>
                  <Text style={{ color: "white", fontWeight: 'bold' }}>₹ {single_amt}</Text>
              </View>
              <View style={styles.textCont}>
                  <Text style={{ color: "white", fontWeight: 'bold',fontSize:18  }}>Jodi</Text>
                  <Text  style={{ color: "white", fontWeight: 'bold'}}>{jodi}</Text>
                  <Text style={{ color: "white", fontWeight: 'bold' }}>₹ {jodi_amt}</Text>
              </View>
              <View style={styles.textCont}>
                  <Text style={{ color: "white", fontWeight: 'bold',fontSize:20 }}>Patti</Text>
                  <Text  style={{ color: "white", fontWeight: 'bold' }}>{patti}</Text>
                  <Text style={{ color: "white", fontWeight: 'bold' }}>₹ {patti_amt}</Text>
              </View>
              
              
      </View>
    
  </View>
  </LinearGradient>
    )
  }
  if(!bidRes){
    return(
      <ActivityIndicator size={32} />
    );
  }

  console.log("test test",bidRes.data)
  console.log("test test",bidRes.data)
  return (
    <LinearGradient colors={['#0d00ff', '#e0ffe7']} style={styles.container}>
      <View style={styles.container}>
      <View style={styles.topVie}>
          <HeaderComp />
        </View>
        <View style={styles.topVieResPro2}>
          
          <View style={styles.upiview2}>
            <HomeCustComp/>
          </View>
        </View>
        <View style={styles.gamelistcont}>
          <View style={styles.card_container1}>
            <View style={styles.card_container}>
            <FlatList
             data={bidRes.data}
             keyExtractor={(item)=>item.bid_id} 
             renderItem={({item})=>(
             
                    

                    <RenderTable contactInfo={item}/> 
              
             
              
              )}
              /> 
            
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default MybidResult

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
    marginTop:12
  },
  gamelistcont: {
    flex: 73,
    marginTop:5
  },
    card: {
        borderRadius: 10,
    },
    cardGradient: {
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 3,


    },

   




    infocon: {
        flexDirection: "row",
        alignItems: 'center',
        //   paddingVertical:5
    },
    textCont: {
        fontSize: 18,
        color: "white",
        flex: 7,
    },
    iconCont: {
        flex: 1,
        paddingVertical: 5,
        //  color:'white',
        //  marginHorizontal:10,
        color: "black",
        fontWeight: 'bold',
    },
    icon: {
        borderRadius: 25,
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
        padding: 1,
        backgroundColor: "green",
        flex: 1,
    },








    card_container: {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginHorizontal: 5,
        // marginVertical: 10,
        // backgroundColor: "#9da800",
        // padding: 15,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10

    },
    card_container1: {
        flex: 1,


    },
    


    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 20,
        marginVertical: 10,
      },
      nameContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
      },
      ageContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
      },
      name: {
        fontWeight: 'bold',
        fontSize: 16,
      },
      age: {
        fontSize: 16,
      },
      upiview2:{
        flex:1,
        backgroundColor:"white",
        marginHorizontal:20,
        borderRadius:5
    
      }

})