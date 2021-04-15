// 获取轮播图列表
import {HttpRequest} from "../../util/network/request";
import {ApiConst, GET_DESIGNER_RECOMMEND} from "../../util/network/config/ApiConst";

export class UserService {
  static async register(data) {
    let promise = HttpRequest.post({
      url: ApiConst.user.REGISTER,
      env: "prod",
      data
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  static async login(data) {
    let promise = HttpRequest.post({
      url: ApiConst.user.LOGIN,
      env: "prod",
      data
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  static async getUserInfoByToken(token) {
    let promise = HttpRequest.get({
      url: ApiConst.user.base.get.GET_USERINFO_BY_TOKEN + token,
      env: "prod",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  static async checkUserExist(username) {
    let promise = HttpRequest.get({
      url: ApiConst.user.base.get.GET_USER_IS_EXIST + username,
      env: "prod",
    }).then(res => {
      console.log('test-> checkUserExist', res);
      if (res.err === null) {
        return res
      }
    })
    return await promise;
  }

  static async getDesignerList() {
    let promise = HttpRequest.get({
      url: GET_DESIGNER_RECOMMEND,
      env: "mock",
    }).then(res => {
      if (res.err === null) {
        console.warn("test-> UserService getDesignerList res")
        return res.data
      }
    })
    return await promise;
  }
}


