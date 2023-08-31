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
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(true);

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
    // console.log("check", JSON.stringify(result.data.data))
    if (result?.data.data.byEmail.user != null || result?.data.data.byPhone.user != null) {
      setAuthError('User already exists with same Email or Phonenumber');
      return true
    } else {
      // console.log("sucessfully created")
    }

    // return result?.data?.data?.user
  };

  const createUser = async (values) => {
    setloading(true);
    dispatch(setLoading(true));

    const { email, mobileNumber: phone } = values;
    const user = await checkIfUserExists(email, phone);
    if (!user) {
      sendOTP(values);
      setloading(false);
      // const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
      //   phoneAuthProvider.verifyPhoneNumber(phoneNumber, {
      //     // Provide a callback to handle the verification code
      //     // sent to the user's phone
      //   });
    } else {
      setAuthError('User already exists');
      // window.location.reload();
      dispatch(setLoading(false));
      setloading(false);
      // setTimeout(() => {
      //   navigate('/login');
      // }, 500);
    }
  };

  const sendOTP = async (values) => {
    const countryCode = values.mobileNumber.substr(0, 2);
    const mobileNumber = values.mobileNumber.substr(2, values.mobileNumber.length);
    const result = { ...values, countryCode, mobileNumber };
    setFormData(result);
    setloading(true);

    const userExist = await checkIfUserExists(values.email, `${values.mobileNumber}`);
    //  console.log(userExist)
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
          setMinutes(1);
          setSeconds(59);

          dispatch(setLoading(false));
          setOTPLabel('OTP Sent');
          setOTPSent(true);
          setPencil(true);
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

  // const onSubmitOTP = async({e,user}) => {
  //     setIsButtonLoading(true);

  //     e.preventDefault();
  //     const userData = {
  //       // "uid": user.uid,
  //       "form_name": "Sign-Up",
  //       "fullName": formData.fullName,
  //       "email": formData.email,
  //       "phone": `+91${formData?.mobileNumber}`,
  //     };
  //     const result = await ApiService(`centralised/create`, `POST`, userData);
  //     console.log("result",result)
  //     const { fullName, email, mobileNumber } = formData;

  //     Moengage.track_event("Sign-Up-Event", {
  //       "FullName": fullName,      // Use the actual fullName value from form state
  //       "Email": email,            // Use the actual email value from form state
  //       "PhoneNumber": mobileNumber // Use the actual mobileNumber value from form state
  //     });
  //     Moengage.add_user_name(fullName);
  //     Moengage.add_email(email);
  //     Moengage.add_mobile(mobileNumber);
  //     Moengage.add_unique_user_id(mobileNumber);




  //     window.confirmationResult
  //       .confirm(otp && otp)
  //       .then(async (response) => {
  //         setloading(true);
  //         dispatch(setLoading(true));


  //         setIsButtonLoading(false);
  //         // console.log(response.user);
  //         if (response.user) {
  //           setloading(false);
  //           const { user } = response.user.multiFactor;

  //           firebase.auth().currentUser.updateProfile({ displayName: formData?.fullName });
  //           createUserIfNotExists(user);
  //         }
  //       })
  //       .catch((error) => {
  //         // console.log(error);
  //         // setloading(false);
  //         // setIsButtonLoading(false);
  //         setOtpError('Invalid Code!');
  //       });
  //   };
  const onSubmitOTP = async (e) => {
    e.preventDefault();

    try {
      setIsButtonLoading(true);

      const { fullName, email, mobileNumber } = formData; // Destructure formData here

      const otpResponse_ = await confirmationResult.confirm(otp);

      const otpUserUid = otpResponse_.user.multiFactor.user.uid;

      const userData = {
        "form_name": "Sign-Up",
        "full_name": fullName,
        "email": email,
        "whatsapp_number": `+91${mobileNumber}`,
      };
      // console.log("userData:", userData);
      const result = await ApiService("centralised/create", "POST", userData);
      const userId = result?.data?.data?._id;
      // console.log("userId", userId);
      localStorage.setItem('userId', userId);
      // Track user event using Moengage
      Moengage.track_event("Sign-Up-Event", {
        "FullName": fullName,
        "Email": email,
        "PhoneNumber": mobileNumber
      });

      // Set user information in Moengage


      Moengage.add_user_name(fullName);
      Moengage.add_email(email);
      Moengage.add_mobile(mobileNumber);
      Moengage.add_unique_user_id(userId);


      const otpResponse = await window.confirmationResult.confirm(otp); // Confirm OTP

      setloading(true);
      dispatch(setLoading(true));
      setIsButtonLoading(false);

      if (otpResponse.user) {
        setloading(false);

        const { user } = otpResponse.user.multiFactor;
        await firebase.auth().currentUser.updateProfile({ displayName: fullName });
        createUserIfNotExists(user);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsButtonLoading(false);
      setOtpError('Invalid Code!');
    }
  };


  const createUserIfNotExists = async (user) => {
    // console.log('user1', user)
    const userData = {
      uid: user.uid,
      fullName: formData.fullName,
      email: formData.email,
      phone: `+91${formData?.mobileNumber}`,
      whatsappoptin: formData?.whatsappoptin,
      countryCode: formData.countryCode,
    };
    // console.log("user_", userData)
    const result = await ApiService(`user/create`, `POST`, userData);
    // if(result?.data.code === 400){
    //   return true
    // }else{
    //   return false
    // }

    localStorage.setItem('user', JSON.stringify(user));

    // console.log(result?.data)

    if (result?.data.code === 200) {
      // navigate('/info');
      dispatch(setLoading(false));

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
      setOtp('');
      setOtpError(null);
      setIsResendDisabled(true);
      setMinutes(1);
      setSeconds(59);
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
                  // .test('email-exists', 'This email is already registered', validateEmailExists),
                  mobileNumber: Yup.string().min(10).required('Mobile number is a required field'),
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
                          <FormGroup className="form-group-1 mb-3" as={Col} md="12">
                            <FormLabel htmlFor="fullName">
                              Full Name<em className="red top">*</em> (As per PAN)
                            </FormLabel>
                            <FormControl
                              id="fullName" // Add id here
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
                          <FormGroup className="form-group-1 mb-3" as={Col} md="12">
                            <FormLabel htmlFor="email">
                              Email<em className="red top">*</em>
                            </FormLabel>
                            <FormControl
                              id="email" // Specify the id here
                              placeholder="Enter your email here"
                              type="text"
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
                          <FormLabel htmlFor="mobileNumber_">
                            Mobile Number<em className="red top">*</em>
                          </FormLabel>

                          <PhoneInput
                            id="mobileNumber_"
                            placeholder="Enter mobile number"
                            country={'in'}
                            preferredCountries={['in']}
                            value={field.value}
                            onChange={(phone, data) => {
                              if (isPhoneNumberEditable) {
                                setFieldValue('mobileNumber', phone);
                                setFieldValue('mobileLength', data.dialCode.length);
                              }
                            }}
                            countryCodeEditable={false}
                          />

                          <small className="sml-size text-start">
                            We will send you OTP on mobile number and WhatsApp.
                          </small>
                        </Row>
                      )}
                    />
                    <br />

                    {/* {values.mobileNumber.length - values.mobileLength === 10 && (
                      <Button
                        type={OTPSent ? 'button' : 'submit'}
                        variant="outline-primary"
                        className={OTPSent ? 'otp-sent' : 'get-otp-btn'}
                        disabled={OTPSent}>
                        {OTPLabel}
                      </Button>
                      
                    )} */}
                    {values.mobileNumber.length - values.mobileLength === 10 && isPhoneNumberEditable && (
                      <>
                        <Button
                          variant="link"
                          onClick={() => {
                            setIsPhoneNumberEditable(true);
                            setOTPSent(false);
                            setOtp('');
                          }}
                          className="edit-phone-number-btn"
                        >
                          <img className="pencil-edit" height={20} width={15} src="data:image/jpeg;base64,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" />
                        </Button>
                        <Button
                          type="submit"
                          variant="outline-primary"
                          className="get-otp-btn"
                          disabled={OTPSent}
                        >
                          Get OTP
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
                    {/* {errors.mobileNumber && touched.mobileNumber ? (
                      <div className="error-text">{errors.mobileNumber}</div>
                    ) : null} */}

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
                      <span>By signing up, you agree to receive WhatsApp updates.</span>
                    </label>

                    <div className="d-grid gap-2 mt-3 mb-3">
                      <Button
                        id="signup-button"
                        type="button"
                        disabled={!(otp.length === 6) || loading}
                        onClick={onSubmitOTP}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {loading ? 'loading...' : 'Sign Up'}
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
