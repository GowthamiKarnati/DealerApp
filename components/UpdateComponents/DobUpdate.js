import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput,ActivityIndicator ,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { selectCustomerKYCData,setCustomerKYCData } from '../../redux/slices/authSlice';
import { selectCustomerData } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; 
import { useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { current } from 'immer';



// Define the component
const DobUpdate = () => {
  const {t} = useTranslation();
  // Define necessary states and constants
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const customerKYCData = useSelector(selectCustomerKYCData);
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const initialDob = customerKYCData['Date of Birth'].split(' ')[0] || '';
  const [dob, setDob] = useState(initialDob);
  //console.log(dob);
  const [selectedDate, setSelectedDate] = useState('');
  const record_id = customerKYCData.record_id;
  const [loading, setLoading] = useState(false); 
  // Get the current date
const currentDate = new Date();
const year = currentDate.getFullYear().toString();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
const day = currentDate.getDate().toString().padStart(2, '0');
const initialDate = `${year}-${month}-${day}`;
  const handleUpdateChildren = async() => {
    try {
      setLoading(true);
      let data = { 
        record_id, 
        dob, 
        marital: customerKYCData['Marital Status'],
        pan: customerKYCData['PAN Number'],
        noofchildren: customerKYCData['Number of Children'],
        monthlyemioutflow: customerKYCData['Monthly EMI Outflow'],
        housetype: customerKYCData['House Owned or Rented'],
        noofyearsinbusiness: customerKYCData['Number of years in business'],
        nooftrucks: customerKYCData['Number of Trucks'],
        city: customerKYCData['City'], 
        houseaddress: customerKYCData['House Address'],
        phone: customerKYCData['Phone Number'],
        altphone: customerKYCData['Alternate Phone Number'] ,
        status : "Updated"
      };
      
      const response = await axios.post(`https://backendforpnf.vercel.app/updatedob`, data);
      console.log('Server response:', response.data);
      Toast.show({
        type: 'success',
        position:'bottom',
        text1: t('updateSuccess'), 
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
      });
      
      navigation.navigate('CustomerProfile');
      
      const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
      const Kresponse = await axios.get(`https://backendforpnf.vercel.app/customerKyc?criteria=sheet_42284627.column_1100.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
      const apiData = Kresponse.data.data[0] || {};
      dispatch(setCustomerKYCData(apiData)); 
    } catch (err) {
      console.log("Error in updating:", err);
    }
  };
  
  // Function to handle back navigation
  const handleBack = () => {
    navigation.navigate('CustomerProfile');
  };

  // Render the component
  return (
    <View style={styles.container}>
      {/* Arrow container for back navigation */}
  
      {loading && (
        <Modal transparent={true} animationType='fade'>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        </Modal>
      )}
      <TouchableOpacity style={styles.arrowContainer} onPress={handleBack}>
        <Icon name="arrow-left" size={23} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{t('updateDOB')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('yourDOB')}</Text>
          <TextInput
            style={styles.input}
            value={initialDob}
            editable={false}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('updateHere')}</Text>
          <Calendar
            style={{ borderWidth: 1, borderColor: '#cccccc', borderRadius: 8 }}
            current={dob === '0000-00-00' ? initialDate : dob}
            onDayPress={(day) => {
              setDob(day.dateString);
              setSelectedDate(day.dateString); // Set the selected date
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange'
              }
            }}
            // monthNames={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
            // dayNames={['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']}
            monthNames={[
              t('January'),
              t('February'),
              t('March'),
              t('April'),
              t('May'),
              t('June'),
              t('July'),
              t('August'),
              t('September'),
              t('October'),
              t('November'),
              t('December'),
            ]}
            dayNames={[
              t('Sunday'),
              t('Monday'),
              t('Tuesday'),
              t('Wednesday'),
              t('Thursday'),
              t('Friday'),
              t('Saturday'),
            ]}
            theme={{

              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            renderDay={(day, item) => {
              // Set initial background color to lightblue
              let backgroundColor = selectedDate === day.dateString ? 'lightblue' : 'red';
              return (
                <TouchableOpacity
                  onPress={() => {
                    setDob(day.dateString);
                    setSelectedDate(day.dateString); // Set the selected date
                  }}
                >
                  <View style={[styles.dateContainer, { backgroundColor }]}>
                    <Text style={styles.dateText}>{day.day}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Button title={t('updateButton')} onPress={handleUpdateChildren} />
      </View>
      
    </View>
  );
};

// Define component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 18,
    color: 'black',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    elevation: 8,
    width: '100%',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

// Export the component
export default DobUpdate;
