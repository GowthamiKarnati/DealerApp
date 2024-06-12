// import { View, Text ,SafeAreaView,ScrollView,StyleSheet } from 'react-native'
// import React from 'react'
// import AppBar from '../components/MyApplicationsComponents/AppBar';
// import Applications from '../components/MyApplicationsComponents/Applications';

// const ApplicationsScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <AppBar />
      
//         <Applications />
      
//     </SafeAreaView>
//   )
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#f3f4f6',
//     },
//   });

// export default ApplicationsScreen
import { View, Text ,SafeAreaView,ScrollView,StyleSheet } from 'react-native'
import React from 'react'
import AppBar from '../components/MyApplicationsComponents/AppBar';
import Applications from '../components/MyApplicationsComponents/Applications';
const ApplicationsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <Applications />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f4f6',
    },
  });
export default ApplicationsScreen