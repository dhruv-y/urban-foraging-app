import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAP2eI1weswL1Iwb-dR2RlZCx1_gtxQHO0",
    authDomain: "urban-foraging.firebaseapp.com",
    databaseURL: "https://urban-foraging.firebaseio.com",
    projectId: "urban-foraging",
    storageBucket: "urban-foraging.appspot.com",
    messagingSenderId: "933079277110",
    appId: "1:933079277110:web:b48f5b6e49d1abedb10297",
    measurementId: "G-0MWKDRXJ69"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
