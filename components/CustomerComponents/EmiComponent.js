// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { Table, Row } from 'react-native-table-component';
// import { useSelector } from 'react-redux'; // Import useSelector hook
// import { selectCustomerData } from '../../redux/slices/authSlice';
// const formatDate = (inputDate) => {
//   const options = { month: 'short', day: 'numeric', year: 'numeric' };
//   const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
//   return formattedDate;
// };

// const EmiComponent = () => {
//   const customerData = useSelector(selectCustomerData);
//   const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//   const [loanTables, setLoanTables] = useState({});
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       setLoading(true);
//   //       const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//   //       const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
//   //       //console.log('Response Data:', response.data);
//   //       const apiTableData = response.data.data.map((loan, index) => ({
//   //         amount: loan.amount,
//   //         emiNumber: (index + 1).toString(),
//   //         emiDate: loan['emi date'],
//   //         paymentStatus: loan.status,
//   //         statusColor: loan.status.toLowerCase() === 'paid' ? 'green' : 'red',
//   //         loanId: loan['loan id'],
//   //       }));

//   //       const groupedTables = {};
//   //       apiTableData.forEach((row) => {
//   //         const loanID = row.loanId;
//   //         if (!groupedTables[loanID]) {
//   //           groupedTables[loanID] = [];
//   //         }
//   //         groupedTables[loanID].push({
//   //           ...row,
//   //           emiNumber: (groupedTables[loanID].length + 1).toString(),
//   //         });
//   //       });

//   //       const sortedLoanIds = Object.keys(groupedTables)
//   //         .sort((a, b) => parseInt(b) - parseInt(a));

//   //       const sortedLoanTables = {};
//   //       sortedLoanIds.forEach((loanID) => {
//   //         sortedLoanTables[loanID] = groupedTables[loanID];
//   //       });

//   //       setLoanTables(sortedLoanTables);
//   //     } catch (error) {
//   //       console.error('Error fetching data emi Data:', error.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [customerPhoneNumber]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//         const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        
//         const apiTableData = response.data.data.map((loan, index) => ({
//           amount: loan.amount,
//           emiNumber: (index + 1).toString(),
//           emiDate: loan['emi date'],
//           paymentStatus: loan.status,
//           statusColor: loan.status.toLowerCase() === 'paid' ? 'green' : 'red',
//           loanId: loan['loan id'],
//         }));
  
//         // Filter out only unpaid or bounced loans
//         const filteredTableData = apiTableData.filter(loan => loan.paymentStatus.toLowerCase() === 'unpaid' || loan.paymentStatus.toLowerCase() === 'bounced');
  
//         const groupedTables = {};
//         filteredTableData.forEach((row) => {
//           const loanID = row.loanId;
//           if (!groupedTables[loanID]) {
//             groupedTables[loanID] = [];
//           }
//           groupedTables[loanID].push({
//             ...row,
//             emiNumber: (groupedTables[loanID].length + 1).toString(),
//           });
//         });
  
//         const sortedLoanIds = Object.keys(groupedTables)
//           .sort((a, b) => parseInt(b) - parseInt(a));
  
//         const sortedLoanTables = {};
//         sortedLoanIds.forEach((loanID) => {
//           sortedLoanTables[loanID] = groupedTables[loanID];
//         });
  
//         setLoanTables(sortedLoanTables);
//       } catch (error) {
//         console.error('Error fetching data emi Data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, [customerPhoneNumber]);
  

//   const flexArr = [1.5, 1.5, 2, 2];
//   const fontsize = 18;

