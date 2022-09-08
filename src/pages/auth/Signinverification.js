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
import eye from "../../assets/images/icon-eye-view.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
          <div className="auth_form auth_form-verification">
            <h3 className="text-center">Check your inbox</h3>
            <p className="text-center mt-2">
              We've just emailed a verification link to{" "}
              <a href="">rajpatel@gmail.com</a>. Once it arrives,
              <br />
              it will be valid for 10 minutes.
            </p>

            <div className="button d-flex clearfix">
              <Button
                variant="info"
                className="btn-lg  justify-content-center btn-border mt-2"
              >
                Back to sign-in{" "}
              </Button>
            </div>
            <p className="mt-4 text-center">
              By signing in or creating an account, you agree with our Terms &
              conditions and Privacy statement
            </p>
          </div>
        </div>{" "}
      </div>
    </section>
  );
};

export default Login;
