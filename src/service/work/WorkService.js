// 获取轮播图列表
import {HttpRequest} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";

export class WorkService {
  static async getUIWorkData({orderBy, pageNum=1, pageSize=20}) {
    let promise = HttpRequest.get({
      url: `${ApiConst.work.ui.get.GET_ALL}?orderBy=${orderBy}&pageNum=${pageNum}&pageSize=${pageSize}&typename=`,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }
}


