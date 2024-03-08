
// import React from 'react'
// import AppBar from '../components/HomeComponents/AppBar';
// import MainContent from '../components/HomeComponents/MainContent';
// import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

// const LoginScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView stickyHeaderIndices={[0]}>
//         <AppBar />
//         <MainContent />
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
import React, { useEffect, useState } from 'react'
import AppBar from '../components/HomeComponents/AppBar';
import MainContent from '../components/HomeComponents/MainContent';
import { BackHandler, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      if (userLoggedIn !== 'true') {
        navigation.navigate('Login'); 
      }
    };
    checkUserLoggedIn();
    const backHandler = isFocused
      ? BackHandler.addEventListener('hardwareBackPress', () => {
          BackHandler.exitApp();
          return true;
        })
      : null;

    return () => {
      backHandler && backHandler.remove();
    };
  }, [isFocused, navigation]);
  return (
        <SafeAreaView style={styles.container}>
          <AppBar />
          
            
            <MainContent/>
        </SafeAreaView>
      )
    }
    const styles=StyleSheet.create({
        container:{
          flex: 1,
          backgroundColor:'#f3f4f6'
        }
      });


export default HomeScreen