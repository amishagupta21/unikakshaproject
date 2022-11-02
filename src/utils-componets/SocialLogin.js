import React from 'react';
import mail from '../assets/images/icon-gmail.png';
import linked from '../assets/images/icon-linked.png';
import network from '../assets/images/icon-network.png';
import fb from '../assets/images/icon-facebook.png';
import twit from '../assets/images/icon-twit.png';
import { toast } from 'react-toastify';
import { signInWithFacebook, signInWithGoogle, signInWithTwitter } from '../firebase/firebaseAuth';
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
		<Button className='social-btn' variant="outline-dark">Google</Button>
		<Button className='social-btn' variant="outline-dark">Facebook</Button>
	</div>
      {/* <ul>
        <li>
          <a
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
            <img src={mail} />
          </a>
        </li>
        <li>
          <a>
            {' '}
            <img src={linked} />
          </a>
        </li>
        <li>
          <a>
            <img src={network} />
          </a>
        </li>
        <li>
          <a
            onClick={async () => {
              const res = await signInWithFacebook();
              if (res?.user) {
                localStorage.setItem('user', JSON.stringify(res?.user));
                navigate('/home');
              }
            }}>
            {' '}
            <img src={fb} />{' '}
          </a>
        </li>
        <li>
          <a
            onClick={async () => {
              const res = await signInWithTwitter();
              if (res?.user) {
                localStorage.setItem('user', JSON.stringify(res?.user));
                navigate('/home');
              }
            }}>
            <img src={twit} />
          </a>
        </li>
      </ul> */}
    </>
  );
};

export default SocialLogin;
