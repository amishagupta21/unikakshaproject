import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OtpInput from 'react18-input-otp';
import { arrowBack } from '../../assets/images';
import { firebase } from '../../firebase/firebase';
import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import { setLoading } from '../../redux/actions/LoaderActions';
import ApiService from '../../services/ApiService';
import './auth.scss';
import LeftBox from './components/LeftBox';

const SignInOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const phoneNumber = location?.state?.phoneNumber;
  const [otp, setOtp] = useState('');

  const configureCaptcha = () =>
  (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    size: 'invisible',
    callback: (response) => { },
    defaultCountry: 'IN',
  }));

  const sendOTP = async (phoneNumber) => {
    // dispatch(setLoading(true))
    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(`+${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // dispatch(setLoading(false))
        toast.success('OTP has been sent to Mobile Number Again', {
          theme: 'colored',
        });
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        dispatch(setLoading(false));
      });
  };

  const getUserBasicInfo = async (uid) => {
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    return response.data.data.userProfile.information_data ? true : false;
  }

  const onSubmitOTP = () => {
    dispatch(setLoading(true));
    window.confirmationResult
      .confirm(otp && otp)
      .then(async(response) => {
        const { user } = response;
        if (user) {
          dispatch(setIsAuthenticated(true));
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Log in Succesfull', {
            theme: 'colored',
          });
          
          const isBasicInfoExists = await getUserBasicInfo(user.uid);
          if(isBasicInfoExists) {
            navigate('/dashboard');
          } else {
            navigate('/info');
          }
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        navigate('/login')
      });
  };
  return (
    <>
      {/* <AuthNavbar /> */}
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="auth_form otp-form">

              <div className="log-in-title login-head">
                <img className='me-2' src={arrowBack} alt="back-arrow" />
                Verify OTP 
              </div>
              <p>Enter the OTP sent to your registered email id and mobile number.</p>
              <div className="otp-input">
                <OtpInput value={otp} onChange={(e) => setOtp(e)} numInputs={6} />
              </div>
              <a className="resend-otp" onClick={() => sendOTP(phoneNumber)}>
                Resend OTP
              </a>
              <div className="d-grid gap-2 mt-4">
                <Button
                  type="submit"
                  variant="secondary"
                  onClick={onSubmitOTP}
                  disabled={!(otp.length === 6)}>
                  Verify and Signin
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignInOtp;
