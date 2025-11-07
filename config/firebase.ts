import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Replace with your Firebase project configuration
// Get this from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyAH9lTSqN7SFWL3c1Fgdfx6PTCZBL4ZfJQ",
  authDomain: "salamanka-325ea.firebaseapp.com",
  projectId: "salamanka-325ea",
  storageBucket: "salamanka-325ea.firebasestorage.app",
  messagingSenderId: "106470044567",
  appId: "1:106470044567:web:dee513af6399cb5bc18ad2",
  measurementId: "G-LY8662JGKH",
  // Add the database URL for Realtime Database
  databaseURL: "https://salamanka-325ea-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;
