// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaW2fu7ZG4jcvARAXrSzztNU2eet3UE_4",
  authDomain: "ecosense-7d8af.firebaseapp.com",
  projectId: "ecosense-7d8af",
  storageBucket: "ecosense-7d8af.appspot.com",
  messagingSenderId: "558689419503",
  appId: "1:558689419503:web:ee58744d3fcffb53375b1a",
  measurementId: "G-0CYKLK35K9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
