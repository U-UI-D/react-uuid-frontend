import {createBaseURL, request} from "./NetworkRequest";

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
    data,
    headers
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
