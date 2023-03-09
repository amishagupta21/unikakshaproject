import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { firebase } from '../../firebase/firebase';
import { setLoading } from '../../redux/actions/LoaderActions';
import ApiService from '../../services/ApiService';
import SocialLogin from '../../utils-componets/SocialLogin';
import AuthNavbar from './components/AuthNavbar';
import LeftBox from './components/LeftBox';
import OtpInput from 'react-otp-input';
import Footer from '../../components/Footer';
import pencilIcon from "../../assets/images/icons/Pencil.svg"
import { FaPencilAlt } from 'react-icons/fa';

const Signup = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [userDetails, setUserDetails] = React.useState({});
  const [authError, setAuthError] = React.useState();
  const [disabled, setDisabled] = useState(false);

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      padding: '5px 5px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      padding: '5px 5px',
      cursor: 'not-allowed',

    },
  };
  function handleDisableButton() {
    setDisabled(!disabled);
  }

  const [OTPSent, setOTPSent] = useState(false);
  const [pencil, setPencil] = useState(false);
  const [OTPLabel, setOTPLabel] = useState('Get OTP');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const [formData, setFormData] = useState({});

  const setInitialData = async () => {
    setUserDetails(location.state);
  };

  useEffect(() => {
    setInitialData();
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
  (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signup-container', {
    size: 'invisible',
    callback: (response) => { },
    defaultCountry: 'IN',
  }));

  const checkIfUserExists = async (email, phone) => {
    const result = await ApiService(
      'user/check-exists',
      'POST',
      { email, phone: `+${phone}` },
      true
    );
    return result?.data?.data?.user;
  };

  const createUser = async (values) => {
    setloading(true);
    dispatch(setLoading(true));

    const { email, mobileNumber: phone } = values;
    const user = await checkIfUserExists(email, phone);
    if (!user) {
      sendOTP(values);
      setloading(false);
    } else {
      setAuthError('User already exists');
      dispatch(setLoading(false));
      setloading(false);
      // setTimeout(() => {
      //   navigate('/login');
      // }, 500);
    }
  };

  const sendOTP = async (values) => {
    console.log(values);
    const countryCode = values.mobileNumber.substr(0, 2);
    const mobileNumber = values.mobileNumber.substr(2, values.mobileNumber.length);
    const result = { ...values, countryCode, mobileNumber };
    setFormData(result);
    setloading(true);

    const userExist = await checkIfUserExists(values.email, `+${values.mobileNumber}`);

    if (!userExist) {
      const appVerifier = configureCaptcha();
      firebase
        .auth()
        .signInWithPhoneNumber(`+${values.mobileNumber}`, appVerifier)
        .then(async (confirmationResult) => {
          window.confirmationResult = confirmationResult;
          // toast.success('OTP has been Sent to Mobile Number', {
          //   theme: 'colored',
          // });
          dispatch(setLoading(false));
          setOTPLabel('OTP Sent');
          setOTPSent(true);
          setPencil(true)

          // navigate('/signup-otp', {
          //   state: {
          //     values: {
          //       phoneNumber: values.mobileNumber,
          //       email: values.email,
          //       displayName: values.fullName,
          //       whatsappoptin: values.whatsappoptin,
          //     },
          //   },
          // });
          setloading(false);
        })
        .catch((error) => {
          setAuthError('Too many attempts please try again later.');
          dispatch(setLoading(false));
          toast.error(`${error}`, {
            theme: 'colored',
          });
          setloading(false);
        });
    } else {
      setAuthError('User already exist.');
    }
  };
  // console.log(formData);

  const onSubmitOTP = (e) => {
    setloading(true);
    setIsButtonLoading(true);
    e.preventDefault();

    window.confirmationResult
      .confirm(otp && otp)
      .then(async (response) => {
        setIsButtonLoading(false);
        console.log(response.user);
        if (response.user) {
          setloading(false);
          const { user } = response.user.multiFactor;

          firebase.auth().currentUser.updateProfile({ displayName: formData?.fullName });
          createUserIfNotExists(user);
        }
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        setIsButtonLoading(false);
        setOtpError('Invalid Code!');
      });
  };

  const createUserIfNotExists = async (user) => {
    const userData = {
      uid: user.uid,
      fullName: formData.fullName,
      email: formData.email,
      phone: `+91${formData?.mobileNumber}`,
      whatsappoptin: formData?.whatsappoptin,
      countryCode: formData.countryCode,
    };
    const result = await ApiService(`user/create`, `POST`, userData);
    console.log(result);
    localStorage.setItem('user', JSON.stringify(user));
    if (result?.data.code === 200) {
      // navigate('/info');
      navigate('/set-password', {
        state: {
          values: {
            email: formData.email,
          },
        },
      });
    }
    setIsButtonLoading(false);
  };

  const resendOTP = (phone) => {
    if (seconds === 0 && minutes === 0) {
      setOTPLabel('Get OTP');
      setOTPSent(false);
      setPencil(false)
      setOtp('');
      setOtpError(null);
      setIsResendDisabled(true);
      setMinutes(2);
      setSeconds(0);
      sendOTP(phone);
    }
  };

  return (
    <>
      <section className="auth_layout login_screen auth-unikaksha">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="log-in-title 1">Sign Up</div>
            <div href="#" className="resetpassword create-account gray">
              Already have an account?
              <Link to="/login"> Log in</Link>
            </div>
            <div className="auth_form">
              <div id="signup-container"> </div>
              {/* {authError && (
                <Alert key="danger" variant="danger">
                  {authError}
                </Alert>
              )} */}
              <Formik
                enableReinitialize={true}
                initialValues={{
                  fullName: userDetails ? userDetails.fullName : '',
                  email: userDetails ? userDetails.email : '',
                  mobileNumber: '',
                  whatsappoptin: true,
                  mobileLength: null,
                }}
                validationSchema={Yup.object().shape({
                  fullName: Yup.string().required('Full name is a required field'),
                  email: Yup.string()
                    .email('Please enter a valid email')
                    .required('Email is a required field'),
                  mobileNumber: Yup.string()
                    .min(10)
                    .required('Mobile number is a required field'),
                })}
                onSubmit={(values) => {
                  createUser(values);
                }}
                render={({
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  errors,
                  touched,
                  validateForm,
                  setFieldValue,
                  isValid,
                }) => (
                  <Form>
                    <Field
                      name="fullName"
                      render={({ field, formProps }) => (
                        <Row className="mb-0">
                          <FormGroup
                            controlId="fullName"
                            className="form-group-1 mb-3"
                            as={Col}
                            md="12">
                            <FormLabel>
                              Full Name<em className="red top">*</em> (As per PAN)
                            </FormLabel>
                            <FormControl
                              placeholder="Enter your name here"
                              type={'text'}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormGroup>
                        </Row>
                      )}
                    />
                    {errors.fullName && touched.fullName ? (
                      <div className="error-text">{errors.fullName}</div>
                    ) : null}
                    <Field
                      name="email"
                      render={({ field, formProps }) => (
                        <Row className="mb-0">
                          <FormGroup
                            controlId="email"
                            className="form-group-1 mb-3"
                            as={Col}
                            md="12">
                            <FormLabel>
                              Email<em className="red top">*</em>
                            </FormLabel>
                            <FormControl
                              placeholder="Enter your email here"
                              type={'text'}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormGroup>
                        </Row>
                      )}
                    />
                    {errors.email && touched.email ? (
                      <div className="error-text">{errors.email}</div>
                    ) : null}

                    <Field
                      name="mobileNumber"
                      render={({ field, formProps }) => (
                        <Row className="mb-0">
                          <FormLabel>
                            Mobile Number<em className="red top">*</em>
                          </FormLabel>

                          <PhoneInput
                            placeholder="Enter mobile number"
                            country={'in'}
                            disabled={disabled}
                            preferredCountries={['in']}
                            value={field.value}
                            onChange={(phone, data) => {
                              setFieldValue('mobileNumber', phone);
                              setFieldValue('mobileLength', data.dialCode.length);
                            }}
                            countryCodeEditable={false}

                          />

                          <small className="sml-size text-start">
                            We will send you OTP on mobile number.
                          </small>

                        </Row>
                      )}
                    />

                    <br />

                    {values.mobileNumber.length - values.mobileLength === 10 &&

                      (
                        <>

                          <Button
                            // style={disabled ? styles.buttonDisabled : styles.button}
                            // disabled={disabled}
                            // onClick={handleDisableButton}
                            type={OTPSent ? 'button' : 'submit'}
                            variant="outline-primary"
                            className={OTPSent ? 'otp-sent' : 'get-otp-btn'} >
                            {/* {values.mobileNumber.length - values.mobileLength === 10 && (
                              <img src={pencilIcon} height={14} width={14} />
                            )} */}
                            {OTPLabel}
                          </Button>

                        </>
                      )}

                    {OTPSent && (
                      <>
                        <div className="otp-input">
                          <OtpInput value={otp} onChange={(e) => setOtp(e)} numInputs={6} />
                        </div>

                        <div className="d-flex justify-content-between mt-2">
                          <div>
                            <span>Did not receive OTP?</span>
                          </div>
                          <div>
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
                        {otpError && (
                          <>
                            <div className="error-text invalid-otp">
                              You have enterd Invalid OTP{' '}
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {errors.mobileNumber && touched.mobileNumber ? (
                      <div className="error-text">{errors.mobileNumber}</div>
                    ) : null}

                    {authError && (
                      <>
                        <div className="error-text invalid-otp">{authError}</div>
                      </>
                    )}

                    <label className="mb-3 mt-3 custom-check-lable">
                      <input
                        className="me-2"
                        type="checkbox"
                        name="whatsappoptin"
                        defaultChecked={values.whatsappoptin}
                      />
                      {/* <Field className="me-2" type="checkbox" name="whatsappoptin" /> */}
                      <span>By sign up you subcribe to have WhatsApp updates.</span>
                    </label>

                    <div className="d-grid gap-2 mt-3 mb-3">
                      <Button
                        type="button"
                        disabled={!(otp.length === 6) || loading}
                        onClick={onSubmitOTP}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {loading ? 'Loading...' : 'Sign Up'}
                      </Button>
                    </div>
                    <div className="space-or">
                      <span>OR</span>
                    </div>
                    <SocialLogin setFieldValue={setFieldValue} />
                    <div className="policy-terms text-center mt-4">
                      By clicking sign up you will be agree with our
                      <br />
                      <a href="https://unikaksha.com/terms-and-conditions">
                        {' '}
                        terms & conditions{' '}
                      </a>{' '}
                      and <a href="https://unikaksha.com/privacy-policy"> privacy policy. </a>{' '}
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );

};

export default Signup;
// const PhoneInputWithIcon = ({ value, onChange, ...rest }) => {
//   return (
//     <div className="phone-input-with-icon">
//       <PhoneInput
//         value={value}
//         onChange={onChange}
//         {...rest}
//       />
//       <FaPencilAlt className="phone-input-icon" />
//     </div>
//   );
// };