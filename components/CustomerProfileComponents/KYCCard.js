// import React, {useState, useEffect, useCallback} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   LayoutAnimation,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Collapsible from 'react-native-collapsible';
// import {
//   selectCustomerData,
//   selectAddingTruck,
// } from '../../redux/slices/authSlice';
// import {useSelector} from 'react-redux';
// import axios from 'axios';
// const KYCCard = ({customerKYCData, handlePress, t}) => {
//   //console.log("inKyccard", customerKYCData);
//   const customerData = useSelector(selectCustomerData);
//   const addingtruck = useSelector(selectAddingTruck);
//   const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//   //console.log(customerPhoneNumber)
//   const [addressWidth, setAddressWidth] = useState(null);
//   const [addressText, setAddressText] = useState('');
//   const [altPhoneWidth, setAltPhoneWidth] = useState(null);
//   const [altPhoneText, setAltPhoneText] = useState('');
//   const [personalDetailsCollapsed, setPersonalDetailsCollapsed] =
//     useState(true);
//   const [truckDetails, setTruckDetails] = useState(true);
//   const [kycDocuments, setKycDocuments] = useState(true);
//   const [vehicleData, setVehicleData] = useState(null);
//   const [housedetails, setHousedetails] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const modifiedMobileNumber =
//           customerPhoneNumber.length > 10
//             ? customerPhoneNumber.slice(-10)
//             : customerPhoneNumber;
//         console.log('number', modifiedMobileNumber);
//         const vehicleResponse = await axios.get(
//           `https://backendforpnf.vercel.app/vehicles?criteria=sheet_32026511.column_609.column_87%20LIKE%20%22%25${encodeURIComponent(
//             modifiedMobileNumber,
//           )}%22`,
//         );
//         setVehicleData(vehicleResponse.data.data);
//         //console.log("vehicle",vehicleResponse.data.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//       }
//     };
//     fetchData();
//   }, [customerPhoneNumber, addingtruck]);

//   const numberOfTrucks = vehicleData ? vehicleData.length : 0;
//   console.log('Number of Trucks', numberOfTrucks);

//   const handleAltPhoneLayout = event => {
//     if (!altPhoneWidth) {
//       setAltPhoneWidth(event.nativeEvent.layout.width);
//     }
//   };

//   const truncatedAltPhone = () => {
//     if (!altPhoneText || !altPhoneWidth) return '';
//     const text = altPhoneText;
//     const maxChars = 7; // Maximum characters before truncating
//     if (text.length > maxChars) {
//       return text.slice(0, maxChars) + '...';
//     }
//     return text;
//   };

//   const handleAddressLayout = event => {
//     if (!addressWidth) {
//       setAddressWidth(event.nativeEvent.layout.width);
//     }
//   };

//   const truncatedAddress = () => {
//     if (!addressText || !addressWidth) return '';
//     const text = addressText;
//     const maxCharsWidth = addressWidth / 12;
//     const maxChars = 17;
//     if (text.length > maxChars) {
//       return text.slice(0, maxChars) + '...';
//     }
//     return text;
//   };

//   useEffect(() => {
//     setAddressText(customerKYCData['House Address'] || '');
//     setAltPhoneText(customerKYCData['Alternate Phone Number'] || '');
//   }, [customerKYCData]);
//   const togglePersonalDetails = useCallback(() => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setPersonalDetailsCollapsed(!personalDetailsCollapsed);
//   }, [personalDetailsCollapsed]);

//   const toggleTruckDetails = useCallback(() => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setTruckDetails(!truckDetails);
//   }, [truckDetails]);

//   const toggleKycDocuments = useCallback(() => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setKycDocuments(!kycDocuments);
//   }, [kycDocuments]);

