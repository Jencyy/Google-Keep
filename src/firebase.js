// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLLyE4XNlqXWtbUpPiUZryN28dQpO6m2E",
  authDomain: "keep-74604.firebaseapp.com",
  projectId: "keep-74604",
  storageBucket: "keep-74604.appspot.com",
  messagingSenderId: "116875362635",
  appId: "1:116875362635:web:dbe76617b28ffcd76ce8ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, storage, auth };
