import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {selectCustomerKYCData} from '../../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import {selectCustomerData} from '../../redux/slices/authSlice';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {setAddingTruck} from '../../redux/slices/authSlice';

const TruckNumber = () => {
  const {t} = useTranslation();
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
  const [errorMessage, setErrorMessage] = useState('');
  const [houseImages, setHouseImages] = useState([]);
  const [vehicleFiles, setVehicleFiles] = useState([]);
  //console.log("vehicle Files", vehiclefiles);
  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    setLoaderfortrucks(true);
    try {
      const modifiedMobileNumber =
        customerPhoneNumber.length > 10
          ? customerPhoneNumber.slice(-10)
          : customerPhoneNumber;
      const vehicleResponse = await axios.get(
        `https://backendforpnf.vercel.app/vehicles?criteria=sheet_32026511.column_609.column_87%20LIKE%20%22%25${encodeURIComponent(
          modifiedMobileNumber,
        )}%22`,
      );
      const sortedVehicleData = vehicleResponse.data.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );

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
      includeBase64: true,
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
      includeBase64: true,
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

  const uploadBase64ToBackend = async base64Data => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://backendforpnf.vercel.app/fileUpload',
        {base64Data},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const {
        msg: {files, success},
      } = response.data;
      //console.log(response.data);
      setFiles(files);
      //console.log(files);
    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    } finally {
      setLoading(false); // Set loading to false after completion or error
    }
  };
  const handleGallery = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 5, // Adjust the selection limit as needed
      includeBase64: true,
    };

    try {
      const result = await launchImageLibrary(options);
      const selectedImages = result.assets.map(asset => asset.uri);
      setHouseImages(selectedImages);

      const uploadedFiles = [];
      for (const asset of result.assets) {
        const base64Data = asset.base64;
        const uploadedFile = await base64ToBackend(base64Data);
        uploadedFiles.push(uploadedFile);
      }

      // Set all uploaded files
      setVehicleFiles(uploadedFiles.flat()); // Flatten the array and update files state
    } catch (error) {
      console.log('Error in handleGalleryLaunch:', error);
    }
  };

  const base64ToBackend = async base64Data => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://backendforpnf.vercel.app/fileUpload',
        {base64Data},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Server response:', response.data);
      const {
        msg: {files: uploadedFiles, success},
      } = response.data;
      setLoading(false);
      return uploadedFiles; // Update files state
    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    }
  };

  const handleUpload = async () => {
    if (!truckNumber.trim() || !rcPicture) {
      setErrorMessage(t('pleasefillinsurancefeilds'));
      return; // Exit the function if any fields are empty
    } else {
      setErrorMessage('');
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `https://backendforpnf.vercel.app/createvehicle`,
        {
          truckNumber,
          rcPicture: files,
          name,
          namerefid,
          vehicleFiles,
        },
      );
      console.log('Server response:', response.data);
      dispatch(setAddingTruck(true));
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: t('addedsuccessfully'),
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
      console.log('Error in submitting the vehicleData:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.navigate('CustomerProfile');
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, width:380}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrowContainer} onPress={handleBack}>
         
            <Icon name="arrow-left" size={24} color="black" />
          
        </TouchableOpacity>
        <Text style={styles.title}>{t('TrucksInformation')}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}>
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
                    <Text style={styles.label}>
                      {t('VehicleNo')} {vehicle['Vehicle No.']}
                    </Text>
                    {/* <Text style={styles.label}>{t('RCNumber')} {vehicle['RC Number']}</Text> */}
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
          onRequestClose={() => setShowForm(false)}>
          <View style={styles.modalContainer}>
            {loading && (
              <Modal transparent={true} animationType="fade">
                <View style={styles.modal}>
                  <ActivityIndicator size="large" color="blue" />
                </View>
              </Modal>
            )}
            <View style={styles.formContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  {t('trucknum')}
                  <Text style={{color: 'red', marginLeft: 5}}>*</Text>
                </Text>
                <TextInput
                  style={styles.inputField}
                  placeholder={t('enterTruckNumber')}
                  placeholderTextColor="black"
                  keyboardType="default"
                  onChangeText={text => {
                    setTruckNumber(text);
                    setErrorMessage('');
                  }}
                  value={truckNumber}
                />
              </View>
              {/* <View style={styles.formGroup}>
              <Text style={styles.label}>{t('RCNumber')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <TextInput
                style={styles.inputField}
                placeholder={t('enterRCNumber')}
                placeholderTextColor="black"
                keyboardType="default"
                onChangeText={(text) => setRCNumber(text)}
                value={rcNumber}
              />
            </View> */}
              <View style={styles.uploadContainer}>
                <Text style={styles.label}>
                  {t('rcImage')}
                  <Text style={{color: 'red', marginLeft: 5}}>*</Text>
                </Text>

                {rcPicture && (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{
                        uri:
                          typeof rcPicture === 'string'
                            ? rcPicture
                            : rcPicture.uri,
                      }}
                      style={styles.imagePreview}
                    />
                  </View>
                )}
                {!attach && (
                  <TouchableOpacity
                    style={styles.uploadbutton}
                    onPress={() => {
                      setAttach(!attach);
                      setErrorMessage('');
                    }}>
                    <Text style={styles.uploadText}>{t('Attach')}</Text>
                  </TouchableOpacity>
                )}
                {attach && (
                  <View style={styles.uploadButtonsContainer}>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={handleCameraLaunch}>
                      <View style={styles.buttonContent}>
                        <Icon name="camera" size={20} color="white" />
                        <Text style={styles.uploadButtonText}>
                          {t('takeaphoto')}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={handleGalleryLaunch}>
                      <View style={styles.buttonContent}>
                        <Icon name="image" size={20} color="white" />
                        <Text style={styles.uploadButtonText}>
                          {t('choosefromgallery')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>{t('Vehicle images')}</Text>
                <Text style={{color: '#555', marginBottom: 5}}>
                  {t('AttachHouseImages')}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'lightgrey',
                    padding: 5,
                    borderRadius: 5,
                    width: '60',
                  }}
                  onPress={handleGallery}>
                  <Text>{t('Attach')}</Text>
                </TouchableOpacity>
                {houseImages.length > 0 ? (
                  <View
                    style={[
                      styles.panCardContainer,
                      {flexDirection: 'row', flexWrap: 'wrap'},
                    ]}>
                    {houseImages.map((imageUri, index) => (
                      <View key={index} style={{margin: 5}}>
                        <Image
                          key={index}
                          source={{uri: imageUri}}
                          style={styles.panCardImage}
                          resizeMode={'cover'}
                        />
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
              {errorMessage ? (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              ) : null}
              <Button title={t('addButton')} onPress={handleUpload} />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowForm(false)}>
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
    width:'100%',
    
  },
  arrowContainer: {
    position: 'absolute',
    top: 7,
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
    maxWidth: '70%', // Set maximum width to prevent overflow
    flexWrap: 'wrap',
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
    marginTop: 10,
    gap: 10,
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
    transform: [{translateX: -25}, {translateY: -25}], // Adjust based on the size of your ActivityIndicator
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
  panCardContainer: {
    marginTop: 10,
  },

  panCardImage: {
    width: 80,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
});

export default TruckNumber;
