// import React, { useState } from 'react';
// import axios from 'axios';
// import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet,Alert, Modal, ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { selectCustomerKYCData,setCustomerKYCData } from '../../redux/slices/authSlice';
// import { selectCustomerData } from '../../redux/slices/authSlice';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux'; 
// import { useSelector } from 'react-redux';
// import Toast from 'react-native-toast-message';
// import { useTranslation } from 'react-i18next';


// const PhoneUpdate = ({alternate}) => {
//   const {t} = useTranslation();
//   const dispatch = useDispatch();
//     const navigation = useNavigation();
//     const customerKYCData = useSelector(selectCustomerKYCData);
//     const customerData =  useSelector(selectCustomerData)
//     const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//     const [phone, setPhone] = useState(customerKYCData['Phone Number'] ?? '');
//     const record_id =customerKYCData.record_id;
//     const [loading, setLoading] =useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [altphone, setAltphone]  = useState(customerKYCData['Alternate Phone Number'] ?? '');
//     //console.log(dob);

  
//   const handleUpdateChildren = async() => {
//     try{
//     let data;
//     setLoading(true);
//     if (phone.length < 10) {
//         setErrorMessage(t('phoneerror'));
//         setLoading(false); // Stop loading
//         return;
//       } else {
//         setErrorMessage('');
//         // Proceed with update...
//       }
//       if (altphone.length < 10) {
//         setErrorMessage(t('phoneError'));
//         setLoading(false); // Stop loading
//         return;
//       } else {
//         setErrorMessage('');
//         // Proceed with update...
//       }
//       console.log('Alternate phone number:', altphone);
//     if(alternate){
//       data = { record_id,altphone:`+91${altphone}`,marital:customerKYCData['Marital Status'],phone:customerKYCData['Phone Number'], houseaddress:customerKYCData['House Address'],city:customerKYCData['City'], nooftrucks:customerKYCData['Number of Trucks'], noofyearsinbusiness:customerKYCData['Number of years in business'],housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'] };
//       //console.log(data)
//     }else{
//       data = { record_id,phone: `+91${phone}`,marital:customerKYCData['Marital Status'], houseaddress:customerKYCData['House Address'],city:customerKYCData['City'], nooftrucks:customerKYCData['Number of Trucks'], noofyearsinbusiness:customerKYCData['Number of years in business'],housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'],altphone:customerKYCData['Alternate Phone Number'] };
//     }
//         console.log(data)
//         const response = await axios.post(`https://backendforpnf.vercel.app/updatedob`, data);
//         console.log('Server response:', response.data);
//         Toast.show({
//             type: 'success',
//             position:'bottom',
//             text1: t('updateSuccess'),
//             visibilityTime: 3000,
//             autoHide: true,
//             topOffset: 30,
//           });
//         navigation.navigate('CustomerProfile')
//         const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//               const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
//               const apiData = Kresponse.data.data[0] || {};
//               dispatch(setCustomerKYCData(apiData)); 
//       } catch (err) {
//         console.log("Error in updating:", err);
//       }
    
//   };

//   // Function to handle the back action
//   const handleBack = () => {
//     navigation.navigate('CustomerProfile')
//   };

//   return (
//     <View style={styles.container}>
//       {/* Arrow container for back navigation */}
//       {loading && (
//         <Modal transparent={true} animationType='fade'>
//           <View style={styles.modalContainer}>
//             <ActivityIndicator size="large" color="blue" />
//           </View>
//         </Modal>
//       )}
//       <TouchableOpacity style={styles.arrowContainer} onPress={handleBack}>
//         <Icon name="arrow-left" size={23} color="black" />
//       </TouchableOpacity>
//       <Text style={styles.title}>{alternate ? t('updateAltPhoneTitle') : t('updatePhoneNumber')}</Text>
//       <View style={styles.formContainer}>
//         <View style={styles.formGroup}>
//         <Text style={styles.label}> {alternate?t('altnumber') :t('phonenumber')}</Text>
//           <TextInput
//             style={styles.inputField}
            
//             placeholderTextColor="black"
//             keyboardType="numeric"
//             onChangeText={(text) => {
//                 if (text.length <= 13) { // Assuming "+91" prefix is included in the count
//                   alternate ? setAltphone(text.replace('+91', '')) : setPhone(text.replace('+91', ''));
//                   setErrorMessage('');
//               } else {
//                 setErrorMessage(t('phoneerror'));
//                 setLoading(false); // Stop loading
//                 return; 
//               }
//               }
//                 // setPhone(text.replace('+91', ''))
//               }
//               value={alternate ? (altphone.startsWith('+91') ? altphone : '+91' + altphone) : (phone.startsWith('+91') ? phone : '+91' + phone)}
          
