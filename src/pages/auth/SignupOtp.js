import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setLoading } from '../../redux/actions/LoaderActions';
import { firebase } from '../../firebase/firebase';
import OtpInput from 'react18-input-otp';
import LeftBox from './components/LeftBox';
import AuthNavbar from './components/AuthNavbar';
import './auth.scss';
import { useState } from 'react';
import { arrowBack } from '../../assets/images';
import ApiService from '../../services/ApiService';
import { Alert } from 'react-bootstrap';

const SignupOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userSignUpData = location.state?.values;
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!userSignUpData?.phoneNumber) {
      navigate('/signup');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const resendOTP = (phone) => {
    if (seconds === 0 && minutes === 0) {
      setOtp('');
      setOtpError(null);
      setMinutes(2);
      setSeconds(0);
      sendOTP(phone);
    }
  };

  const configureCaptcha = () =>
    (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signup-otp-container', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));

  const createUserIfNotExists = async (uid) => {
    const userData = {
      uid,
      email: userSignUpData.email,
      phone: `+${userSignUpData.phoneNumber}`,
    };
    await ApiService(`/user/create`, `POST`, userData);
  };

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

  const onSubmitOTP = () => {
    dispatch(setLoading(true));
    window.confirmationResult
      .confirm(otp && otp)
      .then((response) => {
        if (response.user) {
          const { user } = response;
          dispatch(setLoading(false));
          const res = createUserIfNotExists(user.uid);
          if (res?.data?.data?.code === 200) {
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Log in Succesfull', {
              theme: 'colored',
            });
            navigate('/info', {
              state: location.state?.values,
            });
          }
        }
      })
      .catch((error) => {
        setOtpError('Invalid Code');
      });
  };
  return (
    <>
      {/* <AuthNavbar /> */}
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div id="signup-otp-container"></div>
            <div className="auth_form otp-form">
              <div className="log-in-title login-head">
                <img
                  className="me-2"
                  onClick={() => navigate(-1)}
                  src={arrowBack}
                  alt="back-arrow"
                />
                Verify OTP
              </div>
              <p>Enter the OTP sent to your registered email id and mobile number.</p>
              {otpError && (
                <Alert key="danger" variant="danger">
                  {otpError}
                </Alert>
              )}
              <div className="otp-input">
                <OtpInput value={otp} onChange={(e) => setOtp(e)} numInputs={6} />
              </div>
              <div>
                <a className="resend-otp" onClick={() => resendOTP(phoneNumber)}>
                  Resend OTP
                </a>
                <span>
                  {' '}
                  in {minutes < 10 ? `0${minutes}` : minutes}:{' '}
                  {seconds < 10 ? `0${seconds}` : seconds}
                </span>
              </div>
              <div className="d-grid gap-2 mt-4">
                <Button
                  type="submit"
                  variant="secondary"
                  onClick={onSubmitOTP}
                  disabled={!(otp.length === 6)}>
                  Verify
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupOtp;
