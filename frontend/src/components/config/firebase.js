import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDp7nU07BuPB3I7IuQHwNZVB22XS_Tx1sc",
  authDomain: "superkart-124c0.firebaseapp.com",
  projectId: "superkart-124c0",
  storageBucket: "superkart-124c0.appspot.com",
  messagingSenderId: "844932626360",
  appId: "1:844932626360:web:e2979f491637d86ea7c14d",
  measurementId: "G-Y810K825EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}