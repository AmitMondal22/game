import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../../component/HeaderComp';
import HomeCustComp from '../../component/HomeCustComp';
import axios from 'axios';
import { BASE_URL } from '../../src/config';
import { AuthContext } from '../../src/context/AuthContext';


// const BASE_URL = 'http://ghoshffplay.in/api';
const Deposit = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Select");
  const [trans, setTransNo] = useState();
  const [amt, setAmt] = useState();
  const [subStatus, setsubStatus] = useState(false);

  const { userInfo, isLoading } = useContext(AuthContext);
  const saveDeposit = async () => {
    console.log(userInfo.token);
    if (selectedLanguage != "Select") {
      setsubStatus(true);
      await axios.post(
        `${BASE_URL}/deposit_amt`,
        {
          amt: amt,
          paymod: selectedLanguage,
          transNo: trans,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      ).then(res => {
        setsubStatus(false);
        let resData = res.data;

        if(resData.status=="SUCCESS"){
          setAmt("")
          setTransNo("");
          setSelectedLanguage("");
          navigation.navigate('Transaction')
        }
        console.log("form submit ", resData);
      }).catch(er => {
        setsubStatus(false);
        console.log("form submit Network ", er);
      });
    }

  }
  return (
    <SafeAreaView style={styles.container2}>

      <LinearGradient colors={['#0d00ff', '#e0ffe7']} style={styles.container}>
      {subStatus && <ActivityIndicator style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />}
        <ScrollView style={styles.container2}>
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
                {/* <View style={styles.card_container}> */}
                <LinearGradient colors={['#12017d', '#8b78ff']} style={styles.card_container}>
                  <View style={styles.textHead}>
                    <Text style={styles.textHead}>DEPOSIT MONEY</Text>
                  </View>


                  <View>

                    <Text style={{ color: "white" }}>Choose Payment Method</Text>
                    <Picker
                      style={styles.inpfil}
                      selectedValue={selectedLanguage}
                      onValueChange={(itemValue, itemIndex) => {
                        setSelectedLanguage(itemValue);
                        console.log(itemValue)
                      }
                      }>
                      <Picker.Item label="Select" value="Select" />
                      <Picker.Item label="PhonePay" value="PhonePay" />
                      <Picker.Item label="GPay" value="GPay" />
                      <Picker.Item label="Paytm" value="Paytm" />
                      <Picker.Item label="Upi" value="Upi" />
                    </Picker>




                    <Text style={{ color: "white" }}>Enter Transation Number</Text>
                    <TextInput
                      value={trans}
                      style={styles.inpfil}
                      placeholder='Transation Number'
                      onChangeText={(text) => {
                        setTransNo(text)
                      }}
                    />

                    <Text style={{ color: "white" }}>Enter Amount</Text>
                    <TextInput
                      value={amt}
                      style={styles.inpfil}
                      placeholder='Enter Amount'
                      keyboardType="numeric"
                      onChangeText={(text) => {
                        setAmt(text)
                      }}
                    />
                  </View>
                  <TouchableOpacity style={styles.signbtn} onPress={() => {
                    saveDeposit()
                  }}>
                    <Text style={{ color: '#05386B', fontWeight: 'bold', fontSize: 20 }}>REQUEST MONEY</Text>
                  </TouchableOpacity>
                </LinearGradient>
                {/* </View> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

    </SafeAreaView>
  )
}

export default Deposit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  container2: {
    flex: 1,
  },
  topVie: {
    flex: 7,
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

  inpfil: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
    paddingTop: 5,
    color: "black",
  },

  textHead: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginBottom: 15
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



  signbtn: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },




  card_container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#0d00ff",
    padding: 15,
    borderRadius: 10

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