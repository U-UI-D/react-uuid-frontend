import axios from "axios";
import qs from "qs";
import AppConfig from "../../config/AppConfig";

export function request(config) {
  if (config.method === "get" || config.method === "GET"){
    config.data = qs.stringify(config.data);
  }else {
    if (config.headers["content-type"] !== "application/json"){
      config.data = qs.stringify(config.data);
    }
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


export const HttpRequest = {

  /**
   * 通用网络请求
   * @param url
   * @param type
   * @param data
   * @param env
   * @returns {Promise<*|{data: null, err: null}>}
   */
  async commonRequest({url="", method="get", data={}, env="prod", headers={}}){
    let _url = url;
    let baseURL = '';

    switch (env) {
      case "mock":
        baseURL = createBaseURL("mock");
        _url = baseURL + url + ".json";
        break;
      case "dev":
        baseURL = createBaseURL("dev");
        _url = baseURL + url;
        break;
      case "prod":
        baseURL = createBaseURL("prod");
        _url = baseURL + url;
        break;
      default:
        baseURL = createBaseURL("prod");
        _url = baseURL + url;
    }

    let result = {
      data: null,
      err: null
    }
    let promise = request({
      url: _url,
      method,
      data,
      headers
    }).then(res => {
      console.log(res);
      result.data = res.data;
      return result;
    }).catch(err => {
      console.log(err);
      result.err = err;
      return result;
    });

    result = await promise;
    return result;
  },

  async get({url='', data={}, headers={}, env}){
    console.log("HttpRequest get")
    let promise = this.commonRequest({
      url,
      method: 'GET',
      data,
      headers,
      env
    }).then(res => {
      return res;
    });
    return await promise;
  },

  async post({url='', data={}, headers={}, env}){
    let promise = this.commonRequest({
      url,
      method: 'POST',
      data,
      headers,
      env
    }).then(res => {
      return res;
    });
    return await promise;
  },

  async put({url='', data={}, headers={}, env}){
    let promise = this.commonRequest({
      url,
      method: 'PUT',
      data,
      headers,
      env
    }).then(res => {
      return res;
    });
    return await promise;
  },

  async delete({url='', data={}, headers={}, env}){
    let promise = this.commonRequest({
      url,
      method: 'DELETE',
      data,
      headers,
      env
    }).then(res => {
      return res;
    });
    return await promise;
  }
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
