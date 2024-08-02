import Axios from "axios";
import { getAuthToken } from "../utils/auth";


const BASE_URL = "http://localhost:3000/api/v1/";
const axios = Axios.create({
  withCredentials: true,
});



export const httpService = {
  get(endpoint, data, withToken = false) {
    return ajax(endpoint, "GET", data, withToken);
  },
  post(endpoint, data, withToken = false) {
    return ajax(endpoint, "POST", data, withToken);
  },
  put(endpoint, data, withToken = false) {
    return ajax(endpoint, "PUT", data, withToken);
  },
  patch(endpoint, data, withToken = false) {
    return ajax(endpoint, "PATCH", data, withToken);
  },
  delete(endpoint, data, withToken = false) {
    return ajax(endpoint, "DELETE", data, withToken);
  },
};

async function ajax(endpoint, method = "GET", data = null, withToken = false) {
  try {
    console.log(`${BASE_URL}${endpoint}`);

    const config = {
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
      headers: {},
    };

    if (withToken) {
      const token = getAuthToken();
      console.log(token);
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config);
    }

    if (data instanceof FormData) {
      console.log('here');
      config.headers["Content-Type"] = "multipart/form-data";
    }
    console.log('config', config);

    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`,
      data
    );
    console.dir(err);
    throw err;
  }
}
