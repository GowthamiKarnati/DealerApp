
import React from 'react';  // Import useState
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AppBar from '../components/EmiTrackerComponents/AppBar';
import UpcomingEmi from '../components/EmiTrackerComponents/UpcomingEmi';
import { useRoute } from '@react-navigation/native';
const EmiTrackerScreen = () => {
  const route = useRoute();
  const {emiData} =  route.params;
  return (
    <SafeAreaView style={styles.container}>
        <AppBar />
        <ScrollView>
          <UpcomingEmi emiData = {emiData}/>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});

export default EmiTrackerScreen;
