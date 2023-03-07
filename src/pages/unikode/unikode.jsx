import { useEffect } from 'react';
import FooterContainer from '../../components/FooterComponent';

const Unikode = () => {
  const logIntoUnikode = async () => {
    const username = JSON.parse(localStorage.getItem('userData')).user.moodle_username;
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', `${process.env.REACT_APP_UNIKODE_URL}/login/index.php`);

    var FN = document.createElement('input');
    FN.setAttribute('type', 'text');
    FN.setAttribute('value', username);
    FN.setAttribute('name', 'username');
    FN.setAttribute('hidden', true);
    FN.setAttribute('placeholder', 'Full Name');

    var PWD = document.createElement('input');
    PWD.setAttribute('type', 'password');
    PWD.setAttribute('value', 'oblXgA8o39#B');
    PWD.setAttribute('name', 'password');
    PWD.setAttribute('hidden', true);
    PWD.setAttribute('placeholder', 'Password');

    var s = document.createElement('input');
    s.setAttribute('type', 'submit');
    s.setAttribute('hidden', true);
    s.setAttribute('value', 'Submit');

    form.appendChild(FN);
    form.appendChild(PWD);
    form.appendChild(s);
    document.getElementsByTagName('body')[0].appendChild(form);
    form.submit();
  };

  useEffect(() => {
    logIntoUnikode();
  });

  return (
    <>
    <p id="unikode" hidden>
      'Hello'
    </p>
    <FooterContainer/>
    </>
  );
};

export default Unikode;
