// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const loginService = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerService = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutService = () => {
  return signOut(auth);
};

export const subscribeToAuthChanges = (
  callback: (user: User | null) => void,
) => {
  return onAuthStateChanged(auth, callback);
};



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDlLTdpo_FO3izh645nGeizHKApf42gkJ4",
//   authDomain: "app-movies-c3ac6.firebaseapp.com",
//   projectId: "app-movies-c3ac6",
//   storageBucket: "app-movies-c3ac6.firebasestorage.app",
//   messagingSenderId: "371744071881",
//   appId: "1:371744071881:web:552e5e396b782033b0ad18"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
