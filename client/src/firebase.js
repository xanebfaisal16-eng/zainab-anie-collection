// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 1. Yeh line add karein

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl0PkHsqVezhCb5zCbStwYzxgS8MrNZag",
  authDomain: "zastore-b59c3.firebaseapp.com",
  projectId: "zastore-b59c3",
  storageBucket: "zastore-b59c3.firebasestorage.app",
  messagingSenderId: "350500714138",
  appId: "1:350500714138:web:9d1e3529af4a302b0e5123",
  measurementId: "G-ESVRM4LX3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Firestore initialize aur export karein
const db = getFirestore(app);

export { app, db };