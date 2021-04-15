// 获取轮播图列表
import {HttpRequest} from "../../util/network/request";
import {ApiConst, GET_DESIGNER_RECOMMEND} from "../../util/network/config/ApiConst";

export class UserService {
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


