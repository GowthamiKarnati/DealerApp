import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { selectCustomerData } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ActiveApplications = () => {
  const {t} = useTranslation();
  const customerData = useSelector(selectCustomerData);
  //console.log(customerData);
  //console.log("alternate mobilenumber",customerData['alternate mobile number']);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableVisible, setTableVisibility] = useState(false);
  const [allloans, setAllloans] = useState([])
  const [showAllLoans, setShowAllLoans] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        console.log(modifiedMobileNumber)
        //const response = await axios.get(`https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_203=942035807`);
       const response = await axios.get(`https://backendforpnf.vercel.app/loanapplication?criteria=sheet_38562544.column_203%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        const apiData = response.data.data;
        //console.log("loan application Data : ", apiData)
        const formattedData = apiData.map((item) => ({
          id: item.record_id,
          amount: parseFloat(item['Loan amount requested']),
          sanctionedamount : parseFloat(item['amount sanctioned']),
          status: item['Workflow Status'].toLowerCase().trim(),
        }));
        //console.log("formateddata", formattedData);
        // Filter the data based on specific statuses
        const filteredData = formattedData.filter(item => ['sanctioned', 'requested', 'escalate'].includes(item.status));
        const filteredloans = formattedData.filter(item => ['loan account created', 'expired', 'rejected'].includes(item.status));
        //console.log(filteredData)
        //console.log("showallloans",filteredloans);
      setTableData(filteredData);
      setAllloans(filteredloans)
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const toggleTableVisibility = () => {
    setTableVisibility(!isTableVisible);
  };
  const toggleShowAllLoans = () => {
    setShowAllLoans(!showAllLoans);
  };

  const flexArr = [1.5, 1.5, 2, 2];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleTableVisibility} style={styles.button}>
        <Text style={styles.buttonText}>{t('activeloanapplications')}</Text>
      </TouchableOpacity>
      {isTableVisible && (
      loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c82f6" />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      ) : tableData.length > 0 ? (
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.head}>
              <Text style={[styles.headText, { flex: flexArr[0] }]}>{t('id')}</Text>
              
              <Text style={[styles.headText, { flex: flexArr[1] }]}>{t('amount')}</Text>
              <Text style={[styles.headText, { flex: flexArr[2] }]}>{t('sanctinedamount')}</Text>
              <Text style={[styles.headText, { flex: flexArr[3] }]}>{t('status')}</Text>
            </View>
            {tableData.map((rowData, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.text, { flex: flexArr[0] }]}>{rowData.id}</Text>
                
                <Text style={[styles.text, { flex: flexArr[1] }]}>{rowData.amount}</Text>
                <Text style={[styles.text, { flex: flexArr[2] }]}> {rowData['sanctionedamount'] ? rowData['sanctionedamount'] : "0" }</Text>
                <Text style={[styles.text, { flex: flexArr[3] }, rowData.status === 'sanctioned' ? styles.greenText : rowData.status === 'escalate'? styles.purpleText:styles.yellowText]}>{t(`statusLabels.${rowData.status}`)}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.noDataText}>{t('noactiveloanapplications')}</Text>
      )
      )}
      <TouchableOpacity onPress={toggleShowAllLoans} style={styles.button}>
        <Text style={styles.buttonText}>{t('showallloanapplication')}</Text>
      </TouchableOpacity>
      {showAllLoans && (
      loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c82f6" />
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      ) : allloans.length > 0 ? (
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={styles.head}>
            <Text style={[styles.headText, { flex: flexArr[0] }]}>{t('id')}</Text>
              
              <Text style={[styles.headText, { flex: flexArr[1] }]}>{t('amount')}</Text>
              <Text style={[styles.headText, { flex: flexArr[2] }]}>{t('sanctinedamount')}</Text>
              <Text style={[styles.headText, { flex: flexArr[3] }]}>{t('status')}</Text>
            </View>
            {allloans.map((rowData, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.text, { flex: flexArr[0] }]}>{rowData.id}</Text>
                
                <Text style={[styles.text, { flex: flexArr[1] }]}>{rowData.amount}</Text>
                <Text style={[styles.text, { flex: flexArr[2] }]}> {rowData['sanctionedamount'] ? rowData['sanctionedamount'] : "0" }</Text>
                <Text style={[styles.text, { flex: flexArr[3] }, 
                rowData.status === 'expired' ? styles.blueText : 
                rowData.status === 'rejected' ? styles.redText : 
                styles.orangeText]}>
                  {t(`statusLabels.${rowData.status}`)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.noDataText}>{t('noloanapplications')}</Text>
      )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  heading: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
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
  redText:{
    color:'red',
  },
  yellowText:{
     color:'gold'
  },
  blueText:{
    color:'blue'
  },
  purpleText:{
    color:'purple'
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 8,
    marginBottom:10,
  },
  purpleText: {
    color: 'purple',
  },
});

export default ActiveApplications;
