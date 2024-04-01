import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';

const KYCCard = ({ customerKYCData, handlePress, t }) => {
    //console.log("inKyccard", customerKYCData);
    const [addressWidth, setAddressWidth] = useState(null); 
    const [addressText, setAddressText] = useState('');
    const [altPhoneWidth, setAltPhoneWidth] = useState(null);
    const [altPhoneText, setAltPhoneText] = useState('');
    const [personalDetailsCollapsed, setPersonalDetailsCollapsed] = useState(true);
    const [truckDetails, setTruckDetails]= useState(true);
    const [kycDocuments, setKycDocuments] = useState(true);
    const handleAltPhoneLayout = (event) => {
        if (!altPhoneWidth) {
          setAltPhoneWidth(event.nativeEvent.layout.width);
        }
      };
    
      const truncatedAltPhone = () => {
        if (!altPhoneText || !altPhoneWidth) return '';
        const text = altPhoneText;
        const maxChars = 7; // Maximum characters before truncating
        if (text.length > maxChars) {
          return text.slice(0, maxChars) + '...';
        }
        return text;
      };
    
      
      const handleAddressLayout = (event) => {
        if (!addressWidth) {
          setAddressWidth(event.nativeEvent.layout.width);
        }
      };
      
      const truncatedAddress = () => {
        if (!addressText || !addressWidth) return '';
        const text = addressText;
        const maxCharsWidth = addressWidth / 12; 
        const maxChars = 17; 
        if (text.length > maxChars) {
          return text.slice(0, maxChars) + '...';
        }
        return text;
      };
      
      useEffect(() => {
        setAddressText(customerKYCData['House Address'] || '');
        setAltPhoneText(customerKYCData['Alternate Phone Number'] || '');
      }, [customerKYCData]);

    
    const togglePersonalDetails = () => {
        setPersonalDetailsCollapsed(!personalDetailsCollapsed);
    };
    const toggleTruckDetails= ()=>{
        setTruckDetails(!truckDetails)
    }
    const toggleKycDocuments = () =>{
        setKycDocuments(!kycDocuments)
    }
    
    return (
        <View>
            <TouchableOpacity onPress={togglePersonalDetails}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('personaldetails')}</Text>
                    <Icon
                        name={personalDetailsCollapsed ? 'chevron-right' : 'chevron-down'}
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={personalDetailsCollapsed}>
            <TouchableOpacity onPress={() => handlePress('dob')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('dob')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Date of Birth']?.split(' ')[0]}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('pan')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('pan')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['PAN Number']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('noofchildren')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('numchildren')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Number of Children']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('montlyemioutflow')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('monthlyemi')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Monthly EMI Outflow']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('housetype')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('housetype')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['House Owned or Rented']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('noofyearsinbusiness')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('numofbusinessyers')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Number of years in business']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => handlePress('city')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('city')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['City']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                    
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('phone')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('phonenumber')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Phone Number']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('altphone')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('altnumber')}</Text>
                        <View style={styles.valueContainer} onLayout={handleAltPhoneLayout}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.valueText}>{truncatedAltPhone()}</Text>
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress('marital')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('maritalstatus')}</Text>
                    <View style={styles.valueContainer}>
                    <Text style={styles.valueText}>{customerKYCData['Marital Status']}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
                </TouchableOpacity>
                {/* New section for House Address */}
                <TouchableOpacity onPress={() => handlePress('houseaddress')}>
                <View style={styles.kycItem}>
                    <Text style={styles.keyText}>{t('houseadress')}</Text>
                    <View style={styles.valueContainer} onLayout={handleAddressLayout}>
                    <Text style={styles.valueText}>{truncatedAddress()}</Text>
                    
                        <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                    
                    </View>
                </View>
        </TouchableOpacity>    
            </Collapsible>
            <TouchableOpacity onPress={toggleTruckDetails}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('truckdetails')}</Text>
                    <Icon
                        name={truckDetails ? 'chevron-right' : 'chevron-down'}
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={truckDetails}>
                <TouchableOpacity onPress={() => handlePress('numberoftrucks')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('nooftrucks')}</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.valueText}>{customerKYCData['Number of Trucks']}</Text>
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('trucknumber')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('addtrucks')}</Text>
                        <View style={styles.valueContainer}>
                            
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Collapsible>
            <TouchableOpacity onPress={toggleKycDocuments}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{t('kycdocuments')}</Text>
                    <Icon
                        name={kycDocuments ? 'chevron-right' : 'chevron-down'}
                        size={20}
                        color="#9ca3af"
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={kycDocuments}>
                <TouchableOpacity onPress={() => handlePress('pancard')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('pancard')}</Text>
                        <View style={styles.valueContainer}>
                            
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('aadharcard')}>
                    <View style={styles.kycItem}>
                        <Text style={styles.keyText}>{t('aadharcard')}</Text>
                        <View style={styles.valueContainer}>
                            
                            <Icon name="chevron-right" size={20} color="#9ca3af" style={styles.icon} />
                        </View>
                    </View>
                </TouchableOpacity>
            </Collapsible>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 15,
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        marginLeft: 10,
    },
    kycItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        height: 70,
        alignItems: 'center',
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
});

export default KYCCard;
