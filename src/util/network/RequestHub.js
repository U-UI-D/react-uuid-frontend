import {GET_USER_DESIGNER_SHOW, GET_USER_ID, GET_WORK_ALL, GET_WORK_BY_ID} from "./config/ApiConst";
import {request} from "./NetworkRequest";
import {message} from "antd";
import AppConfig from "../../config/AppConfig";

/**
 * 获取作品列表
 * @param pageNo
 * @param pageSize
 * @returns {Promise<{data: null, err: null}>}
 */
export async function getWorkList(pageNo=1, pageSize=24){
  let url = GET_WORK_ALL;

  if (AppConfig.env === 'mock'){
    url = "/work/work.json";
  }else {
    url = url + `?pageNum=${pageNo}&pageSize=${pageSize}`
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
 * 通过id获取用户信息
 * @param id
 * @returns {Promise<{data: null, err: null}>}
 */
export async function getUserInfoByID(id){
  let url = GET_USER_ID;
  if (AppConfig.env === 'mock'){
    url = "/user/user.json";
  }else {
    url = url + id;
  }
  let result = {
    data: null,
    err: null
  }
  let promise = request({
    url: url,
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
 * 通过id获取用户信息
 * @param id
 * @returns {Promise<{data: null, err: null}>}
 */
export async function getShowDesigner(){
  let url = GET_USER_DESIGNER_SHOW;
  if (AppConfig.env === 'mock'){
    url = "/home/designer.json";
  }
  let result = {
    data: null,
    err: null
  }
  let promise = request({
    url: url,
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
