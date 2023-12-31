import axios from 'axios';

const ApiService = async (url_end_point, type="GET", data) => {
  
   const token = JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken;
  const apiObj = (url_end_point, type, data) => {
    const baseUrl = process.env.REACT_APP_API_URL;
    const obj = {
      url: `${baseUrl}/${url_end_point}`,
      method: type,
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        "access-key":"fD3T+LGHC&eIV5nh"
      },
      data: data,
    };
    return obj;
  };
  try {
    const response = await axios(apiObj(url_end_point, type, data));
    return response;
  } catch (err) {
    console.log(`${err}`);
    return err;
  }
};

export default ApiService;
// let token = null;
//   if (isToken) {
//     token = JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken;
//   }