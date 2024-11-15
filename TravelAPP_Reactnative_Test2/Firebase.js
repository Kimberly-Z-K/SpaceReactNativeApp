// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for Firebase Authentication
import { getFirestore } from "firebase/firestore"; 



const firebaseConfig = {
  apiKey: "AIzaSyAVTssJQ3XMTWOeitdf9OtOrLPP8uS-l9g",
  authDomain: "signup-9620f.firebaseapp.com",
  projectId: "signup-9620f",
  storageBucket: "signup-9620f.appspot.com",
  messagingSenderId: "44155983559",
  appId: "1:44155983559:web:d84f16e804508ae11bd0e2"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
export{auth,db};