import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDajLqjKrGdFbStlYEuAqCXvp1uXar9JI",
  authDomain: "todo-list-a5661.firebaseapp.com",
  projectId: "todo-list-a5661",
  storageBucket: "todo-list-a5661.appspot.com",
  messagingSenderId: "643079928787",
  appId: "1:643079928787:web:2917eea84bbf25761c8d26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