//   return (
//     <View style={styles.container}>
//       <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>Active Loans</Text>
//       {loading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3c82f6" />
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       )}
//       {!loading && loanTables && Object.entries(loanTables)
//         .sort(([a], [b]) => parseInt(b) - parseInt(a))
//         .map(([loanID, tableData]) => (
//           <View key={loanID} style={styles.tableContainer}>
//             <Text style={styles.loanIdText}>Loan Account: {loanID}</Text>
//             <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop: 10 }}>
//               <Row
//                 data={['Emi Number', 'EMI Due Date', 'Amount', 'Status']}
//                 style={styles.head}
//                 textStyle={styles.headText}
//                 flexArr={flexArr}
//               />
//               {tableData.map((rowData, index) => (
//                 <Row
//                   key={index}
//                   data={[
//                     rowData.emiNumber,
//                     formatDate(rowData.emiDate),
//                     `₹ ${rowData.amount}`,
//                     <Text
//                       key={index}
//                       style={{
//                         ...styles.text,
//                         color: rowData.statusColor === 'green' ? 'green' : 'red',
//                         fontSize: fontsize,
//                         fontWeight: '400',
//                         margin: 6,
//                         padding: 10,
//                       }}
//                     >
//                       {rowData.paymentStatus}
//                     </Text>,
//                   ]}
//                   style={styles.row}
//                   textStyle={styles.text}
//                   flexArr={flexArr}
//                 />
//               ))}
//             </Table>
//           </View>
//         ))}
//       {!loading && Object.keys(loanTables).length === 0 && (
//         <Text style={styles.noEmiText}>No EMIs for loans.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     marginBottom: 20,
//     marginHorizontal: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: 'black',
//     fontSize: 18,
//     marginTop: 10,
//   },
//   head: {
//     height: 60,
//     backgroundColor: '#e5e7eb',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 20,
//     flexDirection: 'row',
//     textAlign: 'center'
//   },
//   text: {
//     textAlign: 'center',
//     margin: 6,
//     color: 'black',
//     fontWeight: '500',
//   },
//   headText: {
//     textAlign: 'center',
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 15,
//     height: 70,
//     paddingTop: 15,
//     alignItems: 'center',
//   },
//   row: { flexDirection: 'row', height: 70 },
//   loanIdText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: 'black',
//     marginBottom: 10,
//   },
//   noEmiText: {
//     fontSize: 18,
//     color: 'black',
//     marginTop: 10,
//   },
//   tableContainer: {
//     marginBottom: 20,
//   },
// });

// export default EmiComponent;
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { Table, Row } from 'react-native-table-component';
// import { useSelector } from 'react-redux'; // Import useSelector hook
// import { selectCustomerData } from '../../redux/slices/authSlice';

// const formatDate = (inputDate) => {
//   const options = { month: 'short', day: 'numeric', year: 'numeric' };
//   const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
//   return formattedDate;
// };

// const EmiComponent = () => {
//   const customerData = useSelector(selectCustomerData);
//   const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//   const [loanTables, setLoanTables] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//         const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        
//         const apiTableData = response.data.data.map((loan, index) => ({
//           amount: loan.amount,
//           emiNumber: (index + 1).toString(),
//           emiDate: loan['emi date'],
//           paymentStatus: loan.status,
//           statusColor: loan.status.toLowerCase() === 'paid' ? 'green' : 'red',
//           loanId: loan['loan id'],
//         }));

//         const groupedTables = {};
//         apiTableData.forEach((row) => {
//           const loanID = row.loanId;
//           if (!groupedTables[loanID]) {
//             groupedTables[loanID] = [];
//           }
//           groupedTables[loanID].push({
//             ...row,
//             emiNumber: (groupedTables[loanID].length + 1).toString(),
//           });
//         });

//         const sortedLoanIds = Object.keys(groupedTables)
//           .sort((a, b) => parseInt(b) - parseInt(a));

//         const sortedLoanTables = {};
//         sortedLoanIds.forEach((loanID) => {
//           // Check if any EMI for this loan is unpaid
//           const hasUnpaidEmi = groupedTables[loanID].some(emi => emi.paymentStatus.toLowerCase() === 'unpaid');
//           if (hasUnpaidEmi) {
//             sortedLoanTables[loanID] = groupedTables[loanID];
//           }
//         });

//         setLoanTables(sortedLoanTables);
//       } catch (error) {
//         console.error('Error fetching data emi Data:', error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [customerPhoneNumber]);

//   const flexArr = [1.5, 1.5, 2, 2];
//   const fontsize = 18;

