import { View, Text, SafeAreaView,StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import AppBar from '../components/NewCustomerApplyComponents/AppBar';
import NewApplication from '../components/NewCustomerApplyComponents/NewApplication';
const NewCustomerApplyScreen = ({route}) => {
    const {loanType} = route.params;
  return (
    <SafeAreaView style={styles.container}>
        <AppBar />
        <ScrollView>
        <NewApplication loanType={loanType}/>
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
export default NewCustomerApplyScreen