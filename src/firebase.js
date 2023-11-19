import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_FIREBASE_KEY,
    // authDomain: "firstone-5ac2a.firebaseapp.com",
    // projectId: "firstone-5ac2a",
    // storageBucket: "firstone-5ac2a.appspot.com",
    // messagingSenderId: "10842926773",
    // appId: "1:10842926773:web:31ef97c5365f62373398fc",
    // measurementId: "G-T0DX9P5KGC",
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

export default app;