//   return (
//     <View style={styles.container}>
//       <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>Active Loans</Text>
//       {loading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3c82f6" />
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       )}
//       {!loading && loanTables && Object.entries(loanTables)
//         .sort(([a], [b]) => parseInt(b) - parseInt(a))
//         .map(([loanID, tableData]) => (
//           <View key={loanID} style={styles.tableContainer}>
//             <Text style={styles.loanIdText}>Loan Account: {loanID}</Text>
//             <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop: 10 }}>
//               <Row
//                 data={['Emi Number', 'EMI Due Date', 'Amount', 'Status']}
//                 style={styles.head}
//                 textStyle={styles.headText}
//                 flexArr={flexArr}
//               />
//               {tableData.map((rowData, index) => (
//                 <Row
//                   key={index}
//                   data={[
//                     rowData.emiNumber,
//                     formatDate(rowData.emiDate),
//                     `₹ ${rowData.amount}`,
//                     <Text
//                       key={index}
//                       style={{
//                         ...styles.text,
//                         color: rowData.statusColor === 'green' ? 'green' : 'red',
//                         fontSize: fontsize,
//                         fontWeight: '400',
//                         margin: 6,
//                         padding: 10,
//                       }}
//                     >
//                       {rowData.paymentStatus}
//                     </Text>,
//                   ]}
//                   style={styles.row}
//                   textStyle={styles.text}
//                   flexArr={flexArr}
//                 />
//               ))}
//             </Table>
//           </View>
//         ))}
//       {!loading && Object.keys(loanTables).length === 0 && (
//         <Text style={styles.noEmiText}>No Active loans.</Text>
//       )}
//       <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>Closed Loans</Text>
      
      
      
//         <Text style={styles.noEmiText}>No Active loans.</Text>
      
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 40,
//     marginBottom: 20,
//     marginHorizontal: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: 'black',
//     fontSize: 18,
//     marginTop: 10,
//   },
//   head: {
//     height: 60,
//     backgroundColor: '#e5e7eb',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 20,
//     flexDirection: 'row',
//     textAlign: 'center'
//   },
//   text: {
//     textAlign: 'center',
//     margin: 6,
//     color: 'black',
//     fontWeight: '500',
//   },
//   headText: {
//     textAlign: 'center',
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 15,
//     height: 70,
//     paddingTop: 15,
//     alignItems: 'center',
//   },
//   row: { flexDirection: 'row', height: 70 },
//   loanIdText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: 'black',
//     marginBottom: 10,
//   },
//   noEmiText: {
//     fontSize: 18,
//     color: 'black',
//     marginTop: 10,
//   },
//   tableContainer: {
//     marginBottom: 20,
//   },
// });

// export default EmiComponent;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Table, Row } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import { selectCustomerData } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
const formatDate = (inputDate) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
};

