import {GET_USER_DESIGNER_SHOW, GET_USER_ID, GET_WORK_ALL, GET_WORK_BY_ID} from "./config/ApiConst";
import {createBaseURL, request} from "./NetworkRequest";
import {message} from "antd";
import AppConfig from "../../config/AppConfig";

/**
 * 通过作品id获取详情
 * @param id
 * @returns {Promise<{data: null, err: null}>}
 */
export async function getWorkDetailByID(id){
  let url = GET_WORK_BY_ID;

  if (AppConfig.env === 'mock'){
    url = "/work/work_detail.json";
  }else {
    url = url + id;
  }
  let result = {
    data: null,
    err: null
  }
  let promise = request({
    url: url
  }).then(res => {
    console.log(res);
    result.data = res.data.data;
    return result;
  }).catch(err => {
    message.warning("网络错误，请稍候重试！");
    console.log(err);
    result.err = err;
    return result;
  });

  result = await promise;
  console.log(result);
  return result;
}

/**
 * 通用网络请求
 * @param url
 * @param type
 * @param data
 * @param env
 * @returns {Promise<*|{data: null, err: null}>}
 */
export async function commonRequest({url="", method="get", data={}, env="dev", headers={}}){
  let _url = url;
  if (env === "mock"){
    let baseMockURL = createBaseURL("mock");
    _url = baseMockURL + url + ".json";
  }

  let result = {
    data: null,
    err: null
  }
  let promise = request({
    url: _url,
    method,
    data
  }).then(res => {
    console.log(res);
    result.data = res.data.data;
    return result;
  }).catch(err => {
    console.log(err);
    result.err = err;
    return result;
  });

  result = await promise;
  return result;
}
