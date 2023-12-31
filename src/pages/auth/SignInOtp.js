import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { arrowBack } from '../../assets/images';
import { firebase } from '../../firebase/firebase';
import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import { setLoading } from '../../redux/actions/LoaderActions';
import ApiService from '../../services/ApiService';
import './auth.scss';
import LeftBox from './components/LeftBox';
import OtpInput from 'react-otp-input';
import Footer from '../../components/Footer';

const SignInOtp = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const phoneNumber = location?.state?.phoneNumber;
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setIsResendDisabled(false);
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
      setIsResendDisabled(true);
      setMinutes(2);
      setSeconds(0);
      sendOTP(phone);
    }
  };

  const sendOTP = async (phoneNumber) => {
    dispatch(setLoading(true));

    setloading(true);
    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success('OTP has been sent to Mobile Number Again', {
          theme: 'colored',
        });
        setloading(false);
        dispatch(setLoading(true));
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        setloading(false);
        dispatch(setLoading(true));
      });
  };

  const getUserBasicInfo = async (uid) => {
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    return response.data.data.userProfile?.information_data ? true : false;
  };

  const onSubmitOTP = () => {
    setloading(true);
    dispatch(setLoading(true));

    window.confirmationResult
      .confirm(otp && otp)
      .then(async (response) => {
        const { user } = response;
        if (user) {
          setloading(false);
          dispatch(setLoading(false));

          dispatch(setIsAuthenticated(true));
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Log in Succesfull', {
            theme: 'colored',
          });

          const isBasicInfoExists = await getUserBasicInfo(user.uid);
          if (isBasicInfoExists) {
            const redirectUrl = searchParams.get('redirect');
            if (redirectUrl) {
              navigate(redirectUrl);
            } else {
              navigate('/dashboard');
            }
          } else {
            navigate('/info');
          }
        }
      })
      .catch((error) => {
        setloading(false);
        dispatch(setLoading(false));

        // navigate('/login');
        setOtpError('Invalid Code!');
      });
  };
  return (
    <>
      <section className="auth_layout login_screen auth-unikaksha otp-screen">
        <LeftBox />
        <div className="right_box">
          <div id="signin-otp-container"></div>
          <div className="right_box_container">
            <div className="auth_form otp-form">
              <div className="log-in-title login-head">
                <img
                  className="me-2"
                  onClick={() => navigate('/login')}
                  src={arrowBack}
                  alt="back-arrow"
                />
                Verify OTP
              </div>
              <p>Enter the OTP sent to your registered mobile number.</p>
              {otpError && (
                <Alert key="danger" variant="danger">
                  {otpError}
                </Alert>
              )}
              <div className="otp-input">
                <OtpInput value={otp} onChange={(e) => setOtp(e)} numInputs={6} />
              </div>
              <div className="d-flex justify-content-between mt-2">
                <div>
                  <span>Did not receive OTP?</span>
                </div>
                <div>
                  {/* <a
                    className="resend-otp"
                    style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                    onClick={() => !minutes && !seconds && resendOTP(phoneNumber)}>
                    Resend OTP
                  </a> */}
                  <a
                    style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                    className={isResendDisabled ? 'resend-otp disabled' : 'resend-otp'}
                    onClick={() => resendOTP(phoneNumber)}>
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
                  disabled={!(otp.length === 6) || loading}>
                  {loading ? 'Loading...' : 'Verify and Signin'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default SignInOtp;
