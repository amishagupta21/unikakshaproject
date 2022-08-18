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
import Loginbanner from '../../assets/images/forgot-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import {Link} from 'react-router-dom';



const Setpassword = () => {
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
        <h2 className='title-head'>Set password</h2>
      <Row className="mb-0"> 
        <Form.Group className="form-group-1 mb-4" as={Col} md="12" controlId="validationCustom03">
          <Form.Label className='custom-label'>Password</Form.Label>
          <Form.Control type="text" placeholder="Password
" required />
      
        </Form.Group>
        <Form.Group className="form-group-1 mb-4" as={Col} md="12" controlId="validationCustom03">
          <Form.Label className='custom-label'>Reset password</Form.Label>
          <Form.Control type="text" placeholder="Password
" required />
      
        </Form.Group>
       
        </Row>
       
        <div className='button d-flex clearfix'>
        <Button type="submit" variant="info" className='btn-lg  justify-content-center mt-3 '><Link to="/otp">Reset password</Link></Button>
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
      </div>
       
    </div> </div>
  </section>
  )
}

export default Setpassword