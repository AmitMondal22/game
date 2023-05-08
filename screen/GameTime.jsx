import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import {BASE_URL} from '../src/config';
import {AuthContext} from '../src/context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import HeaderComp from '../component/HeaderComp';
import HomeCustComp from '../component/HomeCustComp';
import normalize from 'react-native-normalize';
import {format} from 'date-fns';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

// const BASE_URL = 'http://ghoshffplay.in/api';
const GameTime = ({navigation, route}) => {
  const [gameTimeList, setgameTimeList] = useState();
  const [gameId, setGameId] = useState();
  const [ifconche, setifconche] = useState(true);
  const {userInfo, isLoading} = useContext(AuthContext);

  //   const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);



  const [currentTime, setCurrentTime] = useState("");

  // ata a6e karon ami time take direct 24 hours a nichhi
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
     }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getGameNameData(route.params.gameNameInfo.id);
  }, [route.params.gameNameInfo.id]);

  const fTime = time24 => {
    return format(new Date(`2023-05-01T${time24}`), 'hh:mm:a');
    // let dateObj = new Date(`2022-01-01T${time24}Z`);
    // let time12 = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    // // console.log(time12);
    // return time12;
  };

 
// ata lagbe na apatoto
  function convert12To24(time12) {
    const [time, period] = time12.split(' ');

    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    const hours24 = hours.toString().padStart(2, '0');
    const minutes24 = minutes.toString().padStart(2, '0');

    return `${hours24}:${minutes24}`;
  }

  // ata loop ghure akata marto game id or null return korbe
  const findFutureGame = () => {
     for (let i = 0; i < gameTimeList?.data.length; i++) {
       const gameTime = gameTimeList?.data[i].game_time
       if (gameTime > currentTime) {
         return gameTimeList?.data[i].game_id;
       }
     }
   
     return null; // Return null if no future game is found
   };

   // akhane game_id or null value ta paye galm
   const futureGame = findFutureGame();

  const ContactList = ({contactInfo,index}) => {
    const {game_time} = contactInfo;
    const {result_time} = contactInfo;
    const {game_id} = contactInfo;

    // check current id with getgameID
    const isLive = futureGame !=null && futureGame==game_id
   

    return (
      <LinearGradient
        colors={['black', 'yellow']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.cardGradient}>
        <View style={styles.card}>
          <View style={styles.infocon}>
            <View style={{...styles.icon, backgroundColor: 'white'}}>
              <FontAwesome
                name="trophy"
                color={'red'}
                size={normalize(20)}
                style={styles.iconCont}
              />
            </View>
            <View style={styles.textCont}>
              <Text style={{color: 'white', fontWeight: 'bold',fontSize:responsiveFontSize(2)}}>
                Game Time
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize:responsiveFontSize(2.5),
                }}>
                {fTime(game_time)}
              </Text>
              <Text style={{color: 'white', fontWeight: 'bold',fontSize:responsiveFontSize(1.8),}}>
                Result : {fTime(result_time)}
              </Text>
            </View>

        
            { isLive ?(
                <>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('BidGame',{
                        gameNameInfo:{id: game_id}
                    })}>
              <Text style={styles.btn_text}>Play</Text>
            </TouchableOpacity>
            </>
                  ):(
                    <View style={styles.btn2}>
            <Text style={styles.btn_text2}>Close</Text>
          </View>
                  )}
          </View>
        </View>
      </LinearGradient>
    );
  };

  const getGameNameData = async idGame => {
    await axios
      .get(`${BASE_URL}/gametime_list`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        params: {game_id: idGame},
      })
      .then(res => {
        let gametimelist = res.data;
        setgameTimeList(gametimelist);
      })
      .catch(er => {
        // console.log("login Network ",er);
      });
  };

  if (!gameTimeList) {
    return <ActivityIndicator size={32} />;
  }
  // console.log(gameTimeList.data);
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
              data={gameTimeList.data}
              keyExtractor={item => item.game_id}
              renderItem={({item , index}) => (
                <ContactList contactInfo={item}  index={index} />
              )}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
export default GameTime;

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
    marginTop: normalize(12, 'height'),
  },
  gamelistcont: {
    flex: 73,
    marginTop: normalize(5, 'height'),
  },
  listGame: {},
  card: {
    borderRadius: normalize(10),
  },
  cardGradient: {
    borderRadius: normalize(10),
    padding: normalize(10),
    marginVertical: normalize(5),
    marginHorizontal: normalize(20),
    shadowColor: '#000',
    shadowOffset: {width: normalize(0), height: normalize(2, 'height')},
    shadowOpacity: 0.2,
    elevation: normalize(3),
  },

  btn: {
    backgroundColor: 'white',
    padding: normalize(6),
    borderRadius: normalize(5),
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn2: {
    backgroundColor: 'red',
    padding: normalize(6),
    borderRadius: normalize(5),
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: 'black',

    fontWeight: 'bold',
    fontSize:responsiveFontSize(1.8),
  },
  btn_text2: {
    color: 'white',

    fontWeight: 'bold',
    fontSize:responsiveFontSize(1.8),
  },

  infocon: {
    flexDirection: 'row',
    alignItems: 'center',
    //   paddingVertical:5
  },
  textCont: {
    fontSize: normalize(18),
    color: 'white',
    flex: 7,
  },
  iconCont: {
    flex: 1,
    paddingVertical: normalize(5),
    //  color:'white',
    //  marginHorizontal:10,
    color: 'black',
    fontWeight: 'bold',
  },
  icon: {
    borderRadius: normalize(25),
    aspectRatio: normalize(1),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(15),
    padding: normalize(1),
    backgroundColor: 'green',
    flex: 1,
  },
  upiview2: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: normalize(20),
    borderRadius: normalize(5),
  },
});