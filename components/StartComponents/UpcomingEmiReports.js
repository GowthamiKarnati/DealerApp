
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { selectMobileNumber } from '../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const UpcomingEmiReports = ({  emiData, emiLoading }) => {
    //console.log(refreshing);
    //rconsole.log(onRefresh)
  const { t } = useTranslation();
  const navigation = useNavigation();
  //const [emiData, setEmiData] = useState([]);
  const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const modifiedMobileNumber =
//       userMobileNumber.length > 10
//         ? userMobileNumber.slice(-10)
//         : userMobileNumber;
//         const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_242.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`);
//         const filteredData = response.data.data.filter(emi =>
//           ['unpaid', 'bounced', 'WITH DEALER', 'clearing', 'to confirm', 'CHQ STOP'].includes(emi.status)
//         );
//         const statusPriority = {
//           'bounced': 1,
//           'clearing': 2,
//           'CHQ STOP': 3,
//           'unpaid': 4,
//           'to confirm': 5,
//           'WITH DEALER': 6,
//         };

//         filteredData.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
//         setEmiData(filteredData);
//       } catch (error) {
//         console.error('Error fetching upcoming EMIs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [refreshing]);
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'bounced':
        return 'red';
      case 'clearing':
        return '#f08080';
      case 'CHQ STOP':
        return 'black';
      case 'unpaid':
        return '#ffa500';
      default:
        return 'gray';
    }
  };

  const renderEmiCards = () => {
    return emiData.slice(0,5).map((emi, index) => (
      <TouchableOpacity key={index} style={styles.card}>
        <View style={{flexDirection:'row',justifyContent:'space-between' }}>
            <Text style={styles.cardText}>{t('id')}: {emi.record_id}</Text>
            <Text style={[styles.statusText, { color: getStatusColor(emi.status) }]}>{capitalizeFirstLetter(emi.status)}</Text>
        </View>
        <Text style={styles.cardText}>{t('emiduedate')}: {emi['emi date'].split(' ')[0]}</Text>
        <Text style={styles.cardText}>{t('name')}: {emi.customer}</Text>
        <Text style={styles.cardText}>{t('amount')}: ₹{emi.amount}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.title}>Pending EMIs</Text>
                <Text style={{fontSize:18, textDecorationLine:'underline', color:'gray'}} onPress={()=>navigation.navigate('EmiTracker', {emiData})}>View All</Text>
        </View>
        
        {emiLoading ? 
        (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>{t('loading')}</Text>
            </View> 
        ):
        (
            <>
            {emiData.length > 0 ? renderEmiCards() : <Text style={styles.noDataText}>No Upcoming EMIs</Text>}
            </>
        )
        }
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black'
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText:{
    color:'black'
  }
});

export default UpcomingEmiReports;
