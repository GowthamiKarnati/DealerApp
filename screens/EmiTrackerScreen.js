
import React from 'react';  // Import useState
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import AppBar from '../components/EmiTrackerComponents/AppBar';
const EmiTrackerScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <AppBar />
        
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
