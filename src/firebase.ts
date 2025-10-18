// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9us56OLEvQWymeuIvO1_ha-Pm43Umv5g",
  authDomain: "nwitter-reloaded-2e665.firebaseapp.com",
  projectId: "nwitter-reloaded-2e665",
  storageBucket: "nwitter-reloaded-2e665.firebasestorage.app",
  messagingSenderId: "473821755697",
  appId: "1:473821755697:web:f4c82d64bceb48bf725810",
  measurementId: "G-ZELWN5NZCE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
