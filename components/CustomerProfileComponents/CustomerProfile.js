import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacityComponent, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper'; // Import Card from react-native-paper
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { selectCustomerKYCData, setCustomerKYCData } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { selectCustomerData } from '../../redux/slices/authSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
const CustomerProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const imageUrl = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg';
  const customerKYCData = useSelector(selectCustomerKYCData);
  console.log("incustomerProfile", customerKYCData)
  const record_id = customerKYCData.record_id;
  //console.log(record_id);
  const actionSheetRef = useRef();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addressWidth, setAddressWidth] = useState(null); 
  const [addressText, setAddressText] = useState('');
  const [altPhoneWidth, setAltPhoneWidth] = useState(null);
  const [altPhoneText, setAltPhoneText] = useState('');
  useEffect(() => {
    if (addressWidth === null) {
      setAddressText(customerKYCData['House Address'] || '');
    }
    if (altPhoneWidth === null) {
      setAltPhoneText(customerKYCData['Alternate Phone Number'] || '');
    }
  }, [customerKYCData, addressWidth,altPhoneWidth ]);

  const handlePress=(feildname)=>{
    navigation.navigate('Update', { feildname })
  }
  const openActionSheet = () => {
    if (actionSheetRef.current) {
      actionSheetRef.current.show();
    }
  };

  const handleTakePhoto = async() => {
    setLoading(true);
    console.log("Take a photo clicked");
    const options = {
      mediaType: 'photo', 
      selectionLimit: 1,
      includeBase64: true
    };
  try {
    const result = await launchCamera(options);
    //console.log('ImagePicker response:', result); // Log the response for debugging
    const base64Data = result.assets[0].base64;
      console.log("response", result.assets[0].base64);
      const imageUri = result.assets[0];
      setImage(imageUri); 
      actionSheetRef.current?.hide()
      await uploadBase64ToBackend(base64Data);
  } catch (error) {
    console.log('Error in handleChooseFromGallery:', error);
  }finally {
    // Set loading to false when finished
    setLoading(false);
  }
};
  const handleChooseFromGallery = async () => {
    setLoading(true);
    const options = {
      mediaType: 'photo', 
      selectionLimit: 1,
      includeBase64: true
    };
  
    try {
      const result = await launchImageLibrary(options); 
      const base64Data = result.assets[0].base64;
      //console.log("response", result.assets[0].base64);
      const imageUri = result.assets[0];
      setImage(imageUri); 
      actionSheetRef.current?.hide()
      await uploadBase64ToBackend(base64Data);

      // if (!result.didCancel) {
      //   const imageUri = result.assets[0];
      //   setImage(imageUri); 
      //   console.log('Chosen image:', imageUri);
      //   actionSheetRef.current?.hide()
      //   await uploadImageToBackend(imageUri);
      // } else {
      //   console.log('User cancelled image picker');
      // }
    } catch (error) {
      console.log('Error in handleChooseFromGallery:', error);
    }finally {
      // Set loading to false when finished
      setLoading(false);
    }
  };
 
  const uploadBase64ToBackend = async (base64Data) => {
    try {
      const response = await axios.post('https://backendforpnf.vercel.app/fileUpload', { base64Data }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Server response:', response.data);
      const { msg: { files, success } } = response.data;
      const data = {
        record_id,
        files
      };
  
      // Send files object to the backend /updatePhoto endpoint
      const updateResponse = await axios.post('https://backendforpnf.vercel.app/updatePhoto', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

  
      console.log('Update response:', updateResponse.data);
      const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
            const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
            const apiData = Kresponse.data.data[0] || {};
            console.log("kycData",apiData)
            dispatch(setCustomerKYCData(apiData)); 
    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    }
  };
  const handleAddressLayout = (event) => {
    if (!addressWidth) {
      setAddressWidth(event.nativeEvent.layout.width);
    }
  };

  const truncatedAddress = () => {
    if (!addressText || !addressWidth) return '';
    const text = addressText;
    const maxCharsWidth = addressWidth / 12; // Estimated width of 12 characters
    // Calculate the maximum characters based on the width of the container
    const maxChars = 17; 
    if (text.length > maxChars) {
      return text.slice(0, maxChars) + '...';
    }
    return text;
  };
  const handleAltPhoneLayout = (event) => {
    if (!altPhoneWidth) {
      setAltPhoneWidth(event.nativeEvent.layout.width);
    }
  };
  
  // Define a function to truncate the alternate phone number if needed
  const truncatedAltPhone = () => {
    if (!altPhoneText || !altPhoneWidth) return '';
    const text = altPhoneText;
    const maxChars = 7; // Maximum characters before truncating
    const maxCharsWidth = altPhoneWidth / 12; // Estimated width of 12 characters
    if (text.length > maxChars) {
      return text.slice(0, maxChars) + '...';
    }
    return text;
  };


  

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      {customerKYCData && customerKYCData?.Photo && customerKYCData.Photo.length > 0 && JSON.parse(customerKYCData.Photo)[0] && JSON.parse(customerKYCData.Photo)[0].fullpath ? (
        <Image 
          source={{ 
            uri: JSON.parse(customerKYCData.Photo)[0].fullpath ,
            headers: {
              Accept: '*/*',
            },
          }} 
          style={styles.image} 
          resizeMode={'cover'}
        />
      ) : (
        <Image 
          source={{ 
            uri: imageUrl,
            headers: {
              Accept: '*/*',
            },
          }} 
          style={styles.image}
          resizeMode={'cover'}
        />
      )}


        <TouchableOpacity style={styles.editIconContainer} onPress={openActionSheet}>
          <FontAwesomeIcon name="edit" style={styles.editIcon} size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* Use Card component for KYC data container */}
      <Card style={[styles.customerKYCContainer]}>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Date of Birth:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Date of Birth']?.split(' ')[0]}</Text>
            <TouchableOpacity onPress={() => handlePress('dob')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>PAN Number:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['PAN Number']}</Text>
            <TouchableOpacity onPress={() => handlePress('pan')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Number of Children:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Number of Children']}</Text>
            <TouchableOpacity onPress={() => handlePress('noofchildren')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Monthly EMI Outflow:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Monthly EMI Outflow']}</Text>
            <TouchableOpacity onPress={() => handlePress('montlyemioutflow')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>House Owned or Rented:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['House Owned or Rented']}</Text>
            <TouchableOpacity onPress={() => handlePress('housetype')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Number of Years in Business:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Number of years in business']}</Text>
            <TouchableOpacity onPress={() => handlePress('noofyearsinbusiness')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>City:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['City']}</Text>
            <TouchableOpacity onPress={() => handlePress('city')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Phone Number:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Phone Number']}</Text>
            <TouchableOpacity onPress={() => handlePress('phone')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Alternate Phone Number:</Text>
          <View style={styles.valueContainer} onLayout={handleAltPhoneLayout}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.valueText}>{truncatedAltPhone()}</Text>
            <TouchableOpacity onPress={() => handlePress('altphone')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* New section for House Address */}
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>House Address:</Text>
          <View style={styles.valueContainer} onLayout={handleAddressLayout}>
            <Text style={styles.valueText}>{truncatedAddress()}</Text>
            <TouchableOpacity onPress={() => handlePress('houseaddress')}>
              <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
      <ActionSheet ref={actionSheetRef}>
        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChooseFromGallery}>
          <Text style={styles.buttonText}>Choose from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => actionSheetRef.current?.hide()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ActionSheet>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:20,
  },
  imageContainer: {
    position: 'relative',
    
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIconContainer: {
    ...StyleSheet.absoluteFillObject, // Position the icon container absolutely within its parent
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    
  },
  editIcon: {
    padding: 10,
  },
  customerKYCContainer: {
    marginTop: 20,
    borderRadius: 10,
    elevation: 4,
    width:'100%',
    backgroundColor: 'white',
    marginBottom:20,
  },
  kycItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height:70,
    alignItems:'center'
  },
  keyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  valueText: {
    fontSize: 18,
    color: '#4b5563',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  lastKycItem: {
    borderBottomWidth: 0,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color:'black'
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999 // Ensure the loader is above other components
  }
});

export default CustomerProfile;
