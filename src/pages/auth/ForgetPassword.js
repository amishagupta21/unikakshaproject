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


import './SetPassword.scss';

const ForgetPassword = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [userDetails, setUserDetails] = React.useState({});
  const [authError, setAuthError] = React.useState();

  const [sentLink, setSentLink] = React.useState(false);

  const userSignUpData = location.state?.values;

  const setInitialData = async () => {
    setUserDetails(location.state);
  };

  useEffect(() => {
  
    // setInitialData();
  }, []);

  const configureCaptcha = () =>
    (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('set-password-container', {
      size: 'invisible',
      callback: (response) => {},
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

  const forgetPasswordLink = async (values) => {

    
    
    const userisExist = await checkIfUserExists(values.email, null);

    
    
    if (userisExist) {
      dispatch(setLoading(true));
        firebase.auth().sendPasswordResetEmail(values.email)
      .then(() => {
        setSentLink('We will send you a link on your registered email')
        console.log(email);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        dispatch(setLoading(false));
        // ..
      });

    } else {
      setSentLink('Invalid Email')
    }
   
  };

  
  return (
    <>
      <section className="auth_layout login_screen auth-unikaksha set-password">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
           
            <div className="auth_form">
            <div className="log-in-title login-head">
                <img
                  className="me-2"
                  onClick={() => navigate('/signup')}
                  src={arrowBack}
                  alt="back-arrow"
                />
                <h6 className='title'>Forgot Password</h6>
                
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
                  email: ''
                 
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Invalid email').required('Required'),
                 
                  
                })}
                onSubmit={(values) => {
                  forgetPasswordLink(values);
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
                                name="email"
                                render={({ field, formProps }) => (
                                  <Row className="mb-0">
                                    <FormGroup
                                      controlId="email"
                                      className="form-group-1 mb-3"
                                      as={Col}
                                      md="12">
                                      <FormLabel>Enter Email</FormLabel>
                                      <FormControl
                                        placeholder="Enter Email ID"
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
                   
                    {sentLink &&  (
                      <div className="">{sentLink}</div>
                    )}

                   
                    

                   

                    <div className="d-grid gap-2 mt-3 mb-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {loading ? 'Loading...' : 'Reset Password'}
                      </Button>
                    </div>

                    <p>* If your email is registered you will get an email with a link to reset your password. Check your email.</p>
                    
                    
                  </Form>
                )}
              />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
