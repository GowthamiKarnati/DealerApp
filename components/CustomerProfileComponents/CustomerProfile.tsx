import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacityComponent, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper'; // Import Card from react-native-paper
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { selectCustomerKYCData } from '../../redux/slices/authSlice';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component

const CustomerProfile = () => {
  const imageUrl = 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg';
  const customerKYCData = useSelector(selectCustomerKYCData);
  const windowWidth = Dimensions.get('window').width;
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <FontAwesomeIcon name="edit" style={styles.editIcon} size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* Use Card component for KYC data container */}
      <Card style={[styles.customerKYCContainer]}>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Date of Birth:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Date of Birth']}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>PAN Number:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['PAN Number']}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Number of Children:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Number of Children']}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>Monthly EMI Outflow:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Monthly EMI Outflow']}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
          </View>
        </View>
        <View style={styles.kycItem}>
          <Text style={styles.keyText}>House Owned or Rented:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['House Owned or Rented']}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
          </View>
        </View>
        <View style={[styles.kycItem, styles.lastKycItem]}>
          <Text style={styles.keyText}>Number of Years in Business:</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{customerKYCData['Number of years in business']}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIconContainer: {
    ...StyleSheet.absoluteFillObject, // Position the icon container absolutely within its parent
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    backgroundColor: 'transparent',
  },
  editIcon: {
    padding: 10,
  },
  customerKYCContainer: {
    marginTop: 20,
    borderRadius: 10,
    elevation: 4,
    width:'100%',
    backgroundColor: 'white'
  },
  kycItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height:70,
    alignItems:'center'
  },
  keyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  valueText: {
    fontSize: 18,
    color: '#4b5563',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  lastKycItem: {
    borderBottomWidth: 0,
  },
});

export default CustomerProfile;
