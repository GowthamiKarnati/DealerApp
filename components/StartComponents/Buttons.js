// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,Modal } from 'react-native';
// import { useNavigation,useIsFocused } from '@react-navigation/native';
// import axios from 'axios';
// import {selectMobileNumber} from '../../redux/slices/authSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { Table, Row } from 'react-native-table-component';
// import { setApplicationData } from '../../redux/slices/authSlice';
// import { useTranslation } from 'react-i18next';
// import Icon from 'react-native-vector-icons/FontAwesome5';


// const Buttons = () => {
//   const {t} = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
//   const userMobileNumber = useSelector(selectMobileNumber);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let modifiedMobileNumber = '';
//         if (userMobileNumber) {
//           modifiedMobileNumber =
//             userMobileNumber.length > 10
//               ? userMobileNumber.slice(-10)
//               : userMobileNumber;
//           const response = await axios.get(
//             `https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_217.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`,
//           );
//         const apiData = response.data.data;
//         dispatch(setApplicationData(apiData))
//         //console.log("instartpage", apiData);
//         // Format and filter the fetched data
//         const formattedData = apiData.map(item => ({
//           id: item.record_id,
//           fullName: item['Full Name'].toLowerCase(),
//           amount: parseFloat(item['Loan amount requested']),
//           sanctionedAmount: parseFloat(item['amount sanctioned']),
//           status: item['Workflow Status'].toLowerCase().trim(),
//         }));
//         const filteredData = formattedData.filter(item => ['sanctioned', 'requested', 'escalate'].includes(item.status));
//         //console.log("filteredData",filteredData)
//         setTableData(filteredData);
//         }else {
//           console.log('Mobile number not available in Redux.');
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userMobileNumber]);

//   const handleCustomers = () => {
//     navigation.navigate('Home');
//   };
//   const handleApplications = ()=>{
//     navigation.navigate('Applications')
//   }
  
//   const handleTyreLoan = () => {
//     setShowAdditionalButtons(true);
//     navigation.navigate('NewCustomerApply', { loanType: 'tyre' });
//   };

//   const handleInsuranceLoan = () => {
//     setShowAdditionalButtons(true);
//     navigation.navigate('NewCustomerApply', { loanType: 'insurance' });
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'sanctioned':
//         return 'green';
//       case 'escalate':
//         return 'purple';
//       case 'requested':
//         return 'gold';
//       default:
//         return 'black';
//     }
//   };
//   useEffect(() => {
//     setShowAdditionalButtons(false);
//   }, [isFocused]);
//   return (
//     <View style={styles.container}>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.buttonTyre} onPress={handleCustomers}>
//           <Icon name="user-alt" size={22} color="white" style={styles.iconStyle} />
//           <Text style={styles.buttonText}>{t('mycustomers')}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#12b981' }]} onPress={handleTyreLoan}>
//         <Icon name="truck" size={22} color="white" style={styles.iconStyle} />
//           <Text style={styles.buttonText}>Apply Tyre Loan</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#6466f1' }]} onPress={handleInsuranceLoan}>
//         <Icon name="shield-alt" size={22} color="white" style={styles.iconStyle} />
//           <Text style={styles.buttonText}>Apply Insurance Loan</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#f59e0c' }]} onPress={handleApplications}>
//         <Icon name="money-check-alt" size={22} color="white" style={styles.iconStyle} />
//           <Text style={styles.buttonText}>Loan Application</Text>
//         </TouchableOpacity>
        
