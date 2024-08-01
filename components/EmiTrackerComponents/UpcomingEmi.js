import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';

const UpcomingEmi = ({emiData}) => {
  const { t } = useTranslation();
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
  const getStatusTranslation = (status) => {
    switch (status) {
      case 'bounced':
        return t('Emistatus.bounced');
      case 'clearing':
        return t('Emistatus.clearing');
      case 'CHQ STOP':
        return t('Emistatus.chq_stop');
      case 'unpaid':
        return t('Emistatus.unpaid');
      default:
        return t('Emistatus.unknown');
    }
  };
  const renderEmiCards = () => {
    return emiData.map((emi, index) => (
      <TouchableOpacity key={index} style={styles.card}>
        <View style={{flexDirection:'row',justifyContent:'space-between' }}>
            <Text style={styles.cardText}>{t('id')}: {emi.record_id}</Text>
            <Text style={[styles.statusText, { color: getStatusColor(emi.status) }]}>{capitalizeFirstLetter(getStatusTranslation(emi.status))}</Text>
        </View>
        <Text style={styles.cardText}>{t('emiduedate')}: {emi['emi date'].split(' ')[0]}</Text>
        <Text style={styles.cardText}>{t('name')}: {emi.customer}</Text>
        <Text style={styles.cardText}>{t('amount')}: ₹{emi.amount}</Text>
      </TouchableOpacity>
    ));
  };
  return (
    <View style={styles.container}>
      {emiData.length > 0 ? renderEmiCards() : <Text style={styles.noDataText}>{t('no_pending_emis')}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20,
    paddingVertical:20
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
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color:'black'
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default UpcomingEmi