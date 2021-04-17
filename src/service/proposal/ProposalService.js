import {HttpRequest} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";

export class ProposalService {
  static async getProposalDataByWorkId(workId) {
    let promise = HttpRequest.get({
      url: `${ApiConst.work.proposal.get.GET_PROPOSAL_BY_WORK_ID_AND_TYPE_OR_TOPIC_ID}?workId=${workId}&workType=${1}`,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        return res.data.data
      }
    })
    return await promise;
  }
}


