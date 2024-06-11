import {View, Text, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18/i18n';

const {width, height} = Dimensions.get('window');

const AppBar = () => {
  const {t, i18n: i18nInstance} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(i18nInstance.language);
  console.log('Instance', i18nInstance.language);
  useEffect(() => {
    // console.log("Instance",i18nInstance );
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          i18nInstance.changeLanguage(storedLanguage);
          setCurrentLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Error loading language from AsyncStorage:', error);
      }
    };

    loadLanguage();
  }, [i18nInstance]);
  const handleChangeLanguage = async value => {
    setCurrentLanguage(value);
    await AsyncStorage.setItem('selectedLanguage', value);
    i18nInstance.changeLanguage(value);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.appBarTitle}>{t('back')}</Text>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#12b981',
    padding: 16,
    flexDirection: 'row', // Align children horizontally
    // Add space between children
    alignItems: 'center', // Center children vertically
  },
  appBarTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: '400',
  },
  pickerContainer: {
    backgroundColor: '#E1F3FD',
    borderRadius: width * 0.1,
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center children vertically
    paddingRight: 10,
    marginLeft: 'auto',
  },
  picker: {
    color: '#0072B1',
    width: width * 0.32, // Adjust width of the Picker
  },
});

export default AppBar;
