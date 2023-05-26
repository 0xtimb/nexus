// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjkHkVmetIeAj9T_3Sy5GW5OMNoETARnY",
  authDomain: "nexus-theta.firebaseapp.com",
  projectId: "nexus-theta",
  storageBucket: "nexus-theta.appspot.com",
  messagingSenderId: "220713835416",
  appId: "1:220713835416:web:94f906469c706b7565a9ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
