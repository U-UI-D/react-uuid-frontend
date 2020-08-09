import axios from "axios";
import qs from "querystring"

//https://jsonplaceholder.typicode.com/posts/1
let host = "jsonplaceholder.typicode.com";
let port = "80";
let prefix = "";
let baseURL = "http://" + host + ':' + port + "/" + prefix;

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
