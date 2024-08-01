// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import { setCustomerKYCData, selectCustomerKYCData } from '../../redux/slices/authSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux'; // Import useSelector hook
// import { selectCustomerData } from '../../redux/slices/authSlice';
// import { useTranslation } from 'react-i18next';

// const CustomerKYC = () => {
//   console.log("inKycCustomer")
//   const {t} = useTranslation();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const customerData = useSelector(selectCustomerData);
//   const customerKYCData = useSelector(selectCustomerKYCData);
//   const [dataFetched, setDataFetched] = useState(false);
//   //console.log("CustomerKYCDATA",customerKYCData);
//   const [kycStatus, setKycStatus] = useState('');
//   const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//   const [imageUrl, setImageUrl] = useState('https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg');
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//         const response = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
//         const apiData = response.data.data[0] || {};
//         dispatch(setCustomerKYCData(apiData));
//         //console.log("apiData",apiData)
//         //console.log(customerKYCData?.['KYC Status'])
//         const kycStatusFromData = apiData?.['KYC Status'];
//         if (kycStatusFromData === 'Active') {
//           setKycStatus(t('completed'));
//         } else {
//           setKycStatus(t('incomplete'));
//         }
//         const photoArray = JSON.parse(apiData?.['Photo'] || '[]');
//         const firstImage = photoArray.length > 0 ? photoArray[0] : {};
//         const imageUri = firstImage.fullpath || '';
//         setImageUrl(imageUri);
//         setDataFetched(true);
//       } catch (err) {
//         console.log("Error in Fetching apiData in customerKYC file", err)
//       }
//     };

//     fetchData();
//   }, [customerPhoneNumber]);

//   const handleCardPress = () => {
//     navigation.navigate('CustomerProfile');
//   };

//   return (
//     <TouchableOpacity onPress={handleCardPress}>
//       <View style={styles.cardContainer}>
//       <View style={styles.leftContainer}>
//         <View style={styles.imageContainer}>
//         {customerKYCData?.Photo && customerKYCData.Photo.length > 0 && JSON.parse(customerKYCData.Photo)[0] && JSON.parse(customerKYCData.Photo)[0].fullpath ? (
//           <Image
//             source={{
//               uri: JSON.parse(customerKYCData.Photo)[0].fullpath ,
//               headers: {
//                 Accept: '*/*',
//               },
//             }}
//             style={styles.userImage}
//             resizeMode={'cover'}
//           />
//         ) : (
//           <Image
//             source={{
//               uri: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg' ,
//               headers: {
//                 Accept: '*/*',
//               },
//             }}
//             style={styles.userImage}
//             resizeMode={'cover'}
//           />
//         )}

//         </View>
//         {/* <View style={styles.infoContainer}>
//           <Text style={styles.cardName}>{t('customerkyc')}</Text>
//           <Text style={[styles.kycStatus, kycStatus === t('completed') ? styles.completedStatus : styles.incompleteStatus]}>{kycStatus}</Text>
//         </View> */}
//         <View style={styles.infoContainer}>
//           <Text style={styles.cardName}>{t('customerkyc')}</Text>
//           <Text style={[
//             styles.kycStatus,
//             customerKYCData?.['KYC Status'] === 'Updated' ? styles.updatedStatus : (customerKYCData?.['KYC Status'] === 'Inactive' ? styles.incompleteStatus : styles.completedStatus)
//           ]}>
//             {customerKYCData?.['KYC Status'] === 'Updated' ? t('updated') : (customerKYCData?.['KYC Status'] === 'Inactive' ? t('incomplete') : t('completed'))}
//           </Text>
//         </View>

//       </View>

//       {dataFetched && <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} onPress={handleCardPress}/>}

//     </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     backgroundColor: 'white',
//     marginVertical: 5,
//     padding: 12,
//     borderRadius: 10,
//     elevation: 4,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginHorizontal: 10,
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     marginRight: 10,

//   },
//   userImage: {
//     "width": 50,
//     "height": 50,
//     "borderRadius": 25,

