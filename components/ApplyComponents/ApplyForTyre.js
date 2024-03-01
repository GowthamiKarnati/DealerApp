
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

const ApplyForTyre = ({ customerData, loanType }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [numberOfTires, setNumberOfTires] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        
        const customerResponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        setCustomerDetails(customerResponse.data.data[0]);

        const vehicleResponse = await axios.get(`https://backendforpnf.vercel.app/vehicles?criteria=sheet_32026511.column_609.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        setVehicleData(vehicleResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [customerPhoneNumber]);

  const handleSubmit = async () => {
    try {
      if ((!loanAmount || !truckNumber) && loanType === 'insurance') {
        Alert.alert('Please fill in all required fields for Insurance Loan');
        return;
      } else if ((!numberOfTires || !selectedBrand || !loanAmount || !truckNumber) && loanType === 'tyre') {
        Alert.alert('Please fill in all required fields for Tire Loan');
        return;
      }
      

      setIsSubmitting(true);
      const currentDate = new Date().toISOString().split('T')[0];

      const FullName = customerData?.name || null;
      const PanNumber = customerData?.pan || null;
      const mobilenumber = customerData?.['mobile number'] || null;
      const AlternateMobileNumber = customerData?.['alternate mobile number'] || null;
      const Nooftrucks = customerData?.Trucks !== undefined ? customerData.Trucks : null;
      const source = customerData?.DEALER || null;
      const sourcerefid = customerData?.["DEALER reference_id"];
      console.log(sourcerefid)
      const response = await axios.post(`https://backendforpnf.vercel.app/create`, {
        numberOfTires: loanType === 'tyre' ? numberOfTires : null,
        selectedBrand: loanType === 'tyre' ? selectedBrand : null,
        loanAmount,
        FullName,
        PanNumber,
        mobilenumber,
        AlternateMobileNumber,
        martialStatus: customerDetails ? customerDetails["Marital Status"] || null : null,
        numchildren: customerDetails ? customerDetails["Number of Children"] || null : null,
        houseType: customerDetails ? customerDetails["House Owned or Rented"] || null : null,
        monthlyEMIOutflow:customerDetails ? customerDetails["Monthly EMI Outflow"] || null : null,
        numberOfYearsInBusiness:customerDetails ? customerDetails["Number of years in business"] || null : null,
        Totaldriversalary:customerDetails ? customerDetails["Driver Salary"] || null : null,
        truckNumber: truckNumber,
        Nooftrucks,
        date: currentDate,
        source,
        sourcerefid,
        loanType: loanType === 'tyre' ? 'Tyre Loan' : 'Insurance Loan',
      });

      console.log('Server response:', response.data);
      //navigation.navigate('Customer', { customerData });
      
      navigation.navigate('Customer' )
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Application Submitted!!!',
        text2: 'You successfully applied for Loan, We will reach you shortly!',
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
      setNumberOfTires('');
      setSelectedBrand('');
      setLoanAmount('');
      setTruckNumber('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Apply for {loanType === 'tyre' ? 'Tire' : 'Insurance'} Loan</Text>

      <View style={styles.formContainer}>
        {loanType === 'tyre' && (
          <>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Number of Tires Required<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Enter the number of tires"
                placeholderTextColor="black"
                autoCapitalize="none"
                value={numberOfTires}
                onChangeText={(text) => setNumberOfTires(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Brand of Tire<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedBrand}
                  onValueChange={(itemValue) => setSelectedBrand(itemValue)}
                  style={styles.picker}
                >
                  
                  <Picker.Item label="CEAT" value="CEAT" />
                  <Picker.Item label="MRF" value="MRF" />
                  <Picker.Item label="Apollo" value="Apollo" />
                  <Picker.Item label="others" value="others" />
                </Picker>
              </View>
            </View>
          </>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Loan Amount<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Enter the loan amount"
            placeholderTextColor="black"
            autoCapitalize="none"
            value={loanAmount}
            onChangeText={(text) => setLoanAmount(text)}
          />
        </View>

        
          <View style={styles.formGroup}>
            <Text style={styles.label}>Truck Number<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={truckNumber}
                onValueChange={(itemValue) => setTruckNumber(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select truck number" value="" />
                {vehicleData && vehicleData.map((vehicle) => (
                  <Picker.Item key={vehicle["record_id"]} label={vehicle["Vehicle No."]} value={vehicle["Vehicle No."]} />
                ))}
              </Picker>
            </View>
          </View>
        

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Application</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Need help? Contact our support team at support@example.com
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
});

export default ApplyForTyre;
