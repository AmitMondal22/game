import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'


import { AuthProvider } from './src/context/AuthContext';
import NavBar from './src/NavBar';


const App = () => {
  return (
    <AuthProvider>
      <NavBar/>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({
  
})