const EmiComponent = () => {
  const { t } = useTranslation();
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [activeLoanTables, setActiveLoanTables] = useState({});
  const [closedLoanTables, setClosedLoanTables] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        //console.log("Emi response", response.data.data)
        const apiTableData = response.data.data.map((loan, index) => ({
          amount: loan.amount,
          emiNumber: (index + 1).toString(),
          emiDate: loan['emi date'],
          paymentStatus: loan.status,
          statusColor: loan.status.toLowerCase() === 'paid' ? 'green' : 'red',
          loanId: loan['loan id'],
        }));

        const groupedActiveTables = {};
        const groupedClosedTables = {};

        apiTableData.forEach((row) => {
          const loanID = row.loanId;
          if (!groupedActiveTables[loanID]) {
            groupedActiveTables[loanID] = [];
          }
          groupedActiveTables[loanID].push({
            ...row,
            emiNumber: (groupedActiveTables[loanID].length + 1).toString(),
          });
          if (!groupedClosedTables[loanID]) {
            groupedClosedTables[loanID] = [];
          }
          groupedClosedTables[loanID].push({
            ...row,
            emiNumber: (groupedClosedTables[loanID].length + 1).toString(),
          });
        });

        const sortedActiveLoanIds = Object.keys(groupedActiveTables)
          .sort((a, b) => parseInt(b) - parseInt(a));
        const sortedClosedLoanIds = Object.keys(groupedClosedTables)
          .sort((a, b) => parseInt(b) - parseInt(a));

        const sortedActiveLoanTables = {};
        const sortedClosedLoanTables = {};

        sortedActiveLoanIds.forEach((loanID) => {
          const hasUnpaidEmi = groupedActiveTables[loanID].some(emi => emi.paymentStatus.toLowerCase() === 'unpaid' || emi.paymentStatus.toLowerCase() === 'bounced');
          if (hasUnpaidEmi) {
            sortedActiveLoanTables[loanID] = groupedActiveTables[loanID];
          }
        });

        sortedClosedLoanIds.forEach((loanID) => {
          const allEmisPaid = groupedClosedTables[loanID].every(emi => emi.paymentStatus.toLowerCase() === 'paid');
          if (allEmisPaid) {
            sortedClosedLoanTables[loanID] = groupedClosedTables[loanID];
          }
        });

        setActiveLoanTables(sortedActiveLoanTables);
        setClosedLoanTables(sortedClosedLoanTables);
      } catch (error) {
        console.error('Error fetching data emi Data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerPhoneNumber]);

  const flexArr = [1.5, 1.5, 2, 2];
  const fontsize = 18;





  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>{t('activeloans')}</Text>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c82f6" />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      )}
      {!loading && activeLoanTables && Object.entries(activeLoanTables)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([loanID, tableData]) => (
          <View key={loanID} style={styles.tableContainer}>
            <Text style={styles.loanIdText}>{t('loanaccount')} {loanID}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop: 10 }}>
              <Row
                data={[
                  t('eminumber'),
                  t('emiduedate'),
                  t('amount'),
                  t('status')
                ]}
                style={styles.head}
                textStyle={styles.headText}
                flexArr={flexArr}
              />
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    rowData.emiNumber,
                    formatDate(rowData.emiDate),
                    `₹ ${rowData.amount}`,
                    <Text
                      key={index}
                      style={{
                        ...styles.text,
                        color: rowData.statusColor === 'green' ? 'green' : 'red',
                        fontSize: fontsize,
                        fontWeight: '400',
                        margin: 6,
                        padding: 10,
                      }}
                    >
                      {t(`paymentStatus.${rowData.paymentStatus.toLowerCase()}`)}
                    </Text>,
                  ]}
                  style={styles.row}
                  textStyle={styles.text}
                  flexArr={flexArr}
                />
              ))}
            </Table>
          </View>
        ))}
      {!loading && Object.keys(activeLoanTables).length === 0 && (
        <Text style={styles.noEmiText}>{t('noactiveloans')}</Text>
      )}
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>{t('closedloans')}</Text>
      {!loading && closedLoanTables && Object.entries(closedLoanTables)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([loanID, tableData]) => (
          <View key={loanID} style={styles.tableContainer}>
            <Text style={styles.loanIdText}>{t('loanaccount')}{loanID}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop: 10 }}>
              <Row
                 data={[
                  t('eminumber'),
                  t('emiduedate'),
                  t('amount'),
                  t('status')
                ]}
                style={styles.head}
                textStyle={styles.headText}
                flexArr={flexArr}
              />
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    rowData.emiNumber,
                    formatDate(rowData.emiDate),
                    `₹ ${rowData.amount}`,
                    <Text
                      key={index}
                      style={{
                        ...styles.text,
                        color: rowData.statusColor === 'green' ? 'green' : 'red',
                        fontSize: fontsize,
                        fontWeight: '400',
                        margin: 6,
                        padding: 10,
                      }}
                    >
                      {t(`paymentStatus.${rowData.paymentStatus.toLowerCase()}`)}
                    </Text>,
                  ]}
                  style={styles.row}
                  textStyle={styles.text}
                  flexArr={flexArr}
                />
              ))}
            </Table>
          </View>
        ))}
      {!loading && Object.keys(closedLoanTables).length === 0 && (
        <Text style={styles.noEmiText}>{t('noclosedloans')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
  },
  head: {
    height: 60,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection: 'row',
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    margin: 6,
    color: 'black',
    fontWeight: '500',
  },
  headText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    height: 70,
    paddingTop: 15,
    alignItems: 'center',
  },
  row: { flexDirection: 'row', height: 70 },
  loanIdText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    marginBottom: 10,
  },
  noEmiText: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  tableContainer: {
    marginBottom: 20,
  },
});

export default EmiComponent;
