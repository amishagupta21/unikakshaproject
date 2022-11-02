import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Logo from '../../assets/images/logo.svg';
import Loginbanner from '../../assets/images/login-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormCheck from 'react-bootstrap/FormCheck';
import { Form, Field, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SocialLogin from '../../utils-componets/SocialLogin';
import LeftBox from './components/LeftBox';
import AuthNavbar from './components/AuthNavbar';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
	<>
	<AuthNavbar />
    <section className="auth_layout login_screen">
     <LeftBox />
      <div className="right_box">
        <div className="right_box_container">
			<div className='log-in-title'>Sign Up</div>
			<div href="#" className="resetpassword create-account">
             Already have an account? 
              <a href="">
                <Link to="/login"> Log in</Link>
              </a>
            </div>
          <div className="auth_form">
            <Formik
                        initialValues={{
                          mobileNumber: "",
                        }}
                        validationSchema={Yup.object().shape({
                          mobileNumber: Yup.number()
                            .typeError("That doesn't look like a phone number")
                            .positive("A phone number can't start with a minus")
                            .integer("A phone number can't include a decimal point")
                            .min(1000000000, 'min 10 digit required')
                            .required('A phone number is required')
                        })}
                        onSubmit={(values) => {
                          const { mobileNumber } = values;
                        //   if (values.mobileNumber) {
                        //     sendOTP(mobileNumber, rememberMe);
                        //   }
                        }}
                        render={({
                          handleChange,
                          handleSubmit,
                          handleBlur,
                          values,
                          errors,
                          touched,
                          validateForm
                        }) => (
                          <Form>
                            <Field
                              name="name"
                              render={({ field, formProps }) => (
  								<Row className="mb-0">
                                  <FormGroup
                                    controlId="email"
                                    className="form-group-1 mb-3"
                                    as={Col}
                                    md="12">
                                    <FormLabel>Full Name (As per PAN)</FormLabel>
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
							 <Field
                              name="mobileNumber"
                              render={({ field, formProps }) => (
  								<Row className="mb-0">
                                  <FormGroup
                                    controlId="email"
                                    className="form-group-1 mb-3"
                                    as={Col}
                                    md="12">
                                    <FormLabel>Email</FormLabel>
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
							 <Field
                              name="mobileNumber"
                              render={({ field, formProps }) => (
  								<Row className="mb-0">
                                  <FormGroup
                                    controlId="email"
                                    className="form-group-1 mb-3"
                                    as={Col}
                                    md="12">
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl
                                      placeholder="Enter mobile number"
                                      type={'text'}
                                      value={field.value}
                                      onChange={field.onChange}
                                    />
                                  </FormGroup>
                                </Row>
                              )}
                            />
                            {errors.mobileNumber && touched.mobileNumber ? (
                              <div className="error-text">{errors.mobileNumber}</div>
                            ) : null}
							 <div className="d-grid gap-2">
                       		  <Button
                                type="submit"
                                variant="info">
                                Sign Up
                              </Button>
							   </div>
                          </Form>
                        )}
                      />
             <SocialLogin />
          </div>
        </div>
      </div>
    </section>
	</>
  );
};

export default Signup;
