// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation  } from '@react-navigation/native';
// import { useTranslation } from 'react-i18next';

// const AppBar = () => {
//   const {t}= useTranslation();
//   const navigation = useNavigation();

//   const handleProfile = () => {
//     navigation.navigate('Profile');
//   };
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={handleProfile}>
//           <FontAwesomeIcon name="user-circle" style={styles.icon} size={24} color="white" />
//         </TouchableOpacity>
//         <View style={styles.titleContainer}>
//           <Text style={[styles.appBarTitle]}>Pratibha Finance</Text>
//           </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 70,
//     backgroundColor: '#12b981',
//     padding: 18,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent:'center'
//   },
//   titleContainer: {
//     flex: 1,

//     alignItems: 'center', // Center the title horizontally
//   },
//   appBarTitle: {
//     flex:1,
//     fontSize: 23,
//     color: 'white',
//     fontWeight: '600',
//     alignItems: 'center',
//     textAlign:'center'
//   },
//   icon: {
//     marginLeft: 0,
//     fontSize: 25,
//     marginRight: 15,
//   },

// });

// export default AppBar;
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const AppBar = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleProfile}>
          <FontAwesomeIcon
            name="user-circle"
            style={styles.icon}
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.appBarTitle}>Pratibha Finance</Text>
        </View>
        <View style={{width: 24}} />{' '}
        {/* Empty View to align the title in the center */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#12b981',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center', // Center the title horizontally
  },
  appBarTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  icon: {
    marginRight: 15,
  },
});

export default AppBar;
