// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMIokTOymMLQ7lB9EbvbPMoYdH4289PfQ",
  authDomain: "nexus-bsc.firebaseapp.com",
  projectId: "nexus-bsc",
  storageBucket: "nexus-bsc.appspot.com",
  messagingSenderId: "774655909674",
  appId: "1:774655909674:web:0e3f6d63eac612f3800853",
  measurementId: "G-TT92SDSFKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();
