// import {
//     View,
//     Text,
//     SafeAreaView,
//     StyleSheet,
//     TouchableOpacity,
//   } from 'react-native';
//   import Icon from 'react-native-vector-icons/FontAwesome5';
//   import React from 'react';
//   import {useNavigation} from '@react-navigation/native';
//   import {useTranslation} from 'react-i18next';
  
//   const AppBar = () => {
//     const {t} = useTranslation();
//     const navigation = useNavigation();
//     const handleSubmit = () => {
//       navigation.navigate('Start');
//     };
//     return (
//       <SafeAreaView>
//         <View style={styles.container}>
//           <TouchableOpacity onPress={handleSubmit}>
//             <Icon name="arrow-left" size={23} color="white" />
//           </TouchableOpacity>
//           <Text>{"     "}</Text>
//           <Text style={styles.appBarTitle}>Emi's </Text>
//         </View>
//       </SafeAreaView>
//     );
//   };
//   const styles = StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       height: 70,
//       backgroundColor: '#12b981',
//       padding: 16,
//       alignItems: 'center',
//     },
//     icon: {
//       marginRight: 50,

//     },
//     appBarTitle: {
//         fontSize: 23,
//         color: 'white',
//         fontWeight: '600',
        
//     },
//   });
//   export default AppBar;
import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import UpcomingEmi from './UpcomingEmi';
import PastEmi from './PastEmi';

const AppBar = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const handleSubmit = () => {
    navigation.navigate('Start');
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: t('upcomingEmis') },
    { key: 'past', title: t('pastEmis') },
  ]);

  const renderScene = SceneMap({
    upcoming: UpcomingEmi,
    past: PastEmi,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#12b981' }}
      labelStyle={{ color: 'white' }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSubmit}>
          <Icon name="arrow-left" size={23} color="white" />
        </TouchableOpacity>
        <Text>{"     "}</Text>
        <Text style={styles.appBarTitle}>{t('emis')} </Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={renderTabBar}
      />
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
    marginRight: 50,
  },
  appBarTitle: {
    fontSize: 23,
    color: 'white',
    fontWeight: '600',
  },
});

export default AppBar;

  