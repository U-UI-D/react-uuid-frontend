import {GET_USER_ID, GET_WORK_ALL} from "./config/ApiConst";
import {request} from "./NetworkRequest";
import {message} from "antd";

/**
 * 获取作品列表
 * @param pageNo
 * @param pageSize
 * @returns {Promise<{data: null, err: null}>}
 */
export async function getWorkList(pageNo=1, pageSize=24){
  let url = GET_WORK_ALL;
  let result = {
    data: null,
    err: null
  }
  let promise = request({
    url: url + `?pageNum=${pageNo}&pageSize=${pageSize}`,
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
export async function getUserInfoBuID(id){
  let url = GET_USER_ID + id;
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
