// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMrWI9vFrXcxo76PrL-LUK-aj3RYKvySs",
  authDomain: "practicing-35299.firebaseapp.com",
  projectId: "practicing-35299",
  storageBucket: "practicing-35299.firebasestorage.app",
  messagingSenderId: "817931289962",
  appId: "1:817931289962:web:68f1f79fd791e69c5f1113",
  measurementId: "G-54DCJXYRXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);