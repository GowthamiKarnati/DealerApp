
// import React from 'react'
// import AppBar from '../components/LoginComponents/AppBar'
// import LoginForm from '../components/LoginComponents/LoginForm'
// import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
// const LoginScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView stickyHeaderIndices={[0]}>
//       <AppBar />
//       <LoginForm />
//       </ScrollView>
//     </SafeAreaView>
//   )
// }
// const styles=StyleSheet.create({
//     container:{
//       flex: 1,
//       backgroundColor:'#f3f4f6'
//     }
//   });
// export default LoginScreen
import React, { useEffect, useState } from 'react';  // Import useState
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AppBar from '../components/LoginComponents/AppBar';
import LoginForm from '../components/LoginComponents/LoginForm';
const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <AppBar />
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});

export default LoginScreen;
