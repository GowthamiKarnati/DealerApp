import { View, SafeAreaView, StyleSheet, BackHandler, Text } from 'react-native';
import React, {useEffect} from 'react'
import AppBar from '../components/StartComponents/AppBar';
import Buttons from '../components/StartComponents/Buttons';
const StartScreen = () => {
  useEffect(() => {
        const backAction = () => {
          BackHandler.exitApp();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
  return (
    <SafeAreaView style={styles.container}>
        <AppBar />
        <Buttons />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
      },
    });
    
export default StartScreen
//import React, { useEffect } from 'react';
// import { View, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
// import AppBar from '../components/StartComponents/AppBar';
// import Buttons from '../components/StartComponents/Buttons';

// const StartScreen = () => {
//   useEffect(() => {
//     const backAction = () => {
//       // Exit the app when the back button is pressed
//       BackHandler.exitApp();
//       return true; // Prevent default behavior
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction
//     );

//     return () => backHandler.remove();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <AppBar />
//       <Buttons />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
// });

// export default StartScreen;