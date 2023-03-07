import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import { arrowBack, editGray } from '../../assets/images';
import { firebase } from '../../firebase/firebase';
import { setLoading } from '../../redux/actions/LoaderActions';
import ApiService from '../../services/ApiService';
import './auth.scss';
import LeftBox from './components/LeftBox';
import Footer from '../../components/Footer';

const SignupOtp = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const userSignUpData = location.state?.values;
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [userCreated, setUserCreated] = useState();
  const [isButtonLoading, setIsButtonLoading] = useState();
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (!userSignUpData?.phoneNumber) {
      navigate('/signup');
    }
  }, []);

  useEffect(() => {
    if (userCreated) {
      // navigate('/info');
      navigate('/set-password')
    }
  }, [userCreated]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          setIsResendDisabled(false);
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
      setIsResendDisabled(true);
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

  const createUserIfNotExists = async (user) => {
    const userData = {
      uid: user.uid,
      email: userSignUpData.email,
      phone: `+${userSignUpData?.phoneNumber}`,
      whatsappoptin: userSignUpData?.whatsappoptin,
    };
    const result = await ApiService(`user/create`, `POST`, userData);
    localStorage.setItem('user', JSON.stringify(user));
    if (result?.data.code === 200) {
      // navigate('/info');
      navigate('/set-password', {
        state: {
          values: {
            email: userSignUpData.email
          },
        },
      });
      
    }
    setIsButtonLoading(false);
  };

  const sendOTP = async (phoneNumber) => {
    setloading(true);
    dispatch(setLoading(true));

    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(`+${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success('OTP has been sent to Mobile Number Again', {
          theme: 'colored',
        });
        setloading(false);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        setloading(false);
        dispatch(setLoading(false));
      });
  };

  const onSubmitOTP = (e) => {
    setloading(true);
    setIsButtonLoading(true);
    e.preventDefault();

    window.confirmationResult
      .confirm(otp && otp)
      .then(async (response) => {
        setIsButtonLoading(false);
        if (response.user) {
          setloading(false);
          const { user } = response.user.multiFactor;
          firebase.auth().currentUser.updateProfile({ displayName: userSignUpData?.displayName });
          createUserIfNotExists(user);
        }
      })
      .catch((error) => {
        setloading(false);
        setIsButtonLoading(false);
        setOtpError('Invalid Code!');
      });
  };

  return (
    <>
      {/* <AuthNavbar /> */}
      <section className="auth_layout login_screen auth-unikaksha">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div id="signup-otp-container"></div>
            <div className="auth_form otp-form">
              <div className="log-in-title login-head">
                <img
                  className="me-2"
                  onClick={() => navigate('/signup')}
                  src={arrowBack}
                  alt="back-arrow"
                />
                Verify OTP
              </div>
              <div className="d-flex">
                <p>
                  Enter OTP sent to your mobile{' '}
                  <span style={{ font: 'Poppins', color: '#363F5E' }}>
                    +{userSignUpData?.phoneNumber}
                  </span>
                  <img
                    className="ms-2 edit"
                    onClick={() =>
                      navigate('/signup', {
                        state: {
                          mobileNumber: userSignUpData.phoneNumber,
                          email: userSignUpData.email,
                          fullName: userSignUpData.displayName,
                          whatsappoptin: userSignUpData.whatsappoptin,
                        },
                      })
                    }
                    alt="edit"
                    src={editGray}></img>
                </p>
              </div>
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
                  <span>Didn't receive code?</span>
                </div>
                <div>
                  {/* <a
                    className="resend-otp"
                    style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                    onClick={() => !minutes && !seconds && resendOTP(phoneNumber)}>
                    Resend OTP */}
                  <a
                    style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                    className={isResendDisabled ? 'resend-otp disabled' : 'resend-otp'}
                    onClick={() => resendOTP(userSignUpData.phoneNumber)}>
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
                  Verify
                  {isButtonLoading && (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                    </>
                  )}
                  {/* disabled={!(otp.length === 6) || loading}>
                   {loading ? 'Loading...' : 'Verify and Signup'} */}
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

export default SignupOtp;
