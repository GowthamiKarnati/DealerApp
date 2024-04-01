// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Modal, ActivityIndicator, Image, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { selectCustomerKYCData } from '../../redux/slices/authSlice';
// import { useSelector } from 'react-redux';
// import { selectCustomerData } from '../../redux/slices/authSlice';
// import Toast from 'react-native-toast-message';
// import axios from 'axios';

// const TruckNumber = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const customerData = useSelector(selectCustomerData);
//   const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//   const name = customerData?.['name'] || null;
//   const namerefid = customerData?.['record_id'] || null;

//   const [truckNumber, setTruckNumber] = useState('');
//   const [rcNumber, setRCNumber] = useState('');
//   const [rcPicture, setRCPicture] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [attach, setAttach] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [vehicleData, setVehicleData] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchVehicleData();
//   }, []);

//   const fetchVehicleData = async () => {
//     setLoading(true);
//     try {
//       const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//       const vehicleResponse = await axios.get(`https://backendforpnf.vercel.app/vehicles?criteria=sheet_32026511.column_609.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
//       setVehicleData(vehicleResponse.data.data);
//     } catch (error) {
//       console.error('Error fetching vehicle data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCameraLaunch = async () => {
//     setLoading(true);
//     const options = {
//       mediaType: 'photo',
//       selectionLimit: 1,
//       includeBase64: true
//     };
//     try {
//       const result = await launchCamera(options);
//       const base64Data = result.assets[0].base64;
//       const imageUri = result.assets[0];
//       setRCPicture(imageUri);
//       await uploadBase64ToBackend(base64Data);
//     } catch (error) {
//       console.log('Error in handleCameraLaunch:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGalleryLaunch = async () => {
//     setLoading(true);
//     const options = {
//       mediaType: 'photo',
//       selectionLimit: 1,
//       includeBase64: true
//     };

