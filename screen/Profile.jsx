import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import HeaderComp from '../component/HeaderComp';
import HomeCustComp from '../component/HomeCustComp';
import { AuthContext } from '../src/context/AuthContext';
import normalize from 'react-native-normalize';

const Profile = ({ navigation}) => {
    const { userInfo, isLoading } = useContext(AuthContext);

    const {logout} = useContext(AuthContext);

console.log(userInfo.user)

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
                <View style={styles.textView}>
                    <Text style={styles.textCon}>Name : {(userInfo.user.name).toUpperCase()}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textCon}>Mobile No : {userInfo.user.mobile_no}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textCon}>Email : {userInfo.user.email}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.textCon}>Profile Id : GFFP{userInfo.user.id}</Text>
                </View>
            </View>
            <View style={styles.card_container}>
            <TouchableOpacity onPress={logout} style={styles.btnwp}>
                <Text style={{ color: 'white',justifyContent:"center",alignContent:"center"}}>Log Out</Text>
              </TouchableOpacity>
                </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Profile

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
    marginTop: normalize(5),
    marginHorizontal:normalize(15)
  },
  card: {
    borderRadius: normalize(5),
  },
  cardGradient: {
    borderRadius: normalize(10),
    padding: normalize(16),
    marginVertical: normalize(5),
    marginHorizontal: normalize(20),
    shadowColor: '#000',
    shadowOffset: { width: normalize(0), height: normalize(2, 'height') },
    shadowOpacity: 0.2,
    elevation: normalize(3),


  },
  btnwp:{
    marginTop:normalize(10),
    backgroundColor:"green",
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
    color: "black",
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


  textCon:{
    fontSize:normalize(20),
    color:"black",
  },





  card_container: {
    height:"20%",
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: normalize(5),
    marginVertical: normalize(10),
    backgroundColor: "#ffff",
    padding: normalize(15),
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10
    borderRadius:normalize(10)

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
    flexDirection:"row"
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

  },
  textView:{
    flex:1
  }

})