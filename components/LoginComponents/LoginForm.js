import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setMobileNumber} from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import axios from 'axios';

const LoginForm = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userMobileNumber, setUserMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidMobileNumber = mobileNumber => {
    const strippedNumber = mobileNumber.replace(/\s/g, '');
    const mobileNumberRegex = /^(\+\d{1,2})?(\d{10})$/;
    return mobileNumberRegex.test(strippedNumber);
  };

  // const handleLogin = async () => {
  //   if (!isValidMobileNumber(userMobileNumber)) {
  //     console.error('Invalid mobile number format.');
  //     setError('Invalid mobile number format.');
  //     return;
  //   }
  //   //  else {
  //   //   await AsyncStorage.setItem('userLoggedIn', 'true');
  //   //   await AsyncStorage.setItem('userMobileNumber', userMobileNumber);
  //   //   dispatch(setMobileNumber(userMobileNumber));
  //   //   navigation.navigate('Start');
  //   // }
  //   try {
  //     const response = await axios.get('https://backendforpnf.vercel.app/dealers');
  //     const data = response.data.data;
  //     console.log(data);

  //     const user = data.data.find((dealer) => dealer.phone === userMobileNumber && dealer.OTP === otp);

  //     if (user) {
  //       await AsyncStorage.setItem('userLoggedIn', 'true');
  //       await AsyncStorage.setItem('userMobileNumber', userMobileNumber);
  //       dispatch(setMobileNumber(userMobileNumber));
  //       navigation.navigate('Start');
  //     } else {
  //       setError('Invalid mobile number or OTP.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setError('An error occurred while processing your request.');
  //   }
  // };
  const handleLogin = async () => {
    const formattedUserMobileNumber = userMobileNumber.replace(/\s+/g, ''); // Remove whitespace from the mobile number

    if (!isValidMobileNumber(formattedUserMobileNumber)) {
      setError(t('invalidMobileFormat'));
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        'https://backendforpnf.vercel.app/dealers',
      );
      const data = response.data;

      const user = data.data.find(dealer => {
        const formattedDealerPhone = dealer.phone.replace(/\s+/g, ''); // Remove whitespace from the dealer's phone number
        return (
          (formattedDealerPhone.includes(formattedUserMobileNumber) ||
            formattedDealerPhone.includes('+91' + formattedUserMobileNumber)) &&
          dealer.OTP === otp
        );
      });

      if (user) {
        await AsyncStorage.setItem('userLoggedIn', 'true');
        await AsyncStorage.setItem('userMobileNumber', userMobileNumber);
        dispatch(setMobileNumber(userMobileNumber));
        navigation.navigate('Start');
      } else {
        setError(t('invalidMobileOrOTP'));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('login')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('mobile')}</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder={t('mobilePlace')}
            placeholderTextColor="black"
            autoCapitalize="none"
            value={userMobileNumber}
            onChangeText={text => {
              setUserMobileNumber(text);
              setError(''); // Clear error message when user starts typing
            }}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('otp')}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={t('otpPlace')}
            placeholderTextColor="black"
            autoCapitalize="none"
            value={otp}
            onChangeText={text => {
              setOtp(text);
              setError('');
            }}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.loginButton, styles.enlargedButton]}
          onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>{t('login')}</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>{t('footer')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    transform: [{scale: 1.1}], // Enlarge the button
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default LoginForm;