//   return (
//     <View>
//       <TouchableOpacity onPress={togglePersonalDetails}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>{t('personaldetails')}</Text>
//           <Icon
//             name={personalDetailsCollapsed ? 'chevron-right' : 'chevron-down'}
//             size={20}
//             color="#9ca3af"
//             style={styles.icon}
//           />
//         </View>
//       </TouchableOpacity>
//       <Collapsible collapsed={personalDetailsCollapsed}>
//       <TouchableOpacity>
// <Text style={{fontSize: 18, color: 'black'}}>Your Text Here</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity onPress={() => handlePress('dob')}>
//       <View style={styles.kycItem}>
//         <Text style={{ color: 'black' }}>{t('dob')}</Text>
//         <View style={styles.valueContainer}>
//           <Text style={styles.valueText}>
//             {customerKYCData['Date of Birth']?.split(' ')[0]}
//           </Text>

//           <Icon
//             name="chevron-right"
//             size={20}
//             color="#9ca3af"
//             style={styles.icon}
//           />
//         </View>
//       </View>
//     </TouchableOpacity>

//         <TouchableOpacity onPress={() => handlePress('pan')}>
//           <View style={styles.kycItem}>
//             <Text style={{color:"red"}}>{t('pan')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>
//                 {customerKYCData['PAN Number']}
//               </Text>

//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handlePress('noofchildren')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('numchildren')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>
//                 {customerKYCData['Number of Children']}
//               </Text>

//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handlePress('montlyemioutflow')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('monthlyemi')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>
//                 {customerKYCData['Monthly EMI Outflow']}
//               </Text>

//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handlePress('noofyearsinbusiness')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('numofbusinessyers')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>
//                 {customerKYCData['Number of years in business']}
//               </Text>

//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handlePress('city')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('city')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>{customerKYCData['City']}</Text>

//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handlePress('phone')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('phonenumber')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>
//                 {customerKYCData['Phone Number']}
//               </Text>

//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handlePress('altphone')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('altnumber')}</Text>
//             <View style={styles.valueContainer} onLayout={handleAltPhoneLayout}>
//               <Text
//                 numberOfLines={1}
//                 ellipsizeMode="tail"
//                 style={styles.valueText}>
//                 {truncatedAltPhone()}
//               </Text>
//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => handlePress('marital')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('maritalstatus')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>
//                 {customerKYCData['Marital Status']}
//               </Text>

//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//           <TouchableOpacity onPress={() => handlePress('housetype')}>
//             <View style={styles.kycItem}>
//               <Text style={styles.keyText}>{t('housetype')}</Text>
//               <View style={styles.valueContainer}>
//                 <Text style={styles.valueText}>
//                   {customerKYCData['House Owned or Rented']}
//                 </Text>

//                 <Icon
//                   name="chevron-right"
//                   size={20}
//                   color="#9ca3af"
//                   style={styles.icon}
//                 />
//               </View>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handlePress('houseaddress')}>
//             <View style={styles.kycItem}>
//               <Text style={styles.keyText}>{t('houseadress')}</Text>
//               <View
//                 style={styles.valueContainer}
//                 onLayout={handleAddressLayout}>
//                 <Text style={styles.valueText}>{truncatedAddress()}</Text>

