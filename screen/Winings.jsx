import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../component/HeaderComp';
import HomeCustComp from '../component/HomeCustComp';
import normalize from 'react-native-normalize';

const Winings = ({ navigation}) => {




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


            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Winings

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
    marginTop: normalize(12, 'height')
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






  infocon: {
    flexDirection: "row",
    alignItems: 'center',
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
   
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10

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
    marginHorizontal: normalize(20),
    borderRadius: normalize(5)

  }

})