// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import { Table, Row } from 'react-native-table-component';
// import { useNavigation } from '@react-navigation/native';
// const formatDate = (inputDate) => {
//   const options = { month: 'short', day: 'numeric', year: 'numeric' };
//   const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
//   return formattedDate;
// };

// const EmiComponent = ({ customerData }) => {

//   const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
//   const [loanTables, setLoanTables] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
//         const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
//         console.log('Response Data:', response.data);
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
//           groupedTables[loanID].push(row);
//         });
//         const sortedLoanIds = Object.keys(groupedTables).sort((a, b) => parseInt(b) - parseInt(a));

//         const sortedLoanTables = {};
// sortedLoanIds.forEach((loanID) => {
//   sortedLoanTables[loanID] = groupedTables[loanID];
// });

// setLoanTables(sortedLoanTables);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
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
//         <Text style={{fontSize:23, fontWeight:'bold', color:'black'}}>Active Loans</Text>
//       {loading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#3c82f6" />
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       )}
//       {!loading && loanTables && Object.entries(loanTables).map(([loanID, tableData]) => (
//         <View key={loanID} style={styles.tableContainer}>
//           <Text style={styles.loanIdText}>Loan Account: {loanID}</Text>
//           <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop:10 }}>
//             <Row
//               data={['Emi Number', 'EMI Due Date', 'Amount', 'Status']}
//               style={styles.head}
//               textStyle={styles.headText}
//               flexArr={flexArr}
//             />
//             {tableData.map((rowData, index) => (
//               <Row
//                 key={index}
//                 data={[
//                   rowData.emiNumber,
//                   formatDate(rowData.emiDate),
//                   `₹ ${rowData.amount}`,
//                   <Text
//                     key={index}
//                     style={{
//                       ...styles.text,
//                       color: rowData.statusColor === 'green' ? 'green' : 'red',
//                       fontSize: fontsize,
//                       fontWeight: '400',
//                       margin: 6,
//                       padding: 10,
//                     }}
//                   >
//                     {rowData.paymentStatus}
//                   </Text>,
//                 ]}
//                 style={styles.row}
//                 textStyle={styles.text}
//                 flexArr={flexArr}
//               />
//             ))}
//           </Table>
//         </View>
//       ))}
//       {!loading && !loanTables && <Text style={styles.noEmiText}>No EMIs for loans.</Text>}
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
//     paddingTop:20, 
//     flexDirection: 'row', 
//     textAlign:'center'
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
import { useSelector } from 'react-redux'; // Import useSelector hook
import { selectCustomerData } from '../../redux/slices/authSlice';
const formatDate = (inputDate) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
};

const EmiComponent = () => {
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [loanTables, setLoanTables] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        //console.log('Response Data:', response.data);
        const apiTableData = response.data.data.map((loan, index) => ({
          amount: loan.amount,
          emiNumber: (index + 1).toString(),
          emiDate: loan['emi date'],
          paymentStatus: loan.status,
          statusColor: loan.status.toLowerCase() === 'paid' ? 'green' : 'red',
          loanId: loan['loan id'],
        }));

        const groupedTables = {};
        apiTableData.forEach((row) => {
          const loanID = row.loanId;
          if (!groupedTables[loanID]) {
            groupedTables[loanID] = [];
          }
          groupedTables[loanID].push({
            ...row,
            emiNumber: (groupedTables[loanID].length + 1).toString(),
          });
        });

        const sortedLoanIds = Object.keys(groupedTables)
          .sort((a, b) => parseInt(b) - parseInt(a));

        const sortedLoanTables = {};
        sortedLoanIds.forEach((loanID) => {
          sortedLoanTables[loanID] = groupedTables[loanID];
        });

        setLoanTables(sortedLoanTables);
      } catch (error) {
        console.error('Error fetching data:', error.message);
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
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>Active Loans</Text>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c82f6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {!loading && loanTables && Object.entries(loanTables)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([loanID, tableData]) => (
          <View key={loanID} style={styles.tableContainer}>
            <Text style={styles.loanIdText}>Loan Account: {loanID}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop: 10 }}>
              <Row
                data={['Emi Number', 'EMI Due Date', 'Amount', 'Status']}
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
                      {rowData.paymentStatus}
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
      {!loading && Object.keys(loanTables).length === 0 && (
        <Text style={styles.noEmiText}>No EMIs for loans.</Text>
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
