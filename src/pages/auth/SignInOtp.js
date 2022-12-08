import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
  const [otpError, setOtpError] = useState();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const configureCaptcha = () =>
    (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signin-otp-container', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));

  const resendOTP = (phone) => {
    if (seconds === 0 && minutes === 0) {
      setOtp('');
      setOtpError(null);
      setMinutes(2);
      setSeconds(0);
      sendOTP(phone);
    }
  };

  const sendOTP = async (phoneNumber) => {
    // dispatch(setLoading(true))
    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
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
    return response.data.data.userProfile?.information_data ? true : false;
  };

  const onSubmitOTP = () => {
    // dispatch(setLoading(true));
    window.confirmationResult
      .confirm(otp && otp)
      .then(async (response) => {
        const { user } = response;
        if (user) {
          dispatch(setIsAuthenticated(true));
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Log in Succesfull', {
            theme: 'colored',
          });

          const isBasicInfoExists = await getUserBasicInfo(user.uid);
          if (isBasicInfoExists) {
            const redirectUrl = searchParams.get('redirect')
            if(redirectUrl) {
              navigate(redirectUrl);
            } else {
              navigate('/dashboard');
            }
          } else {
            navigate('/info');
          }
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error)
        // dispatch(setLoading(false));
        // navigate('/login');
        setOtpError("Invalid Code")
      });
  };
  return (
    <>
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div id="signin-otp-container"></div>
          <div className="right_box_container">
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
              <div className='d-flex justify-content-between mt-2'>
                <div>
                  <span>Didn't receive code?</span>
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
              </div>
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
