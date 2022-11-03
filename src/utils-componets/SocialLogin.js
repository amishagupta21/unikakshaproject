import React from 'react';
import facebookIcon from '../assets/images/Facebook-icon.svg';
import googleIcon from '../assets/images/Google-icon.svg';
import { toast } from 'react-toastify';
import { signInWithFacebook, signInWithGoogle } from '../firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../redux/actions/LoaderActions';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

const SocialLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
	<div className='d-flex justify-content-between mt-4'>
		<Button 
		className='social-btn' 
		variant="outline-dark" 
		onClick={async () => {
              dispatch(setLoading(true));
              const res = await signInWithGoogle();
              dispatch(setLoading(false));
              if (res?.user) {
                localStorage.setItem('user', JSON.stringify(res?.user));
                toast.success('Log in Succesfull', {
                  theme: 'colored'
                });
                setTimeout(() => {
                  toast(`Welcome ${res?.user?.displayName}`);
                }, 3000);
                navigate('/home');
              }
            }}>
		<img className='mx-2' src={googleIcon} alt="google" />
			Google
		</Button>
		<Button className='social-btn' variant="outline-dark" 
		   onClick={async () => {
              const res = await signInWithFacebook();
              if (res?.user) {
                localStorage.setItem('user', JSON.stringify(res?.user));
                navigate('/home');
              }
            }}
		>
			<img className='mx-2' src={facebookIcon} alt="facebook" />
			Facebook
		</Button>
	</div>
    </>
  );
};

export default SocialLogin;
