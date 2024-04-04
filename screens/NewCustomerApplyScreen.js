import { View, Text, SafeAreaView,StyleSheet, ScrollView ,BackHandler,Alert} from 'react-native'
import React,{useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import AppBar from '../components/NewCustomerApplyComponents/AppBar';
import NewApplication from '../components/NewCustomerApplyComponents/NewApplication';
const NewCustomerApplyScreen = ({route}) => {
  const navigation = useNavigation();
    const {loanType} = route.params;    
    const [showPersonalInfo, setShowPersonalInfo] = useState(false);
    const handleHardwareBackPress = () => {
      if (showPersonalInfo) {
          setShowPersonalInfo(false);
          return true; 
      }
      return false; 
  };

  useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

      return () => backHandler.remove();
  }, [showPersonalInfo]);
   const onPressBack =()=>{
    if(showPersonalInfo){
      setShowPersonalInfo(false);
      return;
    }
    navigation.navigate('Start');
   }
  return (
    <SafeAreaView style={styles.container}>
        <AppBar onPressBack={onPressBack} />
        <ScrollView>
        <NewApplication loanType={loanType} showPersonalInfo={showPersonalInfo} setShowPersonalInfo={setShowPersonalInfo} />
        </ScrollView>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:'#f3f4f6'
    }
  });
export default NewCustomerApplyScreen