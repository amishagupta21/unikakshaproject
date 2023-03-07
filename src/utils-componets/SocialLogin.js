import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import facebookIcon from '../assets/images/Facebook-icon.svg';
import googleIcon from '../assets/images/Google-icon.svg';
import appleIcon from '../assets/images/icon-apple.svg';

import { signInWithFacebook, signInWithGoogle } from '../firebase/firebaseAuth';
import { firebase } from '../firebase/firebase';
import ApiService from '../services/ApiService';
import { toast } from 'react-toastify';
import { setLoading } from '../redux/actions/LoaderActions';

const SocialLogin = ({ setFieldValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkIfUserExists = async (email, phone) => {
    const result = await ApiService('user/check-exists', 'POST', { email, phone }, true);
    return result?.data?.data?.user;
  };

  const configureCaptcha = () => {
    return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('social-login', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));
  };

  const dualAuth = async (userDetail) => {
    let data = {
      uid: userDetail?.uid,
      email: userDetail?.email,
      fullName: userDetail?.displayName,
    };
    const user = await checkIfUserExists(userDetail?.email, null);
    if (user?.uid) {
      const appVerifier = configureCaptcha();
      // dispatch(setLoading(true))
      firebase
        .auth()
        .signInWithPhoneNumber(`${user.phone}`, appVerifier)
        .then(async (confirmationResult) => {
          window.confirmationResult = confirmationResult;
          // dispatch(setLoading(false))
          toast.success('OTP has been Sent to Mobile Number', {
            theme: 'colored',
          });

          navigate('/signin-otp', {
            state: {
              phoneNumber: user.phone,
            },
          });
        })
        .catch((error) => {
          toast.error(`${error}`, {
            theme: 'colored',
          });
          dispatch(setLoading(false));
        });
    } else {
      navigate('/signup', {
        state: data,
      });
    }
  };
  return (
    <>
      <div id="social-login"></div>
      <div className="d-flex justify-content-around mt-4 social-login-assets">
        <Button
          className="social-btn"
          variant="outline-dark"
          onClick={async () => {
            const res = await signInWithGoogle();
            if (res?.user) {
              localStorage.setItem('user', JSON.stringify(res?.user));
              dualAuth(res?.user);
            }
          }}>
          <img className="mx-2" src={googleIcon} alt="google" />
          Google
        </Button>
        <Button
          className="social-btn"
          variant="outline-dark"
          onClick={async () => {
            const res = await signInWithFacebook();
            if (res?.user) {
              localStorage.setItem('user', JSON.stringify(res?.user));
              dualAuth(res?.user);
            }
          }}>
          <img className="mx-2" src={facebookIcon} alt="facebook" />
          Facebook
        </Button>

        {/* <Button
          className="social-btn"
          variant="outline-dark"
        >
          <img className="mx-2" src={appleIcon} alt="facebook" />
          Apple
        </Button> */}
      </div>
    </>
  );
};

export default SocialLogin;
