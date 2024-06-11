import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import React from 'react';
  import {useNavigation} from '@react-navigation/native';
  import {useTranslation} from 'react-i18next';
  
  const AppBar = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const handleSubmit = () => {
      navigation.navigate('Start');
    };
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleSubmit}>
            <Icon name="arrow-left" size={23} color="white" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Emi's Report</Text>
        </View>
      </SafeAreaView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      height: 70,
      backgroundColor: '#12b981',
      padding: 16,
      alignItems: 'center',
    },
    icon: {
      marginRight: 20,
    },
    appBarTitle: {
        fontSize: 23,
        color: 'white',
        fontWeight: '600',
        marginLeft:'10'
    },
  });
  export default AppBar;
  