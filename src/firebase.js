import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBKXIYNO6UouGv9gkpMFLnhSeMo2IJj_3o",
    authDomain: "untitled-onesilicondiode.firebaseapp.com",
    projectId: "untitled-onesilicondiode",
    storageBucket: "untitled-onesilicondiode.appspot.com",
    messagingSenderId: "349125906577",
    appId: "1:349125906577:web:854ba58b3ace931abf2f30",
    measurementId: "G-W9T2B0S8BC"
})

export const auth = app.auth();
export const firestore = app.firestore();
export default app;