//       </View>
//       {/* <View style={styles.additionalButtonContainer}> */}
//         {/* <TouchableOpacity style={styles.additionalButton} onPress={handleApplyLoan}>
//           <Text style={styles.buttonText}>Loan Application</Text>
//         </TouchableOpacity> */}
//       {/* </View> */}


      
//       {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showModal}
//         onRequestClose={() => {
//           setShowModal(false);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//           <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
//             <Text style={styles.closeButtonText}>X</Text>
//           </TouchableOpacity>
//             <Text style={styles.modalTitle}>{t('selectCustomer')}</Text>
//             <TouchableOpacity style={styles.optionButton} onPress={handleApplyForNewCustomer}>
//               <Text style={styles.optionButtonText}>{t('applyfornewcustomer')}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionButton} onPress={handleApplyForOldCustomer}>
//               <Text style={styles.optionButtonText}>{t('applyforoldcustomer')}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showLoanTypeModal}
//         onRequestClose={() => {
//           setShowLoanTypeModal(false);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>{t('selectLoanType')}</Text>
//             <TouchableOpacity style={styles.optionButton} onPress={handleTyreLoan}>
//               <Text style={styles.optionButtonText}>{t('tyreLoan')}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionButton} onPress={handleInsuranceLoan}>
//               <Text style={styles.optionButtonText}>{t('insuranceLoan')}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.closeButton} 
//             onPress={() => 
//             setShowLoanTypeModal(false)
//             }>
//               <Text style={styles.closeButtonText}>X</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal> */}


//       <View style={styles.tableContainer}>
//         <Text style={styles.title} >{t('activeloanapplications')}</Text>
//         {loading ? (
//           <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
//         ) : (
//           <View>
//             {tableData.length > 0 ? (
//             <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb' }}>
//               <Row 
//               data={[
//                 t('id'),
//                 t('name'),
//                 t('amount'),
//                 t('sanctinedamount'), 
//                 t('status')
//                 ]} 
//                 style={styles.header} 
//                 textStyle={styles.headerText} 
//                 />
//               {tableData.map((rowData, index) => (
//                 <Row
//                   key={index}
//                   data={[
//                     rowData.id,
//                     rowData.fullName,
//                     rowData.amount.toString(),
//                     rowData.sanctionedAmount.toString(),
//                     <Text style={{ color: getStatusColor(rowData.status), paddingHorizontal: 10 }}>{t(`statusLabels.${rowData.status}`)}</Text>,
//                   ]}
//                   textStyle={styles.cell}
//                 />
//               ))}
//             </Table>
//           ) : (
//             <Text style={styles.noDataText}>{t('noactiveloanapplications')}</Text>
//           )}
//           </View>
//         )}
//       </View>
//       <View style={styles.bottom}>
//         <Text style={styles.bottomText}>
//           {t('footer')}
//         </Text>
//       </View>
//     </View>
//     {showAdditionalButtons && (
//       <View style={styles.additionalButtonContainer}>
//         <TouchableOpacity style={[styles.additionalButton, { marginRight: 10 }]} onPress={handleApplyForNewCustomer}>
//           <Text style={styles.buttonText}>New Customer</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.additionalButton} onPress={handleApplyForOldCustomer}>
//           <Text style={styles.buttonText}>Existing Customer</Text>
//         </TouchableOpacity>
//       </View>
//     )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container:{
//   backgroundColor:'white',
//   paddingHorizontal:20,
//   },
//   buttonContainer: {
    
