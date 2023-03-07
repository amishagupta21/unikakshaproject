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
import Footer from '../../components/Footer';

const Signup = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [userDetails, setUserDetails] = React.useState({});
  const [authError, setAuthError] = React.useState();

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

  const setPassword = async (values) => {

    
    // setloading(true);
    dispatch(setLoading(true));

    
    // if (user) {

      // const user = firebase.auth().currentUser;

      const email = userSignUpData.email;

      const password = values.SetNewPassword;

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        dispatch(setLoading(false));
        var user1 = userCredential.user;
        navigate('/info');
      
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
       
      });
      
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
                <h6 className='title'>Set Password</h6>
                
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
                    .oneOf([Yup.ref('SetNewPassword'), null], 'Both password need to be the same'),
                  
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
                            <p className='hint'>Password must be 8 characters long</p>
                            <FormControl
                              placeholder="Enter your password here"
                              type={'password'}
                              value={field.value}
                              onChange={field.onChange}
                            />
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
                              type={'password'}
                              value={field.value}
                              onChange={field.onChange}
                            />
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
      <Footer/>
    </>
  );
};

export default Signup;
