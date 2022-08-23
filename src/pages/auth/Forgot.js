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
            <h3>Forgotten your password?</h3>
            <p>
              No problem! We'll send you a link to reset it. Please enter <br />
              the email address you use to sign in to Unikaksha.
            </p>
            <Form noValidate>
              <Row className="mb-0">
                <Form.Group
                  className="form-group-1 mb-3"
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                >
                  <Form.Label className="custom-label">
                    Your email address
                  </Form.Label>
                  <div className="password-view-container">
                    <Form.Control type="text" placeholder="" required />
                    <i className="password-view">
                      <img src={eye} />
                    </i>
                  </div>
                </Form.Group>
              </Row>
              <div className="forgot_section">
                <Form.Group
                  className="custom_checkbox custom_checkbox_label"
                  controlId="formBasicCheckbox"
                >
                  <Form.Check
                    type="checkbox"
                    label=" Terms & conditions and Privacy statement"
                  />
                </Form.Group>
              </div>
              <div className="button d-flex clearfix">
                <Button
                  type="submit"
                  variant="info"
                  className="btn-lg  justify-content-center mb-5"
                >
                  Send resend link
                </Button>
              </div>
            </Form>
          </div>
        </div>{" "}
      </div>
    </section>
  );
};

export default Forgot;
