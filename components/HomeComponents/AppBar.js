import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {setSearchValue} from '../../redux/slices/authSlice';
import {useTranslation} from 'react-i18next';
const AppBar = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');

  const handleProfile = () => {
    navigation.navigate('Start');
  };

  const handleSearch = text => {
    setSearchText(text);
    dispatch(setSearchValue(text));
    console.log('Searching for:', text);
  };
  useFocusEffect(
    React.useCallback(() => {
      setSearchText('');
    }, []),
  );
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleProfile}>
          <Icon name="arrow-left" style={styles.icon} size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
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
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
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
    color: 'black',
  },
  logout: {
    marginLeft: 'auto',
  },
});

export default AppBar;
