import React from 'react';
import facebookIcon from '../assets/images/Facebook-icon.svg';
import googleIcon from '../assets/images/Google-icon.svg';
import { toast } from 'react-toastify';
import { signInWithFacebook, signInWithGoogle } from '../firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../redux/actions/LoaderActions';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import ApiService from '../services/ApiService';

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dualAuth = async (userDetail) => {
    console.log('userDetail', userDetail);
    let data = {
      uid: userDetail?.uid,
      email: userDetail?.email,
      phone: '1238071892',
    };
    const response = await ApiService('user/create', 'POST', data);
    if (response?.data?.code === 200) {
      navigate('/dashboard');
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between mt-4">
        <Button
          className="social-btn"
          variant="outline-dark"
          onClick={async () => {
            dispatch(setLoading(true));
            const res = await signInWithGoogle();
            console.log('response latest=>>', res);
            dispatch(setLoading(false));
            if (res?.user) {
              localStorage.setItem('user', JSON.stringify(res?.user));
              dualAuth(res?.user);
              //   navigate('/home');
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
