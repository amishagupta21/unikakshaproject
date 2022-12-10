import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
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

const Signup = () => {
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [userDetails, setUserDetails] = React.useState({});

  const setInitialData = async () => {
    setUserDetails(location.state);
  };

  useEffect(() => {
    setInitialData();
  }, []);

  const configureCaptcha = () =>
    (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signup-container', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));

  const checkIfUserExists = async (email, phone) => {
    const result = await ApiService('user/check-exists', 'POST', { email, phone }, true);
    return result?.data?.data?.user;
  };

  const createUser = async (values) => {
    setloading(true);
    dispatch(setLoading(true));

    const { email, mobileNumber: phone } = values;
    const user = await checkIfUserExists(email, phone);
    if (!user) {
      sendOTP(values);
      setloading(true);
      dispatch(setLoading(false));
    } else {
      alert('User already exists');
      dispatch(setLoading(false));
      setloading(true);
    }
  };

  const sendOTP = async (values) => {
    setloading(true);
    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(`+${values.mobileNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success('OTP has been Sent to Mobile Number', {
          theme: 'colored',
        });
        navigate('/signup-otp', {
          state: {
            values: {
              phoneNumber: values.mobileNumber,
              email: values.email,
              displayName: values.fullName,
              whatsappoptin: values.whatsappoptin,
            },
          },
        });
        setloading(false);
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        setloading(false);
      });
  };
  return (
    <>
      <section className="auth_layout login_screen">
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
              <Formik
                enableReinitialize={true}
                initialValues={{
                  fullName: userDetails ? userDetails.fullName : '',
                  email: userDetails ? userDetails.email : '',
                  mobileNumber: '',
                  whatsappoptin: true,
                }}
                validationSchema={Yup.object().shape({
                  fullName: Yup.string().required('Required'),
                  email: Yup.string().email('Invalid email').required('Required'),
                  mobileNumber: Yup.string().min(8, 'Too short').required('Required'),
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
                            value={field.value}
                            onChange={(phone, data) => {
                              setFieldValue('mobileNumber', phone);
                              setFieldValue('mobileLength', data.dialCode.length);
                            }}
                          />
                          <small className="sml-size">
                            We will send you OTP on mobile number and WhatsApp.
                          </small>
                        </Row>
                      )}
                    />
                    {errors.mobileNumber && touched.mobileNumber ? (
                      <div className="error-text">{errors.mobileNumber}</div>
                    ) : null}

                    <label className="mb-3 mt-3 custom-check-lable">
                      <Field className="me-2" type="checkbox" name="whatsappoptin" />
                      <span>By sign up you subcribe to have WhatsApp updates.</span>
                    </label>

                    <div className="d-grid gap-2 mt-3 mb-3">
                      <Button
                        type="submit"
                        disabled={!isValid || loading}
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
                      <a> terms & conditions </a> and <a> privacy policy. </a>
                    </div>
                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
