import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ActiveApplications = ({ customerData }) => {
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        console.log(modifiedMobileNumber)
        //const response = await axios.get(`https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_203=942035807`);
       const response = await axios.get(`https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_203%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        const apiData = response.data.data;
        console.log(apiData)
        const formattedData = apiData.map((item) => ({
          id: item.record_id,
          date: item.Date,
          amount: parseFloat(item['Loan amount requested']),

          status: item['Workflow Status'].toLowerCase().trim(),
        }));
        console.log(formattedData.map(item => item.status));
        // Filter the data based on specific statuses
        const filteredData = formattedData.filter(item => ['sanctioned', 'requested', 'escalate'].includes(item.status));
        console.log(filteredData)
      setTableData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const flexArr = [1.5, 1.5, 2, 2];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Active Loan Applications</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c82f6" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : tableData.length > 0 ? (
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.head}>
              <Text style={[styles.headText, { flex: flexArr[0] }]}>ID</Text>
              <Text style={[styles.headText, { flex: flexArr[1] }]}>Date</Text>
              <Text style={[styles.headText, { flex: flexArr[2] }]}>Amount</Text>
              <Text style={[styles.headText, { flex: flexArr[3] }]}>Status</Text>
            </View>
            {tableData.map((rowData, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.text, { flex: flexArr[0] }]}>{rowData.id}</Text>
                <Text style={[styles.text, { flex: flexArr[1] }]}>{rowData.date}</Text>
                <Text style={[styles.text, { flex: flexArr[2] }]}>{rowData.amount}</Text>
                <Text style={[styles.text, { flex: flexArr[3] }, rowData.status === 'sanctioned' ? styles.greenText : styles.orangeText]}>{rowData.status}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.noDataText}>No active loan applications</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 25,
    textAlign: 'center',
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
  tableContainer: {
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  head: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#e5e7eb',
  },
  headText: {
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#4b5563',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center',
    color: '#4b5563',
  },
  greenText: {
    color: 'green',
  },
  orangeText: {
    color: 'orange',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
});

export default ActiveApplications;
