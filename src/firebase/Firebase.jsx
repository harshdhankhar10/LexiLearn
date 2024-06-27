// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMHjNhfMByGaMuNrSVHBAO55ER3MR5C3I",
  authDomain: "lexilearn-e7c1b.firebaseapp.com",
  projectId: "lexilearn-e7c1b",
  storageBucket: "lexilearn-e7c1b.appspot.com",
  messagingSenderId: "203271548411",
  appId: "1:203271548411:web:918745cac8d1d4ebe76f5e",
  measurementId: "G-JFSJ8Y6WF2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);