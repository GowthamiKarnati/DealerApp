// CustomerKYCDataFetcher.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Text } from 'react-native'; // Import Text component
import { selectCustomerKYCData, setCustomerKYCData } from '../../redux/slices/authSlice';
import { selectUpdatingValue } from '../../redux/slices/authSlice';

const CustomerKYCDataFetcher = ({ customerPhoneNumber }) => {
  const dispatch = useDispatch();
  const updatingValue = useSelector(selectUpdatingValue);

  useEffect(() => {
    const fetchCustomerKYCData = async () => {
      try {
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        const apiData = response.data.data[0] || {};
        dispatch(setCustomerKYCData(apiData));
      } catch (error) {
        console.error('Error fetching customer KYC data:', error.message);
      }
    };

    fetchCustomerKYCData();
  }, [customerPhoneNumber, dispatch, updatingValue]);

  // Return an empty Text component instead of null
  return <Text />;
};

export default CustomerKYCDataFetcher;
