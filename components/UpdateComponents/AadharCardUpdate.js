import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Modal, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; 
import axios from 'axios';
import { selectCustomerKYCData } from '../../redux/slices/authSlice';
import Toast from 'react-native-toast-message';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const AadharCardUpdate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerKYCData = useSelector(selectCustomerKYCData);
  console.log("inAadharCard",customerKYCData);
  const record_id = customerKYCData.record_id;
  const fimageUrl='https://cdn.pixabay.com/photo/2022/11/09/00/44/aadhaar-card-7579588_960_720.png';
  const bimageUrl = 'https://images.jdmagicbox.com/comp/madurai/e8/0452px452.x452.170525164543.e5e8/catalogue/e-sevai-maiyam-alanganallur-madurai-wlxxmzooyu.jpg';
  const [aadharFrontImage, setAadharFrontImage] = useState(null);
  const [aadharBackImage, setAadharBackImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [frontImageFiles, setFrontImageFiles] = useState(null);
  const [backImageFiles, setBackImageFiles] = useState(null); 
  const [editOptions, setEditOptions] = useState(false);
  const [editOptionsforback, setEditOptionforBack] = useState(false);

  const handleCameraLaunch = async (isFront) => {
    setLoading(true);
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
      freeStyleCropEnabled:true,
      useFrontCamera:true,
      
    };
    try {
      const result = await launchCamera(options);
      const base64Data = result.assets[0].base64;
      const imageUri = result.assets[0];
      if (isFront) {
        setAadharFrontImage(imageUri);
        await uploadBase64ToBackend(base64Data, 'front');
      } else {
        setAadharBackImage(imageUri);
        await uploadBase64ToBackend(base64Data, 'back');
      }
    } catch (error) {
      console.log('Error in handleCameraLaunch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryLaunch = async (isFront) => {
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
      if (isFront) {
        setAadharFrontImage(imageUri);
        await uploadBase64ToBackend(base64Data, 'front');
      } else {
        setAadharBackImage(imageUri);
        await uploadBase64ToBackend(base64Data, 'back');
      }
    } catch (error) {
      console.log('Error in handleGalleryLaunch:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadBase64ToBackend = async (base64Data, imageType) => {
    try {
      const response = await axios.post('https://backendforpnf.vercel.app/fileUpload', { base64Data }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Server response:', response.data);
      const { msg: { files: uploadedFiles, success } } = response.data;
      if (imageType === 'front') {
        setFrontImageFiles(uploadedFiles); // Update front image files state
      } else {
        setBackImageFiles(uploadedFiles); // Update back image files state
      }

    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    }
  };

  const handleUpload = async () => {
    try {
      let data = { record_id,
        files:frontImageFiles
     };

      

      const updateResponse = await axios.post('https://backendforpnf.vercel.app/updateAadharphoto', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Update response:', updateResponse.data);
      Toast.show({
        type: 'success',
        position:'bottom',
        text1: 'Uploaded Successfully', 
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
    } catch (error) {
      console.log('Error in handleUpload:', error);
    }
};
const handleUploadBack = async () => {
    try {
      let data = { record_id,
        files:backImageFiles
     };
      const updateResponse = await axios.post('https://backendforpnf.vercel.app/updateAadharback', data, {
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
    } catch (error) {
      console.log('Error in handleUpload:', error);
    }
};


  const handleBack = () => {
    navigation.navigate('CustomerProfile')
  };

  const handleshowEditOptions = () => {
    setEditOptions(!editOptions);
  };
  const handleBackEditOptions = () =>{
    setEditOptionforBack(!editOptionsforback);
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
      <Text style={styles.title}>{t('aadharCardUpdateTitle')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.uploadContainer}>
        <Text style={styles.label}>{t('aadharFrontImageLabel')}</Text>
          {aadharFrontImage ? (
            <View style={styles.imagePreviewContainer}>
                <Image
                source={{
                    uri: typeof aadharFrontImage === 'string' ? aadharFrontImage : aadharFrontImage.uri || '',
                    headers: {
                    Accept: '*/*',
                    },
                }}
                style={styles.imagePreview}
                resizeMode={'stretch'}
                />
            </View>
            ) : (
                customerKYCData && customerKYCData['Aadhar Front'] && customerKYCData['Aadhar Front'].length > 0 ? (
                <View style={styles.imagePreviewContainer}>
                <Image
                    source={{
                    uri: JSON.parse(customerKYCData['Aadhar Front'])[0]?.fullpath || fimageUrl,
                    headers: {
                        Accept: '*/*',
                    },
                    }}
                    style={styles.imagePreview}
                    resizeMode={'stretch'}
                />
                </View>
            ) : null
            )}
          <TouchableOpacity style={styles.editIconContainer} onPress={handleshowEditOptions}>
            <FontAwesomeIcon name="edit" style={styles.editIcon} size={30} color="black" />
          </TouchableOpacity>
          
        </View>
        {editOptions && (
            <>
         <View style={styles.uploadButtonsContainer}>
         <TouchableOpacity style={styles.uploadButton} onPress={()=> handleCameraLaunch(true)}>
           <Icon name="camera" size={20} color="white"  />
           <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.uploadButton} onPress={()=> handleGalleryLaunch(true)}>
           <Icon name="image" size={20} color="white"  />
           <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
         </TouchableOpacity>
         
       </View>
       <Button title={t('uploadButton')} onPress={handleUpload} />

       </>
        )}
        <View style={styles.uploadContainer}>
        <Text style={[styles.label, { marginTop: 5 }]}>{t('aadharBackImageLabel')}</Text>

          {aadharBackImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{
                  uri: typeof aadharBackImage === 'string' ? aadharBackImage : aadharBackImage.uri || '',
                  headers: {
                    Accept: '*/*',
                  },
                }}
                style={styles.imagePreview}
                resizeMode={'stretch'}
              />
            </View>
          ) : 
          customerKYCData && customerKYCData['Aadhar Back'] && customerKYCData['Aadhar Back'].length > 0  ? (
            <View style={styles.imagePreviewContainer}>
            <Image
                source={{
                uri: JSON.parse(customerKYCData['Aadhar Back'])[0]?.fullpath || bimageUrl,
                headers: {
                    Accept: '*/*',
                },
                }}
                style={styles.imagePreview}
                resizeMode={'stretch'}
            />
            </View>
        ):(
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ 
                  uri: bimageUrl,
                  headers: {
                    Accept: '*/*',
                  },
                }} 
                style={styles.imagePreview}
                resizeMode={'stretch'}
              />
            </View>
          )}
          <TouchableOpacity style={styles.editIconContainer} onPress={handleBackEditOptions}>
            <FontAwesomeIcon name="edit" style={styles.editIcon} size={30} color="black" />
          </TouchableOpacity>
          
        </View>
        {editOptionsforback && (
            <>
         <View style={styles.uploadButtonsContainer}>
         <TouchableOpacity style={styles.uploadButton} onPress={()=>handleCameraLaunch(false)}>
           <Icon name="camera" size={20} color="white"  />
           <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.uploadButton} onPress={()=>handleGalleryLaunch(false)}>
           <Icon name="image" size={20} color="white"  />
           <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
         </TouchableOpacity>
         
       </View>
       <Button title={t('uploadButton')} onPress={handleUploadBack} />
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
    justifyContent: 'center',
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
    position: 'relative',
  },
  imagePreview: {
    width: 180,
    height: 100,
    borderRadius: 8,
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
    gap:'10'
  },
  editIconContainer: {
    position: 'absolute', 
    top: '62%', 
    left: '50%', 
    transform: [{ translateX: -12 }, { translateY: -12 }], // Adjust for the icon size to center it
  },
});

export default AadharCardUpdate;

