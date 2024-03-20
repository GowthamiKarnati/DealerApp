// import React, { useEffect, useState } from 'react';


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//         const customerResponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
//         setCustomers(customerResponse.data.data[0]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux'; 
import { selectCustomerData,selectCustomerKYCData } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';

const Details = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const customerData = useSelector(selectCustomerData);
  const customerKYCData = useSelector(selectCustomerKYCData);
  const customerName = customerData?.name || 'N/A';
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [loanType, setLoanType] = useState('');
  const [customers, setCustomers] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  // }, [customerKYCData]);

  const handleApplyforTyre = () => {
    if (customerKYCData && customerKYCData['KYC Status'] === 'Active') {
      setLoanType('tyre');
      navigation.navigate('Apply', {  loanType: 'tyre' });
    } else {
      setErrorMessage(t('kycstatuschecking'));
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  }

  const handleApplyforInsurance = () => {
    if (customerKYCData && customerKYCData['KYC Status'] === 'Active') {
      setLoanType('insurance');
      navigation.navigate('Apply', {  loanType: 'insurance' });
    } else {
      setErrorMessage(t('kycstatuschecking'));
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text numberOfLines={2} style={styles.cardName}>{customerName ? customerName.toUpperCase() : 'N/A'}</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.cardPhone}>{customerPhoneNumber}</Text>
          <Icons style={{ marginLeft: 5 }} name="phone" size={23} color="#12b981" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonTyre} onPress={handleApplyforTyre}>
            <Icon name="truck" size={24} color="gold" style={styles.icon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTextTop}>{t('applytyre')}</Text>
              <Text style={styles.buttonTextBottom}>{t('loan')} </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleApplyforInsurance}>
            <Icon name="shield" size={24} color="gold" style={styles.icon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTextTop}>{t('applyinsurance')}</Text>
              <Text style={styles.buttonTextBottom}>{t('loan')} </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.errorMessageContainer}>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 10,
    marginTop:20,
  },
  card: {
    backgroundColor: 'white',
    paddingTop: 25,
    paddingLeft: 17,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 10,
    height: 230,
  },
  cardName: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'black',
  },
  cardPhone: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 5,
    alignItems: 'stretch',
    width:'100%'
  },
  button: {
    marginRight: 20,
    width: '48%',
    height: 70,
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextTop: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonTextBottom: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  icon: {
    marginRight: 5,
    marginLeft: 10,
  },
  buttonTyre: {
    marginRight: 20,
    width: '43%',
    height: 70,
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
  },
});

export default Details;
