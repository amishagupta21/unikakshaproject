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
import loginmail from "../../assets/images/icon-mail-uni.svg";
import loginpassword from "../../assets/images/icon-pass-uni.svg";
import twit from "../../assets/images/icon-twit.png";
import Logo from "../../assets/images/logo.svg";
import Loginbanner from "../../assets/images/login-banner.svg";
import back from "../../assets/images/back-arrow.svg";
import { Link } from "react-router-dom";

import Nav from "react-bootstrap/Nav";

import Tab from "react-bootstrap/Tab";

const Login = () => {
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
            <div href="#" className="resetpassword create-account ">
              Not register yet, <a href=""> <Link to="/signup">Create an Account</Link></a>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={12}>
                  <Nav variant="pills" className="custom-tabs-container">
                    <Nav.Item>
                      <Nav.Link eventKey="first">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M6.6665 22.6667H5.33317C4.62593 22.6667 3.94765 22.3857 3.44755 21.8856C2.94746 21.3855 2.6665 20.7072 2.6665 20V6.66667C2.6665 5.95942 2.94746 5.28115 3.44755 4.78105C3.94765 4.28095 4.62593 4 5.33317 4H26.6665C27.3737 4 28.052 4.28095 28.5521 4.78105C29.0522 5.28115 29.3332 5.95942 29.3332 6.66667V20C29.3332 20.7072 29.0522 21.3855 28.5521 21.8856C28.052 22.3857 27.3737 22.6667 26.6665 22.6667H25.3332"
                            stroke="#EF6A28"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.0002 20L22.6668 28H9.3335L16.0002 20Z"
                            stroke="#EF6A28"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="27"
                          viewBox="0 0 20 27"
                          fill="none"
                        >
                          <path
                            d="M16 1H3.5C2.11929 1 1 2.11929 1 3.5V23.5C1 24.8807 2.11929 26 3.5 26H16C17.3807 26 18.5 24.8807 18.5 23.5V3.5C18.5 2.11929 17.3807 1 16 1Z"
                            stroke="#2D2D2D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.75 21H9.76235"
                            stroke="#2D2D2D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Form noValidate>
                        <h2 className="title-head">Sign in to Unikaksha</h2>
                        <Row className="mb-0">
                          <Form.Group
                            className="form-group-1 mb-3"
                            as={Col}
                            md="12"
                            controlId="validationCustom03"
                          >
                            <Form.Label className="custom-label">
                              Email ID / Password
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Emil Id
"
                              required
                            />
                          </Form.Group>
                        </Row>
                        <div className="forgot_section">
                          <Form.Group
                            className="custom_checkbox"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check type="checkbox" label="Remember me" />
                          </Form.Group>
                          <div href="#" className="resetpassword ">
                            <a href="" path="">
                              {" "}
                              <Link to="/forgotpassword">Forgot Password</Link>
                            </a>
                          </div>
                        </div>
                        <div className="button d-flex clearfix">
                          <Button
                            type="submit"
                            variant="info"
                            className="btn-lg  justify-content-center "
                          >
                           <Link to="/password"> Login</Link>
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Form noValidate>
                        <h2 className="title-head">Sign in to Unikaksha</h2>
                        <Row className="mb-0">
                          <Form.Group
                            className="form-group-1 mb-3"
                            as={Col}
                            md="12"
                            controlId="validationCustom03"
                          >
                            <Form.Label className="custom-label">
                              Mobile Number
                            </Form.Label>
                            <div className="user-class-mobile">
                              <Form.Select id="form-control form-mobile-position">
                                <option>+91</option>
                              </Form.Select>
                              <Form.Control
                                type="text"
                                placeholder="Enter  your mobile number"
                                required
                              />
                            </div>
                          </Form.Group>
                        </Row>
                        <div className="forgot_section">
                          <Form.Group
                            className="custom_checkbox"
                            controlId="formBasicCheckbox"
                          >
                            <Form.Check type="checkbox" label="Remember me" />
                          </Form.Group>
                        </div>
                        <div className="button d-flex clearfix">
                          <Button
                            type="submit"
                            variant="info"
                            className="btn-lg  justify-content-center "
                          >
                            Continue with mobile
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>

            <div className="sign-up-social">
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

export default Login;
