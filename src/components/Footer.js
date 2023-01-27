import React from 'react';
import fa from '../assets/images/icon-fa-unikaksha.svg';
import insta from '../assets/images/icon-insta-unikaksha.svg';
import linked from '../assets/images/icon-linked-unikaksha.svg';
import twitter from '../assets/images/icon-twitter-unikaksha.svg';
import youtube from '../assets/images/icon-youtube-unikaksha.svg';
import '../custom.css';
import '../pages/auth/auth.scss';
const Footer = () => (
  <div className="container_footer">
    <div className="container_footer1">
      <div className="container_rights">
        <div>
          <p>2022 Unikaksha - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
    <div className="container_footer2">
      <div className="container_help">Need Help?</div>
      <div className="container_number">
        <span style={{color: '#003194', fontSize: '16px'}}>
          <b>Whatsapp us - </b><a style={{color: '#003194', fontSize: '16px'}} href="https://wa.me/+919310575018?text=Hello">(+91) 9310575018</a>
        </span>
      </div>
      <div className="container_follow_us">
        <div>
          {' '}
          <a href="https://www.facebook.com/unikaksha/" target="_blank">
            <img src={fa} alt="fabook" />
          </a>
        </div>
        <div>
          <a href="https://www.instagram.com/unikaksha/" target="_blank">
            <img src={insta} alt="fabook" />
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/company/unikaksha/" target="_blank">
            <img src={linked} alt="fabook" />
          </a>
        </div>
        <div>
          <a href="https://www.youtube.com/channel/UCp5Id5P-KDLUMl8AVb13bFg" target="_blank">
            <img src={youtube} alt="fabook" />
          </a>
        </div>
        <div>
          <a href="https://twitter.com/UniKaksha" target="_blank">
            <img src={twitter} alt="fabook" />
          </a>
        </div>
      </div>
    </div>
  </div>
);
export default Footer;
