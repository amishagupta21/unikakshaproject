import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import mail from '../../assets/images/icon-gmail.png';
import linked from '../../assets/images/icon-linked.png';
import network from '../../assets/images/icon-network.png';
import fb from '../../assets/images/icon-facebook.png';
import twit from '../../assets/images/icon-twit.png';
import Logo from '../../assets/images/logo.svg';
import Loginbanner from '../../assets/images/login-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Otp = () => {
  const mobile = useSelector(state => state?.auth?.mobileNumber)
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
            <Form noValidate>

              <Row className="mb-0">
                <Form.Group className="form-group-1 mb-4" as={Col} md="12" controlId="validationCustom03">
                  <Form.Label className='custom-label'> Enter OTP </Form.Label>
                  <Form.Control type="text" placeholder="Enter OTP" required />
                </Form.Group>
              </Row>
              <div className='button d-flex clearfix otp mb-5'>
                <Button type="submit" variant="info" className='btn-lg  justify-content-center mt-2  mb-5'><Link to="/login">Submit OTP</Link></Button>
                <a href="" className='otp-password'>Resend OTP</a>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Otp