// 获取轮播图列表
import {HttpRequest} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";

export class WorkService {
  static async getUIWorkData({orderBy="", pageNum=1, pageSize=20, url, data={}}) {
    let promise = HttpRequest.get({
      url: url ?? `${ApiConst.work.ui.get.GET_ALL}?orderBy=${orderBy}&pageNum=${pageNum}&pageSize=${pageSize}&typename=${data.typename ?? ""}`,
      data,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  static async getUIWorkDataById(workId) {
    let promise = HttpRequest.get({
      url: ApiConst.work.ui.get.GET_BY_ID + workId,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  static async getSoftwareWorkData({orderBy, pageNum=1, pageSize=20}) {
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

  static async increaseLookCount({workId, userId, workType}) {
    let promise = HttpRequest.put({
      url: ApiConst.work.common.increase.lookCount,
      env: "dev",
      data: {workId, userId, workType}
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }
}