//     // paddingHorizontal: 20,
//     marginTop: 30,
//     marginBottom: 18,
//   },
//   buttonTyre: {
//     backgroundColor: '#3c82f6',
//     borderRadius: 8,
//     paddingVertical: 25,
//     paddingHorizontal: 20,
//     width: '98%', // Adjust width as needed
//     alignItems: 'center',
//     marginBottom:20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   additionalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 0,
//     // marginBottom:20,
//   },
//   additionalButton: {
//     backgroundColor: 'orange', 
//     borderRadius: 8,
//     paddingVertical: 25,
//     paddingHorizontal: 20,
//     width: '90%', 
//     alignItems: 'center',
//   },
//   tableContainer: {
//     marginHorizontal: 20,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     height: 60,
//     backgroundColor: '#e5e7eb',
//   },
//   headerText: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   cell: {
//     height: 70,
//     textAlign: 'center',
//     borderColor:'#e5e7eb',
//     alignItems: 'center',
//     justifyContent:'center',
//     paddingVertical:10, 
//   },
//   title:{
//     fontSize:25,
//     fontWeight:'bold',
//     marginBottom:20,
//   },
//   noDataText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'black',
//     marginTop: 8,
//     marginBottom:10,
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
//     width: '80%',
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   optionButton: {
//     backgroundColor: '#e6e6fa',
//     borderRadius: 8,
//     paddingVertical: 15,
//     paddingHorizontal: 40,
//     marginTop: 10,
//     width: '89%',
//   },
//   optionButtonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 12,
//     right: 15,
//     padding: 5,
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: '#fffacd',
//     paddingHorizontal:9,
//     paddingVertical:2,
//   },
//   closeButtonText: {
//     color:'#f08080',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   iconStyle: {
//     marginBottom: 6, // Adjust spacing as needed
//   },
//   bottom: {
//     marginTop: 30,
//     marginHorizontal:15,
//     marginBottom:10,
//   },
//   bottomText: {
//     fontSize: 18,
//     color: 'gray',
//   },
// });

// export default Buttons;
// import React, { useState, useEffect,useRef  } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,Modal } from 'react-native';
// import { useNavigation,useIsFocused } from '@react-navigation/native';
// import axios from 'axios';
// import {selectMobileNumber} from '../../redux/slices/authSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { Table, Row } from 'react-native-table-component';
// import { setApplicationData } from '../../redux/slices/authSlice';
// import { useTranslation } from 'react-i18next';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const Buttons = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const userMobileNumber = useSelector(selectMobileNumber);
//   const scrollViewRef = useRef();



//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
//   const [loanType, setLoanType] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let modifiedMobileNumber = '';
//         if (userMobileNumber) {
//           modifiedMobileNumber =
//             userMobileNumber.length > 10
//               ? userMobileNumber.slice(-10)
//               : userMobileNumber;
//           const response = await axios.get(
//             `https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_217.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`,
//           );
//           const apiData = response.data.data;
//           dispatch(setApplicationData(apiData))
//           const formattedData = apiData.map(item => ({
//             id: item.record_id,
//             fullName: item['Full Name'].toLowerCase(),
//             amount: parseFloat(item['Loan amount requested']),
//             sanctionedAmount: parseFloat(item['amount sanctioned']),
//             status: item['Workflow Status'].toLowerCase().trim(),
//           }));
//           const filteredData = formattedData.filter(item => ['sanctioned', 'requested', 'escalate'].includes(item.status));
//           setTableData(filteredData);
//         } else {
//           console.log('Mobile number not available in Redux.');
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userMobileNumber]);

//   const handleCustomers = () => {
//     navigation.navigate('Home');
//   };

//   const handleApplications = () => {
//     setShowAdditionalButtons(false);
//     navigation.navigate('Applications');
//   };

//   const handleTyreLoan = () => {
//     setShowAdditionalButtons(true);
//     setLoanType('tyre');
    
//   };
  
//   const handleInsuranceLoan = () => {
//     setShowAdditionalButtons(true);
//     setLoanType('insurance');
//   };
  
//   const handleApplyLaon = () => {
//     navigation.navigate('NewCustomerApply', { loanType });
//   };
  
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'sanctioned':
//         return 'green';
//       case 'escalate':
//         return 'purple';
//       case 'requested':
//         return 'gold';
//       default:
//         return 'black';
//     }
//   };

//   useEffect(() => {
//     setShowAdditionalButtons(false);
//   }, [isFocused]);

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.buttonTyre} onPress={handleCustomers}>
//             <Icon name="user-alt" size={22} color="white" style={styles.iconStyle} />
//             <Text style={styles.buttonText}>{t('mycustomers')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#12b981' }]} onPress={() => handleTyreLoan('tyre')}>
//           <Icon name="truck" size={22} color="white" style={styles.iconStyle} />
//           <Text style={styles.buttonText}>{t('applytyre')} {t('loan')}</Text>

//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#6466f1' }]} onPress={() => handleInsuranceLoan('insurance')}>
//           <Icon name="shield-alt" size={22} color="white" style={styles.iconStyle} />
//           <Text style={styles.buttonText}>{t('applyinsurance')} {t('loan')}</Text>

//         </TouchableOpacity>

