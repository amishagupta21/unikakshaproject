import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

import Call from '../assets/images/call.svg';
import fa from '../assets/images/icon-fa-unikaksha.svg';
import insta from '../assets/images/icon-insta-unikaksha.svg';
import linked from '../assets/images/icon-linked-unikaksha.svg';
import twitter from '../assets/images/icon-twitter-unikaksha.svg';
import youtube from '../assets/images/icon-youtube-unikaksha.svg';
import payment from '../assets/images/payment-icons.svg';
import Send from '../assets/images/send.svg';
import BrandLogo from '../assets/images/unikaksha-logo.svg';
import Whatsapp from '../assets/images/whatsapp.svg';

import '../custom.css';
import '../pages/auth/auth.scss';

const Footer = () => (
  <div className="custom-footer">
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <div className="footer-list">
            <img src={BrandLogo} alt="Brand Logo" className="footer-logo" />
            <ListGroup className="mt-3 footer-social-services">
              <ListGroup.Item action href="tel:(+91) 9310575018">
                <img src={Call} alt="Brand Logo" />
                <span>(+91) 9310575018</span>
              </ListGroup.Item>
              <ListGroup.Item action href="https://wa.me/+919310575018?text=Hello">
                <img src={Whatsapp} alt="Brand Logo" />
                <span>(+91) 9310575018</span>
              </ListGroup.Item>
              <ListGroup.Item action href="mailto:support@unikaksha.com">
                <img src={Send} alt="Brand Logo" />
                <span> support@unikaksha.com</span>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="col-sm-2 col-sm-2-mobile">
          <div className="footer-menu mt-2">
            <ListGroup>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/about-us">
                About us
              </ListGroup.Item>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/contactus">
                Contact us
              </ListGroup.Item>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/become-a-mentor">
                Become a mentor
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="col-sm-2 col-sm-2-mobile">
          <div className="footer-menu mt-2">
            <ListGroup>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/courses">
                Courses
              </ListGroup.Item>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/unikampus">
                UniKampus
              </ListGroup.Item>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/hire-from-us">
                Hire from us
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="col-sm-2 col-sm-2-mobile">
          <div className="footer-menu mt-2">
            <ListGroup>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/pricing">
                Pricing
              </ListGroup.Item>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/blog">
                Blogs
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="footer-menu mt-2">
            <ListGroup>
              <ListGroup.Item
                action
                target="_blank"
                href="https://unikaksha.com/terms-and-conditions">
                Terms & Conditions
              </ListGroup.Item>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/privacy-policy">
                Privacy Policy
              </ListGroup.Item>
              <ListGroup.Item action target="_blank" href="https://unikaksha.com/refund-policy">
                Refund Policy
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </div>
      <hr />

      <div className="row align-items-center row-top-follow">
        <div className="col-sm-4">
          <div className="footer-list">
            <div className="follow-us">
              <label>Follow us on</label>
              <ul>
                <li>
                  <a href="https://www.facebook.com/unikaksha/" target="_blank">
                    <img src={fa} alt="fabook" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/unikaksha/" target="_blank">
                    <img src={insta} alt="fabook" />
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/unikaksha/" target="_blank">
                    <img src={linked} alt="fabook" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCp5Id5P-KDLUMl8AVb13bFg"
                    target="_blank">
                    <img src={youtube} alt="fabook" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/UniKaksha" target="_blank">
                    <img src={twitter} alt="fabook" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="newletter">
            <form action="">
              <input type="email" maxLength="50" required placeholder="Enter your email address" />
              <button className="bt">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="payment">
            <img src={payment} alt="fabook" />
          </div>
        </div>
      </div>
    </div>

    <div className="copy-right">
      <div className="container">
        <p className="text-right">2022 Unikaksha - All Rights Reserved.</p>
      </div>
    </div>
  </div>
);

export default Footer;
