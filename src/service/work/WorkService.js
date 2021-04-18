import {HttpRequest} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";

export class WorkService {
  // 获取全部ui作品数据
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

  // 通过id获取ui作品数据
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

  // 获取软件作品数据
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

  // 通过简单作品id获取软件作品数据
  static async getSoftwareWorkDataById(softwareWorkId) {
    let promise = HttpRequest.get({
      url: ApiConst.work.software.get.GET_BY_ID + softwareWorkId,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  // 通过简单作品id获取软件作品数据
  static async getSimpleSoftwareWorkDataById(softwareWorkId) {
    let promise = HttpRequest.get({
      url: ApiConst.work.software.get.GET_SIMPLE_BY_ID + softwareWorkId,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  // 增加浏览量
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

  // 通过用户id获取加入的作品id列表
  static async getJoinWorkIdListByUserId(userId) {
    let promise = HttpRequest.get({
      url: ApiConst.work.common.get.GET_JOIN_WORK_ID_LIST_BY_USER_ID + userId,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }

  // 加入作品
  static async joinWork({userId, workId}) {
    let promise = HttpRequest.put({
      url: `${ApiConst.work.common.put.UPDATE_JOIN_WORK_BY_USER_ID}?userId=${userId}&joinWorkId=${workId}`,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data
      }
    })
    return await promise;
  }
}


