import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDVEoqMGea85wfTAQgY-Ra9HcjQJdwLZlA",
    authDomain: "fb-crud-react-79ed3.firebaseapp.com",
    databaseURL: "https://fb-crud-react-79ed3.firebaseio.com",
    projectId: "fb-crud-react-79ed3",
    storageBucket: "fb-crud-react-79ed3.appspot.com",
    messagingSenderId: "78787656001",
    appId: "1:78787656001:web:803013c66772c0a552c9c0"
  };
  // Initialize Firebase
const fb= firebase.initializeApp(firebaseConfig);
export const db=fb.firestore();


