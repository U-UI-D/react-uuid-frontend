import React from "react";
import {Button, Divider, Tag} from "antd";
import {ALComment, ALFlexBox, ALImage, ALTitleBox} from "../../../../../../../../components/al-component";
import {HttpRequest} from "../../../../../../../../util/network/request";
import {ApiConst} from "../../../../../../../../util/network/config/ApiConst";
import ShowDevelopers from "../show-developers";
import Proposal from "../proposal";
import ALDot from "../../../../../../../../components/al-dot/ALDot";
import DateTimeUtils from "../../../../../../../../util/DateTimeUtils";
import {RouterConst} from "../../../../../../../../util/router/config/RouterConst";

class UIWorkContent extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      commentList: [],
      proposalData: null,
      workData: this.props,
      linkWorkData: null
    }
  }

  //渲染函数
  render() {

    let {workData} = this.props;
    let {commentList, proposalData, linkWorkData} = this.state;
    let html = {__html: workData.description}
    return workData === null ? <></> :(
      <div style={{width: "auto", backgroundColor: "#fff", padding: 20}}>
        <h1>{workData.title}</h1>
        <ALFlexBox between>
          <div>
            <span style={{marginRight: 20}}>ID: {workData.id}</span>
            <span style={{marginRight: 20}}>分类：{workData.typename}</span>
            <span style={{marginRight: 20}}>浏览：{workData.lookCount}</span>
            <span style={{marginRight: 20}}>实现：{workData.usingCount}</span>
            <span style={{marginRight: 20}}>可商用：{workData.commercialAvailable === '0' ? "否" : "是"}</span>
            <Button type="link" style={{marginRight: 20}}>举报</Button>
          </div>
          <span>发布于 {DateTimeUtils.getFormerTime(workData.createdTime)}</span>
        </ALFlexBox>

        {
          this.props.workData.tagList.length > 0 &&
          <div>
            标签：
            {this.props.workData.tagList.map((item, index) => {
              return <Tag key={index}>{item}</Tag>
            })}
          </div>
        }

        <div className="al-m-tb-20px"><Divider /></div>

        <div>
          <div className="al-m-tb-20px" dangerouslySetInnerHTML={html}></div>

          <div>
            {
              workData.imageUrls.map((item, index) => {
                return <img key={index} src={item} style={{width: 100+'%'}} alt=""/>
              })
            }
          </div>

        </div>

        <div className="al-m-tb-20px"><Divider /></div>
        <h2>关联软件作品</h2>
        {
          linkWorkData ?
          <ALFlexBox className="al-p-10px al-m-top-20px al-cursor-pointer"
                     style={{backgroundColor: "#fafafa"}}
                     onClick={() => {this.props.history.push(RouterConst.work.software.DETAIL_PAGE + linkWorkData.id)}}>
            <ALImage src={linkWorkData.poster} width={200} height={140} radius={10} />
            <div className="al-m-left-20px">
              <h3>{linkWorkData.title}</h3>
            </div>
          </ALFlexBox> :
          <p>暂无关联软件作品</p>
        }
        {
          (workData.developerList && workData.developerList?.length > 0 )
          && <ShowDevelopers list={workData.developerList} />
        }

        <div className="al-m-tb-20px"><Divider /></div>
        <h2>最新提案</h2>
        <div>
          {
            proposalData && proposalData.list.length > 0 ?
            proposalData && proposalData.list.map((item, index) => {
              return (
                <div key={index}>
                  <h3>{item.title}</h3>
                  <div>{DateTimeUtils.getFormerTime(item.createdTime)}</div>
                  {proposalData.list.length-1 === index ? null : <Divider />}
                </div>
              )
            }) : <div>暂无提案</div>
          }
        </div>
        <Divider />
        <h2 id="work-comment">评论</h2>

        <ALComment commentList={commentList}
                   workId={workData.id}
                   workType={"ui"}
                   reload={this.reGetCommentList}
                   reloadProposal={this.getProposalData} />
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let workId = this.props.workData.id;
    this.getCommentList(workId);
    this.getLinkSoftwareWorkById(this.props.workData.linkSoftwareWorkId);
    this.getProposalData();
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  getLinkSoftwareWorkById = (softWorkId = this.props.workData.linkSoftwareWorkId) => {
    HttpRequest.get({
      url: ApiConst.work.software.get.GET_SIMPLE_BY_ID + softWorkId,
      env: 'dev'
    }).then(res => {
      console.warn("res", res);
      this.setState({
        linkWorkData: res.data.data
      })
    }).catch(err => {
      console.warn(err);
    })
  }

  getCommentList = (workId) => {
    HttpRequest.get({
      // url: ApiConst.comment.get.GET_BY_UI_WORK_ID + "ui/" + workId
      url: ApiConst.comment.get.GET_BY_UI_WORK_ID + workId,
      env: 'dev'
    }).then(res => {
      if (res.err === null){
        console.log("getCommentList", res.data)
        this.setState({
          commentList: res.data.data.list,
        })
      }
    })
  }

  reGetCommentList = () => {
    let workId = this.props.workData.id;
    this.getCommentList(workId);
  }

  getProposalData = () => {
    let {workData} = this.props;
    HttpRequest.get({
      url: `${ApiConst.work.proposal.get.GET_PROPOSAL_BY_WORK_ID_AND_TYPE_OR_TOPIC_ID}?workId=${workData.id}&workType=${1}`,
      env: "dev"
    }).then(res => {
      if (res.err === null){
        this.setState({
          proposalData: res.data.data
        })
      }else {
        console.log(res.err);
      }
    })
  }

  reGetProposalData = () => {
    this.getProposalData();
  }


}

export default UIWorkContent;
