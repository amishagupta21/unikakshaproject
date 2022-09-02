import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Logo from '../../assets/images/logo.svg';
import * as Yup from 'yup';
import Loginbanner from '../../assets/images/login-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Form, Field, Formik } from 'formik'

const Otp = () => {
  const mobile = useSelector(state => state?.auth?.mobileNumber)
  const navigate = useNavigate();

  const onSubmitOTP = (code) => {
    window.confirmationResult.confirm(code).then((result) => {
      navigate('/home')
    }).catch((error) => {
      alert("Error", error)
    });
  }

  return (
    <section className='auth_layout login_screen'>
      <div className='left_box'>
        <img src={Loginbanner} />
      </div>
      <div className='right_box'>
        <div className='right_box_container'>
          <div className='back-action'>
            <div className="back-arrow"><a href=""><img src={back} /></a></div>
            <a href="#" className='logo'><img src={Logo} /></a>
          </div>
          <div className='auth_form'>
            <h3 className='mb-4'>Enter your mobile OTP</h3>
            <Formik
              initialValues={{
                otp: '',
                rememberMe: false
              }}
              validationSchema={Yup.object().shape({
                otp: Yup.string()
                  .required('Required'),
              })}
              onSubmit={(values) => {
                if (values.otp) {
                  onSubmitOTP(values.otp)
                }
              }}
              render={({ handleChange, handleSubmit, handleBlur, values, errors, touched, validateForm }) => (
                <Form>
                  <h2 className="title-head">Sign in to Unikaksha</h2>
                  <Field
                    name="otp"
                    render={({ field }) => (
                      <Row className="mb-0">
                        <FormGroup className="form-group-1 mb-4" as={Col} md="12">
                          <FormLabel className='custom-label'> Enter OTP </FormLabel>
                          <FormControl name="otp" type={'text'} placeholder="Enter OTP" value={field.value} onChange={field.onChange} />
                        </FormGroup>
                      </Row>
                    )}
                  />
                  {errors.otp && touched.otp ? (<div className="error-text">{errors.otp}</div>) : null}
                  <div className='button d-flex clearfix otp mb-5'>
                    <Button type="submit" variant="info" className='btn-lg justify-content-center mt-2 mb-5'>Submit OTP</Button>
                    <a className='otp-password'>Resend OTP</a>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </section >
  )
}

export default Otp