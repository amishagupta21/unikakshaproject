import React from 'react'
import styles from "./index.module.css"
// import facebook from "../../assets/images/icons/facebooklogo.svg"
// import instagram from "../../assets/images/icons/instagramlogo.svg"
// import linkdin from "../../assets/images/icons/linkdinlogo.svg"
// import youtube from "../../assets/images/icons/youtubelogo.svg"
// import twitter from "../../assets/images/icons/twitter.svg"

import fa from '../../assets/images/icon-fa-unikaksha.svg';
import insta from '../../assets/images/icon-insta-unikaksha.svg';
import linked from '../../assets/images/icon-linked-unikaksha.svg';
import youtube from '../../assets/images/icon-youtube-unikaksha.svg';
import twitter from '../../assets/images/icon-twitter-unikaksha.svg';
import payment from '../../assets/images/payment-icons.svg';

const FooterContainer = () => {
 
  return (
    <div className={styles.footerContainer}>
      <div className="container">
      <div className="row">
      <div className={styles.credit}>
        <p>2022 Unikaksha - All Rights Reserved.</p>
      </div>
      <div className={styles.socialmedia}>
      <div className="footer-inside">
        <p>Need  Help?</p>
        <div className='app-links'><label>WhatsApp Us -</label>
        <a href="https://wa.me/+919310575018?text=Hello">(+91) 9310575018</a></div> </div>
        <div className={styles.icons}>
        <div className="follow-us">
             
              <ul>
                <li><a href="https://www.facebook.com/unikaksha/" target="_blank"><img src={fa} alt="fabook" /></a></li>
                <li><a href="https://www.instagram.com/unikaksha/" target="_blank"><img src={insta} alt="fabook" /></a></li>
                <li><a href="https://www.linkedin.com/company/unikaksha/" target="_blank"><img src={linked} alt="fabook" /></a></li>
                <li><a href="https://www.youtube.com/channel/UCp5Id5P-KDLUMl8AVb13bFg" target="_blank"><img src={youtube} alt="fabook" /></a></li>
                <li><a href="https://twitter.com/UniKaksha" target="_blank"><img src={twitter} alt="fabook" /></a></li>
              </ul>
            </div>
        </div>
      </div>  </div>
    </div></div>
  )
}

export default FooterContainer
