import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectMobileNumber } from '../../redux/slices/authSlice';

const ProfileContent = () => {
  const userMobileNumber = useSelector(selectMobileNumber);
  const [dealerData, setDealerData] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modifiedMobileNumber = userMobileNumber.length > 10 ? userMobileNumber.slice(-10) : userMobileNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/dealers?criteria=sheet_44481612.column_238%20LIKE%20%22%25${modifiedMobileNumber}%22`);
        const dealer = response.data.data[0];
        console.log(dealer)
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

  return (
    <View>
      <Text style={styles.title}> User Profile </Text>
      <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Dealer</Text>
        <Text style={styles.value}>{dealerData?.dealer || ''}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{dealerData?.name || '-'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{dealerData?.phone || '-'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>User</Text>
        <Text style={styles.value}>{dealerData?.user || '-'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{dealerData?.email || '-'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Irate</Text>
        <Text style={styles.value}>{dealerData?.irate || '-'}</Text>
      </View>
      
    </View>
    <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Need help? Contact our support team at support@example.com
        </Text>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 16,
    elevation: 2.5,
    marginHorizontal:20
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 18,
    color: 'black',
    marginTop:40,
    marginHorizontal:20
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
    marginHorizontal:15.
  },
  bottomText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ProfileContent;
