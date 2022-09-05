import React from 'react'
import mail from "../assets/images/icon-gmail.png";
import linked from "../assets/images/icon-linked.png";
import network from "../assets/images/icon-network.png";
import fb from "../assets/images/icon-facebook.png";
import twit from "../assets/images/icon-twit.png";
import { signInWithFacebook, signInWithGoogle, signInWithTwitter } from '../firebase/firebaseAuth'
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Login using social network</h2>
            <ul>
                <li>
                    <a onClick={async () => {
                        let res = await signInWithGoogle()
                        if (res?.user) {
                            localStorage.setItem("token", JSON.stringify(res?.user?.stsTokenManager))
                            navigate('/home')
                        }
                    }} ><img src={mail} /></a>
                </li>
                <li>
                    <a href=""> <img src={linked} /></a>
                </li>
                <li>
                    <a href=""><img src={network} /></a>
                </li>
                <li>
                    <a onClick={() => signInWithFacebook()}> <img src={fb} /> </a>
                </li>
                <li><a onClick={() => signInWithTwitter()}   > <img src={twit} /></a>
                </li>
            </ul>
        </div>
    )
}

export default SocialLogin