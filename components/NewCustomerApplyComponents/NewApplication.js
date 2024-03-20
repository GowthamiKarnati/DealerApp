// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// const NewApplication = ({loanType}) => {
//   const [numberOfTires, setNumberOfTires] = useState('');
//   const [selectedBrand, setSelectedBrand] = useState('');
//   const [loanAmount, setLoanAmount] = useState('');

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Apply for {loanType === 'tyre' ? 'Tyre' : 'Insurance'} Loan
//       </Text>
//       <View style={styles.formContainer}>
//       {loanType !== 'insurance' && (
//         <>
//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Number of Tyres Required</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="phone-pad"
//             placeholder="Enter number of tyres"
//             value={numberOfTires}
//             onChangeText={(text) => setNumberOfTires(text)}
//           />
//         </View>
//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Brand of Tyre</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedBrand}
//               onValueChange={(itemValue) => setSelectedBrand(itemValue)}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select the brand" value="" />
//               <Picker.Item label="CEAT" value="CEAT" />
//               <Picker.Item label="MRF" value="MRF" />
//               <Picker.Item label="Apollo" value="Apollo" />
//               <Picker.Item label="Others" value="Others" />
//             </Picker>
//           </View>
//         </View>
//         </>
//         )}
//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Loan Amount</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="phone-pad"
//             placeholder="Enter loan amount"
//             value={loanAmount}
//             onChangeText={(text) => setLoanAmount(text)}
//           />
//         </View>
      
//         <TouchableOpacity style={styles.submitButton}>
//           <Text style={styles.submitButtonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
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
//     height: 50,
//     width: '100%',
//     color: 'black',
//   },
//   submitButton: {
//     backgroundColor: '#3c82f6',
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//     width: '50%',
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
//   }
// });

// export default NewApplication;
import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { selectMobileNumber } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';

