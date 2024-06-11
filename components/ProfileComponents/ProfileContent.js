import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectMobileNumber} from '../../redux/slices/authSlice';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
const {width, height} = Dimensions.get('window');

const ProfileContent = () => {
  const {t, i18n} = useTranslation();
  const userMobileNumber = useSelector(selectMobileNumber);
  const [dealerData, setDealerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber =
          userMobileNumber.length > 10
            ? userMobileNumber.slice(-10)
            : userMobileNumber;
        const response = await axios.get(
          `https://backendforpnf.vercel.app/dealers?criteria=sheet_44481612.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`,
        );
        const dealer = response.data.data[0];
        //console.log(dealer)
        setDealerData(dealer);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dealer data:', error);
        setDealerData(null);
        setLoading(false);
      }
    };

    fetchData();
  }, [userMobileNumber]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  const handleChangeLanguage = async value => {
    await AsyncStorage.setItem('selectedLanguage', value);
    i18n.changeLanguage(value);
  };
  return (
    <View>
      <Text style={styles.title}> {t('userprofile')} </Text>
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{t('dealer')}</Text>
          <Text style={styles.value}>{dealerData?.dealer || ''}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{t('name')}</Text>
          <Text style={styles.value}>{dealerData?.name || '-'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{t('phone')}</Text>
          <Text style={styles.value}>{dealerData?.phone || '-'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{t('user')}</Text>
          <Text style={styles.value}>{dealerData?.user || '-'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{t('email')}</Text>
          <Text style={styles.value}>{dealerData?.email || '-'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>{t('irate')}</Text>
          <Text style={styles.value}>{dealerData?.irate || '-'}</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={currentLanguage}
            onValueChange={itemValue => handleChangeLanguage(itemValue)}
            style={styles.picker}
            dropdownIconColor="black">
            <Picker.Item label="English" value="en" />
            <Picker.Item label="हिन्दी" value="hi" />
            <Picker.Item label="मराठी" value="mr" />
          </Picker>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>{t('footer')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 16,
    elevation: 2.5,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 18,
    color: 'black',
    marginTop: 40,
    marginHorizontal: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  bottom: {
    marginTop: 30,
    marginHorizontal: 15,
  },
  bottomText: {
    fontSize: 18,
    color: 'gray',
  },
  pickerContainer: {
    // marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1F3FD',
    borderRadius: width * 0.03,
  },
  picker: {
    color: '#0072B1',
    width: width * 0.78,
    // backgroundColor:'#C4FAFA'
  },
});

export default ProfileContent;
