const React = require('react');
import axios from "axios";
import { getSessionId } from "./utils"
import * as ENV from "./env";



export const URL_STRINGS = {
  //APP API URLS
  SEND_OTP_URL: "/api/v1/register/",
}

export var axiosInstance = axios.create({
  baseURL: ENV.API_HOST,
  headers: {
    'X-SESSION-ID': getSessionId()
  }
});


// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers['X-SESSION-ID'] = getSessionId();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


export function sendOtp(mobileNumber) {
  return axiosInstance.post(URL_STRINGS.SEND_OTP_URL + mobileNumber);
}