//                 <Icon
//                   name="chevron-right"
//                   size={20}
//                   color="#9ca3af"
//                   style={styles.icon}
//                 />
//               </View>
//             </View>
//           </TouchableOpacity>
//         </TouchableOpacity>
//         {/* New section for House Address */}
//       </Collapsible>
//       <TouchableOpacity onPress={toggleTruckDetails}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>{t('truckdetails')}</Text>
//           <Icon
//             name={truckDetails ? 'chevron-right' : 'chevron-down'}
//             size={20}
//             color="#9ca3af"
//             style={styles.icon}
//           />
//         </View>
//       </TouchableOpacity>
//       <Collapsible collapsed={truckDetails}>
//         <TouchableOpacity>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('nooftrucks')}</Text>
//             <View style={styles.valueContainer}>
//               <Text style={styles.valueText}>{numberOfTrucks}</Text>
//               {/* <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} /> */}
//             </View>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handlePress('trucknumber')}>
//           <View style={styles.kycItem}>
//             <Text style={styles.keyText}>{t('addtrucks')}</Text>
//             <View style={styles.valueContainer}>
//               <Icon
//                 name="chevron-right"
//                 size={20}
//                 color="#9ca3af"
//                 style={styles.icon}
//               />
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Collapsible>
//       <TouchableOpacity onPress={toggleKycDocuments}>
//         <View style={styles.header}>
//           <Text style={styles.headerText}>{t('kycdocuments')}</Text>
//           <Icon
//             name={kycDocuments ? 'chevron-right' : 'chevron-down'}
//             size={20}
//             color="#9ca3af"
//             style={styles.icon}
//           />
//         </View>
//       </TouchableOpacity>
//       <Collapsible collapsed={kycDocuments}>
//   <View style={styles.collapsibleContent}>
//     <TouchableOpacity onPress={() => handlePress('pancard')}>
//       <View style={styles.kycItem}>
//         <Text style={styles.keyText}>{t('pancard')}</Text>
//         <View style={styles.valueContainer}>
//           <Icon
//             name="chevron-right"
//             size={20}
//             color="#9ca3af"
//             style={styles.icon}
//           />
//         </View>
//       </View>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={() => handlePress('aadharcard')}>
//       <View style={styles.kycItem}>
//         <Text style={styles.keyText}>{t('aadharcard')}</Text>
//         <View style={styles.valueContainer}>
//           <Icon
//             name="chevron-right"
//             size={20}
//             color="#9ca3af"
//             style={styles.icon}
//           />
//         </View>
//       </View>
//     </TouchableOpacity>
//   </View>
// </Collapsible>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'red',
//     padding: 15,
//   },
//   headerText: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   icon: {
//     marginLeft: 10,
//   },
//   kycItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     height: 70,
//     alignItems: 'center',
    
//   },
//   keyText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   valueText: {
//     fontSize: 18,
//     color: 'black',
//   },
//   valueContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
  
// });

// export default KYCCard;
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import {
      selectCustomerData,
      selectAddingTruck,
    } from '../../redux/slices/authSlice';
import {useSelector} from 'react-redux';
import axios from 'axios';


