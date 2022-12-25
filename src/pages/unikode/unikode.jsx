import { useEffect } from 'react';

const Unikode = () => {

  const logIntoUnikode = () => {
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'http://35.188.65.173/login/index.php');

    var FN = document.createElement('input');
    FN.setAttribute('type', 'text');
    FN.setAttribute('value', 'logeshkannan96')
    FN.setAttribute('name', 'username');
    FN.setAttribute('hidden', true)
    FN.setAttribute('placeholder', 'Full Name');

    var PWD = document.createElement('input');
    PWD.setAttribute('type', 'password');
    PWD.setAttribute('value', 'Logeshcool@96')
    PWD.setAttribute('name', 'password');
    PWD.setAttribute('placeholder', 'Password');

    var s = document.createElement('input');
    s.setAttribute('type', 'submit');
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

  return <p id="unikode" hidden>'Hello'</p>;
};

export default Unikode;
