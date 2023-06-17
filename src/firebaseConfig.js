import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcX8S_A1mubkOmxmCl6WIIneTrKyshLRA",
  authDomain: "react-firebase-blog-app-8264f.firebaseapp.com",
  projectId: "react-firebase-blog-app-8264f",
  storageBucket: "react-firebase-blog-app-8264f.appspot.com",
  messagingSenderId: "73873722052",
  appId: "1:73873722052:web:05c20beb772c2dfd74d791"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);