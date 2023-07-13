

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ApiService from '../../../services/ApiService';


const UnikodeComponent = () => {

  const [username,setUsername] = useState("");
  const [passowrd,setPassowrd] = useState("");

  const ref = useRef();

  // const fetchApplicationDetails = async () => {
  //   const userName = localStorage.getItem('user');
  //   const user = JSON.parse(userName);
  //   const payload =
  //   {
  //     full_name: user.displayName,
  //     email: user.email,
  //   }


  //   let applicationDetails = await ApiService(
  //     '/student/unikode-check-create-user',
  //     `POST`,
  //     payload,
  //     true
  //   );
  //   setUsername(applicationDetails.data.unikodeINFO[0].username)
  //   setPassowrd(applicationDetails.data.unikodeINFO[0].password)
  //   // Auto submit form

  // };
 
  // const fetchApplicationDetails = async () => {
  //   const userName = localStorage.getItem('user');
  //   const user = JSON.parse(userName);
  //   const payload = {
  //     full_name: user.displayName,
  //     email: user.email,
  //   };
  
  //   try {
  //     let applicationDetails = await ApiService(
  //       '/student/unikode-check-create-user',
  //       'POST',
  //       payload,
  //       true
  //     );
  //     setUsername(applicationDetails.data.unikodeINFO[0].username);
  //     setPassowrd(applicationDetails.data.unikodeINFO[0].password);
  //     // Auto submit form
  //     // ref?.current?.submit();
  //   } catch (error) {
  //     // Handle error
  //   }
  //   // ref?.current?.submit();

  // };
  const fetchApplicationDetails = async () => {
    const userName = localStorage.getItem('user');
    const user = JSON.parse(userName);
    const payload = {
      full_name: user.displayName,
      email: user.email,
    };
  
    try {
      let applicationDetails = await ApiService(
        '/student/unikode-check-create-user',
        'POST',
        payload,
        true
      );
      setUsername(applicationDetails.data.unikodeINFO[0].username);
      setPassowrd(applicationDetails.data.unikodeINFO[0].password);
      
      setTimeout(() => {
        ref?.current?.submit();
      }, 2000); // Delay in milliseconds (2 seconds in this example)
    } catch (error) {
      // Handle error
    }
  };
  
  useEffect(() => {
    fetchApplicationDetails();
  }, [])
  return (
    <div>
      <h1>Redirecting you to unikode...</h1>

      <form style={{visibility:"hidden"}} ref={ref} class="loginform"  name="form" id="form" method="post" action="https://unikode.unikaksha.com/login/index.php">
        <p>Username :
          <input size="10" name="username" value={username} />
        </p>
        <p>Password :
          <input size="10" name="password" type="text" value={passowrd} />
        </p>
        <p>
          <input name="Submit" value="Login" type="submit" />
        </p>
      </form>
    </div>
  );
};


export default UnikodeComponent;
