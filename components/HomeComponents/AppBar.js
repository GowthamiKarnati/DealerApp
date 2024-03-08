
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation , useFocusEffect } from '@react-navigation/native';
import {  setSearchValue } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
const AppBar = () => {
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleSearch = (text) => {
    setSearchText(text);
    dispatch(setSearchValue(text));
    console.log('Searching for:', text);
  };
  useFocusEffect(
    React.useCallback(() => {
      setSearchText('');
    }, [])
  );
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleProfile}>
          <FontAwesomeIcon name="user-circle" style={styles.icon} size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.appBarTitle}>{t('mycustomers')}</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder={t('search')}
          placeholderTextColor={'black'}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#12b981',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  appBarTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: '500',
  },
  icon: {
    marginLeft: 0,
    fontSize: 25,
    marginRight: 15,
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    marginLeft: 30,
    paddingLeft: 10,
    borderRadius: 8,
    flex: 1,
    color:'black'
  },
  logout: {
    marginLeft: 'auto',
  },
});

export default AppBar;
