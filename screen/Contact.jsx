import { StyleSheet, Text, View,Image,Linking,TouchableOpacity } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../component/HeaderComp';
import HomeCustComp from '../component/HomeCustComp';
import normalize from 'react-native-normalize';
import { BASE_URL } from '../src/config';
import axios from 'axios';

import wpimg from "../src/assets/whatsapp.png"
import { AuthContext } from '../src/context/AuthContext';

// const BASE_URL = 'http://ghoshffplay.in/api';
const Contact = ({ navigation}) => {
  
  const { userInfo, isLoading } = useContext(AuthContext);
  const [upiData, setUpiData] = useState({});
  useEffect(() => {
    get_upi();
  }, []);
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

  const handleWhatsApp = () => {
    const url = `whatsapp://send?phone=91${upiData.data}`;
    Linking.openURL(url).catch(() => alert('Make sure WhatsApp is installed on your device'));
    
  };

  const handleMobile = () => {
    Linking.openURL(`tel:${upiData.data}`);
  };

  


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
            
              <View style={styles.card_container_contact}>
              <Image source={wpimg} style={styles.wplg} />
              </View>

              <View style={styles.card_container_contact2}>
              <TouchableOpacity onPress={handleWhatsApp} style={styles.btnwp}>
                <Text style={{ color: 'white',justifyContent:"center",alignContent:"center"}}>Chat on WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMobile} style={styles.btnwp2}>
                <Text style={{ color: 'white',justifyContent:"center",alignContent:"center"}}>Call Us</Text>
              </TouchableOpacity>
              </View>

            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Contact

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
    marginTop: normalize(5, 'height')
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
  card_container_contact:{
    flex:1
  },
  card_container_contact2:{
    flex:1
  },

  wplg:{
    width:"100%",
    height:"100%",
  },
  btnwp:{
    marginTop:normalize(10),
    backgroundColor:"green",
    padding:normalize(10),
    borderRadius: normalize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnwp2:{
    marginTop:normalize(10),
    backgroundColor:"#85001a",
    padding:normalize(10),
    borderRadius: normalize(25),
    alignItems: 'center',
    justifyContent: 'center',
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
    //  marginHorizontal:normalize(10),
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
    flexDirection: 'column',
    marginHorizontal: normalize(5),
    marginVertical: normalize(10),
    backgroundColor: "#ffff",
    marginHorizontal:normalize(20),
    borderRadius: normalize(5),
    padding:normalize(40),

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
    paddingVertical: normalize(15),
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
    marginHorizontal: normalize(25),
    borderRadius: normalize(5)

  }

})