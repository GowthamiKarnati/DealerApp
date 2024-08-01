import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {selectMobileNumber} from '../../redux/slices/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setSubmitting} from '../../redux/slices/authSlice';
import { Buffer } from 'buffer';
import { Image as CompressorImage } from 'react-native-compressor';
import RNFS from 'react-native-fs';

const NewApplication = ({loanType, showPersonalInfo, setShowPersonalInfo}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userMobileNumber = useSelector(selectMobileNumber);
  const [dealerData, setDealerData] = useState(null);
  const [numberOfTires, setNumberOfTires] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [name, setName] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [confpanNumber, setconfPanNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [alternateMobileNumber, setAlternateMobileNumber] = useState('');
  const [numberOfTrucks, setNumberOfTrucks] = useState('');
  const [yearsInBusiness, setYearsInBusiness] = useState('');
  const [monthlyEmiOutflow, setMonthlyEmiOutflow] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState('');
  const [houseType, setHouseType] = useState('');
  const [truckNumber, setTruckNumber] = useState('');
  const [driverSalary, setDriverSalary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorforpersonal, setErrorforpersonal] = useState('');
  const [upload, setUpload] = useState(false);
  const [fupload, setFupload] = useState(false);
  const [bupload, setBupload] = useState(false);
  const [rupload, setRupload] = useState(false);
  const [panCardImage, setPanCardImage] = useState(null);
  const [panFiles, setPanFiles] = useState([]);
  const [frontFiles, setFrontFiles] = useState([]);
  const [backFiles, setBackFiles] = useState([]);
  const [aadharFrontImage, setAadharFrontImage] = useState(null);
  const [aadharBackImage, setAadharBackImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [personalInfoCollapsed, setPersonalInfoCollapsed] = useState(true);
  const [kycDocumentsCollapsed, setKycDocumentsCollapsed] = useState(true);
  const [housedetails, setHousedetails] = useState(true);
  const [dobDay, setDOBDay] = useState('DD');
  const [dobMonth, setDOBMonth] = useState('MM');
  const [dobYear, setDOBYear] = useState('YYYY');
  const [panerrorMessage, setpanErrorMessage] = useState('');
  const [phoneerrorMessage, setphoneErrorMessage] = useState('');
  const [alternateError, setAlternateError] = useState('');
  const [confpanError, setConfpanError] = useState('');
  const [panmismatch, setPanmismatch] = useState('');
  //const [trucknumbererror, setTrucknumbererror] = useState('');
  const [houseUrl, setHouseUrl] = useState('');
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [validUrl, setValidUrl] = useState(true);
  const [hupload, setHupload] = useState(false);
  const [houseImages, setHouseImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [brandProducts, setBrandProducts] = useState([]);
  const [rcImage, setRcImage] = useState(null);
  const [rcImageFiles, setRcImageFiles] = useState([]);
  const [isLoadingBrandProducts, setIsLoadingBrandProducts] = useState(false);
  const [rcNumber, setRCNumber] = useState('');
  
  //console.log('rc Image', rcImageFiles);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber =
          userMobileNumber.length > 10
            ? userMobileNumber.slice(-10)
            : userMobileNumber;
        const response = await axios.get(
          `https://backendforpnf.vercel.app/dealers?criteria=sheet_44481612.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`,
        );
        const dealer = response.data.data[0];
        //console.log("dealerData", dealer)
        //console.log(dealer)
        setDealerData(dealer);
      } catch (error) {
        console.error('Error fetching dealer data:', error);
        setDealerData(null);
      }
    };

    fetchData();
  }, [userMobileNumber]);

  const handleNext = () => {
    console.log("next is clicked")
    setShowPersonalInfo(true);
    // Perform validation checks
    // if (
    //   (loanType === 'insurance' && !loanAmount) ||
    //   (loanType === 'tyre' && (!numberOfTires || !selectedBrand || !loanAmount))
    // ) {
    //   console.log('Validation failed');
    //   setErrorMessage(t('pleasefillinsurancefeilds'));
    //   return;
    // } else {
    //   console.log('Validation passed');
    //   setErrorMessage('');
    // }
    //setShowPersonalInfo(true);
  };

  const sourcerefid = dealerData?.record_id || null;
  const source = dealerData?.dealer || null;
  //console.log(sourcerefid, source);
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
      const dob = `${dobDay}/${dobMonth}/${dobYear}`;
      // if (!validUrl) {
      //   return;
      // }
      if (
        name.trim() === '' ||
        panNumber.trim() === '' ||
        confpanNumber.trim() === '' ||
        mobileNumber.trim() === '' ||
        yearsInBusiness.trim() === '' ||
        monthlyEmiOutflow.trim() === '' ||
        numberOfChildren.trim() === '' ||
        truckNumber.trim() === '' ||
        panFiles.length === 0 ||
        frontFiles.length === 0 ||
        backFiles.length === 0 ||
        rcImageFiles.length === 0 ||
        dob.trim() === '' ||
        !dobDay ||
        !dobMonth ||
        !dobYear ||
        dobDay === '00' ||
        dobMonth === '00' ||
        dobYear === '0000'
      ) {
        setErrorforpersonal(t('pleasefillinsurancefeilds'));
        return;
      } else {
        setErrorforpersonal('');
      }
      //     if (truckNumber.trim().length !== 10) {
      //       setErrorforpersonal(t('trucknumlengtherror'));
      //       return;
      //   }else {
      //     setErrorforpersonal('');
      // }

      // Check if RC number is not 10 characters long
      // if (rcNumber.trim().length !== 10) {
      //     setErrorforpersonal(t('rcnumlengtherror'));
      //     return;
      // }else {
      //   setErrorforpersonal('');

      //   if (brandProducts.length > 0 && !selectedProduct) {
      //     setErrorMessage(t('pleasefilltyrefeilds'));
      //     return;
      //   }else {
      //     setErrorMessage('');
      // }
      setIsSubmitting(true);
      const sourcerefid = dealerData?.record_id || null;
      const source = dealerData?.dealer || null;
      //console.log(sourcerefid, source);
      //const dob = `${dobDay}/${dobMonth}/${dobYear}`;
      //console.log(dob);
      const currentDate = new Date().toISOString().split('T')[0];
      const response = await axios.post(
        `https://backendforpnf.vercel.app/create`,
        {
          numberOfTires: numberOfTires || null,
          selectedBrand: selectedBrand || null,
          loanAmount: loanAmount || null,
          FullName: name || null,
          PanNumber: panNumber || null,
          mobilenumber: `+91${mobileNumber}` || null,
          AlternateMobileNumber: `+91${alternateMobileNumber}` || null,
          martialStatus: maritalStatus || null,
          numchildren: numberOfChildren || null,
          houseType: houseType || null,
          monthlyEMIOutflow: monthlyEmiOutflow || null,
          noofyearsinbusiness: yearsInBusiness || null,
          driverSalary: driverSalary || null,
          truckNumber: truckNumber || null,
          NoOfTrucks: numberOfTrucks || null,
          date: currentDate || null,
          source,
          sourcerefid,
          loanType: loanType === 'tyre' ? 'Tyre Loan' : 'Insurance Loan',
          oldornew: 'New',
          pancard: panFiles,
          aadharfront: frontFiles,
          aadharback: backFiles,
          dob: dob || null,
          confpanNumber,
          houseUrl,
          houseImages: files,
          selectedProduct,
          rcimage: rcImageFiles,
        },
      );

      console.log('Server response:', response.data);
      setIsSubmitting(false);
      dispatch(setSubmitting(true));
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
      // Navigate to Start screen
      navigation.navigate('Start');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  const handleUpload = () => {
    setUpload(!upload);
    setErrorforpersonal('');
  };
  const handleCameraLaunch = async uploadType => {
    //setLoading(true);
    //setUploadingImage(true);
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
      maxWidth: 1080,
      maxHeight: 1080,
    };
    try {
      const result = await launchCamera(options);
      const imageUri = result.assets[0].uri; // Ensure to use .uri
        const compressedImageUri = await CompressorImage.compress(imageUri, {
            compressionMethod: 'auto',
            quality: 0.8, // Adjust the quality as needed (0.0 to 1.0)
        });

      //const base64Data = await RNFS.readFile(compressedImageUri, 'base64');
      const base64Data = result.assets[0].base64;
      setImageForUpload(imageUri, uploadType);
      await uploadBase64ToBackend(base64Data, uploadType);
    } catch (error) {
      console.log('Error in handleCameraLaunch:', error);
    } finally {
      //setLoading(false);
    }
  };

  const handleGalleryLaunch = async uploadType => {
    //setLoading(true);
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
      maxWidth: 1080,
      maxHeight: 1080,
    };

    try {
      const result = await launchImageLibrary(options);
      const imageUri = result.assets[0].uri; // Ensure to use .uri
      const compressedImageUri = await CompressorImage.compress(imageUri, {
          compressionMethod: 'auto',
          quality: 0.8, // Adjust the quality as needed (0.0 to 1.0)
      });
      const base64Data = result.assets[0].base64;
      //const base64Data = await RNFS.readFile(compressedImageUri, 'base64');
      setImageForUpload(imageUri, uploadType);
      await uploadBase64ToBackend(base64Data, uploadType);
    } catch (error) {
      console.log('Error in handleGalleryLaunch:', error);
    } finally {
      //setLoading(false);
    }
  };
  const setImageForUpload = (imageUri, uploadType) => {
    switch (uploadType) {
      case 'pan':
        setPanCardImage({ uri: imageUri });
        break;
      case 'front':
        setAadharFrontImage({uri :imageUri});
        break;
      case 'back':
        setAadharBackImage({ uri: imageUri });
        break;
      case 'rcimage':
        setRcImage({ uri: imageUri });
        break;
      default:
        // Handle other cases or throw an error if necessary
        break;
    }
  };
  const uploadBase64ToBackend = async (base64Data, uploadType) => {
    setUploadingImage(true);
    try {
      const buffer = Buffer.from(base64Data, 'base64');
      const response = await axios.post('https://backendforpnf.vercel.app/fileUploadb', buffer, {
        headers: {
            'Content-Type': 'application/octet-stream',
        },
      });
      console.log(`Server response (${uploadType}):`, response.data);
      const {
        msg: {files: uploadedFiles, success},
      } = response.data;
      switch (uploadType) {
        case 'pan':
          setPanFiles(uploadedFiles);
          break;
        case 'front':
          setFrontFiles(uploadedFiles);
          break;
        case 'back':
          setBackFiles(uploadedFiles);
          break;
        case 'rcimage':
          setRcImageFiles(uploadedFiles);
          break;
        default:
          // If uploadType doesn't match any case, do nothing
          break;
      }
      setUploadingImage(false);
    } catch (error) {
      console.log('Error in uploadBase64ToBackend:', error);
    }
  };

  const togglePersonalInfoCollapse = () => {
    setPersonalInfoCollapsed(!personalInfoCollapsed);
  };
  const toggleKycDocumentsCollapse = () => {
    setKycDocumentsCollapsed(!kycDocumentsCollapsed);
  };
  const toggleHouseDetailsCollapse =  () => {
    setHousedetails(!housedetails);
  };
  const handleHouseUrlChange = url => {
    setHouseUrl(url);
    validateUrl(url);
  };
  const validateUrl = url => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    setValidUrl(pattern.test(url));
  };
  const showInstructions = () => {
    setInstructionsVisible(!instructionsVisible);
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({label: i.toString(), value: i.toString()});
    }
    return days;
  };

  const renderMonths = () => {
    const months = [
      {label: 'January', value: '01'},
      {label: 'February', value: '02'},
      {label: 'March', value: '03'},
      {label: 'April', value: '04'},
      {label: 'May', value: '05'},
      {label: 'June', value: '06'},
      {label: 'July', value: '07'},
      {label: 'August', value: '08'},
      {label: 'September', value: '09'},
      {label: 'October', value: '10'},
      {label: 'November', value: '11'},
      {label: 'December', value: '12'},
    ];
    return months;
  };

  const renderYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push({label: i.toString(), value: i.toString()});
    }
    return years;
  };

  return (
    <View style={styles.container}>
      {uploadingImage && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </Modal>
      )}
      <Text style={styles.title}>
        {t('title')} {loanType === 'tyre' ? t('tire') : t('insurance')}{' '}
        {t('loan')}
      </Text>
      {!showPersonalInfo ? (
        <View style={styles.formContainer}>
          {loanType !== 'insurance' && (
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
                      setErrorMessage('');
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
              {isLoadingBrandProducts ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                brandProducts.length > 0 && (
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>{t('Brand Products')}</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedProduct}
                        onValueChange={itemValue => {
                          setSelectedProduct(itemValue);
                          setErrorMessage('');
                        }}
                        style={styles.picker}
                        dropdownIconColor="black">
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
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <Text style={styles.submitButtonText}>{t('next')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={toggleKycDocumentsCollapse}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{t('uploadkycdocuments')}</Text>
              <Icon
                name={kycDocumentsCollapsed ? 'chevron-right' : 'chevron-down'}
                size={20}
                color="#9ca3af"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={  kycDocumentsCollapsed}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('pancard')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              {panCardImage && (
                <View style={styles.panCardContainer}>
                  <Image
                    source={{uri: panCardImage.uri}}
                    style={styles.panCardImage}
                  />
                </View>
              )}
              {!upload &&
              <TouchableOpacity style={[styles.uploadButton,{width:70}]} onPress={handleUpload}>
              <Text style={styles.uploadText}>{t('attach')}</Text>
              </TouchableOpacity>
              }
              {upload && (
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity
                    style={[styles.uploadButton]}
                    onPress={() => handleCameraLaunch('pan')}>
                    <Text style={styles.uploadButtonText}>
                      {t('takeaphoto')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.uploadButton]}
                    onPress={() => handleGalleryLaunch('pan')}>
                    <Text style={styles.uploadButtonText}>
                      {t('choosefromgallery')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={{flexDirection: 'row', gap: 20}}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  {t('aadharfront')}
                  <Text style={{color: 'red', marginLeft: 5}}>*</Text>
                </Text>
                {aadharFrontImage && (
                  <View style={styles.panCardContainer}>
                    <Image
                      source={{uri: aadharFrontImage.uri}}
                      style={styles.panCardImage}
                      resizeMode="contain"
                    />
                  </View>
                )}
                {!fupload && (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => {
                      setFupload(true);
                      setErrorforpersonal('');
                    }}>
                    <Text style={styles.uploadText}>{t('Attach')}</Text>
                  </TouchableOpacity>
                )}
                {fupload && (
                  <View style={{flexDirection: 'column', gap: 10}}>
                    <TouchableOpacity
                      style={[styles.uploadButton]}
                      onPress={() => handleCameraLaunch('front')}>
                      <Text style={styles.uploadButtonText}>
                        {t('takeaphoto')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.uploadButton]}
                      onPress={() => handleGalleryLaunch('front')}>
                      <Text style={styles.uploadButtonText}>
                        {t('choosefromgallery')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>
                  {t('aadharback')}
                  <Text style={{color: 'red', marginLeft: 5}}>*</Text>
                </Text>
                {aadharBackImage && (
                  <View style={styles.panCardContainer}>
                    <Image
                      source={{uri: aadharBackImage.uri}}
                      style={styles.panCardImage}
                      resizeMode="contain"
                    />
                  </View>
                )}
                {!bupload && (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => {
                      setBupload(true);
                      setErrorforpersonal('');
                    }}>
                    <Text style={styles.uploadText}>{t('Attach')}</Text>
                  </TouchableOpacity>
                )}
                {bupload && (
                  <View style={{flexDirection: 'column', gap: 10}}>
                    <TouchableOpacity
                      style={[styles.uploadButton]}
                      onPress={() => handleCameraLaunch('back')}>
                      <Text style={styles.uploadButtonText}>
                        {t('takeaphoto')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.uploadButton]}
                      onPress={() => handleGalleryLaunch('back')}>
                      <Text style={styles.uploadButtonText}>
                        {t('choosefromgallery')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </Collapsible>
          <TouchableOpacity onPress={togglePersonalInfoCollapse}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{t('fillpersonaldetails')}</Text>
              <Icon
                name={personalInfoCollapsed ? 'chevron-right' : 'chevron-down'}
                size={20}
                color="#9ca3af"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>

          <Collapsible collapsed={personalInfoCollapsed}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('name')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t('entername')}
                placeholderTextColor="black"
                value={name}
                onChangeText={text => {
                  setName(text);
                  setErrorforpersonal('');
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                Date of Birth
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <View style={styles.dobInputContainer}>
                {/* Day Picker */}
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.inputContainer}>
                    <Picker
                      selectedValue={dobDay}
                      style={{
                        fontSize: 10,
                        textAlign: 'center',
                        justifyContent: 'center',
                        color: 'black',
                      }}
                      onValueChange={itemValue => setDOBDay(itemValue)}
                      dropdownIconColor="black"
                      itemStyle={{padding: 0, backgroundColor: 'yellow'}}
                      mode="dropdown">
                      <Picker.Item
                        label="DD"
                        value="DD"
                        style={{fontSize: 15, color: 'black'}}
                      />
                      {renderDays().map((day, index) => (
                        <Picker.Item
                          key={index}
                          label={day.label}
                          value={day.value}
                        />
                      ))}
                    </Picker>
                  </View>

                  {/* Month Picker */}
                  <View style={styles.inputContainer}>
                    <Picker
                      selectedValue={dobMonth}
                      style={{fontSize: 5, color: 'black'}}
                      onValueChange={itemValue => setDOBMonth(itemValue)}
                      dropdownIconColor="black"
                      itemStyle={{padding: 0, backgroundColor: 'yellow'}}
                      mode="dropdown">
                      <Picker.Item
                        label="MM"
                        value="MM"
                        style={{fontSize: 15, color: 'black'}}
                      />
                      {renderMonths().map((month, index) => (
                        <Picker.Item
                          key={index}
                          label={month.label}
                          value={month.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* Year Picker */}
                <View style={styles.inputContainer}>
                  <Picker
                    selectedValue={dobYear}
                    style={{fontSize: 5, color: 'black'}}
                    onValueChange={itemValue => setDOBYear(itemValue)}
                    dropdownIconColor="black"
                    itemStyle={{padding: 0, backgroundColor: 'yellow'}}
                    mode="dropdown">
                    <Picker.Item
                      label="YYYY"
                      value="YYYY"
                      style={{fontSize: 15, color: 'black'}}
                    />
                    {renderYears().map((year, index) => (
                      <Picker.Item
                        key={index}
                        label={year.label}
                        value={year.value}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('pan')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t('enterthepannumber')}
                placeholderTextColor="black"
                value={panNumber}
                //onChangeText={setPanNumber}
                onChangeText={text => {
                  if (text.length <= 10) {
                    setPanNumber(text);
                  } else {
                    setpanErrorMessage(t('panLengthError'));
                    return;
                  }
                  setErrorforpersonal('');
                }}
                keyboardType="default"
              />
              {panerrorMessage ? (
                <Text style={styles.errorMessage}>{panerrorMessage}</Text>
              ) : null}
              {
                panerrorMessage &&
                  setTimeout(() => {
                    setpanErrorMessage(null);
                  }, 5000) // Adjust the time as needed (5000 milliseconds = 5 seconds)
              }
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('confirmpan')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t('enterthepannumber')}
                placeholderTextColor="black"
                value={confpanNumber}
                //onChangeText={setPanNumber}
                //   onChangeText={(text) => {
                //     if (text.length <= 10) {
                //       setconfPanNumber(text);
                //       if (text !== panNumber) {
                //         setConfpanError(t('panmismatch'));
                //         return
                //       } else {
                //         setConfpanError(null);
                //       }
                //     } else {
                //       setConfpanError(t('panLengthError'));
                //     }

                //   }}
                //   onBlur={() => {
                //     if (confpanNumber !== panNumber) {
                //       setConfpanError(t('panmismatch'));
                //     } else {
                //       setConfpanError(null);
                //     }
                //   }}

                //   keyboardType='default'
                // />
                onChangeText={text => {
                  // if (text.length <= 10) {
                  setconfPanNumber(text);
                  setErrorforpersonal('');
                  // } else {
                  //   setConfpanError(t('panLengthError'));
                  // }
                }}
                onBlur={() => {
                  if (confpanNumber !== panNumber) {
                    setPanmismatch(t('panmismatch'));
                  } else {
                    setPanmismatch(null);
                  }
                }}
                onFocus={() => setPanmismatch('')}
                keyboardType="default"
              />
              {confpanError ? (
                <Text style={styles.errorMessage}>{confpanError}</Text>
              ) : null}
              {
                confpanError &&
                  setTimeout(() => {
                    setConfpanError(null);
                  }, 5000) // Adjust the time as needed (5000 milliseconds = 5 seconds)
              }

              {panmismatch ? (
                <Text style={styles.errorMessage}>{panmismatch}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('phonenumber')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              {panmismatch && (
                <Text style={styles.errorMessage}>
                  {t(
                    'Please correct the confirmation error above before editing this field',
                  )}
                </Text>
              )}
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Enter your mobile number"
                placeholderTextColor="black"
                value={
                  mobileNumber.startsWith('+91')
                    ? mobileNumber
                    : '+91' + mobileNumber
                }
                // onChangeText={(text) => {
                //   setMobileNumber(text.replace('+91', ''));
                // }}
                onChangeText={text => {
                  if (text.length <= 13) {
                    setMobileNumber(text.replace('+91', ''));
                    setphoneErrorMessage('');
                  } else {
                    setphoneErrorMessage(t('phoneerror'));
                    //setLoading(false);
                  }
                  setErrorforpersonal('');
                }}
                editable={!panmismatch}
              />
              {phoneerrorMessage ? (
                <Text style={styles.errorMessage}>{phoneerrorMessage}</Text>
              ) : null}
              {phoneerrorMessage &&
                setTimeout(() => {
                  setphoneErrorMessage(null);
                }, 3000)}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('altnumber')}</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder="Enter your alternate mobile number"
                placeholderTextColor="black"
                value={
                  alternateMobileNumber.startsWith('+91')
                    ? alternateMobileNumber
                    : '+91' + alternateMobileNumber
                }
                // onChangeText={(text) => {
                //   setAlternateMobileNumber(text.replace('+91', ''));
                // }}
                onChangeText={text => {
                  if (text.length <= 13) {
                    setAlternateMobileNumber(text.replace('+91', ''));
                    setAlternateError('');
                  } else {
                    setAlternateError(t('phoneerror'));
                    //setLoading(false);
                  }
                  setErrorforpersonal('');
                }}
              />
              {alternateError ? (
                <Text style={styles.errorMessage}>{alternateError}</Text>
              ) : null}
              {alternateError &&
                setTimeout(() => {
                  setAlternateError(null);
                }, 3000)}
            </View>
            {/* <View style={styles.formGroup}>
            <Text style={styles.label}>{t('nooftrucks')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              
              placeholder={t('enternooftrucks')}
              placeholderTextColor="black"
              value={numberOfTrucks}
              onChangeText={
                setNumberOfTrucks
              }
              
            />
          </View> */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('numofbusinessyers')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={t('enternoofyearsinbusiness')}
                placeholderTextColor="black"
                value={yearsInBusiness}
                onChangeText={text => {
                  setYearsInBusiness(text);
                  setErrorforpersonal('');
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('monthlyemi')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={t('entermontlyemifloe')}
                placeholderTextColor="black"
                value={monthlyEmiOutflow}
                onChangeText={text => {
                  setMonthlyEmiOutflow(text);
                  setErrorforpersonal('');
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('maritalstatus')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={maritalStatus}
                  onValueChange={itemValue => {
                    setMaritalStatus(itemValue);
                    setErrorforpersonal('');
                  }}
                  style={styles.picker}
                  dropdownIconColor="black">
                  <Picker.Item
                    label={t('selectMaritalStatus')}
                    value="Select Marital Status"
                    enabled={false}
                  />
                  <Picker.Item label={t('married')} value="Married" />
                  <Picker.Item label={t('single')} value="Single" />
                </Picker>
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('numchildren')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={t('Enterthenoofchildren')}
                placeholderTextColor="black"
                value={numberOfChildren}
                onChangeText={text => {
                  setNumberOfChildren(text);
                  setErrorforpersonal('');
                }}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('housetype')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={houseType}
                  onValueChange={itemValue => {
                    setHouseType(itemValue);
                    setErrorforpersonal('');
                  }}
                  style={styles.picker}
                  dropdownIconColor="black">
                  <Picker.Item
                    label={t('selectHouseType')}
                    value="Select House Type"
                    enabled={false}
                  />
                  <Picker.Item label={t('owned')} value="Owned" />
                  <Picker.Item label={t('rented')} value="Rented" />
                </Picker>
              </View>
            </View>
            {/* <View style={styles.formGroup}>
            <Text style={styles.label}>{t('trucknum')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={t('entertrucknumber')}
              placeholderTextColor="black"
              value={truckNumber}
              onChangeText={setTruckNumber}
            />
          </View> */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('driverSalary')}</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={t('enterdriversalary')}
                placeholderTextColor="black"
                value={driverSalary}
                onChangeText={text => {
                  setDriverSalary(text);
                  setErrorforpersonal('');
                }}
              />
            </View>
          </Collapsible>
          <TouchableOpacity onPress={toggleHouseDetailsCollapse}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{t('truckdetails')}</Text>
              <Icon
                name={housedetails ? 'chevron-right' : 'chevron-down'}
                size={20}
                color="#9ca3af"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={housedetails}>
            {/* <View style={styles.formGroup}>
            <Text style={styles.label}>{t('nooftrucks')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              
              placeholder={t('enternooftrucks')}
              placeholderTextColor="black"
              value={numberOfTrucks}
              onChangeText={
                setNumberOfTrucks
              }
              
            />
      </View> */}
            {/* <View style={styles.formGroup}>
              <Text style={styles.label}>{t('RCNumber')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <TextInput
               style={styles.input}
                placeholder={t('enterRCNumber')}
                placeholderTextColor="black"
                keyboardType="default"
                onChangeText={(text) => setRCNumber(text)}
                value={rcNumber}
              />
         </View> */}

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('trucknum')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t('entertrucknumber')}
                placeholderTextColor="black"
                value={truckNumber}
                onChangeText={text => {
                  setTruckNumber(text);
                  setErrorforpersonal('');
                }}
              />
              {/* {trucknumbererror ? <Text style={styles.errorMessage}>{trucknumbererror}</Text> : null}
             {trucknumbererror && (
              setTimeout(()=>{
                setTrucknumbererror(null)
              }, 3000)
             )} */}
            </View>
            {/* <View style={styles.formGroup}>
            <Text style={styles.label}>{t('RCNumber')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder={t('enterRCNumber')}
              placeholderTextColor="black"
              onChangeText={(text) => setRCNumber(text)}
                value={rcNumber}
            />
          </View> */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {t('rcImage')}
                <Text style={{color: 'red', marginLeft: 5}}>*</Text>
              </Text>
              {rcImage && (
                <View style={styles.panCardContainer}>
                  <Image
                    source={{uri: rcImage.uri}}
                    style={styles.panCardImage}
                  />
                </View>
              )}
              {!rupload && (
                <TouchableOpacity
                  style={[styles.uploadButton,,{width:70}]}
                  onPress={() => {
                    setRupload(true);
                    setErrorforpersonal('');
                  }}>
                  <Text style={[styles.uploadText]}>{t('Attach')}</Text>
                </TouchableOpacity>
              )}
              {rupload && (
                <View style={{flexDirection: 'row', gap: 10}}>
                  <TouchableOpacity
                    style={[styles.uploadButton]}
                    onPress={() => {handleCameraLaunch('rcimage')
                    }}>
                    <Text style={styles.uploadButtonText}>
                      {t('takeaphoto')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.uploadButton]}
                    onPress={() => handleGalleryLaunch('rcimage')}>
                    <Text style={styles.uploadButtonText}>
                      {t('choosefromgallery')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Collapsible>
          {errorforpersonal ? (
            <Text style={styles.errorMessage}>{errorforpersonal}</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <Text style={[styles.submitButtonText]}>
                {t('submitapplication')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>{t('footer')}</Text>
      </View>
    </View>
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
    paddingTop: 20,
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
  },
  picker: {
    height: 55,
    width: '100%',
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#3c82f6',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '70%', // Adjusted width
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16, // Adjust the margin as needed
  },
  uploadButton: {
    backgroundColor: 'lightgrey',
    padding: 8,
    borderRadius: 5,
    width: '50',
  },
  uploadText: {
    fontSize: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 5,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {
    marginLeft: 10,
  },
  // dobInputContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  dobInput: {
    flex: 1,
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 200,
  },
  dayItem: {
    paddingVertical: 10,
    fontWeight: '500',
  },
  dayItemText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
  closeButtonText: {
    color: 'red',
    fontSize: 18,
  },
  dobInputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 115,
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 2,
    overflow: 'hidden',
    width: '50%',
    marginBottom: 5,
    justifyContent: 'center',
  },
  inputp: {
    flex: 1,
    dobInputContainer: {
      flexDirection: 'row', // Changed to row to align pickers horizontally
      justifyContent: 'space-between',
      height: 120, // Adjusted height to accommodate all pickers
      flexWrap: 'wrap',
      overflow: 'hidden',
    },
    inputContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginHorizontal: 2,
      overflow: 'hidden',
      marginBottom: 5,
      justifyContent: 'center',
      height: 120, // Added to ensure all pickers have the same height
    },
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerInput: {
    flex: 1,
    fontSize: 5,
  },
  instructionsLink: {
    color: 'blue',
  },
  instructionsContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: 14,
  },
  invalidInput: {
    borderColor: 'red',
  },
});

export default NewApplication;
// import React, {useState, useEffect, useCallback} from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity,ActivityIndicator,Image,Modal,FlatList,LayoutAnimation, } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';
// import Toast from 'react-native-toast-message';
// import { useNavigation } from '@react-navigation/native';
// import { selectMobileNumber } from '../../redux/slices/authSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import ImagePicker from 'react-native-image-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import Collapsible from 'react-native-collapsible';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { setSubmitting } from '../../redux/slices/authSlice';


// const NewApplication = ({ loanType, showPersonalInfo, setShowPersonalInfo}) => {
      
//       const {t} = useTranslation();
//       const dispatch = useDispatch();
//       const navigation = useNavigation();
//       const userMobileNumber = useSelector(selectMobileNumber);
//       const [dealerData, setDealerData] = useState(null);
//       const [numberOfTires, setNumberOfTires] = useState('');
//       const [selectedBrand, setSelectedBrand] = useState('');
//       const [loanAmount, setLoanAmount] = useState('');
//       const [name, setName] = useState('');
//       const [panNumber, setPanNumber] = useState('');
//       const [confpanNumber, setconfPanNumber] = useState('');
//       const [mobileNumber, setMobileNumber] = useState('');
//       const [alternateMobileNumber, setAlternateMobileNumber] = useState('');
//       const [numberOfTrucks, setNumberOfTrucks] = useState('');
//       const [yearsInBusiness, setYearsInBusiness] = useState('');
//       const [monthlyEmiOutflow, setMonthlyEmiOutflow] = useState('');
//       const [maritalStatus, setMaritalStatus] = useState('');
//       const [numberOfChildren, setNumberOfChildren] = useState('');
//       const [houseType, setHouseType] = useState('');
//       const [truckNumber, setTruckNumber] = useState('');
//       const [driverSalary, setDriverSalary] = useState('');
//       const [isSubmitting, setIsSubmitting] = useState(false);
//       const [errorMessage, setErrorMessage] = useState('');
//       const [errorforpersonal, setErrorforpersonal] = useState('');
//       const [upload, setUpload] = useState(false);
//       const [fupload, setFupload] = useState(false);
//       const [bupload, setBupload] = useState(false);
//       const [rupload, setRupload] = useState(false);
//       const [panCardImage, setPanCardImage] = useState(null);
//       const [panFiles, setPanFiles] = useState([]);
//       const [frontFiles, setFrontFiles] = useState([]);
//       const [backFiles, setBackFiles] = useState([]);
//       const [aadharFrontImage, setAadharFrontImage] = useState(null);
//       const [aadharBackImage, setAadharBackImage] = useState(null);
//       const [uploadingImage, setUploadingImage] = useState(false);
//       const [personalInfoCollapsed, setPersonalInfoCollapsed] = useState(true);
//       const [kycDocumentsCollapsed, setKycDocumentsCollapsed] = useState(true);
//       const [housedetails, setHousedetails] = useState(true);
//       const [dobDay, setDOBDay] = useState('DD');
//       const [dobMonth, setDOBMonth] = useState('MM');
//       const [dobYear, setDOBYear] = useState('YYYY');
//       const [panerrorMessage, setpanErrorMessage] = useState('');
//       const [phoneerrorMessage, setphoneErrorMessage] = useState('');
//       const [alternateError, setAlternateError] = useState('');
//       const [confpanError, setConfpanError] = useState('');
//       const [panmismatch, setPanmismatch] = useState('');
//       //const [trucknumbererror, setTrucknumbererror] = useState('');
//       const [selectedProduct, setSelectedProduct] = useState('');
//       const [brandProducts, setBrandProducts] = useState([]);
//       const [rcImage, setRcImage] = useState(null); 
//       const [isLoadingBrandProducts, setIsLoadingBrandProducts] = useState(false);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const modifiedMobileNumber = userMobileNumber.length > 10 ? userMobileNumber.slice(-10) : userMobileNumber;
//         const response = await axios.get(`https://backendforpnf.vercel.app/dealers?criteria=sheet_44481612.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`);
//         const dealer = response.data.data[0];
//         //console.log("dealerData", dealer)
//         //console.log(dealer)
//         setDealerData(dealer);
        
//       } catch (error) {
//         console.error('Error fetching dealer data:', error);
//         setDealerData(null);
        
//       }
//     };

//     fetchData();
//   }, [userMobileNumber]);

//   const fetchBrandProducts = async itemValue => {
//     try {
//       setIsLoadingBrandProducts(true);
//       const response = await axios.get(
//         `https://backendforpnf.vercel.app/brandproducts`,
//         {
//           headers: {
//             'Cache-Control': 'no-cache', // Add Cache-Control header here
//           },
//         },
//       );
//       //const response = await axios.get(`https://3974-2409-40f0-102b-6b83-ac69-bca7-301b-f373.ngrok-free.app/brandproducts`);
//       const filteredBrandProducts = response.data.data.filter(
//         product => product.Brand === itemValue,
//       );
//       setBrandProducts(filteredBrandProducts);
//       setIsLoadingBrandProducts(false);
//       console.log(filteredBrandProducts);
//     } catch (error) {
//       console.error('Error fetching brand products:', error.message);
//     }
//   };
//   const handleNext = () => {
//     // Perform validation checks
//     if (
//       (loanType === 'insurance' && !loanAmount) ||
//       (loanType === 'tyre' && (!numberOfTires || !selectedBrand || !loanAmount))
//     ) {
//       console.log('Validation failed');
//       setErrorMessage(t('pleasefillinsurancefeilds'));
//       return;
//     } else {
//       console.log('Validation passed');
//       setErrorMessage('');
//     }
//     setShowPersonalInfo(true);
//   };
  
//    const sourcerefid = dealerData?.record_id || null;
//    const source = dealerData?.dealer || null;
//    console.log(sourcerefid, source);

//   const handleSubmit = async () => {
//     try {
//       const dob = `${dobDay}/${dobMonth}/${dobYear}`;
//       if (
//         name.trim() === '' ||
//         panNumber.trim() === '' ||
//         mobileNumber.trim() === '' ||
//         numberOfTrucks.trim() === '' ||
//         yearsInBusiness.trim() === '' ||
//         monthlyEmiOutflow.trim() === '' ||
//         numberOfChildren.trim() === '' ||
//         truckNumber.trim() === '' ||
//         driverSalary.trim() === '' || 
//         panFiles.length === 0 ||
//         frontFiles.length === 0 ||
//         backFiles.length === 0 ||
//         dob.trim() === '' ||
//         !dobDay ||
//         !dobMonth ||
//         !dobYear ||
//         dobDay === '00' ||
//         dobMonth === '00' ||
//         dobYear === '0000'
//       ) {
//         setErrorforpersonal(t('pleasefillinsurancefeilds'));
//         return;
//     }
//         setIsSubmitting(true);
//         const sourcerefid = dealerData?.record_id || null;
//         const source = dealerData?.dealer || null;
//         //console.log(sourcerefid, source);
//         //const dob = `${dobDay}/${dobMonth}/${dobYear}`;
//         //console.log(dob);
//     const currentDate = new Date().toISOString().split('T')[0];
//     const response = await axios.post(`https://backendforpnf.vercel.app/create`, {
//         numberOfTires: numberOfTires || null,
//         selectedBrand: selectedBrand || null,
//         loanAmount: loanAmount || null,
//         FullName: name || null,
//         PanNumber: panNumber || null,
//         mobilenumber: `+91${mobileNumber}` || null,
//         AlternateMobileNumber: `+91${alternateMobileNumber}` || null,
//         martialStatus: maritalStatus || null,
//         numchildren: numberOfChildren || null,
//         houseType: houseType || null,
//         monthlyEMIOutflow: monthlyEmiOutflow || null,
//         noofyearsinbusiness: yearsInBusiness || null,
//         driverSalary: driverSalary || null,
//         truckNumber: truckNumber || null,
//         NoOfTrucks: numberOfTrucks || null,
//         date: currentDate || null,
//         source,
//         sourcerefid,
//         loanType: loanType === 'tyre' ? 'Tyre Loan' : 'Insurance Loan',
//         oldornew:'New',
//         pancard:panFiles,
//         aadharfront:frontFiles,
//         aadharback:backFiles,
//         dob: dob || null,
//         confpanNumber
//       });
  
//       console.log('Server response:', response.data);
//       setIsSubmitting(false);
//       dispatch(setSubmitting(true));
//       Toast.show({
//         type: 'success',
//         position: 'bottom',
//         text1:t('submittext1'),
//         text2: t('submittext2'),
//         visibilityTime: 3000,
//         autoHide: true,
//         topOffset: 30,
//         bottomOffset: 40,
//       });
//       // Navigate to Start screen
//       navigation.navigate('Start');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
//   const handleUpload = () => {
//     setUpload(!upload);
//     setErrorforpersonal('');
//   };
//   const handleCameraLaunch = async (uploadType) => {
//     //setLoading(true);
//     //setUploadingImage(true);
//     const options = {
//       mediaType: 'photo',
//       selectionLimit: 1,
//       includeBase64: true
//     };
//     try {
//       const result = await launchCamera(options);
//       const base64Data = result.assets[0].base64;
//       //console.log("response", result.assets[0]);
//       const imageUri = result.assets[0];
//       setImageForUpload(imageUri, uploadType);
//       await uploadBase64ToBackend(base64Data, uploadType);
//     } catch (error) {
//       console.log('Error in handleCameraLaunch:', error);
//     } finally {
//       //setLoading(false);
//     }
//   };

//   const handleGalleryLaunch = async (uploadType) => {
//     //setLoading(true);
//     const options = {
//       mediaType: 'photo',
//       selectionLimit: 1,
//       includeBase64: true
//     };

//     try {
//       const result = await launchImageLibrary(options);
//       const base64Data = result.assets[0].base64;
//       const imageUri = result.assets[0];
//       setImageForUpload(imageUri, uploadType);
//       await uploadBase64ToBackend(base64Data, uploadType);
//     } catch (error) {
//       console.log('Error in handleGalleryLaunch:', error);
//     } finally {
//       //setLoading(false);
//     }
//   };
//   const setImageForUpload = (imageUri, uploadType) => {
//     switch (uploadType) {
//       case 'pan':
//         setPanCardImage(imageUri);
//         break;
//       case 'front':
//         setAadharFrontImage(imageUri);
//         break;
//       case 'back':
//         setAadharBackImage(imageUri);
//         break;
//       default:
//         // Handle other cases or throw an error if necessary
//         break;
//     }
//   };
//   const uploadBase64ToBackend = async (base64Data, uploadType) => {
//     try {
//       setUploadingImage(true);
//       const response = await axios.post('https://backendforpnf.vercel.app/fileUpload', { base64Data }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log(`Server response (${uploadType}):`, response.data);
//       const { msg: { files: uploadedFiles, success } } = response.data;
//       switch (uploadType) {
//         case 'pan':
//           setPanFiles(uploadedFiles);
//           break;
//         case 'front':
//           setFrontFiles(uploadedFiles);
//           break;
//         case 'back':
//           setBackFiles(uploadedFiles);
//           break;
//         default:
//           // If uploadType doesn't match any case, do nothing
//           break;
//       }
//       setUploadingImage(false);
//     } catch (error) {
//       console.log('Error in uploadBase64ToBackend:', error);
//     }
//   };

//   const togglePersonalInfoCollapse = () => {
//     setPersonalInfoCollapsed(!personalInfoCollapsed);
//   };
//   const toggleKycDocumentsCollapse = () => {
//     setKycDocumentsCollapsed(!kycDocumentsCollapsed);
//   };

// const renderDays = () => {
//   const days = [];
//   for (let i = 1; i <= 31; i++) {
//     days.push({label: i.toString(), value: i.toString()});
//   }
//   return days;
// };
// const renderMonths = () => {
//   const months = [
//     {label: 'January', value: '01'},
//     {label: 'February', value: '02'},
//     {label: 'March', value: '03'},
//     {label: 'April', value: '04'},
//     {label: 'May', value: '05'},
//     {label: 'June', value: '06'},
//     {label: 'July', value: '07'},
//     {label: 'August', value: '08'},
//     {label: 'September', value: '09'},
//     {label: 'October', value: '10'},
//     {label: 'November', value: '11'},
//     {label: 'December', value: '12'},
//   ];
//   return months;
// };

//   const renderYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 100; i--) {
//       years.push({label: i.toString(), value: i.toString()});
//     }
//     return years;
//   };

//   return (
//     <View style={styles.container}>
//     {uploadingImage && (
//         <Modal transparent={true} animationType='fade'>
//           <View style={styles.modalContainer}>
//             <ActivityIndicator size="large" color="blue" />
//           </View>
//         </Modal>
//       )}
//       <Text style={styles.title}>
//         {t('title')} {loanType === 'tyre' ? t('tire') : t('insurance')} {t('loan')}
//       </Text>
//       {!showPersonalInfo ? (
//         <View style={styles.formContainer}>
//           {loanType !== 'insurance' && (
//             <>
//               <View style={styles.formGroup}>
//               <Text style={styles.label}>{t('numtire')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//               <TextInput
//                 style={styles.input}
//                 keyboardType="phone-pad"
//                 placeholder={t('numtireplace')}
//                 placeholderTextColor="black"
//                 autoCapitalize="none"
//                 value={numberOfTires}
//                 onChangeText={text => {
//                   setNumberOfTires(text);
//                   setErrorMessage('');
//                 }}
//               />
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>{t('brandoftire')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={selectedBrand}
//                   onValueChange={itemValue => {
//                     setSelectedBrand(itemValue);
//                     fetchBrandProducts(itemValue);
//                     setErrorMessage('');
//                   }}
//                   style={styles.picker} 
//                   dropdownIconColor='black'
//                 >
//                   <Picker.Item label={t('selectbrand')} value="Select the brand" enabled={false}/>
//                   <Picker.Item label={t('ceat')} value="CEAT" />
//                   <Picker.Item label={t('mrf')} value="MRF" />
//                   <Picker.Item label={t('apollo')} value="Apollo" />
//                   <Picker.Item label={t('others')} value="others" />
//                 </Picker>
//               </View>
//             </View>
//             {isLoadingBrandProducts ? (
//                 <ActivityIndicator size="small" color="#0000ff" />
//               ) : (
//                 brandProducts.length > 0 && (
//                   <View style={styles.formGroup}>
//                     <Text style={styles.label}>{t('Brand Products')}</Text>
//                     <View style={styles.pickerContainer}>
//                       <Picker
//                         selectedValue={selectedProduct}
//                         onValueChange={itemValue => {
//                           setSelectedProduct(itemValue);
//                           setErrorMessage('');
//                         }}
//                         style={styles.picker}
//                         dropdownIconColor="black">
//                         <Picker.Item
//                           label={t('Select the Product')}
//                           value=""
//                           enabled={false}
//                         />
//                         {brandProducts.map((product, index) => (
//                           <Picker.Item
//                             key={index}
//                             label={product.Product}
//                             value={product.Product}
//                           />
//                         ))}
//                       </Picker>
//                     </View>
//                   </View>
//                 )
//               )}
//           </>
//         )}

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>{t('loanamount')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="phone-pad"
//             placeholder={t('loanamountplace')}
//             placeholderTextColor="black"
//             autoCapitalize="none"
//             value={loanAmount}
//             onChangeText={text => {
//               setLoanAmount(text);
//               setErrorMessage('');
//             }}
//           />
//         </View>
//         {errorMessage ? (
//               <Text style={styles.errorMessage}>{errorMessage}</Text>
//             ) : null}
//           <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
//             <Text style={styles.submitButtonText}>{t('next')}</Text>
//           </TouchableOpacity>
//         </View>
        
//       ) : (
//         <View style={styles.formContainer}>
//            <TouchableOpacity onPress={toggleKycDocumentsCollapse}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>{t('uploadkycdocuments')}</Text>
//                     <Icon
//                         name={kycDocumentsCollapsed ? 'chevron-right' : 'chevron-down'}
//                         size={20}
//                         color="#9ca3af"
//                         style={styles.icon}
//                     />
//                 </View>
//             </TouchableOpacity>
//           <Collapsible collapsed={kycDocumentsCollapsed}>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('pancard')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             {panCardImage && (
//               <View style={styles.panCardContainer}>
//                 <Image source={{ uri: panCardImage.uri }} style={styles.panCardImage} />
//               </View>
//             )}
//               {!upload &&
//               <TouchableOpacity style={[styles.uploadButton,{width:70}]} onPress={handleUpload}>
//               <Text style={styles.uploadText}>{t('attach')}</Text>
//               </TouchableOpacity>
//               }
//               {upload &&
//               <View style={{flexDirection:'row', gap:10}}>
//               <TouchableOpacity style={[styles.uploadButton]} onPress={() => handleCameraLaunch('pan')}>
//               <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.uploadButton]}onPress={() => handleGalleryLaunch('pan')} >
//               <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
//               </TouchableOpacity>
//              </View>
//               }
            
//           </View>
//           <View style={{flexDirection:'row', gap:20}}> 
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('aadharfront')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             {aadharFrontImage && (
//               <View style={styles.panCardContainer}>
//                 <Image 
//                 source={{ uri: aadharFrontImage.uri }} 
//                 style={styles.panCardImage}
//                 resizeMode='contain' 
//                 />
//               </View>
//             )}
//             {!fupload &&
//               <TouchableOpacity style={styles.uploadButton} onPress={()=>setFupload(true)}>
//               <Text style={styles.uploadText}>{t('attach')}</Text>
//               </TouchableOpacity>
//               }
//               {fupload &&
//               <View style={{flexDirection:'column', gap:10}}>
//               <TouchableOpacity style={[styles.uploadButton]} onPress={ () => handleCameraLaunch('front')}>
//               <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.uploadButton]}onPress={() => handleGalleryLaunch('front')} >
//               <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
//               </TouchableOpacity>
//              </View>
//               }
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('aadharback')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             {aadharBackImage && (
//               <View style={styles.panCardContainer}>
//                 <Image 
//                 source={{ uri: aadharBackImage.uri }} 
//                 style={styles.panCardImage}
//                 resizeMode='contain' 
//                 />
//               </View>
//             )}
//             {!bupload &&
//               <TouchableOpacity style={styles.uploadButton} onPress={()=>setBupload(true)}>
//               <Text style={styles.uploadText}>{t('attach')}</Text>
//               </TouchableOpacity>
//               }
//               {bupload &&
//               <View style={{flexDirection:'column', gap:10}}>
//               <TouchableOpacity style={[styles.uploadButton]} onPress={()=>handleCameraLaunch('back')}>
//               <Text style={styles.uploadButtonText}>{t('takeaphoto')}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={[styles.uploadButton]} onPress={()=>handleGalleryLaunch('back')}>
//               <Text style={styles.uploadButtonText}>{t('choosefromgallery')}</Text>
//               </TouchableOpacity>
//              </View>
//               }
//           </View>
          
//           </View>
//           </Collapsible>
//           <TouchableOpacity onPress={togglePersonalInfoCollapse}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>{t('fillpersonaldetails')}</Text>
//                     <Icon
//                         name={personalInfoCollapsed ? 'chevron-right' : 'chevron-down'}
//                         size={20}
//                         color="#9ca3af"
//                         style={styles.icon}
//                     />
//                 </View>
//             </TouchableOpacity>
//         {/* <TouchableOpacity onPress={togglePersonalInfoCollapse}>
//           <Text style={{ fontSize: 20, fontWeight: '600', alignSelf:'center', marginBottom:10}}>
//             {t('personalinformation')}
//             </Text>
//         </TouchableOpacity> */}
         
//     <Collapsible collapsed={personalInfoCollapsed}>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('name')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               placeholder={t('entername')}
//               placeholderTextColor="black"
//               value={name}
//               onChangeText={text => {
//                 setName(text);
//                 setErrorforpersonal('');
//               }}
//             />
//           </View>
//           <View style={styles.formGroup}>
//               <Text style={styles.label}>
//                 Date of Birth
//                 <Text style={{color: 'red', marginLeft: 5}}>*</Text>
//               </Text>
//               <View style={styles.dobInputContainer}>
//                 {/* Day Picker */}
//                 <View style={{flexDirection: 'row'}}>
//                   <View style={styles.inputContainer}>
//                     <Picker
//                       selectedValue={dobDay}
//                       style={{
//                         fontSize: 10,
//                         textAlign: 'center',
//                         justifyContent: 'center',
//                         color: 'black',
//                       }}
//                       onValueChange={itemValue => setDOBDay(itemValue)}
//                       dropdownIconColor="black"
//                       itemStyle={{padding: 0, backgroundColor: 'yellow'}}
//                       mode="dropdown">
//                       <Picker.Item
//                         label="DD"
//                         value="DD"
//                         style={{fontSize: 15, color: 'black'}}
//                       />
//                       {renderDays().map((day, index) => (
//                         <Picker.Item
//                           key={index}
//                           label={day.label}
//                           value={day.value}
//                         />
//                       ))}
//                     </Picker>
//                   </View>

//                   {/* Month Picker */}
//                   <View style={styles.inputContainer}>
//                     <Picker
//                       selectedValue={dobMonth}
//                       style={{fontSize: 5, color: 'black'}}
//                       onValueChange={itemValue => setDOBMonth(itemValue)}
//                       dropdownIconColor="black"
//                       itemStyle={{padding: 0, backgroundColor: 'yellow'}}
//                       mode="dropdown">
//                       <Picker.Item
//                         label="MM"
//                         value="MM"
//                         style={{fontSize: 15, color: 'black'}}
//                       />
//                       {renderMonths().map((month, index) => (
//                         <Picker.Item
//                           key={index}
//                           label={month.label}
//                           value={month.value}
//                         />
//                       ))}
//                     </Picker>
//                   </View>
//                 </View>

//                 {/* Year Picker */}
//                 <View style={styles.inputContainer}>
//                   <Picker
//                     selectedValue={dobYear}
//                     style={{fontSize: 5, color: 'black'}}
//                     onValueChange={itemValue => setDOBYear(itemValue)}
//                     dropdownIconColor="black"
//                     itemStyle={{padding: 0, backgroundColor: 'yellow'}}
//                     mode="dropdown">
//                     <Picker.Item
//                       label="YYYY"
//                       value="YYYY"
//                       style={{fontSize: 15, color: 'black'}}
//                     />
//                     {renderYears().map((year, index) => (
//                       <Picker.Item
//                         key={index}
//                         label={year.label}
//                         value={year.value}
//                       />
//                     ))}
//                   </Picker>
//                 </View>
//               </View>
//             </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('pan')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               placeholder={t('enterthepannumber')}
//               placeholderTextColor="black"
//               value={panNumber}
//               //onChangeText={setPanNumber}
//               onChangeText={(text) => {
//                 if (text.length <= 10) {
//                   setPanNumber(text);
//                 } else {
//                   setpanErrorMessage(t('panLengthError'));
//                     // setLoading(false); // Stop loading
//                     return;
//                 }
//                 setErrorforpersonal('');
//               }}
              
//               keyboardType='default'
//             />
//             {panerrorMessage ? <Text style={styles.errorMessage}>{panerrorMessage}</Text> : null}
//             {panerrorMessage && (
//               setTimeout(() => {
//                 setpanErrorMessage(null);
//               }, 5000) // Adjust the time as needed (5000 milliseconds = 5 seconds)
//             )}
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('confirmpan')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               placeholder={t('enterthepannumber')}
//               placeholderTextColor="black"
//               value={confpanNumber}
              
//               //onChangeText={setPanNumber}
//             //   onChangeText={(text) => {
//             //     if (text.length <= 10) {
//             //       setconfPanNumber(text);
//             //       if (text !== panNumber) {
//             //         setConfpanError(t('panmismatch'));
//             //         return
//             //       } else {
//             //         setConfpanError(null);
//             //       }
//             //     } else {
//             //       setConfpanError(t('panLengthError'));
//             //     }
                
//             //   }}
//             //   onBlur={() => {
//             //     if (confpanNumber !== panNumber) {
//             //       setConfpanError(t('panmismatch'));
//             //     } else {
//             //       setConfpanError(null);
//             //     }
//             //   }}
              
//             //   keyboardType='default'
//             // />
//             onChangeText={(text) => {
//               setconfPanNumber(text);
//               setErrorforpersonal('');
//             }}
//             onBlur={() => {
//               if (confpanNumber !== panNumber) {
//                 setConfpanError(t('panmismatch'));
//               } else {
//                 setConfpanError(null);
//               }
//             }}
//               keyboardType='default'
//             />
//             {confpanError ? <Text style={styles.errorMessage}>{confpanError}</Text> : null}
//             {confpanError && (
//               setTimeout(() => {
//                 setConfpanError(null);
//               }, 5000) // Adjust the time as needed (5000 milliseconds = 5 seconds)
//             )}
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('phonenumber')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               keyboardType="phone-pad"
//               placeholder="Enter your mobile number"
//               placeholderTextColor="black"
//               value={(mobileNumber.startsWith('+91') ? mobileNumber : '+91' + mobileNumber)}
//               // onChangeText={(text) => {
//               //   setMobileNumber(text.replace('+91', ''));
//               // }}
//               onChangeText={(text) => {
//                 if (text.length <= 13) {
//                   setMobileNumber(text.replace('+91', ''));
//                   setphoneErrorMessage('');
//                 } else {
//                   setphoneErrorMessage(t('phoneerror'));
//                   //setLoading(false);
//                 }
//                 setErrorforpersonal('');
//               }}
              
//             />
//              {phoneerrorMessage ? <Text style={styles.errorMessage}>{phoneerrorMessage}</Text> : null}
//              {phoneerrorMessage && (
//               setTimeout(()=>{
//                 setphoneErrorMessage(null);
//               }, 3000)
//              )}
//           </View>
          
          
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('altnumber')}</Text>
//             <TextInput
//               style={styles.input}
//               keyboardType="phone-pad"
//               placeholder="Enter your alternate mobile number"
//               placeholderTextColor="black"
//               value={(alternateMobileNumber.startsWith('+91') ? alternateMobileNumber : '+91' + alternateMobileNumber)}
//               // onChangeText={(text) => {
//               //   setAlternateMobileNumber(text.replace('+91', ''));
//               // }}
//               onChangeText={(text) => {
//                 if (text.length <= 13) {
//                   setAlternateMobileNumber(text.replace('+91', ''));
//                   setAlternateError('');
//                 } else {
//                   setAlternateError(t('phoneerror'));
//                   //setLoading(false);
//                 }
//                 setErrorforpersonal('');
//               }}
              
//             />
//              {alternateError ? <Text style={styles.errorMessage}>{alternateError}</Text> : null}
//              {alternateError && (
//               setTimeout(()=>{
//                 setAlternateError(null)
//               }, 3000)
//              )}
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('numofbusinessyers')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               keyboardType="phone-pad"
//               placeholder={t('enternoofyearsinbusiness')}
//               placeholderTextColor="black"
//               value={yearsInBusiness}
//               onChangeText={text => {
//                 setYearsInBusiness(text);
//                 setErrorforpersonal('');
//               }}
//             />
//           </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('monthlyemi')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               keyboardType="phone-pad"
//               placeholder={t('entermontlyemifloe')}
//               placeholderTextColor="black"
//               value={monthlyEmiOutflow}
//               onChangeText={text => {
//                 setMonthlyEmiOutflow(text);
//                 setErrorforpersonal('');
//               }}
//             />
//           </View>
//           <View style={styles.formGroup}>
//                 <Text style={styles.label}>{t('maritalstatus')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//                 <View style={styles.pickerContainer}>
//                   <Picker
//                     selectedValue={selectedBrand}
//                     onValueChange={itemValue => {
//                       setMaritalStatus(itemValue);
//                       setErrorforpersonal('');
//                     }}
//                     style={styles.picker}
//                     dropdownIconColor='black'
//                   >
//                     <Picker.Item label={t('selectMaritalStatus')} value="Select Marital Status" enabled={false}/>
//                     <Picker.Item label={t('married')} value="Married" />
//                     <Picker.Item label={t('single')} value="Single" />
//                   </Picker>
//                 </View>
//               </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('numchildren')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               keyboardType="phone-pad"
//               placeholder={t('Enterthenoofchildren')}
//               placeholderTextColor="black"
//               value={numberOfChildren}
//               onChangeText={text => {
//                 setNumberOfChildren(text);
//                 setErrorforpersonal('');
//               }}
//             />
//           </View>
//           <View style={styles.formGroup}>
//                 <Text style={styles.label}>{t('housetype')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//                 <View style={styles.pickerContainer}>
//                   <Picker
//                     selectedValue={selectedBrand}
//                     onValueChange={itemValue => {
//                       setHouseType(itemValue);
//                       setErrorforpersonal('');
//                     }}
//                     style={styles.picker}
//                     dropdownIconColor='black'
//                   >
//                     <Picker.Item label={t('selectHouseType')} value="Select House Type" enabled={false}/>
//                     <Picker.Item label={t('owned')} value="Owned" />
//                     <Picker.Item label={t('rented')} value="Rented" />
//                   </Picker>
//                 </View>
//               </View>
//           <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('driverSalary')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               keyboardType="phone-pad"
//               placeholder={t('enterdriversalary')}
//               placeholderTextColor="black"
//               value={driverSalary}
//               onChangeText={text => {
//                 setDriverSalary(text);
//                 setErrorforpersonal('');
//               }}
//             />
//           </View>
//       </Collapsible>
//       <TouchableOpacity >
//             <View style={styles.header}>
//               <Text style={styles.headerText}>{t('truckdetails')}</Text>
//               <Icon
//                 name={housedetails ? 'chevron-right' : 'chevron-down'}
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </TouchableOpacity>
//           <Collapsible collapsed={housedetails}>
//           <View style={styles.formGroup}>
//               <Text style={styles.label}>
//                 {t('trucknum')}
//                 <Text style={{color: 'red', marginLeft: 5}}>*</Text>
//               </Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder={t('entertrucknumber')}
//                 placeholderTextColor="black"
//                 value={truckNumber}
//                 onChangeText={text => {
//                   setTruckNumber(text);
//                   setErrorforpersonal('');
//                 }}
//               />
//               {/* {trucknumbererror ? <Text style={styles.errorMessage}>{trucknumbererror}</Text> : null}
//              {trucknumbererror && (
//               setTimeout(()=>{
//                 setTrucknumbererror(null)
//               }, 3000)
//              )} */}
//             </View>
//             {/* <View style={styles.formGroup}>
//             <Text style={styles.label}>{t('RCNumber')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
//             <TextInput
//               style={styles.input}
//               placeholder={t('enterRCNumber')}
//               placeholderTextColor="black"
//               onChangeText={(text) => setRCNumber(text)}
//                 value={rcNumber}
//             />
//           </View> */}
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>
//                 {t('rcImage')}
//                 <Text style={{color: 'red', marginLeft: 5}}>*</Text>
//               </Text>
//               {rcImage && (
//                 <View style={styles.panCardContainer}>
//                   <Image
//                     source={{uri: rcImage.uri}}
//                     style={styles.panCardImage}
//                   />
//                 </View>
//               )}
//               {!rupload && (
//                 <TouchableOpacity
//                   style={styles.uploadButton}
//                   onPress={() => {
//                     setRupload(true);
//                     setErrorforpersonal('');
//                   }}>
//                   <Text style={styles.uploadText}>{t('Attach')}</Text>
//                 </TouchableOpacity>
//               )}
//               {rupload && (
//                 <View style={{flexDirection: 'row', gap: '10'}}>
//                   <TouchableOpacity
//                     style={[styles.uploadButton, {width: '', padding: '10'}]}
//                     onPress={() => handleCameraLaunch('rcimage')}>
//                     <Text style={styles.uploadButtonText}>
//                       {t('takeaphoto')}
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[styles.uploadButton, {width: '', padding: '10'}]}
//                     onPress={() => handleGalleryLaunch('rcimage')}>
//                     <Text style={styles.uploadButtonText}>
//                       {t('choosefromgallery')}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           </Collapsible>
     
//           {errorforpersonal ? (
//               <Text style={styles.errorMessage}>{errorforpersonal}</Text>
//             ) : null}
//           <TouchableOpacity style={[styles.submitButton]} onPress={handleSubmit} disabled={isSubmitting}>
//         {isSubmitting ? (
//           <ActivityIndicator color="#ffffff" size="small" />
//         ) : (
//           <Text style={[styles.submitButtonText]}>{t('submitapplication')}</Text>
//         )}
//       </TouchableOpacity>
//           </View>
        
        
//       )}

//         <View style={styles.bottom}>
//           <Text style={styles.bottomText}>
//             {t('footer')}
//           </Text>
//         </View> 
//     </View>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     marginTop: 20,
//     marginHorizontal: 20,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: '700',
//     marginBottom: 18,
//     color: 'black',
//   },
//   formContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 8,
//     padding: 30,
//     paddingTop: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 3,
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: 'black',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     borderRadius: 8,
//     padding: 10,
//     fontSize: 18,
//     color: 'black',
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#cccccc',
//     borderRadius: 8,
//     marginBottom: 8,
//     overflow: 'hidden',
//   },
//   picker: {
//     height: 55,
//     width: '100%',
//     color: 'black',
//   },
//   submitButton: {
//     backgroundColor: '#3c82f6',
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//     width: '70%', // Adjusted width
//   },

//   submitButtonText: {
//     color: '#ffffff',
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   bottom: {
//     marginTop: 40,
//   },
//   bottomText: {
//     fontSize: 18,
//     color: 'gray',
//   },
//   errorMessage: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16, // Adjust the margin as needed
//   },
//   uploadButton: {
//     backgroundColor: 'lightgrey',
//     padding: 5,
//     borderRadius: 5,
//     width: '50',
//   },
//   uploadText: {
//     fontSize: 12,
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'lightgrey',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 5,
//     marginRight: 5,
//   },
//   buttonText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   panCardContainer: {
//     marginTop: 10,
//   },

//   panCardImage: {
//     width: 80,
//     height: 50,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     padding: 20,
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   headerText: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   // dobInputContainer: {
//   //   flexDirection: 'row',
//   //   justifyContent: 'space-between',
//   // },
//   dobInput: {
//     flex: 1,
//     marginRight: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//     minWidth: 200,
//   },
//   dayItem: {
//     paddingVertical: 10,
//     fontWeight: '500',
//   },
//   dayItemText: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     padding: 10,
//     backgroundColor: 'transparent',
//   },
//   closeButtonText: {
//     color: 'red',
//     fontSize: 18,
//   },
//   dobInputContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: 115,
//     flexWrap: 'wrap',
//     overflow: 'hidden',
//   },
//   inputContainer: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginHorizontal: 2,
//     overflow: 'hidden',
//     width: '50%',
//     marginBottom: 5,
//     justifyContent: 'center',
//   },
//   inputp: {
//     flex: 1,
//     dobInputContainer: {
//       flexDirection: 'row', // Changed to row to align pickers horizontally
//       justifyContent: 'space-between',
//       height: 120, // Adjusted height to accommodate all pickers
//       flexWrap: 'wrap',
//       overflow: 'hidden',
//     },
//     inputContainer: {
//       flex: 1,
//       borderWidth: 1,
//       borderColor: '#ccc',
//       borderRadius: 5,
//       marginHorizontal: 2,
//       overflow: 'hidden',
//       marginBottom: 5,
//       justifyContent: 'center',
//       height: 120, // Added to ensure all pickers have the same height
//     },
//     height: 70,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pickerInput: {
//     flex: 1,
//     fontSize: 5,
//   },
//   instructionsLink: {
//     color: 'blue',
//   },
//   instructionsContainer: {
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//     marginBottom: 5,
//   },
//   instructionsText: {
//     fontSize: 14,
//   },
//   invalidInput: {
//     borderColor: 'red',
//   },
// });

// export default NewApplication;

