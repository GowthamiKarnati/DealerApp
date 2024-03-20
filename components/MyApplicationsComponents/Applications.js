import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux'; 
import {  selectSearchValue } from '../../redux/slices/authSlice';
import { selectApplicationData } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';



const Applications = () => {
  const {t} = useTranslation();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiData = useSelector(selectApplicationData);
  const searchValue = useSelector(selectSearchValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredData = apiData.filter(item =>
          item['Workflow Status'].toLowerCase().includes(searchValue.toLowerCase()) ||
          item.record_id.includes(searchValue)
        );

        const formattedData = filteredData.map(item => ({
          id: item.record_id,
          amount: parseFloat(item['Loan amount requested']),
          sanctionedAmount: parseFloat(item['amount sanctioned']),
          status: item['Workflow Status'].toLowerCase().trim(),
        }));
        
        setTableData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, [apiData, searchValue]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'loan account created':
        return 'orange';
      case 'escalate':
        return 'purple';
      case 'requested':
        return 'yellow';
      case 'rejected':
        return 'red';
      case 'expired':
        return 'blue';
      case 'sanctioned':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <View style={styles.container}>
      {loading ? ( // Show ActivityIndicator while loading is true
        <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
      ) : (
        <View>
          {tableData.length > 0 ? (
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Row data={['ID', 'Amount', 'Sanctioned Amount', 'Status']} style={styles.header} textStyle={styles.headerText} />
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    rowData.id,
                    rowData.amount.toString(),
                    rowData.sanctionedAmount.toString(),
                    <Text style={{ color: getStatusColor(rowData.status), paddingHorizontal:10 }}>{t(`statusLabels.${rowData.status}`)}</Text>,
                  ]}
                  textStyle={styles.cell}
                />
              ))}
            </Table>
          ) : (
            <Text style={styles.noDataText}>{t('noApplications')}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    height: 50,
    textAlign: 'center',
    borderColor: '#e5e7eb',
    paddingTop: 10,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 8,
    marginBottom: 10,
  },
});

export default Applications;
