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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { firebase } from '../../firebase/firebase';
import { setLoading } from '../../redux/actions/LoaderActions';
import ApiService from '../../services/ApiService';
import SocialLogin from '../../utils-componets/SocialLogin';
import AuthNavbar from './components/AuthNavbar';
import LeftBox from './components/LeftBox';
import { arrowBack, editGray } from '../../assets/images';
import { EmailAuthProvider, getAuth, linkWithCredential } from 'firebase/auth';

import './SetPassword.scss';
import Footer from '../../components/Footer';

const Signup = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [userDetails, setUserDetails] = React.useState({});
  const [authError, setAuthError] = React.useState();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const userSignUpData = location.state?.values;

  const setInitialData = async () => {
    setUserDetails(location.state);
  };

  useEffect(() => {
    if (!userSignUpData?.email) {
      navigate('/signup');
    }
    setInitialData();
  }, []);

  const configureCaptcha = () =>
  (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('set-password-container', {
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

  const setPassword = async (values) => {
    // setloading(true);
    dispatch(setLoading(true));

    // if (user) {

    const olduser = firebase.auth().currentUser;

    const email = userSignUpData.email;

    const password = values.SetNewPassword;

    const credential = EmailAuthProvider.credential(email, password);

    const auth = getAuth();
    linkWithCredential(auth.currentUser, credential)
      .then((usercred) => {
        dispatch(setLoading(false));
        const user = usercred.user;
        navigate('/info');

        console.log('Account linking success', user);
      })
      .catch((error) => {
        dispatch(setLoading(false));
        console.log('Account linking error', error);
      });

    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //   .then((userCredential) => {

    //     dispatch(setLoading(false));
    //     var user1 = userCredential.user;
    //     navigate('/info');

    //   })
    //   .catch((error) => {
    //     dispatch(setLoading(false));
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //   });

    // setloading(false);

    // console.log(user);
    // } else {
    //   setAuthError('User not exists, Please signup');
    //   dispatch(setLoading(false));
    //   setloading(false);
    //   setTimeout(() => {
    //     navigate('/signup');
    //   }, 500);
    // }
  };

  const userName = localStorage.getItem('user');
  // console.log("userName", userName)
  const userObject = JSON.parse(userName);

  if (userObject.displayName) {
    const fullName = userObject.displayName;
    // console.log('Full Name:', fullName);
  }

  if (userObject.providerData && userObject.providerData[0].phoneNumber) {
    const phoneNumber = userObject.providerData[0].phoneNumber;
    // console.log('Phone Number:', phoneNumber);
  }
  useEffect(() => {
    const userName = localStorage.getItem('user');
    const userObject = JSON.parse(userName);

    let fullname = ''; // Initialize variables
    let phoneNumber = '';

    if (userObject.displayName) {
      fullname = userObject.displayName;
      // console.log('Full Name:', fullname);
    }

    if (userObject.providerData && userObject.providerData[0].phoneNumber) {
      phoneNumber = userObject.providerData[0].phoneNumber;
      // console.log('Phone Number:', phoneNumber);
    }

    const handleMoengageEvent = (e) => {
      if (e.detail.name === 'SDK_INITIALIZED') {
        // alert(e.detail.data);
      }
      if (e.detail.name === 'SETTINGS_FETCHED') {
        // alert(e.detail.data);

        // Use the fullname and phoneNumber obtained from above
        const email = userSignUpData?.email; // Replace with actual email

        Moengage.add_unique_user_id(phoneNumber);
        Moengage.track_event('Apply_Now_Course_industry_ready', {
          name: fullname,
          email: email,
          whatsapp_number: phoneNumber,
        });
        Moengage.add_user_name(fullname);
        Moengage.add_email(email);
        Moengage.add_mobile(phoneNumber);
      }
    };

    window.addEventListener('MOE_LIFECYCLE', handleMoengageEvent);

    return () => {
      window.removeEventListener('MOE_LIFECYCLE', handleMoengageEvent);
    };
  }, []);

  return (
    <>
      <section className="auth_layout login_screen auth-unikaksha set-password">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="auth_form">
              <div className="log-in-title login-head">
                {/* <img
                  className="me-2"
                  onClick={() => navigate('/signup')}
                  src={arrowBack}
                  alt="back-arrow"
                /> */}
                <h6 className="title">Set Password</h6>
              </div>
              <div id="set-password-container"> </div>

              <div className="">
                {authError && (
                  <Alert key="danger" variant="danger">
                    {authError}
                  </Alert>
                )}
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    SetNewPassword: '',
                    ConfirmPassword: '',
                  }}
                  validationSchema={Yup.object().shape({
                    SetNewPassword: Yup.string()
                      .min(8, 'Password must be 8 characters long.')
                      .required('Set new password is a required field')
                      .matches(
                        /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                        `Must Contain 8 Characters,  
                    \n One Uppercase,
                    \n One Number`
                      ),
                    ConfirmPassword: Yup.string()
                      .min(8, 'Your password is too short.')
                      .required('Confirm password is a required field.')
                      .oneOf(
                        [Yup.ref('SetNewPassword'), null],
                        'Both password need to be the same'
                      ),
                  })}
                  onSubmit={(values) => {
                    setPassword(values);
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
                        name="SetNewPassword"
                        render={({ field, formProps }) => (
                          <Row className="mb-0">
                            <FormGroup
                              controlId="SetNewPassword"
                              className="form-group-1 mb-3"
                              as={Col}
                              md="12">
                              <FormLabel>
                                Set New Password <em className="red top">*</em>
                              </FormLabel>
                              <p className="hint">Password must be 8 characters long</p>
                              <FormControl
                                placeholder="Enter your password here"
                                type={showPassword ? 'text' : 'password'}
                                // type={'password'}
                                value={field.value}
                                onChange={field.onChange}
                              />
                              <Button
                                variant="outline-secondary"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <i className="bi bi-eye-slash-fill"></i>
                                ) : (
                                  <i className="bi bi-eye-fill"></i>
                                )}
                              </Button>
                            </FormGroup>
                          </Row>
                        )}
                      />
                      {errors.SetNewPassword && touched.SetNewPassword ? (
                        <div className="error-text">{errors.SetNewPassword}</div>
                      ) : null}
                      <Field
                        name="ConfirmPassword"
                        render={({ field, formProps }) => (
                          <Row className="mb-0">
                            <FormGroup
                              controlId="ConfirmPassword"
                              className="form-group-1 mb-3"
                              as={Col}
                              md="12">
                              <FormLabel>
                                Confirm Password <em className="red top">*</em>
                              </FormLabel>
                              <FormControl
                                placeholder="Enter your password here"
                                type={confirmShowPassword ? 'text' : 'password'}
                                // type={'password'}
                                value={field.value}
                                onChange={field.onChange}
                              />
                              <Button
                                variant="outline-secondary"
                                className="password2-toggle"
                                onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                              >
                                {confirmShowPassword ? (
                                  <i className="bi bi-eye-slash-fill"></i>
                                ) : (
                                  <i className="bi bi-eye-fill"></i>
                                )}
                              </Button>
                            </FormGroup>
                          </Row>
                        )}
                      />
                      {errors.ConfirmPassword && touched.ConfirmPassword ? (
                        <div className="error-text">{errors.ConfirmPassword}</div>
                      ) : null}

                      <div className="d-grid gap-2 mt-3 mb-3">
                        <Button
                          type="submit"
                          disabled={loading}
                          style={{ fontWeight: '500' }}
                          variant="secondary">
                          {loading ? 'Loading...' : 'Set Password'}
                        </Button>
                      </div>
                    </Form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;
