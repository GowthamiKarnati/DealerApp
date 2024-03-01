// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import 'react-native-screens';
// import 'react-native-safe-area-context';
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import ApplyScreen from './screens/ApplyScreen';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import Toast from 'react-native-toast-message';
// import ProfileScreen from './screens/ProfileScreen';
// const Stack = createStackNavigator();

// function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
        
//         <Stack.Navigator initialRouteName="Login">
//           <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Apply" component={ApplyScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//         </Stack.Navigator>
//         <Toast />
//       </NavigationContainer>
//     </Provider>
//   );
// }

// export default App;
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// // import store from './redux/store';
// import Toast from 'react-native-toast-message';
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import ApplyScreen from './screens/ApplyScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import { selectMobileNumber, setMobileNumber } from './redux/slices/authSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomerScreen from './screens/CustomerScreen';
// const Stack = createStackNavigator();

// function App() {
//   const dispatch = useDispatch();
//   const mobileNumber = useSelector(selectMobileNumber);
//   const [initialLoading, setInitialLoading] = useState(true);

//   useEffect(() => {
//     const checkUserLoggedIn = async () => {
//       try {
//         const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        
//         if (userLoggedIn === 'true') {
//           const storedMobileNumber = await AsyncStorage.getItem('userMobileNumber');
//           dispatch(setMobileNumber(storedMobileNumber));
//         }
//       } catch (error) {
//         console.error('Error checking user logged-in status:', error);
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     checkUserLoggedIn();
//   }, [dispatch]);

//   if (initialLoading) {
//     // You might want to show a loading spinner or some other indicator
//     return null;
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Apply" component={ApplyScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
//       </Stack.Navigator>
//       <Toast />
//     </NavigationContainer>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import Toast from 'react-native-toast-message';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ApplyScreen from './screens/ApplyScreen';
import ProfileScreen from './screens/ProfileScreen';
import { selectMobileNumber, setMobileNumber } from './redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomerScreen from './screens/CustomerScreen';
import { ActivityIndicator, View } from 'react-native';
import ReviewScreen from './screens/ReviewScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';
import UpdateScreen from './screens/UpdateScreen';
const Stack = createStackNavigator();

function App() {
  const dispatch = useDispatch();
  const mobileNumber = useSelector(selectMobileNumber);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        
        if (userLoggedIn === 'true') {
          const storedMobileNumber = await AsyncStorage.getItem('userMobileNumber');
          dispatch(setMobileNumber(storedMobileNumber));
        }
      } catch (error) {
        console.error('Error checking user logged-in status:', error);
      } finally {
        setTimeout(() => {
          setInitialLoading(false);
        }, 1000);
      }
    };

    checkUserLoggedIn();
  }, [dispatch]);

  useEffect(() => {
    // Use the mobileNumber state to determine whether the user is logged in
    if (mobileNumber) {
      setTimeout(() => {
        setInitialLoading(false);
      }, 1000);
    }
  }, [mobileNumber]);

  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
    
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={mobileNumber ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Apply" component={ApplyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Customer" component={CustomerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Review" component={ReviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CustomerProfile" component={CustomerProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Update" component={UpdateScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
