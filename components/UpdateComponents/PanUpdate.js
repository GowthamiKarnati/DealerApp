import React, {useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  selectCustomerKYCData,
  setCustomerKYCData,
} from '../../redux/slices/authSlice';
import {selectCustomerData} from '../../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

const PanUpdate = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerKYCData = useSelector(selectCustomerKYCData);
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [pan, setPan] = useState(customerKYCData['PAN Number'] ?? '');
  const record_id = customerKYCData.record_id;
  const [loading, setLoading] = useState(false); //console.log(dob);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateChildren = async () => {
    try {
      setLoading(true);
      if (pan.length < 10) {
        setErrorMessage(t('panLengthError'));
        setLoading(false); // Stop loading
        return;
      } else {
        setErrorMessage('');
        // Proceed with update...
      }
      let data;
      data = {
        record_id,
        pan,
        marital: customerKYCData['Marital Status'],
        dob: customerKYCData['Date of Birth'],
        noofchildren: customerKYCData['Number of Children'],
        monthlyemioutflow: customerKYCData['Monthly EMI Outflow'],
        housetype: customerKYCData['House Owned or Rented'],
        noofyearsinbusiness: customerKYCData['Number of years in business'],
        nooftrucks: customerKYCData['Number of Trucks'],
        city: customerKYCData['City'],
        houseaddress: customerKYCData['House Address'],
        phone: customerKYCData['Phone Number'],
        altphone: customerKYCData['Alternate Phone Number'],
        status: 'Updated',
        houseUrl: customerKYCData['House Location URL'],
      };
      console.log(data);
      const response = await axios.post(
        `https://backendforpnf.vercel.app/updatedob`,
        data,
      );
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
      const modifiedMobileNumber =
        customerPhoneNumber.length > 10
          ? customerPhoneNumber.slice(-10)
          : customerPhoneNumber;
      const Kresponse = await axios.get(
        `https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(
          modifiedMobileNumber,
        )}%22`,
      );
      const apiData = Kresponse.data.data[0] || {};
      dispatch(setCustomerKYCData(apiData));
    } catch (err) {
      console.log('Error in updating:', err);
    }
  };

  const handleBack = () => {
    navigation.navigate('CustomerProfile');
  };

  return (
    <View style={styles.container}>
      {/* Arrow container for back navigation */}
      {loading && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </Modal>
      )}
      <TouchableOpacity style={styles.arrowContainer} onPress={handleBack}>
        <Icon name="arrow-left" size={23} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{t('updatePanTitle')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('panLabel')}</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter the pan number"
            placeholderTextColor="black"
            keyboardType="default"
            onChangeText={text => {
              if (text.length <= 10) {
                setPan(text);
              } else {
                setErrorMessage(t('panLengthError'));
                setLoading(false); // Stop loading
                return;
              }
            }}
            value={pan}
          />
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
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
    width:'100%'
  },
  arrowContainer: {
    position: 'absolute',
    top: 7,
    left: 20,
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

export default PanUpdate;
