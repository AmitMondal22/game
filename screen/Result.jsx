import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,Button } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused } from "@react-navigation/native"
import { BASE_URL } from '../src/config'
import axios from 'axios'
import { AuthContext } from '../src/context/AuthContext'
import normalize from 'react-native-normalize';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import { getColorByLetter } from '../src/utiles'
import { getTwoColorByLetter } from '../src/utiles'
import HeaderComp from '../component/HeaderComp'
import HomeCustComp from '../component/HomeCustComp'



// const BASE_URL = 'http://ghoshffplay.in/api';
const Result = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { userInfo,isLoading } = useContext(AuthContext);

  useEffect(() => {
    getGameNameDaat();
  }, [isFocused]);

  const [getGameName, setGetGameName] = useState([]);

  const ContactList = ({contactInfo}) => {
    const {game_name} = contactInfo;
    const {game_id} = contactInfo;
    // console.log(displayName?.[0]??"");
    const colour=getColorByLetter(game_name?.[0]??"");
    const twoColour=getTwoColorByLetter(game_name?.[0]??"",game_name?.[2]??"");
    // const colour="blue";
    console.log(twoColour[0])
  return (
    <LinearGradient  colors={[twoColour[0], twoColour[1]]} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.cardGradient}>
    <View style={styles.card}>
    <View style={styles.infocon}>
        <View style={{...styles.icon,backgroundColor:"white"}}>
            <Text style={styles.iconCont}>{(game_name?.[0]??"").toUpperCase()}</Text>
        </View>
        <Text style={styles.textCont}>{game_name}</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Res',{
          gameNameInfo:{id: game_id}
        })}>
          <Text style={styles.btn_text}>Result</Text>
        </TouchableOpacity>
    </View>
  
</View>
</LinearGradient>
  )
}

  const getGameNameDaat = async() => {
      //console.log(`Bearer ${userInfo.token}`);
      await axios.get(`${BASE_URL}/game-name`, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`
        }
      }).then(res => {
          let gamelist = res.data;
          setGetGameName(gamelist);
          //console.log("login Statue ",gamelist);
      }).catch(er => {
          console.log("login Network ",er);
      });
  }
  console.log(getGameName);
  return (
    <LinearGradient  colors={['#0d00ff', '#e0ffe7']} style={styles.container}>
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
          <View style={styles.listGame}>
            <FlatList
             data={getGameName.data}
             keyExtractor={(item)=>item.game_id} 
             renderItem={({item})=>(
             
                    

                    <ContactList contactInfo={item}/>
              
             
              
              )}
              />
          </View>
        </View>
        
      </View>
    </LinearGradient>
  )
}

export default Result

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
    marginTop:normalize(12, 'height')
  },
  gamelistcont: {
    flex: 73,
    marginTop:normalize(5, 'height')
  },
  listGame:{
  },
  card: {
   
  },
  cardGradient:{
    padding: normalize(10),
    marginVertical: normalize(5),
    marginHorizontal: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: normalize(0), height: normalize(2, 'height') },
    shadowOpacity: 0.2,
    elevation: normalize(3),
    borderRadius:normalize(5)
    
  },

  btn:{
   
   backgroundColor:"white",
   padding:normalize(6),
   borderRadius:normalize(5),
   flex:2,
   alignItems: 'center',
   justifyContent: 'center',
    
  },
  btn_text:{
    color:"black",
    
    fontWeight: 'bold',
  },



  
infocon: {
    flexDirection:"row",
    alignItems:'center',
    paddingVertical:normalize(5)
},
textCont:{
    fontSize:responsiveFontSize(2),
    color:"white",
    flex: 7,
},
iconCont:{
   flex:1,
   paddingVertical:normalize(5),
   color:'white',
   marginHorizontal:normalize(10),
   color:"black",
   fontWeight: 'bold',
},
icon:{
    borderRadius:normalize(25),
    aspectRatio:normalize(1),
    alignItems:"center",
    justifyContent:"center",
    marginRight:normalize(15),
    padding:normalize(1),
    backgroundColor:"green",
    flex: 1,
}

,
  upiview2:{
    flex:1,
    backgroundColor:"white",
    marginHorizontal:normalize(20),
    borderRadius:normalize(5)

  }
})