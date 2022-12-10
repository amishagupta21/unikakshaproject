import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //v9

const firebaseConfig = {
  apiKey: 'AIzaSyBPNKelmjJI1IXCqzmiCL3rTytF2OSXE_4',
  authDomain: 'auth.unikaksha.com',
  projectId: 'unikaksha-prod',
  storageBucket: 'unikaksha-prod.appspot.com',
  messagingSenderId: '463040528893',
  appId: '1:463040528893:web:cde96d7736b32461fed994',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
});

export { firebaseConfig, firebase };
