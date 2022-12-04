import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signOut,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { firebaseConfig } from './firebase';
import { getRemoteConfig, getValue, fetchAndActivate } from 'firebase/remote-config';
import { setIsAuthenticated } from '../redux/actions/AuthAction';
import { useDispatch } from 'react-redux';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const remoteConfig = getRemoteConfig(firebaseApp);
const googleProvider = new GoogleAuthProvider();
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
};
