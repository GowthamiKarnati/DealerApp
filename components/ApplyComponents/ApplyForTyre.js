import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {selectCustomerData} from '../../redux/slices/authSlice';
import {setSubmitting} from '../../redux/slices/authSlice';

const ApplyForTyre = ({loanType}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  //console.log(customerPhoneNumber)
  const sourcerefid = customerData?.['DEALER reference_id'];
  //console.log(sourcerefid)
  const source = customerData?.DEALER || null;
  //console.log(source);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [brandProducts, setBrandProducts] = useState([]);
  const [numberOfTires, setNumberOfTires] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [prevValues, setPrevValues] = useState({
    numberOfTires: '',
    selectedBrand: '',
    loanAmount: '',
    truckNumber: '',
  });
  const [isLoadingBrandProducts, setIsLoadingBrandProducts] = useState(false);
  //console.log("SelectedProduct", selectedProduct);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber =
          customerPhoneNumber.length > 10
            ? customerPhoneNumber.slice(-10)
            : customerPhoneNumber;
        //console.log('number', modifiedMobileNumber)
        const customerResponse = await axios.get(
          `https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(
            modifiedMobileNumber,
          )}%22`,
        );
        setCustomerDetails(customerResponse.data.data[0]);
        //console.log("customer", customerResponse.data.data[0])
        const vehicleResponse = await axios.get(
          `https://backendforpnf.vercel.app/vehicles?criteria=sheet_32026511.column_609.column_87%20LIKE%20%22%25${encodeURIComponent(
            modifiedMobileNumber,
          )}%22`,
        );
        setVehicleData(vehicleResponse.data.data);
        //console.log("vehicle",vehicleResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [customerPhoneNumber]);
  useEffect(() => {
    setPrevValues({
      numberOfTires,
      selectedBrand,
      loanAmount,
      truckNumber,
    });
  }, [numberOfTires, selectedBrand, loanAmount, truckNumber]);

  const fetchBrandProducts = async itemValue => {
    try {
      setIsLoadingBrandProducts(true);
      const response = await axios.get(
        `https://backendforpnf.vercel.app/brandproducts`,
        {
          headers: {
            'Cache-Control': 'no-cache', // Add Cache-Control header here
          },
        },
      );
      //const response = await axios.get(`https://3974-2409-40f0-102b-6b83-ac69-bca7-301b-f373.ngrok-free.app/brandproducts`);
      const filteredBrandProducts = response.data.data.filter(
        product => product.Brand === itemValue,
      );
      setBrandProducts(filteredBrandProducts);
      setIsLoadingBrandProducts(false);
      console.log(filteredBrandProducts);
    } catch (error) {
      console.error('Error fetching brand products:', error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      if (loanType === 'insurance') {
        // Validation for insurance loan type
        if (!loanAmount || !truckNumber) {
          setErrorMessage(t('pleasefillinsurancefeilds'));
          return;
        }
      } else if (loanType === 'tyre') {
        // Validation for tyre loan type
        if (!numberOfTires || !selectedBrand || !loanAmount || !truckNumber) {
          setErrorMessage(t('pleasefilltyrefeilds'));
          return;
        }
        // Additional check if brand products are available
        // if (brandProducts.length > 0 && !selectedProduct) {
        //   setErrorMessage(t('pleasefilltyrefeilds'));
        //   return;
        // }
      }
      setErrorMessage('');
      setIsSubmitting(true);
      const currentDate = new Date().toISOString().split('T')[0];

      const FullName = customerData?.name || null;
      const PanNumber = customerData?.pan || null;
      const mobilenumber = customerData?.['mobile number'] || null;
      const AlternateMobileNumber =
        customerData?.['alternate mobile number'] || null;
      const Nooftrucks = customerDetails
        ? customerDetails['Number of Trucks'] || null
        : null;
      const source = customerData?.DEALER || null;
      const sourcerefid = customerData?.['DEALER reference_id'];
      console.log('sourceid', sourcerefid);
      const response = await axios.post(
        `https://backendforpnf.vercel.app/create`,
        {
          numberOfTires: loanType === 'tyre' ? numberOfTires : null,
          selectedBrand: loanType === 'tyre' ? selectedBrand : null,
          loanAmount,
          FullName,
          PanNumber,
          mobilenumber,
          AlternateMobileNumber,
          martialStatus: customerDetails
            ? customerDetails['Marital Status'] || null
            : null,
          numchildren: customerDetails
            ? customerDetails['Number of Children'] || null
            : null,
          houseType: customerDetails
            ? customerDetails['House Owned or Rented'] || null
            : null,
          monthlyEMIOutflow: customerDetails
            ? customerDetails['Monthly EMI Outflow'] || null
            : null,
          numberOfYearsInBusiness: customerDetails
            ? customerDetails['Number of years in business'] || null
            : null,
          Totaldriversalary: customerDetails
            ? customerDetails['Driver Salary'] || null
            : null,
          truckNumber: truckNumber,
          Nooftrucks,
          date: currentDate,
          source,
          confpanNumber: PanNumber,
          sourcerefid,
          oldornew: 'Existing',
          loanType: loanType === 'tyre' ? 'Tyre Loan' : 'Insurance Loan',
          selectedProduct,
        },
      );

      //console.log('Server response:', response.data);
      //navigation.navigate('Customer', { customerData });
      dispatch(setSubmitting(true));
      navigation.navigate('Start');
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: t('submittext1'),
        text2: t('submittext2'),
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setSubmitting(false);
      // eslint-disable-next-line no-undef
      if (error.response) {
        setNumberOfTires(prevValues.numberOfTires);
        setSelectedBrand(prevValues.selectedBrand);
        setLoanAmount(prevValues.loanAmount);
        setTruckNumber(prevValues.truckNumber);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {t('title')} {loanType === 'tyre' ? t('tire') : t('insurance')}{' '}
        {t('loan')}
      </Text>

      <View style={styles.formContainer}>
        {loanType === 'tyre' && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('numtire')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={t('numtireplace')}
                placeholderTextColor="black"
                autoCapitalize="none"
                value={numberOfTires}
                onChangeText={text => {
                  setNumberOfTires(text);
                  setErrorMessage('');
                }}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('brandoftire')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedBrand}
                  onValueChange={itemValue => {
                    setSelectedBrand(itemValue);
                    fetchBrandProducts(itemValue);
                  }}
                  style={styles.picker}
                  dropdownIconColor="black">
                  <Picker.Item
                    label={t('selectbrand')}
                    value="Select the brand"
                    enabled={false}
                  />
                  <Picker.Item label="CEAT" value="CEAT" />
                  <Picker.Item label="MRF" value="MRF" />
                  <Picker.Item label="Apollo" value="Apollo" />
                  <Picker.Item label="Others" value="Others" />
                </Picker>
              </View>
            </View>
            {isLoadingBrandProducts ? ( // Display loader if isLoadingBrandProducts is true
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              brandProducts.length > 0 && (
                <View style={styles.formGroup}>
                  <Text style={styles.label}>{t('Brand Products')}</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedProduct}
                      onValueChange={itemValue => {
                        console.log('Selected Product:', itemValue);
                        setSelectedProduct(itemValue);
                      }}
                      style={styles.picker}
                      dropdownIconColor="black">
                      {/* Ensure each Picker item has a valid value prop */}
                      <Picker.Item
                        label={t('Select the Product')}
                        value=""
                        enabled={false}
                      />
                      {brandProducts.map((product, index) => (
                        <Picker.Item
                          key={index}
                          label={product.Product}
                          value={product.Product}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
              )
            )}
          </>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            {t('loanamount')}
            <Text style={{color: 'red', marginLeft: 5}}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder={t('loanamountplace')}
            placeholderTextColor="black"
            autoCapitalize="none"
            value={loanAmount}
            onChangeText={text => {
              setLoanAmount(text);
              setErrorMessage('');
            }}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            {t('trucknum')}
            <Text style={{color: 'red', marginLeft: 5}}>*</Text>
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={truckNumber}
              onValueChange={itemValue => setTruckNumber(itemValue)}
              style={styles.picker}
              dropdownIconColor="black">
              <Picker.Item
                label={t('trucknumplace')}
                value=""
                enabled={false}
              />
              {vehicleData &&
                vehicleData.map(vehicle => (
                  <Picker.Item
                    key={vehicle['record_id']}
                    label={vehicle['Vehicle No.']}
                    value={vehicle['Vehicle No.']}
                  />
                ))}
            </Picker>
          </View>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>
              {t('submitapplication')}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>{t('footer')}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
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
  pickerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
    padding: 0,
  },
  picker: {
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '70%',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
  bottom: {
    marginTop: 40,
  },
  bottomText: {
    fontSize: 18,
    color: 'gray',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ApplyForTyre;
