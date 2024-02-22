// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { setMobileNumber } from '../../redux/slices/authSlice';


// const LoginForm = () => {
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [otp, setOtp] = useState('');
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const handleLogin = () => {
//         dispatch(setMobileNumber(mobileNumber));
//         navigation.navigate('Home');
//       };
//     return (
//         <View style={styles.container}>
//           <Text style={styles.title}>Login</Text>
//           <View style={styles.formContainer}>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Mobile Number</Text>
//               <TextInput
//                 style={styles.input}
//                 keyboardType="phone-pad"
//                 placeholder="Enter your mobile number"
//                 placeholderTextColor="black"
//                 autoCapitalize="none"
//                 value={mobileNumber}
//                 onChangeText={(text) => setMobileNumber(text)}
//               />
//             </View>
//             <View style={styles.formGroup}>
//                 <Text style={styles.label}>OTP</Text>
//                 <TextInput
//                     style={styles.input}
//                     keyboardType="numeric"
//                     placeholder="Enter OTP"
//                     placeholderTextColor="black"
//                     autoCapitalize="none"
//                     value={otp}
//                     onChangeText={(text) => setOtp(text)}
//                 />
//             </View>
//             <TouchableOpacity style={[styles.loginButton, styles.enlargedButton,]}
//             onPress={handleLogin}
//             >
//                 <Text style={styles.loginButtonText} >Login</Text>
//             </TouchableOpacity>
//           </View>
//             <View style={styles.bottom}>
//                 <Text style={styles.bottomText}>
//                 Need help? Contact our support team at support@example.com
//                 </Text>
//             </View>
//         </View>
//       );
//     };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 40,
//         marginHorizontal: 20,
//       },
//       title: {
//         fontSize: 30,
//         fontWeight: '700',
//         marginBottom: 18,
//         color: 'black',
//       },
//       formContainer: {
//         backgroundColor: '#ffffff',
//         borderRadius: 8,
//         padding: 24,
//         elevation: 8,
//       },
//       formGroup: {
//         marginBottom: 16,
//       },
//       label: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: 'black',
//         marginBottom: 8,
        
//       },
//       input: {
//         borderWidth: 1,
//         borderColor: '#cccccc',
//         borderRadius: 8,
//         padding: 10,
//         fontSize: 18,
//         color: 'black',
//       },
//       loginButton: {
//         backgroundColor: '#3c82f6',
//         borderRadius: 8,
//         paddingVertical: 12,
//         paddingHorizontal: 22,
//         alignItems: 'center',
//         marginTop: 16,
//         width: '35%',
//         elevation: 4,
        
//       },
//       loginButtonText: {
//         color: '#ffffff',
//         fontSize: 18,
//         fontWeight: '500',
//       },
//       bottom: {
//         marginTop: 45,
//       },
//       bottomText: {
//         fontSize: 18,
//         color:'gray'
//       },
//       enlargedButton: {
//         transform: [{ scale: 1.1 }], // Enlarge the button
//       },
// });
// export default LoginForm
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { setMobileNumber } from '../../redux/slices/authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const LoginForm = () => {
//   const [userMobileNumber, setUserMobileNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const handleLogin = () => {
//     if (userMobileNumber.trim() === '') {
//       console.error('Phone number is required.');
//       Alert.alert('Error', 'Mobile number is required.');
//     } else {
//       dispatch(setMobileNumber(userMobileNumber));
//       navigation.navigate('Home');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <View style={styles.formContainer}>
//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Mobile Number</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="phone-pad"
//             placeholder="Enter your mobile number"
//             placeholderTextColor="black"
//             autoCapitalize="none"
//             value={userMobileNumber}
//             onChangeText={(text) => setUserMobileNumber(text)}
//           />
//         </View>
//         <View style={styles.formGroup}>
//           <Text style={styles.label}>OTP</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             placeholder="Enter OTP"
//             placeholderTextColor="black"
//             autoCapitalize="none"
//             value={otp}
//             onChangeText={(text) => setOtp(text)}
//           />
//         </View>
//         <TouchableOpacity
//           style={[styles.loginButton, styles.enlargedButton]}
//           onPress={handleLogin}
//         >
//           <Text style={styles.loginButtonText} >Login</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.bottom}>
//         <Text style={styles.bottomText}>
//           Need help? Contact our support team at support@example.com
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 40,
//     marginHorizontal: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     marginBottom: 18,
//     color: 'black',
//   },
//   formContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 24,
//     elevation: 8,
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: 'black',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 18,
//     color: 'black',
//   },
//   loginButton: {
//     backgroundColor: '#3c82f6',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 22,
//     alignItems: 'center',
//     marginTop: 16,
//     width: '35%',
//     elevation: 4,
//   },
//   loginButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   bottom: {
//     marginTop: 45,
//   },
//   bottomText: {
//     fontSize: 18,
//     color: 'gray',
//   },
//   enlargedButton: {
//     transform: [{ scale: 1.1 }], // Enlarge the button
//   },
// });

// export default LoginForm;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setMobileNumber } from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginForm = () => {
  const [userMobileNumber, setUserMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isValidMobileNumber = (mobileNumber:any) => {
  const strippedNumber = mobileNumber.replace(/\s/g, '');
  const mobileNumberRegex = /^(\+\d{1,2})?(\d{10})$/;
  return mobileNumberRegex.test(strippedNumber);
  };
  const handleLogin = async () => {
    if (!isValidMobileNumber(userMobileNumber)) {
      console.error('Invalid mobile number format.');
      Alert.alert('Error', 'Invalid mobile number format.');
    } else {
      await AsyncStorage.setItem('userLoggedIn', 'true');
      await AsyncStorage.setItem('userMobileNumber', userMobileNumber);
      dispatch(setMobileNumber(userMobileNumber));
      navigation.navigate('Home');
    }
  };

  // useEffect(() => {
  //   const checkUserLoggedIn = async () => {
  //     const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      
  //     if (userLoggedIn === 'true') {
  //       const storedMobileNumber = await AsyncStorage.getItem('userMobileNumber');
  //       dispatch(setMobileNumber(storedMobileNumber));
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'Home' }],
  //       });
  //       setUserMobileNumber('');
  //     }
  //     // const storedMobileNumber = await AsyncStorage.getItem('userMobileNumber');
  //     // if (storedMobileNumber) {
  //     //   dispatch(setMobileNumber(storedMobileNumber));
  //     //   navigation.navigate('Home');
  //     // }
  //   };

  //   checkUserLoggedIn();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter your mobile number"
            placeholderTextColor="black"
            autoCapitalize="none"
            value={userMobileNumber}
            onChangeText={(text) => setUserMobileNumber(text)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>OTP</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter OTP"
            placeholderTextColor="black"
            autoCapitalize="none"
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
        </View>
        <TouchableOpacity
          style={[styles.loginButton, styles.enlargedButton]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText} >Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Need help? Contact our support team at support@example.com
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 18,
    color: 'black',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignItems: 'center',
    marginTop: 16,
    width: '35%',
    elevation: 4,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  bottom: {
    marginTop: 45,
  },
  bottomText: {
    fontSize: 18,
    color: 'gray',
  },
  enlargedButton: {
    transform: [{ scale: 1.1 }], // Enlarge the button
  },
});

export default LoginForm;
