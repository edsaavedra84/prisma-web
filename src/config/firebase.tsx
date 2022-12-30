import {initializeApp} from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const app = initializeApp({
    apiKey: "AIzaSyCg6JAjP4KN0ZXt2nE-5ktIWbf2pijtYro",
    authDomain: "prisma-39c97.firebaseapp.com",
    projectId: "prisma-39c97",
    storageBucket: "prisma-39c97.appspot.com",
    messagingSenderId: "982048677611",
    appId: "1:982048677611:web:7f2f0184f5f164c52668ae",
    measurementId: "G-5B83VCGJLM"
});

const db = getFirestore(app);
const auth = getAuth(app);

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost') {
    connectFirestoreEmulator(db,'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099/');
}

export { db, auth };
