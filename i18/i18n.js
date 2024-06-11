import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../languages/en';
import hi from '../languages/hi';
import mr from '../languages/mr';

const getStoredLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
    return storedLanguage || 'en';
  } catch (error) {
    console.error('Error loading language from AsyncStorage:', error);
    return 'en';
  }
};

const initializeLanguage = async () => {
  const storedLanguage = await getStoredLanguage();
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      hi: {translation: hi},
      mr: {translation: mr},
    },
    lng: storedLanguage,
    interpolation: {
      escapeValue: false,
    },
  });
};

initializeLanguage();

export default i18n;
