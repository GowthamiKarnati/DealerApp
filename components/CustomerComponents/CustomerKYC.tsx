import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { setCustomerKYCData } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux'; 
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { selectCustomerData } from '../../redux/slices/authSlice';
const CustomerKYC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerData = useSelector(selectCustomerData);
  const [kycStatus, setKycStatus] = useState('');
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const imageUrl = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg';
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        console.log(modifiedMobileNumber)
        //const response = await axios.get(`https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_203=942035807`);
       const response =await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        const apiData = response.data.data[0] || {};
        console.log("api, data", apiData)
        const kycStatusFromData = apiData?.['KYC Status'];
        //console.log(kycStatusFromData)
        if (kycStatusFromData === 'Active') {
          setKycStatus('Completed');
        } else {
          setKycStatus('Incomplete');
        }
        dispatch(setCustomerKYCData(apiData));
      }catch(err){
        console.log("Error in Fetching", err)
      }
    };

    fetchData();
  }, []);
  const handleCardPress = () => { 
    navigation.navigate('CustomerProfile'); 
  };
  return (
    
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.userImage}
              onError={(e) => console.log('Image load error', e.nativeEvent.error)}
            />
          ) : (
            <Text>No Image</Text>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.cardName}>Customer KYC</Text>
          <Text style={[styles.kycStatus, kycStatus === 'Completed' ? styles.completedStatus : styles.incompleteStatus]}>{kycStatus}</Text>
        </View>
      </View>
      
      <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
      
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  kycStatus: {
    color: 'gray',
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
  },
  icon: {
    marginLeft: 'auto',
    marginRight:8
  },
  completedStatus: {
    color: 'green',
},
incompleteStatus: {
    color: 'red',
},
});

export default CustomerKYC;