//   },
//   cardName: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   kycStatus: {
//     color: 'gray',
//     fontSize: 18,
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   icon: {
//     marginLeft: 'auto',
//     marginRight:8
//   },
//   completedStatus: {
//     color: 'green',
// },
// incompleteStatus: {
//     color: 'red',
// },
// updatedStatus:{
//   color:'#ff1493'
// }
// });

// export default CustomerKYC;
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {
  setCustomerKYCData,
  selectCustomerKYCData,
} from '../../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectCustomerData} from '../../redux/slices/authSlice';
import {useTranslation} from 'react-i18next';

const CustomerKYC = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerData = useSelector(selectCustomerData);
  const customerKYCData = useSelector(selectCustomerKYCData);
 // console.log('inCustomerKyc', customerKYCData);
  const [dataFetched, setDataFetched] = useState(false);
  const [kycStatus, setKycStatus] = useState('');
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [imageUrl, setImageUrl] = useState(
    'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber =
          customerPhoneNumber.length > 10
            ? customerPhoneNumber.slice(-10)
            : customerPhoneNumber;
        const response = await axios.get(
          `https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(
            modifiedMobileNumber,
          )}%22`,
        );
        const apiData = response.data.data[0] || {};
        console.log('CustomerKycData', apiData);
        dispatch(setCustomerKYCData(apiData));

        const kycStatusFromData = apiData?.['KYC Status'];
        // console.log("in Customer kyc ", kycStatusFromData);
        // if (kycStatusFromData === 'Active') {
        //   setKycStatus(t('completed'));
        // } else {
        //   setKycStatus(t('incomplete'));
        // }
        const photoArray = JSON.parse(apiData?.['Photo'] || '[]');
        const firstImage = photoArray.length > 0 ? photoArray[0] : {};
        const imageUri = firstImage.fullpath || '';
        setImageUrl(imageUri);
        setDataFetched(true);
      } catch (err) {
        console.log('Error in Fetching apiData in customerKYC file', err);
      }
    };

    fetchData();
  }, [customerPhoneNumber, dispatch]);

  const handleCardPress = () => {
    navigation.navigate('CustomerProfile');
  };

  return (
    <View>
      {dataFetched && (
        <TouchableOpacity onPress={handleCardPress}>
          <View style={styles.cardContainer}>
            <View style={styles.leftContainer}>
              <View style={styles.imageContainer}>
                {customerKYCData?.Photo &&
                customerKYCData.Photo.length > 0 &&
                JSON.parse(customerKYCData.Photo)[0] &&
                JSON.parse(customerKYCData.Photo)[0].fullpath ? (
                  <Image
                    source={{
                      uri: JSON.parse(customerKYCData.Photo)[0].fullpath,
                      headers: {
                        Accept: '*/*',
                      },
                    }}
                    style={styles.userImage}
                    resizeMode={'cover'}
                  />
                ) : (
                  <Image
                    source={{
                      uri: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
                      headers: {
                        Accept: '*/*',
                      },
                    }}
                    style={styles.userImage}
                    resizeMode={'cover'}
                  />
                )}
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.cardName}>{t('customerkyc')}</Text>
                <Text style={[styles.kycStatus, 
              !customerKYCData?.['KYC Status'] || customerKYCData?.['KYC Status'] === 'Inactive'
                ? styles.incompleteStatus
                : customerKYCData?.['KYC Status'] === 'Updated'
                ? styles.updatedStatus
                : styles.completedStatus,
            ]}>
              {customerKYCData?.['KYC Status'] === 'Updated'
                ? t('updated')
                : !customerKYCData?.['KYC Status'] || customerKYCData?.['KYC Status'] === 'Inactive'
                ? t('incomplete')
                : t('completed')}
            </Text>


              </View>
            </View>
            <Icon
              name="chevron-right"
              size={20}
              color="#9ca3af"
              style={styles.icon}
              onPress={handleCardPress}
            />
          </View>
        </TouchableOpacity>
      )}
      {!dataFetched && (
        <View style={styles.cardContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
                  headers: {
                    Accept: '*/*',
                  },
                }}
                style={styles.userImage}
                resizeMode={'cover'}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.cardName}>{t('customerkyc')}</Text>
              <Text style={[styles.kycStatus, styles.loadingStatus]}>
                {t('loading')}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cardName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  kycStatus: {
    color: 'gray',
    fontSize: 18,
  },
  infoContainer: {
    flex: 1,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 8,
  },
  completedStatus: {
    color: 'green',
  },
  incompleteStatus: {
    color: 'red',
  },
  updatedStatus: {
    color: '#ff1493',
  },
  loadingStatus: {
    color: 'gray',
  },
});

export default CustomerKYC;
