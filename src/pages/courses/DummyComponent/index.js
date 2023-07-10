

import axios from 'axios';
import React, { useEffect } from 'react';
// const UnikodeComponent = () => {
//   var userData = JSON.parse(localStorage.getItem('unikodeuser'));
//   if (userData && userData.length > 0) {
//     // Get the first user's username and password
//     var username = userData[0].username;
//     var password = userData[0].password;

//     var url1 = 'https://appapi.unikaksha.dev/unkiodeUserAutoLogin/'+encodeURIComponent(username)+'/'+encodeURIComponent(password);

//     console.log(url1); 
//   }

//   return (
//     <div>
//       <p>
//         <a href="'https://appapi.unikaksha.dev/unkiodeUserAutoLogin/' + encodeURIComponent(username) + '/' + encodeURIComponent(password)" onClick={handleUnikodeClick}>
//           Unikode
//         </a>
//       </p>
//       <form className="loginform" name="login" method="post" action="'https://appapi.unikaksha.dev/unkiodeUserAutoLogin/' + encodeURIComponent(username) + '/' + encodeURIComponent(password)">
//         <p>
//           Username:
//           <input size="10" name="username" />
//         </p>
//         <p>
//           Password:
//           <input size="10" name="password" type="password" />
//         </p>
//         <p>
//           <input name="Submit" value="Login" type="submit" />
//         </p>
//       </form>
//     </div>
//   );
// };
// const UnikodeComponent = () => {
//   var userData = JSON.parse(localStorage.getItem('unikodeuser'));
//   console.log("userData",userData)
//   if (userData && userData.length > 0) {
//     var username = userData[0].username;
//     var password = userData[0].password;
//     var url = `https://appapi.unikaksha.dev/unkiodeUserAutoLogin/${encodeURIComponent(username)}/${encodeURIComponent(password)}`;
//     console.log(url);
//   }

//   const handleUnikodeClick = (e) => {
//     e.preventDefault();
//     window.open(url, '_blank');
//   };

//   return (
//     <div>
//       <p>
//         <a href={url} onClick={handleUnikodeClick}>
//           Unikode
//         </a>

//       </p>
//       <form
//         className="loginform"
//         name="login"
//         method="post"
//         action={url1}
//       >
//         <p>
//           Username:
//           <input size="10" name="username" />
//         </p>
//         <p>
//           Password:
//           <input size="10" name="password" type="password" />
//         </p>
//         <p>
//           <input name="Submit" value="Login" type="submit" />
//         </p>
//       </form>
//     </div>
//   );
// };

const UnikodeComponent = () => {

  const redirectToUnikode = () => {
    const userData = JSON.parse(localStorage.getItem('unikodeuser'));
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user", JSON.stringify(user.email))
    console.log('user', user)
    let url = '';

    if (userData) {
      const username = userData.username;
      const password = userData.password;
      url = `https://appapi.unikaksha.dev/unkiodeUserAutoLogin/${encodeURIComponent(username)}/${encodeURIComponent(password)}`;
    }

    setTimeout(() => {
      window.open(url, '_blank');

    }, 5000)

    console.log(url);

    // axios({
    //   method:"GET",
    //   url
    // }).then(res=>{
    //   console.log("redirect",res);
    // }).catch(err=>{
    //   console.log("error11",err);
    // })

  };

  /*
  TODO: 
   first call api take creds,
   autofill form
   auto submit form
   and hide the form
  */
  useEffect(() => {
    redirectToUnikode();
  }, [])
  return (
    <div>
      <h1>Redirecting you to unikode...</h1>
      <form class="loginform" name="login" method="post" action="http://unikode.unikaksha.com/login/index.php">
        <p>Username : 
          <input size="10" name="username" />
        </p>
        <p>Password : 
          <input size="10" name="password" type="password" />
        </p>
        <p>
          <input name="Submit" value="Login" type="submit" />
        </p>
      </form>
    </div>
  );
};


export default UnikodeComponent;
