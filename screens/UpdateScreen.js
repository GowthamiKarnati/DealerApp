import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCustomerKYCData, setCustomerKYCData } from '../redux/slices/authSlice';
import { selectCustomerData } from '../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "@react-native-community/datetimepicker";





const UpdateScreen = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const customerKYCData = useSelector(selectCustomerKYCData);
    const customerData =  useSelector(selectCustomerData)
    //console.log("id",customerKYCData.record_id)
    const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
    //console.log("jhedguye", customerPhoneNumber)
    //const [dob, setDob] = useState(customerKYCData['Date of Birth'].split(' ')[0] ?? '');
    const [pan, setPan] = useState(customerKYCData['PAN Number'] ?? '');
    const [monthlyemioutflow, setMonthlyemioutflow] = useState(customerKYCData['Monthly EMI Outflow'] ?? '')
    const [noofchildren, setChildren] = useState(customerKYCData['Number of Children'] ?? '');
    const [housetype, setHousetype]= useState(customerKYCData['House Owned or Rented'] ?? '');
    const [noofyearsinbusiness, setNoofyearsinbusiness] = useState(customerKYCData['Number of years in business']);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const initialDob = customerKYCData['Date of Birth'] ? new Date(customerKYCData['Date of Birth'].split(' ')[0]) : ''; // Initialize with empty string if 'Date of Birth' is falsy
    const [dob, setDob] = useState(initialDob);
    const [nooftrucks, setNooftrucks] = useState(customerKYCData['Number of Trucks'] ?? '');
    const [city, setCity] = useState(customerKYCData['City'] ?? '');
    const [houseaddress, setHouseaddress] =  useState(customerKYCData['House Address'] ?? '');
    const [phone, setPhone] = useState(customerKYCData['Phone Number'] ?? '');
    const [altphone, setAltphone]  = useState(customerKYCData['Alternate Phone Number'] ?? '');
    
    const { feildname } = route.params;
    const record_id =customerKYCData.record_id
  console.log("inupdatescreen", customerKYCData)
  console.log(feildname);
  const handleBack = () => {
    navigation.navigate('CustomerProfile');
  };
