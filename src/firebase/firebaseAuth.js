import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider
} from 'firebase/auth';
import { getRemoteConfig } from 'firebase/remote-config';
import { toast } from 'react-toastify';
import { firebaseConfig } from './firebase';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const remoteConfig = getRemoteConfig(firebaseApp);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();


const signInWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
    toast.error(`${err.message}`, {
      theme: 'colored',
    });
  }
};

// const signInWithPhone = async () => {
//   try {
//     return await signInWithPopup(auth, provider);
//   } catch (err) {
//     console.error(err);
//     toast.error(`${err.message}`, {
//       theme: 'colored',
//     });
//   }
// };

const forgotPassword = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
    toast.error(`${err.message}`, {
      theme: 'colored',
    });
  }
};
const resendOTP = (phoneNumber, appVerifier) => {
  firebase.auth().verifyPhoneNumber(phoneNumber, appVerifier)
    .then((verificationId) => {
      // Save the verification ID somewhere
      // Show a message to the user that OTP has been resent
    })
    .catch((error) => {
      console.log(error);
      // Handle error
    });
};

const signInWithFacebook = async () => {
  try {
    return await signInWithPopup(auth, facebookProvider);
  } catch (err) {
    console.error(err);
    toast.error(`${err.message}`, {
      theme: 'colored',
    });
  }
};

const signInWithTwitter = async () => {
  try {
    return await signInWithPopup(auth, twitterProvider);
  } catch (err) {
    console.error(err);
    toast.error(`${err.message}`, {
      theme: 'colored',
    });
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    toast.error(`${err.message}`, {
      theme: 'colored',
    });
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    toast.error(`${err.message}`, {
      theme: 'colored',
    });
  }
};


const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
    toast.error(`${err.message}`, {
      theme: 'colored',
    });
  }
};

const logout = async () => {
  localStorage.clear();
  toast.success('Logout Successfully', {
    theme: 'colored',
  });
  return await signOut(auth);
};
export {
  auth,
  remoteConfig,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  forgotPassword,
  logout,
  resendOTP,
};
