import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import mail from "../../assets/images/icon-gmail.png";
import linked from "../../assets/images/icon-linked.png";
import network from "../../assets/images/icon-network.png";
import fb from "../../assets/images/icon-facebook.png";
import twit from "../../assets/images/icon-twit.png";
import Logo from "../../assets/images/logo.svg";
import Loginbanner from "../../assets/images/login-banner.svg";
import back from "../../assets/images/back-arrow.svg";
import { Link } from "react-router-dom";
import eye from "../../assets/images/icon-eye-view.svg";

const Forgot = () => {
  return (
    <section className="auth_layout login_screen">
      <div className="left_box">
        <img src={Loginbanner} />
      </div>
      <div className="right_box">
        <div className="right_box_container">
          <div className="back-action">
            <div className="back-arrow">
              <a href="">
                <img src={back} />
              </a>
            </div>
            <a href="#" className="logo">
              <img src={Logo} />
            </a>
          </div>
          <div className="auth_form">
            <h3>Create an Account or Register </h3>
          
            <Form noValidate>
              <Row className="mb-0 mt-4">
                <Form.Group
                  className="form-group-1 mb-3"
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                >
                  <Form.Label className="custom-label">
                  Email ID
                  </Form.Label>
                 
                    <Form.Control type="text" placeholder="Enter Emil Id " required />
                   
                
                </Form.Group>
              </Row>
              <div className="forgot_section">
                <Form.Group
                  className="custom_checkbox "
                  controlId="formBasicCheckbox"
                >
                  <Form.Check
                    type="checkbox"
                    label=" Remember me"
                  />
                </Form.Group>
              </div>
              <div className="button d-flex clearfix">
                <Button
                  type="submit"
                  variant="info"
                  className="btn-lg  justify-content-center mb-3"
                >
                  Create Account
                </Button>
              </div>
            </Form>
            <div className="sign-up-social mb-3">
              <h2>Login using social network</h2>
              <ul>
                <li>
                  <a href=""><img src={mail} /></a>
                </li>
                <li>
                  <a href=""> <img src={linked} /></a>
                </li>
                <li>
                  <a href=""><img src={network} /></a>
                </li>
                <li>
                  <a href=""> <img src={fb} /> </a>
                </li>
                <li><a href=""> <img src={twit} /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
      </div>
    </section>
  );
};

export default Forgot;
