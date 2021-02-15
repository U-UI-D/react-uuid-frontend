import React, {useEffect, useState} from "react";
import {Divider} from "antd";
import {HttpRequest} from "../../../../../../../../util/network/request";
import {ApiConst} from "../../../../../../../../util/network/config/ApiConst";
import DateTimeUtils from "../../../../../../../../util/DateTimeUtils";
import {WorkDetailContext} from "../../../../context/WorkDetailContext";

export default function Proposal(props) {
  const {workData, workType} = props;

  const [proposalData, setProposalData] = useState(null);
  const getProposalData = () => {
    HttpRequest.get({
      url: `${ApiConst.work.proposal.get.GET_PROPOSAL_BY_WORK_ID_AND_TYPE}/${workData.id}/1`,
      env: "dev"
    }).then(res => {
      if (res.err === null){
        setProposalData(res.data.data);
      }else {
        console.log(res.err);
      }
    })
  }

  useEffect(() => {
    getProposalData();
  }, []);

  return (
    <WorkDetailContext.Consumer>
      {
        contextState => {
          const {updateName} = contextState;
          return (
            <div>
              {
                proposalData && proposalData.list.map((item, index) => {
                  return (
                    <div key={index}>
                      <h3>{item.title}</h3>
                      <div>{DateTimeUtils.getFormerTime(item.createdTime)}</div>
                      <Divider />
                    </div>
                  )
                })
              }
            </div>
          )
        }
      }
    </WorkDetailContext.Consumer>
  )
}
