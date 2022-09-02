import axios from "axios";

const ApiService = async (url_end_point, type, data, resettoken) => {
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
      data: data,
    };
    return obj;
  };
  try {
    console.log("url ::", url_end_point)
    const apiResData = await axios(apiObj(url_end_point, type, data));
    return apiResData;
  } catch (err) {
    const apiErrData = err;
    return apiErrData;
  }
};

export default ApiService;
