// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
	getFirestore
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi3ELZTanUf2G-37bYgvpVQ4OTPLure6g",
  authDomain: "zema-afdfc.firebaseapp.com",
  projectId: "zema-afdfc",
  storageBucket: "zema-afdfc.firebasestorage.app",
  messagingSenderId: "799116666295",
  appId: "1:799116666295:web:afb624e4bd8d80ee433432",
  measurementId: "G-7YYFHNTXSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
export const db = getFirestore(app);