//           <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#f59e0c' }]} onPress={handleApplications}>
//             <Icon name="money-check-alt" size={22} color="white" style={styles.iconStyle} />
//             <Text style={styles.buttonText}>{t('myapplications')}</Text>
//           </TouchableOpacity>
//         </View>
//         <View  style={styles.tableContainer}>
//           <Text style={styles.title}>{t('activeloanapplications')}</Text>
//           {loading ? (
//             <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
//           ) : (
//             <View>
//               {tableData.length > 0 ? (
//                 <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb' }}>
//                   <Row
//                     data={[
//                       t('id'),
//                       t('name'),
//                       t('amount'),
//                       t('sanctinedamount'),
//                       t('status')
//                     ]}
//                     style={styles.header}
//                     textStyle={styles.headerText}
//                   />
//                   {tableData.map((rowData, index) => (
//                     <Row
//                       key={index}
//                       data={[
//                         <Text style={{paddingHorizontal:22, paddingVertical:20}}>{rowData.id}</Text>,
//                         rowData.fullName,
//                         <Text style={{paddingHorizontal:10, paddingVertical:22}}>{"Rs. "+ rowData.amount.toString()}</Text>,
//                         <Text style={{paddingHorizontal:10, paddingVertical:22}}>{rowData.sanctionedAmount.toString()}</Text>,
//                         <Text style={{ color: getStatusColor(rowData.status), paddingHorizontal: 10 }}>{t(`statusLabels.${rowData.status}`)}</Text>,
//                       ]}
//                       textStyle={styles.cell}
//                     />
//                   ))}
//                 </Table>
//               ) : (
//                 <Text style={styles.noDataText}>{t('noactiveloanapplications')}</Text>
//               )}
//             </View>
//           )}
//         </View>
//         <View style={styles.bottom}>
//           <Text style={styles.bottomText}>
//             {t('footer')}
//           </Text>
//         </View>
//       </View>
//       {showAdditionalButtons && (
//         <View style={styles.additionalButtonContainer}>
//           <TouchableOpacity style={[styles.additionalButton, { marginRight: 10 }, {backgroundColor:'#3c82f6'}]} onPress={handleApplyLaon}>
//             <Text style={{fontSize:16,fontWeight:'600', color:'white'}}>{t('newcustomer')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.additionalButton,{backgroundColor:'#12b981'}]} onPress={handleCustomers}>
//             <Text style={{fontSize:16,fontWeight:'600', color:'white'}}>{t('existingcustomer')}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//     paddingHorizontal: 20,
//   },
//   buttonContainer: {
//     marginTop: 30,
//     marginBottom: 18,
//   },
//   buttonTyre: {
//     backgroundColor: '#3c82f6',
//     borderRadius: 8,
//     paddingVertical: 25,
//     paddingHorizontal: 20,
//     width: '98%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   additionalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//     marginBottom:20,
//   },
//   additionalButton: {
//     backgroundColor: 'orange',
//     borderRadius: 8,
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     width: '45%',
//     alignItems: 'center',
//   },
//   tableContainer: {
    

//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     height: 60,
//     backgroundColor: '#e5e7eb',
//   },
//   headerText: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   cell: {
//     height: 70,
//     textAlign: 'center',
//     borderColor: '#e5e7eb',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10, // Adjust padding to provide more space for the text
//   },
  
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   noDataText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'black',
//     marginTop: 8,
//     marginBottom: 10,
//   },
//   bottom: {
//     marginTop: 30,
//     marginHorizontal: 15,
//     marginBottom: 10,
//   },
//   bottomText: {
//     fontSize: 18,
//     color: 'gray',
//   },
// });

// export default Buttons;
// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView,TouchableHighlight } from 'react-native';
// import { useNavigation, useIsFocused } from '@react-navigation/native';
// import axios from 'axios';
// import { selectMobileNumber } from '../../redux/slices/authSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { Table, Row } from 'react-native-table-component';
// import { setApplicationData } from '../../redux/slices/authSlice';
// import { useTranslation } from 'react-i18next';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const Buttons = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const isFocused = useIsFocused();
//   const userMobileNumber = useSelector(selectMobileNumber);
//   const scrollViewRef = useRef(null);

