import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import ReactNativeAsyncStorage from  "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA0mLntMmDafqGVLc_Z6c0Zk2prEIHqUSc",
  authDomain: "varsitysync2.firebaseapp.com",
  projectId: "varsitysync2",
  storageBucket: "varsitysync2.appspot.com",
  messagingSenderId: "63678117026",
  appId: "1:63678117026:web:62b4fbd5e07f1364c0d3fb",
  measurementId: "G-0JWEKGWTSZ"
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