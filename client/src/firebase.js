// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecom-store-3f9cc.firebaseapp.com",
  projectId: "ecom-store-3f9cc",
  storageBucket: "ecom-store-3f9cc.appspot.com",
  messagingSenderId: "615931793849",
  appId: "1:615931793849:web:dea3979fbfdbf7611ea668",
  measurementId: "G-NBH09GWC34",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