//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
//   const [loanType, setLoanType] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let modifiedMobileNumber = '';
//         if (userMobileNumber) {
//           modifiedMobileNumber =
//             userMobileNumber.length > 10
//               ? userMobileNumber.slice(-10)
//               : userMobileNumber;
//           const response = await axios.get(
//             `https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_217.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`,
//           );
//           const apiData = response.data.data;
//           dispatch(setApplicationData(apiData))
//           const formattedData = apiData.map(item => ({
//             id: item.record_id,
//             fullName: item['Full Name'].toLowerCase(),
//             amount: parseFloat(item['Loan amount requested']),
//             sanctionedAmount: parseFloat(item['amount sanctioned']),
//             status: item['Workflow Status'].toLowerCase().trim(),
//           }));
//           const filteredData = formattedData.filter(item => ['sanctioned', 'requested', 'escalate'].includes(item.status));
//           setTableData(filteredData);
//         } else {
//           console.log('Mobile number not available in Redux.');
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userMobileNumber]);

//   const handleCustomers = () => {
//     navigation.navigate('Home');
//   };

//   const handleApplications = () => {
//     setShowAdditionalButtons(false);
//     navigation.navigate('Applications');
//   };

//   const handleTyreLoan = () => {
//     setShowAdditionalButtons(true);
//     setLoanType('tyre');
//     scrollViewRef.current.scrollToEnd({ animated: true });
//   };

//   const handleInsuranceLoan = () => {
//     setShowAdditionalButtons(true);
//     setLoanType('insurance');
//     scrollViewRef.current.scrollToEnd({ animated: true });
//   };

//   const handleApplyLoan = () => {
//     navigation.navigate('NewCustomerApply', { loanType });
//     scrollToAdditionalButtons();
//   };

//   const scrollToAdditionalButtons = () => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollToEnd({ animated: true });
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'sanctioned':
//         return 'green';
//       case 'escalate':
//         return 'purple';
//       case 'requested':
//         return 'gold';
//       default:
//         return 'black';
//     }
//   };

//   useEffect(() => {
//     setShowAdditionalButtons(false);
//   }, [isFocused]);

//   return (
//     <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={styles.container}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.buttonTyre} onPress={handleCustomers}>
//             <Icon name="user-alt" size={22} color="white" style={styles.iconStyle} />
//             <Text style={styles.buttonText}>{t('mycustomers')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#12b981' }]} onPress={handleTyreLoan}>
//             <Icon name="truck" size={22} color="white" style={styles.iconStyle} />
//             <Text style={styles.buttonText}>{t('applytyre')} {t('loan')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#6466f1' }]} onPress={handleInsuranceLoan}>
//             <Icon name="shield-alt" size={22} color="white" style={styles.iconStyle} />
//             <Text style={styles.buttonText}>{t('applyinsurance')} {t('loan')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.buttonTyre, { backgroundColor: '#f59e0c' }]} onPress={handleApplications}>
//             <Icon name="money-check-alt" size={22} color="white" style={styles.iconStyle} />
//             <Text style={styles.buttonText}>{t('myapplications')}</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.tableContainer}>
//           <Text style={styles.title}>{t('activeloanapplications')}</Text>
//           {loading ? (
//             <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
//           ) : (
//             <View>
//               {tableData.length > 0 ? (
//                 <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb' }}>
//                   <Row
//                     data={[
//                       t('id'),
//                       t('name'),
//                       t('amount'),
//                       t('sanctinedamount'),
//                       t('status')
//                     ]}
//                     style={styles.header}
//                     textStyle={styles.headerText}
//                   />
//                   {tableData.map((rowData, index) => (
//                     <Row
//                       key={index}
//                       data={[
//                         <Text style={{ paddingHorizontal: 22, paddingVertical: 20 }}>{rowData.id}</Text>,
//                         rowData.fullName,
//                         <Text style={{ paddingHorizontal: 10, paddingVertical: 22 }}>{"Rs. " + rowData.amount.toString()}</Text>,
//                         <Text style={{ paddingHorizontal: 10, paddingVertical: 22 }}>{rowData.sanctionedAmount.toString()}</Text>,
//                         <Text style={{ color: getStatusColor(rowData.status), paddingHorizontal: 10 }}>{t(`statusLabels.${rowData.status}`)}</Text>,
//                       ]}
//                       textStyle={styles.cell}
//                     />
//                   ))}
//                 </Table>
//               ) : (
//                 <Text style={styles.noDataText}>{t('noactiveloanapplications')}</Text>
//               )}
//             </View>
//           )}
//         </View>
//         <View style={styles.bottom}>
//           <Text style={styles.bottomText}>
//             {t('footer')}
//           </Text>
//         </View>
//       </View>
//       {showAdditionalButtons && (
//         <View style={styles.additionalButtonContainer}>
//           <TouchableOpacity style={[styles.additionalButton, { marginRight: 10 }, { backgroundColor: '#3c82f6' }]} onPress={handleApplyLoan}>
//             <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{t('newcustomer')}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.additionalButton, { backgroundColor: '#12b981' }]} onPress={handleCustomers}>
//             <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{t('existingcustomer')}</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   container: {
//     backgroundColor: 'white',
//     justifyContent: 'center',
    