const KYCCard = ({ customerKYCData, handlePress, t }) => {
    //console.log("inKyccard", customerKYCData);
    const customerData = useSelector(selectCustomerData);
  const addingtruck = useSelector(selectAddingTruck);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
    const [addressWidth, setAddressWidth] = useState(null); 
    const [addressText, setAddressText] = useState('');
    const [altPhoneWidth, setAltPhoneWidth] = useState(null);
    const [altPhoneText, setAltPhoneText] = useState('');
    const [personalDetailsCollapsed, setPersonalDetailsCollapsed] = useState(true);
    const [truckDetails, setTruckDetails]= useState(true);
    const [kycDocuments, setKycDocuments] = useState(true);
    const [vehicleData, setVehicleData] = useState(null);
    useEffect(() => {
            const fetchData = async () => {
              try {
                const modifiedMobileNumber =
                  customerPhoneNumber.length > 10
                    ? customerPhoneNumber.slice(-10)
                    : customerPhoneNumber;
                console.log('number', modifiedMobileNumber);
                const vehicleResponse = await axios.get(
                  `https://backendforpnf.vercel.app/vehicles?criteria=sheet_32026511.column_609.column_87%20LIKE%20%22%25${encodeURIComponent(
                    modifiedMobileNumber,
                  )}%22`,
                );
                setVehicleData(vehicleResponse.data.data);
                console.log("vehicle",vehicleResponse.data.data);
              } catch (error) {
                console.error('Error fetching data:', error.message);
              }
            };
            fetchData();
          }, [customerPhoneNumber, addingtruck]);

    const numberOfTrucks = vehicleData ? vehicleData.length : 0;
    console.log('Number of Trucks', numberOfTrucks);


    const handleAltPhoneLayout = (event) => {
        if (!altPhoneWidth) {
          setAltPhoneWidth(event.nativeEvent.layout.width);
        }
      };
    
      const truncatedAltPhone = () => {
        if (!altPhoneText || !altPhoneWidth) return '';
        const text = altPhoneText;
        const maxChars = 7; // Maximum characters before truncating
        if (text.length > maxChars) {
          return text.slice(0, maxChars) + '...';
        }
        return text;
      };
    
      
      const handleAddressLayout = (event) => {
        if (!addressWidth) {
          setAddressWidth(event.nativeEvent.layout.width);
        }
      };
      
      const truncatedAddress = () => {
        if (!addressText || !addressWidth) return '';
        const text = addressText;
        const maxCharsWidth = addressWidth / 12; 
        const maxChars = 17; 
        if (text.length > maxChars) {
          return text.slice(0, maxChars) + '...';
        }
        return text;
      };
      
      useEffect(() => {
        setAddressText(customerKYCData['House Address'] || '');
        setAltPhoneText(customerKYCData['Alternate Phone Number'] || '');
      }, [customerKYCData]);

    
    const togglePersonalDetails = () => {
        setPersonalDetailsCollapsed(!personalDetailsCollapsed);
    };
    const toggleTruckDetails= ()=>{
        setTruckDetails(!truckDetails)
    }
    const toggleKycDocuments = () =>{
        setKycDocuments(!kycDocuments)
    }
    
    return (
        <View>
            <TouchableOpacity onPress={togglePersonalDetails}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('personaldetails')}</Text>
                    <Icon
                        name={personalDetailsCollapsed ? 'chevron-right' : 'chevron-down'}
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={personalDetailsCollapsed}>
            <TouchableOpacity onPress={() => handlePress('dob')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('dob')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Date of Birth']?.split(' ')[0]}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('pan')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('pan')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['PAN Number']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('noofchildren')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('numchildren')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Number of Children']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('montlyemioutflow')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('monthlyemi')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Monthly EMI Outflow']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('housetype')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('housetype')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['House Owned or Rented']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('noofyearsinbusiness')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('numofbusinessyers')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Number of years in business']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => handlePress('city')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('city')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['City']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                    
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('phone')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('phonenumber')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Phone Number']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('altphone')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('altnumber')}</Text>
                        <View style={styles.valueContainer} onLayout={handleAltPhoneLayout}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.valueText}>{truncatedAltPhone()}</Text>
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('marital')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('maritalstatus')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Marital Status']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                {/* New section for House Address */}
                <TouchableOpacity onPress={() => handlePress('houseaddress')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('houseadress')}</Text>
                    <View style={styles.valueContainer} onLayout={handleAddressLayout}>
                    <Text style={styles.valueText}>{truncatedAddress()}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
        </TouchableOpacity>    
            </Collapsible>
            <TouchableOpacity onPress={toggleTruckDetails}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('truckdetails')}</Text>
                    <Icon
                        name={truckDetails ? 'chevron-right' : 'chevron-down'}
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={truckDetails}>
                <TouchableOpacity>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('nooftrucks')}</Text>
                    <View style={styles.valueContainer}>
                        <Text style={styles.valueText}>{numberOfTrucks}</Text>
                        {/* <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} /> */}
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('trucknumber')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('addtrucks')}</Text>
                        <View style={styles.valueContainer}>
                            
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Collapsible>
            <TouchableOpacity onPress={toggleKycDocuments}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('kycdocuments')}</Text>
                    <Icon
                        name={kycDocuments ? 'chevron-right' : 'chevron-down'}
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={kycDocuments}>
                <TouchableOpacity onPress={() => handlePress('pancard')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('pancard')}</Text>
                        <View style={styles.valueContainer}>
                            
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('aadharcard')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('aadharcard')}</Text>
                        <View style={styles.valueContainer}>
                            
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        marginLeft: 10,
    },
    kycItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 70,
        alignItems: 'center',
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
});

export default KYCCard;

