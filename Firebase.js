// Import the necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { AsyncStorage } from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported from the correct location
import { getFirestore } from 'firebase/firestore'; // Firestore import

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVTssJQ3XMTWOeitdf9OtOrLPP8uS-l9g",
  authDomain: "signup-9620f.firebaseapp.com",
  projectId: "signup-9620f",
  storageBucket: "signup-9620f.appspot.com",
  messagingSenderId: "44155983559",
  appId: "1:44155983559:web:d84f16e804508ae11bd0e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence for React Native using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage for persistence
});

// Initialize Firestore
const db = getFirestore(app);

// Export auth and db for use in other parts of your app
export { auth, db };
