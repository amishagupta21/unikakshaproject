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

const SignupOtp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const phoneNumber = location.state?.values.mobileNumber;
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (!location.state?.values.mobileNumber) {
            navigate("/signup")
        }
    }, [])

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
                    navigate('/info', {
                        state: location.state?.values
                    });
                }
            })
            .catch((error) => {
                alert('Error', error);
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
                            <div id="sign-in-button"> </div>
                            <a className="resend-otp" onClick={() => sendOTP(phoneNumber)}>
                                Resend OTP
                            </a>
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
