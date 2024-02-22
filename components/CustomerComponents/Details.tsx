import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { selectCustomerData } from '../../redux/slices/authSlice';
const Details = () => {
  //console.log("customer Data", customerData)
  const navigation = useNavigation();
  const customerData = useSelector(selectCustomerData);
  //console.log(customerData)
  const customerName = customerData?.name || 'N/A';
  //console.log(customerName)
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [loanType, setLoanType] = useState('');
  const [customers, setCustomers] = useState('');
  //const [cardHeight, setCardHeight] = useState(215);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        
        const customerResponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        setCustomers(customerResponse.data.data[0]);
         //console.log("customer Drat", customerResponse.data.data[0])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApplyforTyre=()=>{
    if (customers && customers['KYC Status'] === 'Active') {
    setLoanType('tyre');
      navigation.navigate('Apply', { customerData, loanType: 'tyre' })
    }else {
      Alert.alert('KYC Status Inactive', 'Please contect the admin');
    }
  }
  const handleApplyforInsurance = () => {
    if (customers && customers['KYC Status'] === 'Active') {
    setLoanType('insurance');
    navigation.navigate('Apply', { customerData, loanType: 'insurance' });
    }else {
      Alert.alert('KYC Status Inactive', 'Please contect the admin');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text 
        style={styles.cardName}>{customerName ? customerName.toUpperCase() : 'N/A'}</Text>
        <View style={styles.phoneContainer}>
          
          <Text style={styles.cardPhone}>{customerPhoneNumber}</Text>
          <Icons style={{marginLeft:5}} name="phone" size={23} color="#12b981" />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonTyre} onPress={handleApplyforTyre}>
            <Icon name="truck" size={20} color="gold" style={styles.icon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTextTop}>Apply Tyre</Text>
              <Text style={styles.buttonTextBottom}>Loan </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleApplyforInsurance}>
            <Icon name="shield" size={20} color="gold" style={styles.icon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonTextTop}>Apply Insurance</Text>
              <Text style={styles.buttonTextBottom}>Loan </Text>
            </View>
          </TouchableOpacity>

          {/* Add your second button here */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 10,
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
    padding:5
  },
  button: {
    marginRight: 20,
    width: '48%',
    height: 70,
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Set flexDirection to row
  },
  buttonTextContainer: {
    flex: 1,
    marginLeft: 10, // Add some space between the icon and text
  },
  buttonTextTop: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonTextBottom: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flexWrap: 'wrap', // Allow text to wrap
  },
  icon: {
    marginRight: 5,
    marginLeft:10
  },
  buttonTyre:{
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
  
});

export default Details;