//             />
//           {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
//         </View>
//         <Button title={t('updateButton')} onPress={handleUpdateChildren} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop:20,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   arrowContainer: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 18,
//     color: 'black',
//   },
//   formContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 24,
//     elevation: 8,
//     width: '100%',
//   },
//   formGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: 'black',
//     marginBottom: 8,
//   },
//   inputField: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 18,
//     color: 'black',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   errorMessage: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: 5,
//   },
// });

// export default PhoneUpdate;
import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectCustomerKYCData, setCustomerKYCData } from '../../redux/slices/authSlice';
import { selectCustomerData } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

const PhoneUpdate = ({ alternate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerKYCData = useSelector(selectCustomerKYCData);
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [phone, setPhone] = useState(customerKYCData['Phone Number'] ?? '');
  const record_id = customerKYCData.record_id;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [altphone, setAltphone] = useState(customerKYCData['Alternate Phone Number'] ?? '');

  const handleUpdateChildren = async () => {
    try {
      let data;
      setLoading(true);
      if (phone.length < 10 && !alternate) {
        setErrorMessage(t('phoneerror'));
        setLoading(false);
        return;
      } else {
        setErrorMessage('');
      }
      if (altphone.length < 10 && alternate) {
        setErrorMessage(t('phoneError'));
        setLoading(false);
        return;
      } else {
        setErrorMessage('');
      }

      if (alternate) {
        data = {
          record_id,
          altphone: `+91${altphone}`,
          marital: customerKYCData['Marital Status'],
          phone: customerKYCData['Phone Number'],
          houseaddress: customerKYCData['House Address'],
          city: customerKYCData['City'],
          nooftrucks: customerKYCData['Number of Trucks'],
          noofyearsinbusiness: customerKYCData['Number of years in business'],
          housetype: customerKYCData['House Owned or Rented'],
          monthlyemioutflow: customerKYCData['Monthly EMI Outflow'],
          noofchildren: customerKYCData['Number of Children'],
          dob: customerKYCData['Date of Birth'],
          pan: customerKYCData['PAN Number'],
          status : "Updated"
        };
      } else {
        data = {
          record_id,
          phone: `+91${phone}`,
          marital: customerKYCData['Marital Status'],
          houseaddress: customerKYCData['House Address'],
          city: customerKYCData['City'],
          nooftrucks: customerKYCData['Number of Trucks'],
          noofyearsinbusiness: customerKYCData['Number of years in business'],
          housetype: customerKYCData['House Owned or Rented'],
          monthlyemioutflow: customerKYCData['Monthly EMI Outflow'],
          noofchildren: customerKYCData['Number of Children'],
          dob: customerKYCData['Date of Birth'],
          pan: customerKYCData['PAN Number'],
          altphone: customerKYCData['Alternate Phone Number'],
          status : "Updated"
        };
      }

      console.log(data);
      const response = await axios.post(`https://backendforpnf.vercel.app/updatedob`, data);
      console.log('Server response:', response.data);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: t('updateSuccess'),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      navigation.navigate('CustomerProfile');
      const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
      const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
      const apiData = Kresponse.data.data[0] || {};
      dispatch(setCustomerKYCData(apiData));
    } catch (err) {
      console.log("Error in updating:", err);
    }
  };

  const handleBack = () => {
    navigation.navigate('CustomerProfile');
  };

  return (
    <View style={styles.container}>
      {loading && (
        <Modal transparent={true} animationType='fade'>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </Modal>
      )}
      <TouchableOpacity style={styles.arrowContainer} onPress={handleBack}>
        <Icon name="arrow-left" size={23} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{alternate ? t('updateAltPhoneTitle') : t('updatePhoneNumber')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}> {alternate ? t('altnumber') : t('phonenumber')}</Text>
          <TextInput
            style={styles.inputField}
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={(text) => {
              if (text.length <= 13) {
                alternate ? setAltphone(text.replace('+91', '')) : setPhone(text.replace('+91', ''));
                setErrorMessage('');
              } else {
                setErrorMessage(t('phoneerror'));
                setLoading(false);
              }
            }}
            value={alternate ? (altphone.startsWith('+91') ? altphone : '+91' + altphone) : (phone.startsWith('+91') ? phone : '+91' + phone)}
          />
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        </View>
        <Button title={t('updateButton')} onPress={handleUpdateChildren} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 18,
    color: 'black',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 8,
    width: '100%',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default PhoneUpdate;
