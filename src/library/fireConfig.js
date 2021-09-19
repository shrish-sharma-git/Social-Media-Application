import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBKXIYNO6UouGv9gkpMFLnhSeMo2IJj_3o",
    authDomain: "untitled-onesilicondiode.firebaseapp.com",
    projectId: "untitled-onesilicondiode",
    storageBucket: "untitled-onesilicondiode.appspot.com",
    messagingSenderId: "349125906577",
    appId: "1:349125906577:web:854ba58b3ace931abf2f30",
    measurementId: "G-W9T2B0S8BC"
};

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;
const analytics = getAnalytics(app);

export { firebase, FieldValue }; 