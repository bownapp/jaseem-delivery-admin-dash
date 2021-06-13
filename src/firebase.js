import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';


// import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyD74zteaJBLGNdTTefNPpDG5EfNxV4vaNc",
    authDomain: "c2cdelivery-4ae93.firebaseapp.com",
    projectId: "c2cdelivery-4ae93",
    storageBucket: "c2cdelivery-4ae93.appspot.com",
    messagingSenderId: "222085240987",
    appId: "1:222085240987:web:26c6f5c0bd3ab05f104e3e"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase
