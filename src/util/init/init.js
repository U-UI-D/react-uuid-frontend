import {getCookieByName} from "../cookieUtil";
import {commonRequest} from "../network/RequestHub";
import {GET_USER_BY_TOKEN} from "../network/config/ApiConst";
import {message} from "antd";

export function initForUser() {
  let token = getCookieByName("sso_token");
  console.log("sso_token", token);
  if (token) {
    commonRequest({
      url: GET_USER_BY_TOKEN + token
    }).then(res => {
      console.log("initForUser", res);
      if (res.err === null){
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      }else {
        localStorage.setItem("isLogin", "false");
        localStorage.removeItem("userInfo");
        message.info("登录已过期，请重新登录！");
        console.log("执行window.location.href = '/login'")
        window.location.href = "/#/login";
      }
    })
  }else {
    // 没有token
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("userInfo");
  }
}
