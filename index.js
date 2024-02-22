// // /**
// //  * @format
// //  */

// // import {AppRegistry} from 'react-native';
// // import App from './App';
// // import {name as appName} from './app.json';

// // AppRegistry.registerComponent(appName, () => App);
// import React from 'react';
// import { AppRegistry } from 'react-native';
// import { Provider } from 'react-redux';
// import App from './App'; // Adjust the path accordingly
// import store from './redux/store'; // Adjust the path accordingly
// import firebase from '@react-native-firebase/app';



//   firebase.initializeApp({
//     // Add your Firebase configuration here
//     // For example:
//     apiKey: 'AIzaSyBLlmz9yDrITLv3vYtd9aZUa1FGl2PCt18',
//     authDomain: 'dealer-77fe8.firebaseapp.com',
//     projectId: 'dealer-77fe8',
//     storageBucket: 'dealer-77fe8.appspot.com',
//     messagingSenderId: '629853660357',
//     appId: '1:629853660357:android:97ab043cb63a9c7aebbcac',
   
//   });

// const Main = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

// AppRegistry.registerComponent('Dealer', () => Main); // Adjust the app name accordingly
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App'; // Adjust the path accordingly
import store from './redux/store'; // Adjust the path accordingly
const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the main component
AppRegistry.registerComponent('Dealer', () => Main); // Adjust the app name accordingly
