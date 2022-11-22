import axios from 'axios';
import { toast } from 'react-toastify';

const ApiService = async (url_end_point, type, data) => {
  //   const token = JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken;
  let token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4MDljZmYxMTZlNWJhNzQwNzQ1YmZlZGE1OGUxNmU4MmYzZmQ4MDUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUGFydGggQXJkZXNoYW5hIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FJdGJ2bW1RT3VyM1VFZWZ1amt1aHl6Y2ZjVWMyUE5UZWxrWF9XQTg1YmNiPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3VuaWtha3NoYTIwMjIiLCJhdWQiOiJ1bmlrYWtzaGEyMDIyIiwiYXV0aF90aW1lIjoxNjY5MTE2MTg0LCJ1c2VyX2lkIjoiWHQxQjNXa0lqTFNMaU8yZzVQT2xXTUNCeHhmMiIsInN1YiI6Ilh0MUIzV2tJakxTTGlPMmc1UE9sV01DQnh4ZjIiLCJpYXQiOjE2NjkxMTYxODQsImV4cCI6MTY2OTExOTc4NCwiZW1haWwiOiJwYXJ0aC5hcmRlc2hhbmFAY29kZXNoYXN0cmEuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQ0Nzc2NjE4Njc4MTYyNTE0NzYiXSwiZW1haWwiOlsicGFydGguYXJkZXNoYW5hQGNvZGVzaGFzdHJhLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.NZ696oRMUvht4KF4T4zxSVtHwWUAfdxI4ICKfxzSsS43qQVKNoBImVuvxM8pKLqawW-PIbMJNVml2UDzX8raivdxUvC5oXy2tn3Erkxbjtmcr5mRX4RFHDr7IuTiD5sOgKBrEB6oJXnBBJjnTxV2TvL8wfQxi02cf6Cuvkls0V3hGckaFltoq7tl7dnX2ez0Ehggf7BTkxShMiY_SIlCsc-VAkUODQyTiVxtGH_nZU4U1iK9QoyI0AW1RpcFuY28URQ4B8U3M6TjQSne4cJyN6hU_deyyzZ4-DbRUmjD-FkrArVVxIFbkFqgF8yNaDKu_iW_Yps_aZl-yBK2des3-Q';
  console.log('token ==>>>>', token);
  const apiObj = (url_end_point, type, data) => {
    console.log('data :::', data);
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
    console.log(`${err}`);
    return err;
  }
};

export default ApiService;
