import axios from "axios";
import qs from "querystring";
import AppConfig from "../../config/AppConfig";

export function request(config) {
  if (config.type === "get" || config.type === "GET"){
    if (JSON.stringify(config.data) !== "{}"){
      config.url += "?" + qs.stringify(config.data);
    }
  }else {
    config.data = qs.stringify(config.data);
  }

  console.log("request config", config)

  const axiosInstance = axios.create({
    baseURL: createBaseURL(AppConfig.env),
    timeout: 30000,
    headers: {
      "content-type" : "application/x-www-form-urlencoded"
    },

  });

  return axiosInstance(config);
}

export function createBaseURL(env) {
  let host = "";
  let port = "";
  let prefix = "";
  let baseURL = "";
  switch (env){
    case "mock":
      host = AppConfig.backend.mock.host;
      port = AppConfig.backend.mock.port;
      prefix = AppConfig.backend.mock.prefix;
      break;
    case "dev":
      host = AppConfig.backend.dev.host;
      port = AppConfig.backend.dev.port;
      prefix = AppConfig.backend.dev.prefix;
      break;
    case "prod":
      host = AppConfig.backend.prod.host;
      port = AppConfig.backend.prod.port;
      prefix = AppConfig.backend.prod.prefix;
      break;
    case "test":
      host = AppConfig.backend.test.host;
      port = AppConfig.backend.test.port;
      prefix = AppConfig.backend.test.prefix;
      break;
  }
  baseURL = "http://" + host + ':' + port + prefix;
  return baseURL;
}
