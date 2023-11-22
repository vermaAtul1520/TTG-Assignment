import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
    getDatabase,
    ref,
  } from "firebase/database";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    apiKey: "AIzaSyB784cU5hAAmDBZrWwYD6CjNgsUGAVzNNY",
    authDomain: "shop-list-288e5.firebaseapp.com",
    projectId: "shop-list-288e5",
    storageBucket: "shop-list-288e5.appspot.com",
    messagingSenderId: "80414812095",
    appId: "1:80414812095:web:42c7bbf59f87c2df4ea30a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const productsRef = ref(database, "product");

export default app;