import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //v9

const firebaseConfig = {
    apiKey: "AIzaSyCFVhwmTpxsk7WGaTduDkQOcmVSRN77SYA",
    authDomain: "unikaksha2022.firebaseapp.com",
    projectId: "unikaksha2022",
    storageBucket: "unikaksha2022.appspot.com",
    messagingSenderId: "891970569376",
    appId: "1:891970569376:web:ed6b939ba2de39d2ce75c5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebaseConfig, firebase }