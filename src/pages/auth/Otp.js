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
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Field, Formik } from 'formik'
import { toast } from 'react-toastify';
import { setLoading } from '../../redux/actions/LoaderActions';
import Cookies from 'universal-cookie';
import { firebase } from '../../firebase/firebase'

const Otp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation()
  const phoneNumber = location?.state?.phoneNumber

  const configureCaptcha = () => {
    return window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
      },
      defaultCountry: "IN"
    });
  }

  const sendOTP = async (phoneNumber) => {
    // dispatch(setLoading(true))
    const appVerifier = configureCaptcha()
    firebase.auth().signInWithPhoneNumber(`+91${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // dispatch(setLoading(false))
        toast.success("OTP has been sent to Mobile Number Again", {
          theme: "colored"
        })
        navigate("/otp", {
          state: {
            phoneNumber: phoneNumber,
          }
        })
      }).catch((error) => {
        toast.error(`${error}`, {
          theme: "colored"
        })
        dispatch(setLoading(false))
        console.log(error)
      });
  }


  const onSubmitOTP = (values) => {
    dispatch(setLoading(true))
    window.confirmationResult.confirm(values.otp).then((response) => {
      if (response.user) {
        dispatch(setLoading(false))
        localStorage.setItem("user", JSON.stringify(response.user))
        const cookies = new Cookies();
        let accessToken = response?.user?.stsTokenManager?.accessToken
        let expiresAt = 60 * 24;
        let date = new Date();
        date.setTime(date.getTime() + (expiresAt * 60 * 1000))
        let option = { path: '/', expires: date }
        cookies.set('access_token', accessToken, option);
        if (values.rememberMe) {
          cookies.set('phoneNumber', phoneNumber, { path: '/' });
        }
        toast.success("Log in Succesfull", {
          theme: "colored"
        })
        navigate('/home')
      }
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
            <div className="back-arrow">
              <a onClick={() => {
                navigate('/')
              }
              }>
                <img src={back} />
              </a>
            </div>
            <a href="#" className='logo'><img src={Logo} /></a>
          </div>
          <div className='auth_form'>
            <h3 className='mb-4'>Enter your mobile OTP</h3>
            <p>Please enter OTP for <br /><a href="">
              {phoneNumber && phoneNumber}</a></p>
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
                  onSubmitOTP(values)
                }
              }}
              render={({ handleChange, handleSubmit, handleBlur, values, errors, touched, validateForm }) => (
                <Form>
                  <div id="sign-in-button"> </div>
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
                    <a onClick={() => sendOTP(phoneNumber)} className='otp-password'>Resend OTP</a>
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