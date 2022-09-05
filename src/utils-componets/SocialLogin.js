import React from 'react'
import mail from "../assets/images/icon-gmail.png";
import linked from "../assets/images/icon-linked.png";
import network from "../assets/images/icon-network.png";
import fb from "../assets/images/icon-facebook.png";
import twit from "../assets/images/icon-twit.png";
import { toast } from "react-toastify";
import { signInWithFacebook, signInWithGoogle, signInWithTwitter } from '../firebase/firebaseAuth'
import { Link, useNavigate } from 'react-router-dom';

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
                            localStorage.setItem("user", JSON.stringify(res?.user))
                            toast.success("Log in Succesfull", {
                                theme: "colored"
                            })
                            setTimeout(() => {
                                toast(`Welcome ${res?.user?.displayName}`)
                            }, 3000);
                            navigate('/home')
                        }
                    }} ><img src={mail} /></a>
                </li>
                <li>
                    <a> <img src={linked} /></a>
                </li>
                <li>
                    <a><img src={network} /></a>
                </li>
                <li>
                    <a
                        onClick={async () => {
                            let res = await signInWithFacebook()
                            if (res?.user) {
                                localStorage.setItem("user", JSON.stringify(res?.user))
                                navigate('/home')
                            }
                        }}
                    > <img src={fb} /> </a>
                </li>
                <li><a
                    onClick={async () => {
                        let res = await signInWithTwitter()
                        if (res?.user) {
                            localStorage.setItem("user", JSON.stringify(res?.user))
                            navigate('/home')
                        }
                    }}
                > <img src={twit} /></a>
                </li>
            </ul>
        </div>
    )
}

export default SocialLogin