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
    <div className="copy-right">
      <div className="container">
        <div className="d-flex justify-content-between">
          <p className="">2022 Unikaksha - All Rights Reserved.</p>
          <div className='follow-us'>
            <p className='me-3'>Need Help?</p>
            <a className='me-4 whatsapp-cta' href="https://wa.me/+919310575018?text=Hello">WhatsApp Us - (+91) 9310575018</a>
            <ul className="d-flex">
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
                <a href="https://www.youtube.com/channel/UCp5Id5P-KDLUMl8AVb13bFg" target="_blank">
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
    </div>
  </div>
);

export default Footer;
