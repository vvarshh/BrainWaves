
// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh4fQGFHd9IV8ctTKXsfxIH5Nzr2dkCAA",
  authDomain: "brainwaves---auth.firebaseapp.com",
  projectId: "brainwaves---auth",
  storageBucket: "brainwaves---auth.appspot.com",
  messagingSenderId: "50831108787",
  appId: "1:50831108787:web:38b0cb2ebad246071d9ec6"
};

// Initialize Firebase
let app;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  // Initialize other firebase products here
}


// SDKs
export const auth = getAuth(app);
export const db = getFirestore(app); 

