import axios from 'axios';
import { toast } from 'react-toastify';

const ApiService = async (url_end_point, type, data) => {
  const token = JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken;

  const apiObj = (url_end_point, type, data) => {
    const obj = {
      url: `${process.env.REACT_APP_LIVEURL}/${url_end_point}`,
      method: type,
      // headers: resettoken
      //   ? { Authorization: `Bearer ${resettoken}` }
      //   : {
      //     Authorization: `Bearer ${JSON.parse(localStorage?.getItem("loggedInUser"))?.token
      //       ? JSON.parse(localStorage?.getItem("loggedInUser"))?.token
      //       : ""
      //       }`,
      //   },
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      },
      data: data,
    };
    return obj;
  };
  try {
    const response = await axios(apiObj(url_end_point, type, data));
    return response;
  } catch (err) {
    toast(`${err}`);
    return err;
  }
};

export default ApiService;
