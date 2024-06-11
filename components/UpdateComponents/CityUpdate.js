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

const CityUpdate = ({house}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerKYCData = useSelector(selectCustomerKYCData);
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [city, setCity] = useState(customerKYCData['City'] ?? '');
  const [houseaddress, setHouseaddress] = useState(
    customerKYCData['House Address'] ?? '',
  );
  const record_id = customerKYCData.record_id;
  const [loading, setLoading] = useState(false);
  //console.log(dob);

  const handleUpdateChildren = async () => {
    try {
      setLoading(true);
      let data;
      if (!house) {
        data = {
          record_id,
          city,
          marital: customerKYCData['Marital Status'],
          nooftrucks: customerKYCData['Number of Trucks'],
          noofyearsinbusiness: customerKYCData['Number of years in business'],
          housetype: customerKYCData['House Owned or Rented'],
          monthlyemioutflow: customerKYCData['Monthly EMI Outflow'],
          noofchildren: customerKYCData['Number of Children'],
          dob: customerKYCData['Date of Birth'],
          pan: customerKYCData['PAN Number'],
          houseaddress: customerKYCData['House Address'],
          phone: customerKYCData['Phone Number'],
          altphone: customerKYCData['Alternate Phone Number'],
          status: 'Updated',
          houseUrl: customerKYCData['House Location URL'],
        };
      } else {
        data = {
          record_id,
          houseaddress,
          marital: customerKYCData['Marital Status'],
          city: customerKYCData['City'],
          nooftrucks: customerKYCData['Number of Trucks'],
          noofyearsinbusiness: customerKYCData['Number of years in business'],
          housetype: customerKYCData['House Owned or Rented'],
          monthlyemioutflow: customerKYCData['Monthly EMI Outflow'],
          noofchildren: customerKYCData['Number of Children'],
          dob: customerKYCData['Date of Birth'],
          pan: customerKYCData['PAN Number'],
          altphone: customerKYCData['Alternate Phone Number'],
          phone: customerKYCData['Phone Number'],
          status: 'Updated',
          houseUrl: customerKYCData['House Location URL'],
        };
      }
      console.log('Data to be sent:', data);
      //console.log(data)
      const response = await axios.post(
        `https://backendforpnf.vercel.app/updatedob`,
        data,
      );
      //console.log('Server response:', response.data);
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

  // Function to handle the back action
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
      <Text style={styles.title}>
        {!house ? t('updateCityTitle') : t('updateAddressTitle')}
      </Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>
            {!house ? t('city') : t('houseadress')}
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            style={styles.inputField}
            placeholder={!house ? t('entercity') : t('Enterhouseaddress')}
            placeholderTextColor="black"
            keyboardType="default"
            onChangeText={text =>
              !house ? setCity(text) : setHouseaddress(text)
            }
            value={!house ? city : houseaddress}
          />
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
});

export default CityUpdate;
