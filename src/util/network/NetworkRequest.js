import axios from "axios";
import qs from "querystring";
import AppConfig from "../../config/AppConfig";

//https://jsonplaceholder.typicode.com/posts/1
let host = AppConfig.backendDev.host;
let port = AppConfig.backendDev.port;
let prefix = AppConfig.backendDev.prefix;
let baseURL = "http://" + host + ':' + port + prefix;

export function request(config) {
  if (config.type !== "get" || config.type !== "GET"){
    config.data = qs.stringify(config.data);
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
      "content-type" : "application/x-www-form-urlencoded"
    },

  });

  return axiosInstance(config);
}
