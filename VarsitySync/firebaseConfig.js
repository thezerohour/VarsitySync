import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import {getAuth} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDVp28cZCPgnJT7Qo3vo6agbvH1LQhcEyQ",
    authDomain: "varsitysync.firebaseapp.com",
    databaseURL: 'https://varsitysync.firebaseio.com',
    projectId: "varsitysync",
    storageBucket: "varsitysync.appspot.com",
    messagingSenderId: "132484790554",
    appId: "1:132484790554:web:b25473461177e6d39f14a3",
    measurementId: "G-866Q03N9C8"
  };
  

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const auth = getAuth(app);
export default app;
