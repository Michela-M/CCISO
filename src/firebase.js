// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLvsNTVXhiEsQPvxiGTd-Dd4OLPlPzK1U",
    authDomain: "cciso-bd98d.firebaseapp.com",
    projectId: "cciso-bd98d",
    storageBucket: "cciso-bd98d.firebasestorage.app",
    messagingSenderId: "707097051803",
    appId: "1:707097051803:web:f66836b6104bc7d78afc3e",
    measurementId: "G-XNH0S4RP5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, storage, auth, googleProvider };
