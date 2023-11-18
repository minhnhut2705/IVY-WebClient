import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey:"AIzaSyBM8b96tb_SKJ3b3tNXHEqFJ3lO0B-leYg",
    authDomain: "athena-4d002.firebaseapp.com",
    projectId: "athena-4d002",
    storageBucket:"athena-4d002.appspot.com",
    messagingSenderId: "346009740549",
    appId:"1:346009740549:web:eb1cb52e61cbe799da036c",
};

const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const storage = getStorage(app)
const auth = getAuth(app);
export { app, storage, auth, googleProvider, facebookProvider,  signInWithPopup } 