const handleDateOfBirthUpdate = async () => {
    try {
      
      let data;
      if (feildname === 'dob') {
        data = { record_id, dob, pan: customerKYCData['PAN Number'], noofchildren: customerKYCData['Number of Children'], monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], housetype:customerKYCData['House Owned or Rented'],noofyearsinbusiness: customerKYCData['Number of years in business'],nooftrucks:customerKYCData['Number of Trucks'],city:customerKYCData['City'], houseaddress:customerKYCData['House Address'],phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number']};
        console.log(data)
      } else if (feildname === 'pan') {
        data = { record_id, pan, dob: customerKYCData['Date of Birth'], noofchildren: customerKYCData['Number of Children'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], housetype:customerKYCData['House Owned or Rented'],noofyearsinbusiness: customerKYCData['Number of years in business'],nooftrucks:customerKYCData['Number of Trucks'],city:customerKYCData['City'],houseaddress:customerKYCData['House Address'] ,phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number']};
      } else if (feildname === 'noofchildren') {
        data = { record_id, noofchildren, dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], housetype:customerKYCData['House Owned or Rented'],noofyearsinbusiness: customerKYCData['Number of years in business'],nooftrucks:customerKYCData['Number of Trucks'],city:customerKYCData['City'],houseaddress:customerKYCData['House Address'],phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number']};
      }else if (feildname === 'montlyemioutflow') {
        data = { record_id,monthlyemioutflow, noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'] , housetype:customerKYCData['House Owned or Rented'],noofyearsinbusiness: customerKYCData['Number of years in business'],nooftrucks:customerKYCData['Number of Trucks'],city:customerKYCData['City'],houseaddress:customerKYCData['House Address'],phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number']};
      }else if (feildname === 'housetype') {
        data = { record_id,housetype,monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'],noofyearsinbusiness: customerKYCData['Number of years in business'],nooftrucks:customerKYCData['Number of Trucks'],city:customerKYCData['City'],houseaddress:customerKYCData['House Address'],phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number'] };
      }else if (feildname === 'noofyearsinbusiness') {
        data = { record_id,noofyearsinbusiness,housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'],nooftrucks:customerKYCData['Number of Trucks'] ,city:customerKYCData['City'],houseaddress:customerKYCData['House Address'],phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number']};
      }else if (feildname === 'nooftrucks') {
        data = { record_id,nooftrucks:customerKYCData['Number of Trucks'], noofyearsinbusiness:customerKYCData['Number of years in business'],housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'],city:customerKYCData['City'] ,houseaddress:customerKYCData['House Address'],phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number']};
      }else if (feildname === 'city') {
        data = { record_id,city, nooftrucks:customerKYCData['Number of Trucks'], noofyearsinbusiness:customerKYCData['Number of years in business'],housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'] ,houseaddress:customerKYCData['House Address'],phone:customerKYCData['Phone Number'],altphone:customerKYCData['Alternate Phone Number']};
      } else if (feildname === 'houseaddress') {
        data = { record_id,houseaddress,city:customerKYCData['City'], nooftrucks:customerKYCData['Number of Trucks'], noofyearsinbusiness:customerKYCData['Number of years in business'],housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'],altphone:customerKYCData['Alternate Phone Number'] ,phone:customerKYCData['Phone Number']};
      } else if (feildname === 'phone') {
        data = { record_id,phone: `+91${phone}`, houseaddress:customerKYCData['House Address'],city:customerKYCData['City'], nooftrucks:customerKYCData['Number of Trucks'], noofyearsinbusiness:customerKYCData['Number of years in business'],housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'],altphone:customerKYCData['Alternate Phone Number'] };
      }else if (feildname === 'altphone') {
        data = { record_id,altphone:`+91${altphone}`,phone:customerKYCData['Phone Number'], houseaddress:customerKYCData['House Address'],city:customerKYCData['City'], nooftrucks:customerKYCData['Number of Trucks'], noofyearsinbusiness:customerKYCData['Number of years in business'],housetype:customerKYCData['House Owned or Rented'],monthlyemioutflow:customerKYCData['Monthly EMI Outflow'], noofchildren: customerKYCData['Number of Children'], dob: customerKYCData['Date of Birth'], pan: customerKYCData['PAN Number'] };
      }  
  
      const response = await axios.post(`https://backendforpnf.vercel.app/updatedob`, data);
      console.log('Server response:', response.data);
      Alert.alert("updated successfully")
      navigation.navigate('CustomerProfile')
      const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
            const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
            const apiData = Kresponse.data.data[0] || {};
            dispatch(setCustomerKYCData(apiData)); 
    } catch (err) {
      console.log("Error in updating:", err);
    }
  };
  

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.arrowContainer} onPress={handleBack}>
                <Icon name="arrow-left" size={23} color="black" />
            </TouchableOpacity>
      {feildname === 'dob' && (
        <>
        <Text style={styles.title}>Update Date of Birth</Text>
        <View style={styles.formContainer}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <Text style={styles.dobField}>{dob ? dob.toLocaleDateString() : 'Select Date of Birth'}</Text>

                </TouchableOpacity>
            </View>
            {showDatePicker && (
                  <DateTimePicker
                      value={dob}
                      mode="date"
                      display="spinner"
                      onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || dob;
                          setShowDatePicker(false);
                          setDob(currentDate);
                      }}
                      
                  />
              )}

            <Button title="Update" onPress={handleDateOfBirthUpdate} />
        </View>
    </>
      )}
      {feildname === 'pan' && (
        <>
          <Text style={styles.title}>Update Pan Number</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Pan Number</Text>
              <TextInput
                style={styles.dobField}
                placeholder="Enter the Pan Number"
                placeholderTextColor="black"
                keyboardType="numeric"

                onChangeText={(text) => {
                  if (text.length <= 10) {
                    setPan(text);
                  } else {
                    // Display an alert if the input exceeds 10 digits
                    Alert.alert('Error', 'PAN number cannot exceed 10 digits');
                  }
                }}
                value={pan}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'noofchildren' && (
        <>
          <Text style={styles.title}>Update No.of Children</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> Number of children</Text>
              <TextInput
                style={styles.dobField}
                placeholder="enter the no of children"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => setChildren(text)}
                value={noofchildren}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'montlyemioutflow' && (
        <>
          <Text style={styles.title}>Update Montly Emi OutFlow</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>  Montly Emi OutFlow</Text>
              <TextInput
                style={styles.dobField}
                placeholder="enter the  Montly Emi OutFlow"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => setMonthlyemioutflow(text)}
                value={monthlyemioutflow}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'housetype' && (
        <>
          <Text style={styles.title}>Update House Type</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> House Type </Text>
              <TextInput
                style={styles.dobField}
                placeholder="First Letter must be Capitalize"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => setHousetype(text)}
                value={housetype}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'noofyearsinbusiness' && (
        <>
          <Text style={styles.title}>Update Number of years in business</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> Number of years in business </Text>
              <TextInput
                style={styles.dobField}
                placeholder="Enter the number of years in business"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => setNoofyearsinbusiness(text)}
                value={noofyearsinbusiness}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'nooftrucks' && (
        <>
          <Text style={styles.title}>Update Number of Trucks</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> Number of Trucks </Text>
              <TextInput
                style={styles.dobField}
                placeholder="Enter the number of trucks"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => setNooftrucks(text)}
                value={nooftrucks}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'city' && (
        <>
          <Text style={styles.title}>Update City</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> City</Text>
              <TextInput
                style={styles.dobField}
                placeholder="Enter the city"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => setCity(text)}
                value={city}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'houseaddress' && (
        <>
          <Text style={styles.title}>Update House Address</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> House Address</Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                style={styles.dobField}
                placeholder="Enter the address"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => setHouseaddress(text)}
                value={houseaddress}
              />
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        </>
      )}
      {feildname === 'phone' && (
        <>
        <Text style={styles.title}>Update Phone Number</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> Phone Number</Text>
              
                <TextInput
              style={styles.dobField}
              placeholder="Enter the Phone Number"
              placeholderTextColor="black"
              keyboardType="numeric"
              onChangeText={(text) => {
                if (text.length <= 13) { // Assuming "+91" prefix is included in the count
                  setPhone(text.replace('+91', ''));
              } else {
                  // Display error message here, you can use state to manage it
                  // For example, set an error state and display it in your UI
                  // setErrorMsg("Phone number cannot exceed 10 digits");
                  // You can also use Alert to display the error message
                  Alert.alert("Error", "Phone number cannot exceed 10 digits");
              }
              }
                // setPhone(text.replace('+91', ''))
              }
              value={phone.startsWith('+91') ? phone : '+91' + phone} // Ensure the value always starts with "+91"
            />
            <Text>please enter the 10 digits</Text>

   
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        
        </>
      )}
      {feildname === 'altphone' && (
        <>
        <Text style={styles.title}>Update Phone Number</Text>
          {/* <Text>Record ID: {record_id}</Text> */}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}> Alternate Phone Number</Text>
              <TextInput
                style={styles.dobField}
                placeholder="Enter the Alternate Phone Number"
                placeholderTextColor="black"
                keyboardType="numeric"
                onChangeText={(text) => {
                  if (text.length <= 13) { // Assuming "+91" prefix is included in the count
                    setAltphone(text.replace('+91', ''));
                } else {
                    // Display error message here, you can use state to manage it
                    // For example, set an error state and display it in your UI
                    // setErrorMsg("Phone number cannot exceed 10 digits");
                    // You can also use Alert to display the error message
                    Alert.alert("Error", "Phone number cannot exceed 10 digits");
                }
                }
                  // setPhone(text.replace('+91', ''))
                }
                value={altphone.startsWith('+91') ?altphone : '+91' + altphone}
              />
              <Text>please enter the 10 digits</Text>
            </View>
            <Button title="Update" onPress={handleDateOfBirthUpdate} />
          </View>
        
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
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
  dobField: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: 'black',
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
},
phoneNumberField: {
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  paddingHorizontal: 10,
  paddingVertical: 8,
},
});

export default UpdateScreen;
