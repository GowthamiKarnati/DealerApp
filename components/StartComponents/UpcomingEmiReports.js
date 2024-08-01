// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { selectMobileNumber } from '../../redux/slices/authSlice';
// import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import axios from 'axios';
// import {useNavigation} from '@react-navigation/native';

// const UpcomingEmiReports = ({  emiData, emiLoading }) => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);
//   const capitalizeFirstLetter = (string) => {
//     if (!string) return '';
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };
//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'bounced':
//         return 'red';
//       case 'clearing':
//         return '#f08080';
//       case 'CHQ STOP':
//         return 'black';
//       case 'unpaid':
//         return '#ffa500';
//       default:
//         return 'gray';
//     }
//   };

//   const renderEmiCards = () => {
//     return emiData.slice(0,5).map((emi, index) => (
//       <TouchableOpacity key={index} style={styles.card}>
//         <View style={{flexDirection:'row',justifyContent:'space-between' }}>
//             <Text style={styles.cardText}>{t('id')}: {emi.record_id}</Text>
//             <Text style={[styles.statusText, { color: getStatusColor(emi.status) }]}>{capitalizeFirstLetter(emi.status)}</Text>
//         </View>
//         <Text style={styles.cardText}>{t('emiduedate')}: {emi['emi date'].split(' ')[0]}</Text>
//         <Text style={styles.cardText}>{t('name')}: {emi.customer}</Text>
//         <Text style={styles.cardText}>{t('amount')}: ₹{emi.amount}</Text>
//       </TouchableOpacity>
//     ));
//   };

//   return (
//     <View>
//         <View style={{flexDirection:'row', justifyContent:'space-between'}}>
//                 <Text style={styles.title}>{t('Pending EMIs')}</Text>
//                 <Text style={{fontSize:18, textDecorationLine:'underline', color:'gray'}} onPress={()=>navigation.navigate('EmiTracker', {emiData})}>View All</Text>
//         </View>
        
//         {emiLoading ? 
//         (
//             <View style={styles.loadingContainer}>
//                 <Text style={styles.loadingText}>{t('loading')}</Text>
//             </View> 
//         ):
//         (
//             <>
//             {emiData.length > 0 ? renderEmiCards() : <Text style={styles.noDataText}>No Upcoming EMIs</Text>}
//             </>
//         )
//         }
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'black'
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   cardText: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: 'black'
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: 'gray',
//     alignItems: 'center'
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText:{
//     color:'black'
//   }
// });


// export default UpcomingEmiReports;
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UpcomingEmiReports = ({ emiData, emiLoading }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

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
    return emiData.slice(0, 5).map((emi, index) => (
      <TouchableOpacity key={index} style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardText}>{t('id')}: {emi.record_id}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(emi.status) }]}>
            {capitalizeFirstLetter(getStatusTranslation(emi.status))}
          </Text>
        </View>
        <Text style={styles.cardText}>{t('emiduedate')}: {emi['emi date'].split(' ')[0]}</Text>
        <Text style={styles.cardText}>{t('name')}: {emi.customer}</Text>
        <Text style={styles.cardText}>{t('amount')}: ₹ {emi.amount}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{t('Pending EMIs')}</Text>
        {emiData.length > 5 && (
        <Text
          style={{ fontSize: 18, textDecorationLine: 'underline', color: 'gray' }}
          onPress={() => navigation.navigate('EmiTracker', { emiData })}
        >
          
          {t('view_all')}
        </Text>
        )}
      </View>

      {emiLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{t('loading')}</Text>
        </View>
      ) : (
        <>
          {emiData.length > 0 ? renderEmiCards() : <Text style={styles.noDataText}>{t('no_pending_emis')}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
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
    color: 'black',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'black',
  },
});

export default UpcomingEmiReports;

