import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";
const ApiService = async (url, type, data, resettoken) => {
  const apiObj = (url, type, data) => {
    const obj = {
      url: `${BASE_URL}`,
      method: type,
      // headers: resettoken
      //   ? { Authorization: `Bearer ${resettoken}` }
      //   : {
      //     Authorization: `Bearer ${JSON.parse(localStorage?.getItem("loggedInUser"))?.token
      //       ? JSON.parse(localStorage?.getItem("loggedInUser"))?.token
      //       : ""
      //       }`,
      //   },
      data: data,
    };
    return obj;
  };
  try {
    const apiResData = await axios(apiObj(url, type, data));
    return apiResData;
  } catch (err) {
    const apiErrData = err;
    return apiErrData;
  }
};

export default ApiService;
