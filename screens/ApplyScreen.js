import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppBar from '../components/ApplyComponents/AppBar'
import ApplyForTyre from '../components/ApplyComponents/ApplyForTyre'
const ApplyScreen = ({ route }) => {
    const {  loanType, customerType } = route.params;
  return (
    <SafeAreaView style={styles.container}>
    
      <AppBar />
      <ScrollView >
      <ApplyForTyre  loanType={loanType}/>
    </ScrollView>
    </SafeAreaView>
    
  )
}
const styles=StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:'#f3f4f6'
    }
  });
export default ApplyScreen