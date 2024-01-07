import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtuAeDXAhe9e6YFDeHM__XcnadnZe3_jE",
  authDomain: "next-onlinecourse.firebaseapp.com",
  projectId: "next-onlinecourse",
  storageBucket: "next-onlinecourse.appspot.com",
  messagingSenderId: "36873755920",
  appId: "1:36873755920:web:7d692cc269449be3f81995",
  measurementId: "G-RF9MEY1GNN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);