import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCFoc9ICaq3c5iee5Q9U95iUBm9w6W3HzE",
    authDomain: "book-store-9da41.firebaseapp.com",
    projectId: "book-store-9da41",
    storageBucket: "book-store-9da41.appspot.com",
    messagingSenderId: "741271467033",
    appId: "1:741271467033:web:92bf725edbea87f4dd6688",
    measurementId: "G-4TCB0C520D"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;