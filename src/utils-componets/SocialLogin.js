import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import facebookIcon from '../assets/images/Facebook-icon.svg';
import googleIcon from '../assets/images/Google-icon.svg';
import { signInWithFacebook, signInWithGoogle } from '../firebase/firebaseAuth';

const SocialLogin = ({ setFieldValue }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dualAuth = async (userDetail) => {
    let data = {
      uid: userDetail?.uid,
      email: userDetail?.email,
      fullName: userDetail?.displayName
    };
    navigate('/signup', {
      state: data
    });
    // const response = await ApiService('user/create', 'POST', data);
    // if (response?.data?.code === 200) {
    //   navigate('/dashboard');
    // }
  };
  return (
    <>
      <div className="d-flex justify-content-between mt-4">
        <Button
          className="social-btn"
          variant="outline-dark"
          onClick={async () => {
            const res = await signInWithGoogle();
            if (res?.user) {
              localStorage.setItem('user', JSON.stringify(res?.user));
              dualAuth(res?.user);
            }
          }}>
          <img className="mx-2" src={googleIcon} alt="google" />
          Google
        </Button>
        <Button
          className="social-btn"
          variant="outline-dark"
          onClick={async () => {
            const res = await signInWithFacebook();
            setFieldValue('email', 'test@yopmail.com');
            setFieldValue('fullName', 'Testng');
            if (res?.user) {
              localStorage.setItem('user', JSON.stringify(res?.user));
              navigate('/dashboard');
            }
          }}>
          <img className="mx-2" src={facebookIcon} alt="facebook" />
          Facebook
        </Button>
      </div>
    </>
  );
};

export default SocialLogin;
