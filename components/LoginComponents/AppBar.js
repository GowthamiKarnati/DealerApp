import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
const AppBar = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.appBarTitle}>Back</Text>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create(
    {
        container :{
            height:60,
            backgroundColor:'#12b981',
            padding: 16,
        },
        appBarTitle:{
            fontSize:23,
            color:'white',
            fontWeight:'400'
        }
    }
);

export default AppBar