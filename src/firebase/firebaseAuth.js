import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    FacebookAuthProvider,
    signInWithPhoneNumber,
    RecaptchaVerifier,
    TwitterAuthProvider,
    signOut,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const signInWithGoogle = async () => {
    try {
        return await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithFacebook = async () => {
    try {
        return await signInWithPopup(auth, facebookProvider);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithTwitter = async () => {
    try {
        return await signInWithPopup(auth, twitterProvider);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithPhone = async (mynumber) => {
    try {
        let verify = new RecaptchaVerifier('recaptcha-container');
        return await signInWithPhoneNumber(mynumber, verify);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
    localStorage.clear()
};
export {
    auth,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};