// import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// const AppBar = () => {
//   const [showPdfModal, setShowPdfModal] = useState(false);
//   const [pdfUrl, setPdfUrl] = useState('');
//   const navigation = useNavigation();
//   const handleBack = () => {
//     navigation.navigate('Home');
//   };
//   const handlePdfDownload = () => {
//     Linking.openURL(pdfUrl);
//     setShowPdfModal(false);
//   };
//   const handleCloseModal = () => {
//     setShowPdfModal(false);
//   };
//   const handlePdfClick = async () => {
//     try {
//       const response = await axios.get('https://backendforpnf.vercel.app/testloans?criteria=sheet_59283844.column_793=+919960008186');
  
//       if (response.data && response.data.data && response.data.data.length > 0) {
//         const loanData = response.data.data[0];
        
//         if (loanData && loanData.PDF) {
//           const pdfArray = JSON.parse(loanData.PDF);
          
//           if (pdfArray && pdfArray.length > 0) {
//             const pdfInfo = pdfArray[0];
            
//             if (pdfInfo && pdfInfo.filepath) {
//               const pdfUrl = `https://pnf.tigersheet.com/user/file/download?filepath=${pdfInfo.filepath}&column_id=1209&row_id=${loanData.record_id}&list_id=59283844`;
              
//               // Prompt the user to download the PDF file manually
//               console.log('Please download the PDF file:', pdfUrl);
//               // 
//               setPdfUrl(pdfUrl);
//               setShowPdfModal(true);
//             }
//           }
//         } else {
//           console.log('PDF URL not found in the loan data.');
//         }
//       } else {
//         console.log('No data found in the response.');
//       }
//     } catch (error) {
//       console.error('Error fetching PDF:', error);
//     }
//   };
  
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <TouchableOpacity onPress={handleBack}>
//           <Icon name="arrow-left" size={23} color="white" />
//         </TouchableOpacity>
//         <View style={styles.titleContainer}>
//           <Text style={styles.appBarTitle}>Customer Details</Text>
//         </View>
//         <TouchableOpacity onPress={handlePdfClick}>
//           <Icon name="file-pdf" size={23} color="white" style={styles.pdfIcon} />
//         </TouchableOpacity>
//       </View>
//       {showPdfModal && (
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalText}>Click the link to download the PDF:</Text>
//             <TouchableOpacity onPress={handlePdfDownload}>
//               <Text style={styles.pdfLink}>{pdfUrl}</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleCloseModal}>
//               <Text style={styles.closeButton}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#12b981',
//     padding: 16,
//     alignItems: 'center',
//     marginBottom:40
//   },
//   appBarTitle: {
//     fontSize: 23,
//     color: 'white',
//     fontWeight: '600',
//   },
//   titleContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   pdfIcon: {
//     marginLeft: 20, // Adjust the spacing as needed
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   pdfLink: {
//     fontSize: 16,
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });

// export default AppBar

// function alert(arg0: string) {
//   throw new Error('Function not implemented.');
// }
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { selectCustomerData } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
const AppBar = () => {
  const {t} = useTranslation();
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfDataAvailable, setPdfDataAvailable] = useState(false);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const handlePdfDownload = () => {
    Linking.openURL(pdfUrl);
    setShowPdfModal(false);
  };

  const handleCloseModal = () => {
    setShowPdfModal(false);
  };
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={23} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.appBarTitle}>{t('customerdetails')}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#12b981',
    padding: 16,
    alignItems: 'center',
    
  },
  appBarTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: '600',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  pdfIcon: {
    marginLeft: 20, // Adjust the spacing as needed
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  pdfLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: 'red',
  },
});

export default AppBar;
