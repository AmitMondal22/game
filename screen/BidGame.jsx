import { StyleSheet, Text, View, TextInput,TouchableOpacity,Alert,ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../src/context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { BASE_URL } from '../src/config';
import HeaderComp from '../component/HeaderComp';
import HomeCustComp from '../component/HomeCustComp';
import normalize from 'react-native-normalize';
import { showMessage, hideMessage  } from "react-native-flash-message";

const BidGame = ({ navigation, route }) => {
    // const BASE_URL = 'http://ghoshffplay.in/api';
    const [gameId, setGameId] = useState();
    
    const { userInfo, isLoading } = useContext(AuthContext);

    const [subStatus, setsubStatus] = useState(false);


    const [numbe, setnumbe] = useState("");
    const [jodi, setJodi] = useState("");
    const [patti, setPatti] = useState("");
    const [singleAmt, setSingleAmt] = useState("");
    const [jodiAmt, setJodiAmt] = useState("");
    const [pattiAmt, setPattiAmt] = useState("");

    const submitData=async()=>{
        //Alert.alert("hELLO");
        // setIsLoading(true);

        if(numbe&&singleAmt||jodi&&jodiAmt||patti&&pattiAmt){

        
            setsubStatus(true);
        await axios.post(
            `${BASE_URL}/add-bid`,
            {
                    single: numbe,
                    single_amt: singleAmt,
                    jodi: jodi,
                    jodi_amt: jodiAmt,
                    patti: patti,
                    patti_amt: pattiAmt,
                    game_id: route.params.gameNameInfo.id
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          ).then(res => {
            let resData = res.data;
            setsubStatus(false);
            if(resData.status=="SUCCESS"){
                setPattiAmt('')
                setJodiAmt('')
                setSingleAmt('')
                setPatti('')
                setJodi('')
                setnumbe('')
                showMessage({
                    message: "Successfully " ,
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
                navigation.navigate('MyBid')
              }else{
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
              }
            console.log("form submit ", resData);
          }).catch(er => {
            setsubStatus(false);
            console.log("form submit Network ", er);
          });

}else{
            Alert.alert("Enter Valid Input");
        }
       
    }



    const handleMobNO = (text) => {
        const regex = /^[0-9]{0,10}$/;
        if (regex.test(text)) {
            setnumbe(text);
        }
    };

    useEffect(() => {
        setGameId(route.params.gameNameInfo.id);
    }, [route.params.gameNameInfo.id]);

    return (
        <LinearGradient colors={['#0d00ff', '#e0ffe7']} style={styles.container}>
            {subStatus && <ActivityIndicator style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />}
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
                        <View style={styles.column}>
                            <Text>Single</Text>
                            <TextInput
                                color="black"
                                textAlign="center"
                                style={styles.inpfil}
                                placeholder='Enter Number'
                                keyboardType="numeric"
                                maxLength={1}
                                minLength={1}
                                value={numbe}
                                onChangeText={handleMobNO}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                color="black"
                                textAlign="center"
                                style={styles.inpfil}
                                placeholder='Enter Amount'
                                keyboardType="numeric"
                                minLength={2}
                                value={singleAmt}
                                onChangeText={(text)=>{
                                    setSingleAmt(text);
                                }}
                                placeholderTextColor="black"
                            />
                        </View>
                        <View style={styles.column2}>
                            <Text>Jodi</Text>
                            <TextInput
                                color="black"
                                textAlign="center"
                                style={styles.inpfil}
                                placeholder='Enter Number'
                                keyboardType="numeric"
                                maxLength={2}
                                minLength={1}
                                value={jodi}
                                onChangeText={(text) => {
                                    setJodi(text)
                                  }}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                color="black"
                                textAlign="center"
                                style={styles.inpfil}
                                placeholder='Enter Amount'
                                keyboardType="numeric"
                                minLength={2}
                                value={jodiAmt}
                                onChangeText={(text) => {
                                    setJodiAmt(text)
                                  }}
                                placeholderTextColor="black"
                            />
                        </View>
                        <View style={styles.column3}>
                            <Text>Patti</Text>
                            <TextInput
                                color="black"
                                textAlign="center"
                                style={styles.inpfil}
                                placeholder='Enter Number'
                                keyboardType="numeric"
                                value={patti}
                                maxLength={3}
                                minLength={1}
                                onChangeText={(text) => {
                                    setPatti(text)
                                  }}
                                placeholderTextColor="black"
                            />
                            <TextInput
                                color="black"
                                textAlign="center"
                                style={styles.inpfil}
                                placeholder='Enter Amount'
                                keyboardType="numeric"
                                minLength={2}
                                value={pattiAmt}
                                onChangeText={(text) => {
                                    setPattiAmt(text)
                                  }}
                                placeholderTextColor="black"
                            />
                             
                    </View>
                    
                        </View>
                        <View style={styles.card_container1}>
                        <TouchableOpacity style={styles.sav} onPress={()=>{
                  submitData()
                }}>
                  <Text style={{ color: '#05386B', fontWeight: 'bold', fontSize: normalize(20) }}>Submit</Text>
                </TouchableOpacity>
                </View>
                    </View>
                </View>

            </View>
        </LinearGradient>
    )
}

export default BidGame

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
    listGame: {
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

    btn: {

        backgroundColor: "white",
        padding: normalize(6),
        borderRadius: normalize(5),
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    btn_text: {
        color: "black",

        fontWeight: 'bold',
    },




    infocon: {
        flexDirection: "row",
        alignItems: 'center',
        //   paddingVertical:5
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
        // flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginHorizontal: normalize(10),
        marginVertical: normalize(10),
        backgroundColor:"#9da800",
        padding:normalize(15),
        borderRadius:normalize(10)

    },
    card_container1: {
        flex: 1,
       

    },
    img: {
        backgroundColor: "#ffff",
        borderRadius: normalize(40),
        padding: normalize(8),
        flex: 1,


    },
    column: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',

    },
    column2: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    column3: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    sav:{
        alignItems: 'center',
        backgroundColor:"white",
        margin:normalize(10),
        borderRadius:normalize(10),
        padding:normalize(8)
    },
    text1: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },


    inpfil: {
        backgroundColor: "white",
        margin: normalize(10),
        borderRadius: normalize(8)
    },
    upiview2:{
      flex:1,
      backgroundColor:"white",
      marginHorizontal:normalize(10),
      borderRadius:normalize(5)
  
    }
    
})