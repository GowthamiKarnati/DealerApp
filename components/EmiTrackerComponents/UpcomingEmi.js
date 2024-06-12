import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {selectMobileNumber} from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
const UpcomingEmi = () => {
  const { t } = useTranslation();
  const [emiData, setEmiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userMobileNumber = useSelector(selectMobileNumber);
  console.log(emiData);
  useEffect(() => {
    const modifiedMobileNumber =
      userMobileNumber.length > 10
        ? userMobileNumber.slice(-10)
        : userMobileNumber;
    
    axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_242.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`)
      .then(response => {
        //console.log(response.data.data)
        if (Array.isArray(response.data.data)) {
          setEmiData(response.data.data.filter(emi => emi.status === 'unpaid'));
        } else {
          console.error('Data is not an array:', response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  

  const renderEmiCards = () => {
    return emiData.map((emi, index) => (
      <TouchableOpacity key={index} style={styles.card}>
        <Text style={styles.cardText}>{t('id')}: {emi.record_id}</Text>
        <Text style={styles.cardText}>{t('emiduedate')}: {emi['emi date'].split(' ')[0]}</Text>
        <Text style={styles.cardText}>{t('name')}: {emi.customer}</Text>
        <Text style={styles.cardText}>{t('amount')}: ₹{emi.amount}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      ) : (
        <>
          {emiData.length > 0 ? renderEmiCards() : <Text style={styles.noDataText}>No Upcoming Emi's</Text>}
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#f1f8ff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color:'black'
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'black',
  },
});

export default UpcomingEmi;
