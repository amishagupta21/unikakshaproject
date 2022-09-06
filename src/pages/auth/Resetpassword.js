import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Logo from "../../assets/images/logo.svg";
import Loginbanner from "../../assets/images/forgot-banner.svg";
import back from "../../assets/images/back-arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../utils-componets/SocialLogin";
import { clearEmail } from "../../redux/actions/AuthActions";
import { useDispatch } from "react-redux";

const Resetpassword = () => {
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
                dispatch(clearEmail())
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
            <Form noValidate>
              <h2 className="title-head">Set password</h2>
              <Row className="mb-0">
                <Form.Group
                  className="form-group-1 mb-4"
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                >
                  <Form.Label className="custom-label">Password</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Password
"
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="form-group-1 mb-4"
                  as={Col}
                  md="12"
                  controlId="validationCustom03"
                >
                  <Form.Label className="custom-label">
                    Reset password
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Password
"
                    required
                  />
                </Form.Group>
              </Row>

              <div className="button d-flex clearfix">
                <Button
                  type="submit"
                  variant="info"
                  className="btn-lg  justify-content-center mt-3 "
                >
                  <Link to="/otp">Reset password</Link>
                </Button>
              </div>
            </Form>
            <div className="sign-up-social">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resetpassword;
