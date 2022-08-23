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
import loginmail from '../../assets/images/icon-mail-uni.svg';
import loginpassword from '../../assets/images/icon-pass-uni.svg';

import twit from '../../assets/images/icon-twit.png';
import Logo from '../../assets/images/logo.svg';
import Loginbanner from '../../assets/images/login-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import eye from '../../assets/images/icon-eye-view.svg';
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
    
      
     
            <h3>Enter your password</h3>
            <p>Please enter your Unikaksha password for <br/><a href="">
rajpatel@unikaksha.com.</a></p>
             <Form noValidate>
       
      <Row className="mb-0"> 
        <Form.Group className="form-group-1 mb-3" as={Col} md="12" controlId="validationCustom03">
         
          <Form.Label className='custom-label'>Enter password</Form.Label>
          <div className="password-view-container">
          <Form.Control type="text" placeholder="" required />
      <i className='password-view'><img src={eye} /></i>
      </div>
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
        <div className='or-password'>
         or
        </div>
        <div className='button d-flex clearfix'>
        <Button  variant="info" className='btn-lg  justify-content-center btn-border mt-0'>Sign in with a verification Link </Button>
        </div>
        <div className='forgotton-link'>
          <a href="">Forgotten your password ?</a>
        </div>
        
       


    
      </Form> 
            
           
           
  
     
   
     
      </div>
       
    </div> </div>
  </section>
  )
}

export default Login