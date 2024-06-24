import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TouchableHighlight,RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { selectMobileNumber,selectIsSubmitting } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import { setApplicationData, setSubmitting } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { BottomSheet } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
//import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import UpcomingEmiReports from './UpcomingEmiReports';

const Buttons = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userMobileNumber = useSelector(selectMobileNumber);
  const scrollViewRef = useRef(null);
  const isSubmitting = useSelector(selectIsSubmitting);
  //console.log(isSubmitting);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [loanType, setLoanType] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false); 
  const [refreshing, setRefreshing] = useState(false);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [emiData, setEmiData] = useState([]);
  const [emiLoading, setEmiLoading] = useState(true);
    const fetchEmiData = async () => {
      try {
        setEmiLoading(true);
        const modifiedMobileNumber =
      userMobileNumber.length > 10
        ? userMobileNumber.slice(-10)
        : userMobileNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_242.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`);
        const filteredData = response.data.data.filter(emi =>
          ['unpaid', 'bounced', 'WITH DEALER', 'clearing', 'to confirm', 'CHQ STOP'].includes(emi.status)
        );
        const statusPriority = {
          'bounced': 1,
          'clearing': 2,
          'CHQ STOP': 3,
          'unpaid': 4,
          'to confirm': 5,
          'WITH DEALER': 6,
        };

        filteredData.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
        setEmiData(filteredData);
      } catch (error) {
        console.error('Error fetching upcoming EMIs:', error);
      }finally {
        setEmiLoading(false); // Stop loading
      }
    };
 

    const fetchData = async () => {
      setLoading(true);
      try {
        let modifiedMobileNumber = '';
        if (userMobileNumber) {
          modifiedMobileNumber =
            userMobileNumber.length > 10
              ? userMobileNumber.slice(-10)
              : userMobileNumber;
          const response = await axios.get(
            `https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_217.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`,
          );
          const apiData = response.data.data;
          dispatch(setApplicationData(apiData));
          const capitalizeFirstLetter = (str) => {
            if (!str) return '';
          
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
          };
          const formattedData = apiData.map(item => ({
            id: item.record_id,
            date:item.Date,
            fullName : capitalizeFirstLetter(item['Full Name'].toLowerCase()),
            amount: parseFloat(item['Loan amount requested']),
            sanctionedAmount: parseFloat(item['amount sanctioned']),
            status: item['Workflow Status'].toLowerCase().trim(),
          }));
          const filteredData = formattedData.filter(item => ['sanctioned', 'requested', 'escalate'].includes(item.status));
          const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, latest on top
          setTableData(sortedData);
          dispatch(setSubmitting(false));
        } else {
          console.log('Mobile number not available in Redux.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
        
      }
    };
    const handleRefresh = () => {
      setRefreshing(true); // Set refreshing to true to indicate a refresh is in progress
      // Scroll to the top of the ScrollView
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
      // Call your fetchData function to refresh the data
      fetchData().finally(() => {
        setRefreshing(false);
      });
    };
    
  useEffect(()=>{
    fetchEmiData();
  },[userMobileNumber,])
  useEffect(() => {
    getToken();
    fetchData().then(() => {
      setInitialDataFetched(true);
    });
  }, [userMobileNumber,isSubmitting, dispatch]);

  const getToken = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      const mobileNumber = userMobileNumber;
      console.log(mobileNumber);
      firestore()
        .collection('dealers')
        .doc(mobileNumber)
        .set({
          token: token,
        })
        .then(() => {
          console.log('Token added for mobile number: ', mobileNumber);
        })
        .catch(error => {
          console.error('Error adding token: ', error);
        });
    }
  };

  useEffect(() => {
    // Handle foreground notifications
    const foregroundHandler = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      // Display notification or update UI as needed
      if (remoteMessage && remoteMessage.notification) {
        const { title, body } = remoteMessage.notification;
        console.log('Notification Title:', title);
        console.log('Notification Body:', body);
        Toast.show({
          type: 'info',
          position: 'top',
          text1: title,
          text2: body,
          visibilityTime: 10000, // 10 seconds duration
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      }
    });
    const backgroundHandler = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);

        // Check if necessary data is available in remoteMessage.data
        if (
          remoteMessage &&
          remoteMessage.data &&
          remoteMessage.data.name &&
          remoteMessage.data.mobilenumber
        ) {
          console.log('Background message received:', remoteMessage);

          // Extract name and mobile number from remoteMessage.data
          const {name, mobilenumber} = remoteMessage.data;
    
          // Construct customerData object
          const customerData = {name, 'mobile number': mobilenumber};
    
          console.log(customerData); // Log customerData for verification
    
          // Navigate to the 'Customer' screen with customerData as route params
          if (navigation) {
            navigation.navigate('Home'); // Pass customerData as route params
          } else {
            console.warn('Navigation is not available in the background handler.');
          }
        }
      }
    );
    
  
    // Cleanup function
    return () => {
      foregroundHandler();
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };


  const handleCustomers = () => {
    navigation.navigate('Home');
  };

  const handleApplications = () => {
    setShowAdditionalButtons(false);
    navigation.navigate('Applications');
  };

  const handleTyreLoan = () => {
    setShowAdditionalButtons(true);
    setLoanType('tyre');
    setBottomSheetVisible(true);
  };

  const handleInsuranceLoan = () => {
    setShowAdditionalButtons(true);
    setLoanType('insurance');
    setBottomSheetVisible(true);
  };

  // const handleApplyLoan = () => {
  //   setBottomSheetVisible(true); // Show the bottom sheet
  // };
  const handleApplyLoan = () => {
        navigation.navigate('NewCustomerApply', { loanType });
      };
  const handleBottomSheetClose = () => {
    console.log("Backdrop pressed - closing bottom sheet");
    setBottomSheetVisible(false); // Close the bottom sheet
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sanctioned':
        return 'green';
      case 'escalate':
        return 'purple';
      case 'requested':
        return 'gold';
      default:
        return 'black';
    }
  };

  useEffect(() => {
    setShowAdditionalButtons(false);
    setBottomSheetVisible(false); // Reset bottom sheet visibility when screen is unfocused
  }, [isFocused]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      ref={scrollViewRef}
      refreshControl={
        initialDataFetched && ( // Only render RefreshControl if initial data fetching is completed
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        )
      }
      
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonTyre} onPress={handleCustomers}>
            <Icon name="user-alt" size={22} color="white" style={styles.iconStyle} />
            <Text style={styles.buttonText}>{t('mycustomers')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#12b981' }]} onPress={handleTyreLoan}>
            <Icon name="truck" size={22} color="white" style={styles.iconStyle} />
            <Text style={styles.buttonText}>{t('applytyre')} {t('loan')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#6466f1' }]} onPress={handleInsuranceLoan}>
            <Icon name="shield-alt" size={22} color="white" style={styles.iconStyle} />
            <Text style={styles.buttonText}>{t('applyinsurance')} {t('loan')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#f59e0c' }]} onPress={handleApplications}>
            <Icon name="money-check-alt" size={22} color="white" style={styles.iconStyle} />
            <Text style={styles.buttonText}>{t('myapplications')}</Text>
          </TouchableOpacity>
          <UpcomingEmiReports emiData={emiData} emiLoading={emiLoading}/>
        </View>
        <View style={styles.tableContainer}>
          <Text style={styles.title}>{t('activeloanapplications')}</Text>
          {loading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
          ) : (
            <View>
              {tableData.length > 0 ? (
                <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb' }}>
                  <Row
                    data={[
                      t('id'),
                      t('date'),
                      t('name'),
                      t('amount'),
                      t('sanctinedamount'),
                      t('status')
                    ]}
                    style={styles.header}
                    textStyle={styles.headerText}
                  />
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={[
                        <Text style={{ paddingHorizontal: 12, paddingVertical: 20 , color:'black'}}>{rowData.id}</Text>,
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 0,color:'black' }}>{rowData.date.split(' ')[0]}</Text>,
                        rowData.fullName,
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 22 ,color:'black'}}>{"₹" + rowData.amount.toString()}</Text>,
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 22,color:'black' }}>{"₹" + rowData.sanctionedAmount.toString()}</Text>,
                        <Text style={{ color: getStatusColor(rowData.status), paddingHorizontal: 7,color:'black' }}>{t(`statusLabels.${rowData.status}`)}</Text>,
                      ]}
                      textStyle={styles.cell}
                    />
                  ))}
                </Table>
              ) : (
                <Text style={styles.noDataText}>{t('noactiveloanapplications')}</Text>
              )}
            </View>
          )}
        </View>
        <View style={styles.bottom}>
          <Text style={styles.bottomText}>
            {t('footer')}
          </Text>
        </View>
      </View>
      <BottomSheet 
      isVisible={bottomSheetVisible} 
      containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0.25, 0.2)' }} 
      modalProps={{}} 

      onBackdropPress={handleBottomSheetClose}
      >
        <View style={{ backgroundColor: 'white', padding: 16 }}>
          <View style={[styles.additionalButtonContainer, { justifyContent: 'space-between' }]}>
            <TouchableOpacity style={[styles.additionalButton, { backgroundColor: '#3c82f6' }]} onPress={handleApplyLoan} >
              <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{t('newcustomer')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.additionalButton, { backgroundColor: '#12b981' }]} onPress={handleCustomers}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{t('existingcustomer')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleBottomSheetClose} style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#007AFF' }}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
   </ScrollView>
 );
};

const styles = StyleSheet.create({
scrollViewContent: {
 flexGrow: 1,
},
container: {
 backgroundColor: 'white',
 justifyContent: 'center',
 paddingHorizontal:15,
 height:'100%'
},
buttonContainer: {
 marginTop: 30,
 marginBottom: 18,
 
 
},
buttonTyre: {
 backgroundColor: '#3c82f6',
 borderRadius: 8,
 paddingVertical: 25,
 // paddingHorizontal: 20,
 width: '100%',
 alignItems: 'center',
 marginBottom: 20,
},
buttonText: {
 color: 'white',
 fontSize: 22,
 fontWeight: '600',
 textAlign: 'center',
},
additionalButtonContainer: {
 flexDirection: 'row',
 justifyContent: 'center',
 marginTop: 10,
 marginBottom: 20,
},
additionalButton: {
 backgroundColor: 'orange',
 borderRadius: 8,
 paddingVertical: 20,
 paddingHorizontal: 20,
 width: '48%',
 alignItems: 'center',
},
tableContainer: {
 
},
loader: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
 
},
header: {
 height: 60,
 backgroundColor: '#e5e7eb',
},
headerText: {
 textAlign: 'center',
 fontWeight: 'bold',
 color:'black'
},
cell: {
 height: 70,
 textAlign: 'center',
 borderColor: '#e5e7eb',
 alignItems: 'center',
 justifyContent: 'center',
 paddingVertical: 10, // Adjust padding to provide more space for the text
 color:'black'
},
title: {
 fontSize: 25,
 fontWeight: 'bold',
 marginBottom: 20,
 color:'black'
},
noDataText: {
 textAlign: 'center',
 fontSize: 18,
 color: 'black',
 marginTop: 8,
 marginBottom: 10,
},
bottom: {
 marginTop: 30,
 marginHorizontal: 15,
 marginBottom: 10,
},
bottomText: {
 fontSize: 18,
 color: 'gray',
},
});

export default Buttons;