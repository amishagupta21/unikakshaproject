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
import {Link} from 'react-router-dom';


const Login = () => {
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
      <Form noValidate>
        <h2 className='title-head'>Sign in to Unikaksha</h2>
      <Row className="mb-0"> 
        <Form.Group className="form-group-1 mb-4" as={Col} md="12" controlId="validationCustom03">
          <Form.Label className='custom-label'>User/Student Login</Form.Label>
          <Form.Control type="text" placeholder="Enter Email Id / Phone Number
" required />
      
        </Form.Group>
       
        </Row>
        <div className='forgot_section'>
          <Form.Group className="custom_checkbox" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <div href="#" className="resetpassword "><a href=""  path=""> <Link to="/forgotpassword">Forgot Password</Link></a>
</div>

        </div>
        <div className='button d-flex clearfix'>
        <Button type="submit" variant="info" className='btn-lg  justify-content-center '>Login</Button>
        </div>
       


    
      </Form>
      <div className='sign-up-social'>
        <h2>Login using social network</h2>
        <ul>
          <li><a href=""><img src={mail} /></a></li>
          <li><a href=""><img src={linked} /></a></li>
          <li><a href=""><img src={network} /></a></li>
          <li><a href=""><img src={fb} /></a></li>
          <li><a href=""><img src={twit} /></a></li>
        </ul>
      </div>  

      <div href="#" className="resetpassword create-account ">Not register yet, <a href="">Create an Account</a>
</div>
      </div>
       
    </div> </div>
  </section>
  )
}

export default Login