//     try {
//       const result = await launchImageLibrary(options);
//       const base64Data = result.assets[0].base64;
//       const imageUri = result.assets[0];
//       setRCPicture(imageUri);
//       await uploadBase64ToBackend(base64Data);
//     } catch (error) {
//       console.log('Error in handleGalleryLaunch:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadBase64ToBackend = async (base64Data) => {
//     try {
//       const response = await axios.post('https://backendforpnf.vercel.app/fileUpload', { base64Data }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       const { msg: { files, success } } = response.data;
//       setFiles(files)
//     } catch (error) {
//       console.log('Error in uploadBase64ToBackend:', error);
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       const response = await axios.post(`http://10.0.2.2:5002/createvehicle`, {
//         truckNumber,
//         rcNumber,
//         rcPicture: files,
//         name,
//         namerefid
//       });
//       console.log('Server response:', response.data);
//     } catch (err) {
//       console.log("Error in submitting the vehicleData:", err)
//     }
//   };

//   const handleBack = () => {
//     navigation.navigate('CustomerProfile');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.arrowContainer}>
//       {!loading && <Icon name="arrow-left" size={24} color="black" />}
//       </View>
//       <Text style={styles.title}>Trucks Information</Text>
//       {loading ? (
//         <View >
//           <ActivityIndicator size="large" color="blue" />
//         </View>
//       ) : (
//         <>
//           {vehicleData && vehicleData.map((vehicle, index) => {
//             const fullPath = JSON.parse(vehicle['RC Image'])[0]?.fullpath;
//             return (
//               <View key={index} style={styles.cardContainer}>
//                 <Text style={styles.label}>Vehicle No.: {vehicle['Vehicle No.']}</Text>
//                 <Text style={styles.label}>RC Number: {vehicle['RC Number']}</Text>
//                 {fullPath ? (
//                   <Image
//                     source={{
//                       uri: fullPath,
//                       headers: {
//                         Accept: '*/*',
//                       },
//                     }}
//                     style={styles.imagePreview}
//                   />
//                 ) : (
//                   <Text style={styles.label}>No RC Image</Text>
//                 )}
//               </View>
//             );
//           })}
//           <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(!showForm)}>
//             <Text style={styles.addButtonText}>{showForm ? '-' : '+'}</Text>
//           </TouchableOpacity>
//         </>
//       )}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showForm}
//         onRequestClose={() => setShowForm(false)}
//       >
//         <View style={styles.formContainer}>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Truck Number</Text>
//             <TextInput
//               style={styles.inputField}
//               placeholder={t('enterTruckNumber')}
//               placeholderTextColor="black"
//               keyboardType="default"
//               onChangeText={(text) => setTruckNumber(text)}
//               value={truckNumber}
//             />
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>RC Number</Text>
//             <TextInput
//               style={styles.inputField}
//               placeholder={t('enterRCNumber')}
//               placeholderTextColor="black"
//               keyboardType="default"
//               onChangeText={(text) => setRCNumber(text)}
//               value={rcNumber}
//             />
//           </View>
//           <View style={styles.uploadContainer}>
//             <Text style={styles.label}>RC Image</Text>
//             {rcPicture && (
//               <View style={styles.imagePreviewContainer}>
//                 <Image source={{ uri: typeof rcPicture === 'string' ? rcPicture : rcPicture.uri }} style={styles.imagePreview} />
//               </View>
//             )}
//             {!attach
//  && (
//   <TouchableOpacity style={styles.uploadbutton} onPress={() => setAttach(!attach)}>
//     <Text style={styles.uploadText}>Attach</Text>
//   </TouchableOpacity>
// )}
// {attach && (
//   <View style={styles.uploadButtonsContainer}>
//     <TouchableOpacity style={styles.uploadButton} onPress={handleCameraLaunch}>
//       <Icon name="camera" size={20} color="white" />
//       <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.uploadButton} onPress={handleGalleryLaunch}>
//       <Icon name="image" size={20} color="white" />
//       <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
//     </TouchableOpacity>
//   </View>
// )}
// </View>
// <Button title='Add' onPress={handleUpload} />
// </View>
// </Modal>
// </ScrollView>
// );
// };

// const styles = StyleSheet.create({
// container: {
//    flex: 1,
//   marginTop: 20,
//   alignItems: 'center',
//   paddingHorizontal: 20,
// },
// arrowContainer: {
//   position: 'absolute',
//   top: 9,
//   left: 10,
//   zIndex: 1,
// },
// formContainer: {
//   backgroundColor: '#ffffff',
//   borderRadius: 8,
//   padding: 24,
//   elevation: 8,
//   width: '100%',
  
// },
// formGroup: {
//   marginBottom: 20,
//   width: '100%',
// },
// label: {
//   fontSize: 18,
//   fontWeight: '500',
//   color: 'black',
//   marginBottom: 8,
// },
// inputField: {
//   borderWidth: 1,
//   borderColor: '#ccc',
//   borderRadius: 8,
//   paddingHorizontal: 12,
//   paddingVertical: 10,
//   fontSize: 18,
//   color: 'black',
// },
// uploadButton: {
//   backgroundColor: '#12b981',
//   padding: 10,
//   borderRadius: 8,
//   marginBottom: 10,
//   alignItems: 'center',
//   flexDirection: 'row',
//   flex: 1,
// },
// uploadButtonText: {
//   color: 'white',
//   textAlign: 'center',
//   fontSize: 18,
//   marginLeft: 10,
// },
// imagePreviewContainer: {
//   marginTop: 10,
//   alignItems: 'flex-start',
// },
// imagePreview: {
//   width: 180,
//   height: 100,
//   borderRadius: 8,
// },
// modalContainer: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
// },
// title: {
//   fontSize: 24,
//   fontWeight: '700',
//   marginBottom: 18,
//   color: 'black',
//   },
// uploadButtonsContainer: {
//   flexDirection: 'row',
//   gap: '10'
// },
// uploadbutton: {
//   backgroundColor: 'lightgrey',
//   padding: 5,
//   borderRadius: 5,
//   width: '60',
//   marginBottom: '10'
// },
// uploadText: {
//   fontSize: 13,
//   textAlign: 'center'
// },
// cardContainer: {
//   backgroundColor: '#ffffff',
//   borderRadius: 8,
//   padding: 16,
//   marginBottom: 16,
//   elevation: 4,
//   width: '100%',
//   alignSelf: 'center',
// },
// addButton: {
//   backgroundColor: '#12b981',
//   borderRadius: 20,
//   width: 40,
//   height: 40,
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginBottom: '15'
// },
// addButtonText: {
//   color: 'white',
//   fontSize: 24,
// },

// });

// export default TruckNumber;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Modal, ActivityIndicator, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { selectCustomerKYCData } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { selectCustomerData } from '../../redux/slices/authSlice';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const TruckNumber = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const name = customerData?.['name'] || null;
  const namerefid = customerData?.['record_id'] || null;

  const [truckNumber, setTruckNumber] = useState('');
  const [rcNumber, setRCNumber] = useState('');
  const [rcPicture, setRCPicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attach, setAttach] = useState(false);
  const [files, setFiles] = useState([]);
  const [vehicleData, setVehicleData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loaderfortrucks, setLoaderfortrucks] = useState(false);
  const [errorMessage, setErrorMessage ] =useState('');
  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    setLoaderfortrucks(true);
    try {
      const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
      const vehicleResponse = await axios.get(`https://backendforpnf.vercel.app/vehicles?criteria=sheet_32026511.column_609.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
      const sortedVehicleData = vehicleResponse.data.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    
    setVehicleData(sortedVehicleData);
    
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    } finally {
      setLoaderfortrucks(false);
    }
  };
  const handleCameraLaunch = async () => {
    setLoading(true);
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true
    };
    try {
      const result = await launchCamera(options);
      const base64Data = result.assets[0].base64;
      const imageUri = result.assets[0];
      setRCPicture(imageUri);
      await uploadBase64ToBackend(base64Data);
    } catch (error) {
      console.log('Error in handleCameraLaunch:', error);
    } finally {
      setLoading(false); // Set loading to false after completion or error
    }
  };
  
  const handleGalleryLaunch = async () => {
    setLoading(true);
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true
    };
  
    try {
      const result = await launchImageLibrary(options);
      const base64Data = result.assets[0].base64;
      const imageUri = result.assets[0];
      setRCPicture(imageUri);
      await uploadBase64ToBackend(base64Data);
    } catch (error) {
      console.log('Error in handleGalleryLaunch:', error);
    } finally {
      setLoading(false); // Set loading to false after completion or error
    }
  };
  
  const uploadBase64ToBackend = async (base64Data) => {
    try {
      setLoading(true);
      const response = await axios.post('https://backendforpnf.vercel.app/fileUpload', { base64Data }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { msg: { files, success } } = response.data;
      console.log(response.data);
      setFiles(files);
      console.log(files);
    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    } finally {
      setLoading(false); // Set loading to false after completion or error
    }
  };
  

  const handleUpload = async () => {
    if (!truckNumber.trim() || !rcNumber.trim() || !rcPicture) {
      setErrorMessage(t('pleasefillinsurancefeilds'));
      return; // Exit the function if any fields are empty
    }
    try {
      const response = await axios.post(`https://backendforpnf.vercel.app/createvehicle`, {
        truckNumber,
        rcNumber,
        rcPicture: files,
        name,
        namerefid
      });
      console.log('Server response:', response.data);
      Toast.show({
        type: 'success',
        position:'bottom',
        text1: 'Added Succesfully', 
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      setShowForm(false);
      setTruckNumber('');
      setRCNumber('');
      setRCPicture(null);
      setAttach(false);
      fetchVehicleData();
    } catch (err) {
      console.log("Error in submitting the vehicleData:", err)
    }
  };
   
  const handleBack = () => {
    navigation.navigate('CustomerProfile');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.arrowContainer} onPress={handleBack}>
        {!loaderfortrucks && <Icon name="arrow-left" size={24} color="black" />}
      </TouchableOpacity>
      <Text style={styles.title}>{t('TrucksInformation')}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(!showForm)}>
            <Text style={styles.addButtonText}>{showForm ? '-' : '+'}</Text>
          </TouchableOpacity>
      {loaderfortrucks ? (
        <View>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          {vehicleData && vehicleData.length > 0 ? (
        vehicleData.map((vehicle, index) => {
          const fullPath = JSON.parse(vehicle['RC Image'])[0]?.fullpath;
          return (
            <View key={index} style={styles.cardContainer}>
              <Text style={styles.label}>{t('VehicleNo')} {vehicle['Vehicle No.']}</Text>
<Text style={styles.label}>{t('RCNumber')} {vehicle['RC Number']}</Text>
              {fullPath ? (
                <Image
                  source={{
                    uri: fullPath,
                    headers: {
                      Accept: '*/*',
                    },
                  }}
                  style={styles.imagePreview}
                />
              ) : (
                <Text style={styles.label}>{t('noRCImage')}</Text>
              )}
            </View>
          );
        })
      ) : (
        <Text>{t('NoTrucksInformationAvailable')}</Text>
      )}
          
        </>
      )}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showForm}
        onRequestClose={() => setShowForm(false)}
      >
        <View style={styles.modalContainer}>
        {loading && (
        <Modal transparent={true} animationType='fade'>
          <View style={styles.modal}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </Modal>
      )}
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('trucknum')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <TextInput
                style={styles.inputField}
                placeholder={t('enterTruckNumber')}
                placeholderTextColor="black"
                keyboardType="default"
                onChangeText={(text) => setTruckNumber(text)}
                value={truckNumber}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('RCNumber')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <TextInput
                style={styles.inputField}
                placeholder={t('enterRCNumber')}
                placeholderTextColor="black"
                keyboardType="default"
                onChangeText={(text) => setRCNumber(text)}
                value={rcNumber}
              />
            </View>
            <View style={styles.uploadContainer}>
            <Text style={styles.label}>{t('rcImage')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>

              {rcPicture && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: typeof rcPicture === 'string' ? rcPicture : rcPicture.uri }} style={styles.imagePreview} />
                </View>
              )}
              {!attach && (
                <TouchableOpacity style={styles.uploadbutton} onPress={() => setAttach(!attach)}>
                  <Text style={styles.uploadText}>{t('attach')}</Text>
                </TouchableOpacity>
              )}
              {attach && (
                <View style={styles.uploadButtonsContainer}>
                  <TouchableOpacity style={styles.uploadButton} onPress={handleCameraLaunch}>
                    <Icon name="camera" size={20} color="white" />
                    <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.uploadButton} onPress={handleGalleryLaunch}>
                    <Icon name="image" size={20} color="white" />
                    <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <Button title={t('addButton')} onPress={handleUpload} />

            <TouchableOpacity style={styles.closeButton} onPress={() => setShowForm(false)}>
              <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
    </ScrollView>
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
    top: 9,
    left: 10,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 8,
    width: '80%',
    maxWidth: 400,
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
    color: 'black',
  },
  uploadButton: {
    backgroundColor: '#12b981',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 10,
  },
  imagePreviewContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  imagePreview: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 18,
    color: 'black',
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop:10,
    gap:10,
  },
  uploadbutton: {
    backgroundColor: 'lightgrey',
    padding: 5,
    borderRadius: 5,
    width: 60,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 13,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    width: '100%',
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#12b981',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust based on the size of your ActivityIndicator
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TruckNumber;
