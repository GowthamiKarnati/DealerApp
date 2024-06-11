import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

const BrandProducts = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://3974-2409-40f0-102b-6b83-ac69-bca7-301b-f373.ngrok-free.app/brandproducts?criteria=sheet_59567494.column_1451=%22Apollo%22',
      );
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View>
      <Text>BrandProducts</Text>
    </View>
  );
};

export default BrandProducts;
