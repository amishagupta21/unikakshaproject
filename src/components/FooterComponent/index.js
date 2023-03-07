import React from 'react'
import styles from "./index.module.css"
import facebook from "../../assets/images/icons/facebooklogo.svg"
import instagram from "../../assets/images/icons/instagramlogo.svg"
import linkdin from "../../assets/images/icons/linkdinlogo.svg"
import youtube from "../../assets/images/icons/youtubelogo.svg"
import twitter from "../../assets/images/icons/twitter.svg"

const FooterContainer = () => {
 
  return (
    <div className={styles.footerContainer}>
      <div className={styles.credit}>
        <p>2022 Unikaksha - All Rights Reserved.</p>
      </div>
      <div className={styles.socialmedia}>
        <p>Need  Help?</p>
        <p>WhatsApp Us - (+91) 9310575018</p>
        <div className={styles.icons}>
         <img src={facebook} height={23.38} width={24}/>
         <img src={instagram} height={23.38} width={24}/>
         <img src={linkdin} height={23.38} width={24}/>
         <img src={youtube} height={23.38} width={24}/>
         <img src={twitter} height={23.38} width={24}/>
        </div>
      </div>
    </div>
  )
}

export default FooterContainer
