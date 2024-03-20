

// import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { selectMobileNumber, setMobileNumber } from '../../redux/slices/authSlice';
// import firestore from '@react-native-firebase/firestore';
// import { useTranslation } from 'react-i18next';
// const AppBar = () => {
//   const {t} = useTranslation();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const userMobileNumber = useSelector(selectMobileNumber);

//   const handleBack = () => {
//     navigation.navigate('Home');
//   };

//   const handleLogout = async () => {
//     try {
//       await firestore().collection('dealers').doc(userMobileNumber).delete();
//       dispatch(setMobileNumber(''));
//       await AsyncStorage.clear();
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };
  
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={handleBack}>
//           <Icon name="arrow-left" size={23} color="white" />
//         </TouchableOpacity>
//         <View style={styles.titleContainer}>
//           <Text style={styles.appBarTitle}>{t('profile')}</Text>
//         </View>
//         <TouchableOpacity onPress={handleLogout}>
//           <Icon name="sign-out-alt" size={23} color="white" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#12b981',
//     padding: 16,
//     alignItems: 'center',
//   },
//   appBarTitle: {
//     fontSize: 23,
//     color: 'white',
//     fontWeight: '600',
//   },
//   titleContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default AppBar;
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectMobileNumber, setMobileNumber } from '../../redux/slices/authSlice';
import firestore from '@react-native-firebase/firestore';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
const { width, height } = Dimensions.get('window');
const CustomPicker = ({ selectedValue, onValueChange }) => (
  <View style={styles.customPicker}>
    <Text style={styles.customPickerText}>{selectedValue}</Text>
    <Icon name="caret-down" size={16} color="#0072B1" />
  </View>
);
const AppBar = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userMobileNumber = useSelector(selectMobileNumber);
  const currentLanguage = i18n.language;

  const handleBack = () => {
    navigation.navigate('Start');
  };

  const handleLogout = async () => {
    try {
      await firestore().collection('dealers').doc(userMobileNumber).delete();
      dispatch(setMobileNumber(''));
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleChangeLanguage = async (value) => {
    await AsyncStorage.setItem('selectedLanguage', value);
    i18n.changeLanguage(value);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={23} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.appBarTitle}>{t('profile')}</Text>
        </View>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currentLanguage}
            onValueChange={(itemValue) => handleChangeLanguage(itemValue)}
            style={styles.picker}
            dropdownIconColor='black'
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="हिन्दी" value="hi" />
            <Picker.Item label="मराठी" value="mr" />
          </Picker>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="sign-out-alt" size={23} color="white" />
        </TouchableOpacity>
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
  pickerContainer: {
    backgroundColor: "#E1F3FD",
    borderRadius: width * 0.1,
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingRight: 10,
    marginLeft:'auto' ,
    marginRight:10,
  },
  picker: {
    color: '#0072B1',
    width: width * 0.32,
     // Adjust width of the Picker
  },
});

export default AppBar;
