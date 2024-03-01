// import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// const AppBar = () => {
    
// const navigation = useNavigation();
// const handleBack=()=>{
//      navigation.navigate('Home')
// }
//   return (
//     <SafeAreaView>
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleBack}>
//         <Icon name="arrow-left" size={23} color="white" />
//       </TouchableOpacity>
//       <View style={styles.titleContainer}>
//         <Text style={styles.appBarTitle}>Profile</Text>
//       </View>
//       <TouchableOpacity  >
//         <Icon name="sign-out-alt" size={23} color="white" />
//       </TouchableOpacity>
//     </View>
//   </SafeAreaView>
//   )
// }
// const styles = StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       height: 60,
//       backgroundColor: '#12b981',
//       padding: 16,
//       alignItems: 'center',
//     },
//     appBarTitle: {
//       fontSize: 23,
//       color: 'white',
//       fontWeight: '600',
//     },
//     titleContainer: {
//       flex: 1,
//       alignItems: 'center',
//     },
//   });
// export default AppBar


import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const AppBar = () => {
  const navigation = useNavigation();
  

  const handleBack = () => {
    navigation.navigate('Home');
  };
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={23} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.appBarTitle}>Application Review </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#12b981',
    padding: 16,
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: '600',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AppBar;
