import axios from "axios";
import store from "@/store";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 1000 * 60
  // withCredentials: true // send cookies when cross-domain requests
});

// Request interceptors
service.interceptors.request.use(
  async config => {
    if (store.getters.token) {
      config.headers.Authorization = `bearer  ${store.getters.token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  response => {
    // const res = response.data;

    // if (res.result !== "Success") {
    //   Message({
    //     message: res.message || "Error",
    //     type: "error",
    //     duration: 5 * 1000,
    //   });
    //   // return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return response.data;
    // }
    return response.data;
  },
  async error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
