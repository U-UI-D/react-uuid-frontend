import {HttpRequest} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";

export class CommentService {
  static async getCommentListByWorkId(workId) {
    let promise = HttpRequest.get({
      url: ApiConst.comment.get.GET_BY_UI_WORK_ID + workId,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }
}