const NewApplication = ({ loanType }) => {

  const {t}=useTranslation();
  const navigation = useNavigation();
  const userMobileNumber = useSelector(selectMobileNumber);
  const [dealerData, setDealerData] = useState(null);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [numberOfTires, setNumberOfTires] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [name, setName] = useState('');
  const [panNumber, setPanNumber] = useState('');
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber = userMobileNumber.length > 10 ? userMobileNumber.slice(-10) : userMobileNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/dealers?criteria=sheet_44481612.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`);
        const dealer = response.data.data[0];
        console.log("dealerData", dealer)
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
    setShowPersonalInfo(true);
  };
   const sourcerefid = dealerData?.record_id || null;
   const source = dealerData?.dealer || null;
   console.log(sourcerefid, source);

  const handleSubmit = async () => {
    try {
      if ((!loanAmount) && loanType === 'insurance') {
        setErrorMessage(t('pleasefillinsurancefeilds'));
        return;
      } else if ((!numberOfTires || !selectedBrand || !loanAmount ) && loanType === 'tyre') {
        setErrorMessage(t('pleasefilltyrefeilds'));
        return;
      }
        setIsSubmitting(true);
        const sourcerefid = dealerData?.record_id || null;
        const source = dealerData?.dealer || null;
        console.log(sourcerefid, source);
        
    const currentDate = new Date().toISOString().split('T')[0];
    const response = await axios.post(`https://backendforpnf.vercel.app/create`, {
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
        oldornew:'New'
      });
  
      console.log('Server response:', response.data);
      setIsSubmitting(false);
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1:t('submittext1'),
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
  




  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('title')} {loanType === 'tyre' ? t('tire') : t('insurance')} {t('loan')}
      </Text>
      {!showPersonalInfo ? (
        <View style={styles.formContainer}>
          {loanType !== 'insurance' && (
            <>
              <View style={styles.formGroup}>
              <Text style={styles.label}>{t('numtire')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={t('numtireplace')}
                placeholderTextColor="black"
                autoCapitalize="none"
                value={numberOfTires}
                onChangeText={(text) => setNumberOfTires(text)}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{t('brandoftire')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedBrand}
                  onValueChange={(itemValue) => setSelectedBrand(itemValue)}
                  style={styles.picker} 
                  dropdownIconColor='black'
                >
                  <Picker.Item label={t('selectbrand')} value="Select the brand" enabled={false}/>
                  <Picker.Item label={t('ceat')} value="CEAT" />
                  <Picker.Item label={t('mrf')} value="MRF" />
                  <Picker.Item label={t('apollo')} value="Apollo" />
                  <Picker.Item label={t('others')} value="others" />
                </Picker>
              </View>
            </View>
          </>
        )}

        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('loanamount')}<Text style={{ color: 'red', marginLeft: 5 }}>*</Text></Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            placeholder={t('loanamountplace')}
            placeholderTextColor="black"
            autoCapitalize="none"
            value={loanAmount}
            onChangeText={(text) => setLoanAmount(text)}
          />
        </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleNext}>
            <Text style={styles.submitButtonText}>{t('next')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={{fontSize:20,fontWeight:'600', textAlign:'center'}}>{t('personalinformation')}</Text>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('name')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('entername')}
              placeholderTextColor="black"
              
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('pan')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enterthepannumber')}
              placeholderTextColor="black"
              value={panNumber}
              onChangeText={setPanNumber}
              keyboardType='default'
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('mobile')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Enter your mobile number"
              placeholderTextColor="black"
              value={(mobileNumber.startsWith('+91') ? mobileNumber : '+91' + mobileNumber)}
              onChangeText={(text) => {
                setMobileNumber(text.replace('+91', ''));
              }}
              
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('altnumber')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Enter your alternate mobile number"
              placeholderTextColor="black"
              value={(alternateMobileNumber.startsWith('+91') ? alternateMobileNumber : '+91' + alternateMobileNumber)}
              onChangeText={(text) => {
                setAlternateMobileNumber(text.replace('+91', ''));
              }}
              
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('nooftrucks')}</Text>
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
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('numofbusinessyers')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder={t('enternoofyearsinbusiness')}
              placeholderTextColor="black"
              value={yearsInBusiness}
              onChangeText={setYearsInBusiness}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('monthlyemi')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder={t('entermontlyemifloe')}
              placeholderTextColor="black"
              value={monthlyEmiOutflow}
              onChangeText={setMonthlyEmiOutflow}
            />
          </View>
          <View style={styles.formGroup}>
                <Text style={styles.label}>{t('maritalstatus')}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedBrand}
                    onValueChange={(itemValue) => setHouseType(itemValue)}
                    style={styles.picker}
                    dropdownIconColor='black'
                  >
                    <Picker.Item label={t('married')} value="Married" />
                    <Picker.Item label={t('single')} value="Single" />
                  </Picker>
                </View>
              </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('numchildren')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder={t('Enterthenoofchildren')}
              placeholderTextColor="black"
              value={numberOfChildren}
              onChangeText={setNumberOfChildren}
            />
          </View>
          <View style={styles.formGroup}>
                <Text style={styles.label}>{t('housetype')}</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedBrand}
                    onValueChange={(itemValue) => setMaritalStatus(itemValue)}
                    style={styles.picker}
                    dropdownIconColor='black'
                  >
                    <Picker.Item label={t('owned')} value="Owned" />
                    <Picker.Item label={t('rented')} value="Rented" />
                  </Picker>
                </View>
              </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('trucknum')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('entertrucknumber')}
              placeholderTextColor="black"
              value={truckNumber}
              onChangeText={setTruckNumber}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>{t('driverSalary')}</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              placeholder={t('enterdriversalary')}
              placeholderTextColor="black"
              value={driverSalary}
              onChangeText={setDriverSalary}
            />
          </View>
          {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : null}
          <View style={styles.buttonContainer}>
          <TouchableOpacity  onPress={()=>{setShowPersonalInfo(false)}}>
            <Text style={{fontSize:30, justifyContent:'center'}}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.submitButton]} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" size="small" />
        ) : (
          <Text style={[styles.submitButtonText]}>{t('submitapplication')}</Text>
        )}
      </TouchableOpacity>
          </View>
        </View>
        
      )}

        <View style={styles.bottom}>
          <Text style={styles.bottomText}>
            {t('footer')}
          </Text>
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
    height: 50,
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
  
});

export default NewApplication;