//   },
//   buttonContainer: {
//     marginTop: 30,
//     marginBottom: 18,
//     paddingHorizontal:10
    
//   },
//   buttonTyre: {
//     backgroundColor: '#3c82f6',
//     borderRadius: 8,
//     paddingVertical: 25,
//     // paddingHorizontal: 20,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 22,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   additionalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   additionalButton: {
//     backgroundColor: 'orange',
//     borderRadius: 8,
//     paddingVertical: 20,
//     paddingHorizontal: 20,
//     width: '45%',
//     alignItems: 'center',
//   },
//   tableContainer: {
//     paddingHorizontal:20
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     height: 60,
//     backgroundColor: '#e5e7eb',
//   },
//   headerText: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   cell: {
//     height: 70,
//     textAlign: 'center',
//     borderColor: '#e5e7eb',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10, // Adjust padding to provide more space for the text
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   noDataText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: 'black',
//     marginTop: 8,
//     marginBottom: 10,
//   },
//   bottom: {
//     marginTop: 30,
//     marginHorizontal: 15,
//     marginBottom: 10,
//   },
//   bottomText: {
//     fontSize: 18,
//     color: 'gray',
//   },
// });

// export default Buttons;
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, TouchableHighlight } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { selectMobileNumber,selectIsSubmitting } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import { setApplicationData, setSubmitting } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BottomSheet } from 'react-native-elements';



const Buttons = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userMobileNumber = useSelector(selectMobileNumber);
  const scrollViewRef = useRef(null);
  const isSubmitting = useSelector(selectIsSubmitting);
  console.log(isSubmitting);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [loanType, setLoanType] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false); // State to control bottom sheet visibility

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
    dispatch(setSubmitting(false));
  }, [userMobileNumber,isSubmitting, dispatch]);

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
    <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
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
                        <Text style={{ paddingHorizontal: 12, paddingVertical: 20 }}>{rowData.id}</Text>,
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 0 }}>{rowData.date.split(' ')[0]}</Text>,
                        rowData.fullName,
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 22 }}>{"₹" + rowData.amount.toString()}</Text>,
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 22 }}>{"₹" + rowData.sanctionedAmount.toString()}</Text>,
                        <Text style={{ color: getStatusColor(rowData.status), paddingHorizontal: 7 }}>{t(`statusLabels.${rowData.status}`)}</Text>,
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
 
},
buttonContainer: {
 marginTop: 30,
 marginBottom: 18,
 paddingHorizontal:10
 
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
 paddingHorizontal:20
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
},
cell: {
 height: 70,
 textAlign: 'center',
 borderColor: '#e5e7eb',
 alignItems: 'center',
 justifyContent: 'center',
 paddingVertical: 10, // Adjust padding to provide more space for the text
},
title: {
 fontSize: 25,
 fontWeight: 'bold',
 marginBottom: 20,
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
