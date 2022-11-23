import React from 'react';
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

const SignInOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const phoneNumber = location?.state?.phoneNumber;
  const [otp, setOtp] = useState('');

  const configureCaptcha = () =>
    (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));

  const sendOTP = async (phoneNumber) => {
    // dispatch(setLoading(true))
    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(`+91${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // dispatch(setLoading(false))
        toast.success('OTP has been sent to Mobile Number Again', {
          theme: 'colored',
        });
        navigate('/otp', {
          state: {
            phoneNumber: phoneNumber,
          },
        });
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        dispatch(setLoading(false));
        console.log(error);
      });
  };

  const onSubmitOTP = () => {
    dispatch(setLoading(true));
    window.confirmationResult
      .confirm(otp && otp)
      .then((response) => {
        if (response.user) {
          dispatch(setLoading(false));
          localStorage.setItem('user', JSON.stringify(response.user));
          toast.success('Log in Succesfull', {
            theme: 'colored',
          });
          navigate('/info');
        }
      })
      .catch((error) => {
        alert('Error', error);
      });
  };
  console.log('otp::::', otp.length);
  return (
    <>
      <AuthNavbar />
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="auth_form otp-form">
            
            <div className="log-in-title login-head">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_726_3575)">
<path d="M19 10.9998H7.14L10.77 6.63979C10.9397 6.43557 11.0214 6.17229 10.997 5.90786C10.9726 5.64344 10.8442 5.39953 10.64 5.22979C10.4358 5.06005 10.1725 4.97839 9.90808 5.00277C9.64365 5.02715 9.39974 5.15557 9.23 5.35979L4.23 11.3598C4.19636 11.4075 4.16628 11.4576 4.14 11.5098C4.14 11.5598 4.14 11.5898 4.07 11.6398C4.02467 11.7544 4.00094 11.8765 4 11.9998C4.00094 12.1231 4.02467 12.2451 4.07 12.3598C4.07 12.4098 4.07 12.4398 4.14 12.4898C4.16628 12.5419 4.19636 12.5921 4.23 12.6398L9.23 18.6398C9.32402 18.7527 9.44176 18.8434 9.57485 18.9057C9.70793 18.9679 9.85309 19 10 18.9998C10.2337 19.0002 10.4601 18.9189 10.64 18.7698C10.7413 18.6858 10.825 18.5827 10.8863 18.4664C10.9477 18.35 10.9855 18.2227 10.9975 18.0918C11.0096 17.9608 10.9957 17.8287 10.9567 17.7031C10.9176 17.5775 10.8542 17.4608 10.77 17.3598L7.14 12.9998H19C19.2652 12.9998 19.5196 12.8944 19.7071 12.7069C19.8946 12.5194 20 12.265 20 11.9998C20 11.7346 19.8946 11.4802 19.7071 11.2927C19.5196 11.1051 19.2652 10.9998 19 10.9998Z" fill="#8F8799"/>
</g>
<defs>
<clipPath id="clip0_726_3575">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>Verify OTP</div>
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
                  variant="info"
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
