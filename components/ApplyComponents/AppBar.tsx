import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const AppBar = ({ customerData }) => {
    const navigation = useNavigation();
    const handleSubmit=()=>{
      navigation.navigate('Customer', { customerData })
    }
    return (
        <SafeAreaView>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleSubmit}>
              <Icon name="arrow-left" size={23} color="white" />
            </TouchableOpacity>
            <Text style={styles.appBarTitle}>Back</Text>
          </View>
        </SafeAreaView>
      );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      height: 60,
      backgroundColor: '#12b981',
      padding: 16,
      alignItems: 'center', 
    },
    icon: {
      marginRight: 20, 
    },
    appBarTitle: {
      fontSize: 23,
      color: 'white',
      fontWeight: '400',
      marginLeft:8,
    },
  });
export default AppBar