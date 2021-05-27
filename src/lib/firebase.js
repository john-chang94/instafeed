import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAtP0vBrBKeJ3kjhg3890eSFbgeg9APzBc",
    authDomain: "instafeed-5fa99.firebaseapp.com",
    projectId: "instafeed-5fa99",
    storageBucket: "instafeed-5fa99.appspot.com",
    messagingSenderId: "1078957350475",
    appId: "1:1078957350475:web:45697d2db12eeb7ed4f7ce"
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

console.log('firebase', firebase);

export { firebase, FieldValue };