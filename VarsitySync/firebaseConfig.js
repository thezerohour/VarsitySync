import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import ReactNativeAsyncStorage from  "@react-native-async-storage/async-storage";

// Initialize Firebase
/* const firebaseConfig = {
  apiKey: "AIzaSyA0mLntMmDafqGVLc_Z6c0Zk2prEIHqUSc",
  authDomain: "varsitysync2.firebaseapp.com",
  projectId: "varsitysync2",
  storageBucket: "varsitysync2.appspot.com",
  messagingSenderId: "63678117026",
  appId: "1:63678117026:web:62b4fbd5e07f1364c0d3fb",
  measurementId: "G-0JWEKGWTSZ"
}; */

const firebaseConfig = {
  apiKey: "AIzaSyDVp28cZCPgnJT7Qo3vo6agbvH1LQhcEyQ",
  authDomain: "varsitysync.firebaseapp.com",
  projectId: "varsitysync",
  storageBucket: "varsitysync.appspot.com",
  messagingSenderId: "132484790554",
  appId: "1:132484790554:web:b25473461177e6d39f14a3",
  measurementId: "G-866Q03N9C8"
};


  
// initialise firbase
const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// initialise firestore 
export const db = getFirestore(app);

// initialise firebase auth with react native async storage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;