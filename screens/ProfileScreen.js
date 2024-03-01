import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import React from 'react'
import AppBar from '../components/ProfileComponents/AppBar';
import ProfileContent from '../components/ProfileComponents/ProfileContent';
const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
      <AppBar  />
      <ProfileContent />
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
export default ProfileScreen