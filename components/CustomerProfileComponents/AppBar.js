import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {selectCustomerKYCData} from '../../redux/slices/authSlice';

const AppBar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerKYCData = useSelector(selectCustomerKYCData);
  //console.log('Customer Name', customerKYCData);
  const [customerName, setCustomerName] = useState('');
  const handleBack = () => {
    navigation.navigate('Customer');
  };
  useEffect(() => {
    if (customerKYCData && customerKYCData['Customer Name']) {
      const name = customerKYCData['Customer Name'];
      const formattedName =
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      setCustomerName(formattedName);
    }
  }, [customerKYCData]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={23} color="white" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
        <Text style={styles.appBarTitle} numberOfLines={1} ellipsizeMode="tail">
          {customerName ? customerName : 'Customer'}
        </Text>
        </View>
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
    color: 'black',
  },
  logout: {
    marginLeft: 'auto',
  },
});

export default AppBar;
