import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmA8JG5o_IgKRyChZTYj7w8lEgdjYnBqM",
  authDomain: "open-ques-db.firebaseapp.com",
  projectId: "open-ques-db",
  storageBucket: "open-ques-db.appspot.com",
  messagingSenderId: "329261571576",
  appId: "1:329261571576:web:2cfab76f859d8340138a0d",
  measurementId: "G-RTEYH21T3D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
