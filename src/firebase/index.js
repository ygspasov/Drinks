/* eslint-disable no-unused-vars */
import firebase from "firebase";
import firestore from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBQp3tn-FrhxFS6esVRzQmhPa0JQwL7Pp0",
  authDomain: "drinks-281d6.firebaseapp.com",
  databaseURL: "https://drinks-281d6.firebaseio.com",
  projectId: "drinks-281d6",
  storageBucket: "drinks-281d6.appspot.com",
  messagingSenderId: "604478767873",
  appId: "1:604478767873:web:e41de027f28fa2bd7f5100"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
