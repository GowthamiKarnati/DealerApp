// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Button, StyleSheet, Modal, ActivityIndicator, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { useTranslation } from 'react-i18next';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux'; 
// import axios from 'axios';
// import { selectCustomerKYCData } from '../../redux/slices/authSlice';
// import Toast from 'react-native-toast-message';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-crop-picker';



// const HouseImagesUpdate = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const customerKYCData = useSelector(selectCustomerKYCData);
//   //console.log("inpan",customerKYCData);
//   console.log("customerKYCData['PAN Card']:", customerKYCData['PAN Card']);

//   const record_id = customerKYCData.record_id;
//   const imageUrl = 'https://sc0.blr1.cdn.digitaloceanspaces.com/article/126722-ebpzzqejgp-1567498856.jpeg';
//   const [houseImages, setHouseImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [files, setFiles] = useState(null); 
//   const [editOptions, setEditOptions] = useState(false);

//   const handleCameraLaunch = async () => {
//     setLoading(true);
//     const options = {
//       mediaType: 'photo',
//       selectionLimit: 5,
//     //   includeBase64: true
//     };
//     try {
//         const result = await launchImageLibrary(options);
//         const selectedImages = result.assets.map((asset) => asset.uri);
//         console.log(selectedImages);
//         setHouseImages(selectedImages);
//       const base64Data = result.assets[0].base64;
//       console.log("response", result.assets[0]);
//       const imageUri = result.assets[0];
//       setPanCardImage(imageUri);
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
//       selectionLimit: 5,
//       includeBase64: true
//     };

//     try {
//         const result = await launchImageLibrary(options);
//         const selectedImages = result.assets.map((asset) => asset.uri);
//         setHouseImages(selectedImages);
//       const base64Data = result.assets[0].base64;
//       const imageUri = result.assets[0];
//       setPanCardImage(imageUri);
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

//       console.log('Server response:', response.data);
//       const { msg: { files: uploadedFiles, success } } = response.data;
//       setFiles(uploadedFiles); // Update files state

//     } catch (error) {
//       console.log('Error in uploadBase64ToBackend:', error);
//     }
//   };

//   const handleUpload = async () => {
//     // You can use the files state here
//     try {
//       // Use the files state to include in the data object
//       const data = {
//         record_id,
//         files
//       };

//       const updateResponse = await axios.post('https://backendforpnf.vercel.app/updatepanphoto', data, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log('Update response:', updateResponse.data);
//       Toast.show({
//         type: 'success',
//         position:'bottom',
//         text1: t('uploadsuccessfully'), 
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//       });
//     } catch (error) {
//       console.log('Error in handleUpload:', error);
//     }
//   };

//   const handleBack = () => {
//     navigation.navigate('CustomerProfile')
//   };
//   const handleshowEditOptions = ()=>{
//     setEditOptions(!editOptions);
//   }

//   return (
//     <View style={styles.container}>
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
//       <Text style={styles.title}>House Images Update</Text>
//       <View style={styles.formContainer}>
//         <View style={styles.uploadContainer}>
//           <Text style={styles.label}>House Images</Text>
          
//           {panCardImage ? (
//   // If panCardImage is available, display the image captured or selected
//   <View style={styles.imagePreviewContainer}>
//     <Image
//       source={{
//         uri: typeof panCardImage === 'string' ? panCardImage : panCardImage.uri || '',
//         headers: {
//           Accept: '*/*',
//         },
//       }}
//       style={styles.imagePreview}
//       resizeMode={'cover'}
//     />
//   </View>
// ) : (customerKYCData && customerKYCData['PAN Card'] && customerKYCData['PAN Card'].length > 0) ? (
//   // If PAN card data is available in customerKYCData, display the PAN card image
//   <View style={styles.imagePreviewContainer}>
//     <Image
//       source={{
//         uri: JSON.parse(customerKYCData['PAN Card'])[0]?.fullpath || imageUrl,
//         headers: {
//           Accept: '*/*',
//         },
//       }}
//       style={styles.imagePreview}
//       resizeMode={'cover'}
//       onError={(error) => console.error("Error loading PAN card image:", error)}
//     />
//   </View>
// ) :null}

//           <TouchableOpacity style={styles.editIconContainer} onPress={handleshowEditOptions}>
//             <FontAwesomeIcon name="edit" style={styles.editIcon} size={30} color="white" />
//           </TouchableOpacity>
        
//         </View>
//         {editOptions && (
//           <>
//           <View style={styles.uploadButtonsContainer}>
//             <TouchableOpacity style={styles.uploadButton} onPress={handleCameraLaunch}>
//               <Icon name="camera" size={20} color="white"  />
//               <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.uploadButton} onPress={handleGalleryLaunch}>
//               <Icon name="image" size={20} color="white" />
//               <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
//             </TouchableOpacity>
//           </View>
//           <Button title={t('uploadButton')} onPress={handleUpload} />
//            </>
//           )}
        
       
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   arrowContainer: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
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
//     width: '100%',
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: 'black',
//     marginBottom: 8,
//   },
//   inputField: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     fontSize: 18,
//     color: 'black',
//   },
//   uploadButton: {
//     backgroundColor: '#12b981',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     alignItems: 'center',
//     flexDirection: 'row',
//     flex: 1,
//     // justifyContent: 'center',
//     // marginRight: 10,
//   },
//   uploadButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 18,
//     marginLeft: 10,
//   },
//   imagePreviewContainer: {
//     marginTop: 20,
//     marginBottom: 10,
//     alignItems: 'center',
//     position: 'relative',
//   },
//   imagePreview: {
//     width: 180,
//     height: 100,
//     borderRadius: 8,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 18,
//     color: 'black',
//   },
//   uploadButtonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap:10
//   },
//   editIconContainer: {
//     position: 'absolute', 
//     top: '63%', 
//     left: '50%', 
//     transform: [{ translateX: -12 }, { translateY: -12 }], // Adjust for the icon size to center it
//   },
// });

