import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLtXqxAaA0lxztnUcowfCJ4aVf8opcY7E",
  authDomain: "authentication-59a39.firebaseapp.com",
  projectId: "authentication-59a39",
  storageBucket: "authentication-59a39.firebasestorage.app",
  messagingSenderId: "714342017529",
  appId: "1:714342017529:web:cd1d6a374b009110433528",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
