import { StyleSheet, Text, View,FlatList,ActivityIndicator,TouchableOpacity } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../../component/HeaderComp';
import HomeCustComp from '../../component/HomeCustComp';
import { AuthContext } from '../../src/context/AuthContext';
import { BASE_URL } from '../../src/config';
import axios from 'axios';

import FontAwesome from "react-native-vector-icons/FontAwesome5"

import { useNavigation, useIsFocused } from "@react-navigation/native";

// const BASE_URL = 'http://ghoshffplay.in/api';
const Transaction = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getGameNameData();
    }
   
  }, [navigation.isFocused()]);

  const { userInfo,isLoading } = useContext(AuthContext);
  const [gameTran,setgTran]=useState();
  const getGameNameData = async() => {
    await axios.get(`${BASE_URL}/transaction`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }).then(res => {
      let resData = res.data;
      setgTran(resData);
    }).catch(er => {
      console.log("login Network ",er);
    });
  }


  const ContactList = ({contactInfo}) => {

   const fTime=(time24)=>{

    const date = new Date(time24);
const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/New_York" // Replace with the desired time zone
};
return new Intl.DateTimeFormat("en-US", options).format(date);


        // let dateObj = new Date(time24);
        // let time12 = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        // console.log(time12); 
        // return time12;
   }
  return (
    <LinearGradient  colors={["black", "yellow"]} start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}} style={styles.cardGradient}>
    <View style={styles.card}>
    <View style={styles.infocon}>
        <View style={{...styles.icon,backgroundColor:"white"}}>
            <FontAwesome name="trophy" color={"red"} size={20} style={styles.iconCont}/>
        </View>
            <View style={styles.textCont}>
                <Text style={{ color: "white", fontWeight: 'bold',fontSize:20 }}>₹ {contactInfo.amount}</Text>
                <Text  style={{ color: "white", fontWeight: 'bold',fontSize:15 }}>{fTime(contactInfo.created_at)}</Text>
                <Text style={{ color: "white", fontWeight: 'bold' }}>Type : {contactInfo.trns_flag === "W" ? "Withdrawal" : (contactInfo.trns_flag === "D" ? "Deposit" : "Winning")}</Text>
            </View>
            
            <View style={styles.btn}>
          <Text style={styles.btn_text}> {contactInfo.status=="0" ? "Pending":"Success"}</Text>
        </View>
    </View>
  
</View>
</LinearGradient>
  )
}

if(!gameTran){
  return(
    <ActivityIndicator size={32} />
  );
}
console.log(gameTran.data);
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
          <View style={styles.listGame}>
             <FlatList
             data={gameTran.data}
             keyExtractor={(item)=>item.transaction_id} 
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

export default Transaction

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topVie: {
    flex: 7,
  },
  gamelistcont: {
    flex: 73,
    marginTop:5
  },
  topVieResPro2: {
    flex: 10,
    marginTop: 12
  },
  gamelistcont: {
    flex: 73,
    marginTop: 5
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
  btn:{
     
    backgroundColor:"white",
    padding:6,
    borderRadius:5,
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
     
   },
   btn_text:{
     color:"black",
     
     fontWeight: 'bold',
   },

  card: {
    borderRadius:10,
  },
  cardGradient:{
    borderRadius:10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
    
    
  },

  infocon: {
    flexDirection:"row",
    alignItems:'center',
  //   paddingVertical:5
},
textCont:{
    fontSize:18,
    color:"white",
    flex: 7,
},
iconCont:{
   flex:1,
   paddingVertical:5,
  //  color:'white',
  //  marginHorizontal:10,
   color:"black",
   fontWeight: 'bold',
},




  infocon: {
    flexDirection: "row",
    alignItems: 'center',
    //   paddingVertical:5
    justifyContent: "center",
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
  upiview2: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 5

  }

})