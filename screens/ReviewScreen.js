import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react'
import AppBar from '../components/ReviewComponents/AppBar'
import MainContent from '../components/ReviewComponents/MainContent'
const ReviewScreen = ({ route }) => {
    const { customerData, loanType } = route.params;
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView stickyHeaderIndices={[0]}>
          <AppBar  />
          <MainContent customerData={customerData}/>
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
export default ReviewScreen