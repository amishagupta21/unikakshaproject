import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Logo from "../../assets/images/logo.svg";
import Loginbanner from "../../assets/images/login-banner.svg";
import back from "../../assets/images/back-arrow.svg";
import eye from "../../assets/images/icon-eye-view.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Field, Formik } from 'formik'
import * as Yup from 'yup';
import { forgotPassword } from "../../firebase/firebaseAuth";
import { FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { toast } from "react-toastify";

const Forgot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <section className="auth_layout login_screen">
      <div className="left_box">
        <img src={Loginbanner} />
      </div>
      <div className="right_box">
        <div className="right_box_container">
          <div className="back-action">
            <div className="back-arrow">
              <a onClick={() => {
                navigate('/')
              }
              }>
                <img src={back} />
              </a>
            </div>
            <a href="#" className="logo">
              <img src={Logo} />
            </a>
          </div>
          <div className="auth_form">
            <h3>Forgotten your password?</h3>
            <p>
              No problem! We'll send you a link to reset it. Please enter <br />
              the email address you use to sign in to Unikaksha.
            </p>

            <Formik
              initialValues={{
                email: "",
                termsAndConditions: ""
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Invalid email')
                  .required('Required'),
                termsAndConditions: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
              })}
              onSubmit={async (values) => {
                console.log("vaa", values);
                if (values.email && values.termsAndConditions) {
                  const res = await forgotPassword(values.email)
                  toast.success("Link has been sent to your Registered Email", {
                    theme: "colored"
                  })
                  navigate('/')
                }
              }}
              render={({ handleChange, handleSubmit, handleBlur, values, errors, touched, validateForm }) => (
                <Form>
                  <h2 className="title-head">Sign in to Unikaksha</h2>
                  <Field
                    name="email"
                    render={({ field, formProps }) => (
                      <Row className="mb-0">
                        <FormGroup controlId="email"
                          className="form-group-1 mb-3"
                          as={Col}
                          md="12">
                          <FormLabel>Your email address</FormLabel>
                          <FormControl placeholder="Enter Email ID" type={'text'} value={field.value} onChange={field.onChange} />
                        </FormGroup>
                      </Row>
                    )}
                  />
                  {errors.email && touched.email ? (<div className="error-text">{errors.email}</div>) : null}
                  <div>
                    <Field
                      name="termsAndConditions"
                      render={({ field, formProps }) => (
                        <FormGroup
                          className="custom_checkbox"
                          controlId="termsAndConditions">
                          <FormCheck
                            type={'checkbox'}
                            value={field.value}
                            onChange={field.onChange}
                            label="Terms & conditions and Privacy statement" />
                        </FormGroup>
                      )}
                    />
                  </div>
                  <div className="button d-flex clearfix">
                    <Button
                      type="submit"
                      variant="info"
                      className="btn-lg justify-content-center "
                    >
                      Send resend link
                    </Button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