//export default HouseImagesUpdate;
import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Modal, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; 
import axios from 'axios';
import { selectCustomerKYCData ,setCustomerKYCData} from '../../redux/slices/authSlice';
import Toast from 'react-native-toast-message';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { selectCustomerData } from '../../redux/slices/authSlice';
const HouseImagesUpdate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerKYCData = useSelector(selectCustomerKYCData);
  const customerData =  useSelector(selectCustomerData)
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  //console.log("customerKYCData['PAN Card']:", customerKYCData['PAN Card']);
  const customerHouseImagesString = customerKYCData['House Images'] || ''; 
  //console.log(customerHouseImages);
  const record_id = customerKYCData.record_id;
  const imageUrl = 'https://www.shutterstock.com/image-vector/home-vector-image-be-used-600nw-255682306.jpg';
  const [houseImages, setHouseImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]); 
  const [editOptions, setEditOptions] = useState(false);
  console.log(files,"files")
  const customerHouseImagesArray = JSON.parse(customerHouseImagesString);
  //const fullpathImages = customerHouseImagesArray.filter(imageUri => typeof imageUri === 'string' && imageUri.includes('fullpath'));
  //console.log("Full paths",fullpathImages);
const handleCameraLaunch = async () => {
    setLoading(true);
    const options = {
      mediaType: 'photo',
      selectionLimit: 5,
      includeBase64: true
    };
    try {
      const result = await launchImageLibrary(options);
      const selectedImages = result.assets.map((asset) => asset.uri);
      setHouseImages(selectedImages);
      
      for (const asset of result.assets) {
        const base64Data = asset.base64;
        await uploadBase64ToBackend(base64Data);
      }
    } catch (error) {
      console.log('Error in handleCameraLaunch:', error);
    } finally {
      setLoading(false);
    }
};


const handleGalleryLaunch = async () => {
    setLoading(true);
    const options = {
      mediaType: 'photo',
      selectionLimit: 5, // Adjust the selection limit as needed
      includeBase64: true,
    };
  
    try {
      const result = await launchImageLibrary(options);
      const selectedImages = result.assets.map((asset) => asset.uri);
      setHouseImages(selectedImages);
  
      const uploadedFiles = [];
      for (const asset of result.assets) {
        const base64Data = asset.base64;
        const uploadedFile = await uploadBase64ToBackend(base64Data);
        uploadedFiles.push(uploadedFile);
      }
  
      // Set all uploaded files
      setFiles(uploadedFiles.flat()); // Flatten the array and update files state
    } catch (error) {
      console.log('Error in handleGalleryLaunch:', error);
    } finally {
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
      const { msg: { files: uploadedFiles, success } } = response.data;
      return uploadedFiles;// Update files state

    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    }
  };

  const handleUpload = async () => {
    try {
      const data = {
        record_id,
        files
      };

      const updateResponse = await axios.post('https://backendforpnf.vercel.app/updatehouseimages', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Update response:', updateResponse.data);
      Toast.show({
        type: 'success',
        position:'bottom',
        text1: t('uploadsuccessfully'), 
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      navigation.navigate('CustomerProfile');
      const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
      const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
      const apiData = Kresponse.data.data[0] || {};
      dispatch(setCustomerKYCData(apiData)); 
    } catch (error) {
      console.log('Error in handleUpload:', error);
    }
  };

  const handleBack = () => {
    navigation.navigate('CustomerProfile')
  };

  const handleshowEditOptions = () => {
    setEditOptions(!editOptions);
  }

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
      <Text style={styles.title}>{t('HouseImagesUpdate')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.uploadContainer}>
          <Text style={styles.label}>{t('HouseImages')}</Text>
          
          {houseImages.length > 0 ? (
            <View style={styles.imagePreviewContainer}>
              {houseImages.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.imagePreview}
                  resizeMode={'stretch'}
                />
              ))}
            </View>
          ) : (customerHouseImagesArray.length > 0 ? (
            <View style={styles.imagePreviewContainer}>
              {customerHouseImagesArray
  .filter(imageData => imageData.fullpath) // Filter out entries without a fullpath
  .map((imageData, index) => (
    <Image
      key={index}
      source={{ uri: imageData.fullpath }}
      style={styles.imagePreview}
      resizeMode="cover"
    />
  ))
}
            </View>
          ) : (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.imagePreview}
                resizeMode={'cover'}
              />
            </View>
          )
          )}

          <TouchableOpacity style={styles.editIconContainer} onPress={handleshowEditOptions}>
            <FontAwesomeIcon name="edit" style={styles.editIcon} size={30} color="black" />
          </TouchableOpacity>
        </View>
        {editOptions && (
          <>
            <View style={styles.uploadButtonsContainer}>
              
              <TouchableOpacity style={styles.uploadButton} onPress={handleGalleryLaunch}>
                <Icon name="image" size={20} color="white" />
                <Text style={styles.uploadButtonText}>{t('chooseImages')}</Text>
              </TouchableOpacity>
            </View>
            <Button title={t('uploadButton')} onPress={handleUpload} />
          </>
        )}
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
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 8,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  uploadButton: {
    backgroundColor: '#12b981',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent:'center'
  },
  uploadButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginLeft: 10,

  },
  imagePreviewContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 200,
    height: 100,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    gap: 10,
  },
  editIconContainer: {
    position: 'absolute', 
    top: '63%', 
    left: '50%', 
    transform: [{ translateX: -12 }, { translateY: -12 }], 
  },
});

export default HouseImagesUpdate;
