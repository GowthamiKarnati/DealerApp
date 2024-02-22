import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectMobileNumber, selectSearchValue, setSearchValue } from '../../redux/slices/authSlice';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
//import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { setCustomerData } from '../../redux/slices/authSlice';

const MainContent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const userMobileNumber = useSelector(selectMobileNumber);
  const navigation = useNavigation();
  const searchValue = useSelector(selectSearchValue);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber = userMobileNumber.length > 10 ? userMobileNumber.slice(-10) : userMobileNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/customers?criteria=sheet_95100183.column_242.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`);
        setData(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setLoading(false);
      }
    };

    fetchData();
    getToken();
  }, [userMobileNumber]);
  const getToken=async()=>{
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      const mobileNumber = userMobileNumber;
      firestore().collection('dealers').doc(mobileNumber).set({
        token: token
      })
      .then(() => {
        console.log('Token added for mobile number: ', mobileNumber);
      })
      .catch(error => {
        console.error('Error adding token: ', error);
      });
    }
  }
  useEffect(() => {
    // Apply local filtering based on searchValue
    const filtered = data.filter((item) => {
      const fullName = item.name || '';
      const phoneNumber = item['mobile number'] || '';
      const lowerCaseQuery = searchValue.toLowerCase();
      return fullName.toLowerCase().includes(lowerCaseQuery) || phoneNumber.includes(searchValue);
    });

    setFilteredData(filtered);
  }, [searchValue, data]);

  const handleCustomer = (item) => {
    dispatch(setCustomerData(item));
    navigation.navigate('Customer');
  };
  useEffect(() => {
    // Handle foreground notifications
    const foregroundHandler = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
      // Display notification or update UI as needed
      if (remoteMessage && remoteMessage.notification) {
        const { title, body } = remoteMessage.notification;
        console.log('Notification Title:', title);
        console.log('Notification Body:', body);
        Toast.show({
          type: 'info',
          position: 'top',
          text1: title,
          text2: body,
          visibilityTime: 10000, // 10 seconds duration
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      }
    });
    const backgroundHandler = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log('Message handled in the background!', remoteMessage);
        
        // Check if necessary data is available in remoteMessage.data
        if (remoteMessage && remoteMessage.data && remoteMessage.data.name && remoteMessage.data.mobilenumber) {
          console.log("Background message received:", remoteMessage);
    
          // Extract name and mobile number from remoteMessage.data
          const { name, mobilenumber } = remoteMessage.data;
    
          // Construct customerData object
          const customerData = { name, 'mobile number': mobilenumber };
    
          console.log(customerData); // Log customerData for verification
    
          // Navigate to the 'Customer' screen with customerData as route params
          if (navigation) {
            navigation.navigate('Customer', { customerData }); // Pass customerData as route params
          } else {
            console.warn('Navigation is not available in the background handler.');
          }
        }
      }
    );
    
  
    // Cleanup function
    return () => {
      foregroundHandler();
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(setSearchValue(''));
    }, [dispatch])
  );
  // );
  const renderCard = ({ item }) => {
    // Convert item.name and item['mobile number'] to uppercase
    const name = item.name ? item.name.toUpperCase() : 'N/A';
    const mobileNumber = item['mobile number'] ? item['mobile number'].toUpperCase() : 'N/A';
  
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCustomer(item)}
      >
        <View style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.cardName}>{name}</Text>
            <Text style={styles.cardPhone}>{mobileNumber}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Icon name="chevron-right" size={20} color="gray" style={styles.icon} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {/* <Text>Search Value: {searchValue}</Text> */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length === 0 ? (
        <Text style={{color:'red'}}>No customers found</Text>
      ): filteredData.length === 0 ? (
        <Text style={{color:'red'}}>No customers found for "{searchValue}"</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
  },
  cardContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    minHeight: 110, 
    elevation: 4,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  cardName: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPhone: {
    color: 'gray',
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 10, 
  },
});


export default MainContent;
