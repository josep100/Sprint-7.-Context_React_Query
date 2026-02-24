// // src/firebase/firebase.ts
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import type { User } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// export const loginService = (email: string, password: string) => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// export const registerService = (email: string, password: string) => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// export const logoutService = () => {
//   return signOut(auth);
// };

// export const subscribeToAuthChanges = (
//   callback: (user: User | null) => void,
// ) => {
//   return onAuthStateChanged(auth, callback);
// };
