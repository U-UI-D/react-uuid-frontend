import React from "react";
import {Button, Divider, message, Tag} from "antd";
import {ALComment, ALFlexBox, ALImage} from "@components/al-component";
import ShowDevelopers from "../show-developers";
import DateTimeUtils from "@util/DateTimeUtils";
import {RouterConst} from "@util/router/config/RouterConst";
import {CommentService} from "@service/comment/CommentService";
import {ProposalService} from "@service/proposal/ProposalService";
import {WorkService} from "@service/work/WorkService";
import './style.scss';

function View(props) {
  const {workData, commentList, proposalData, linkWorkData, history} = props;
  const {reGetCommentList, getProposalData} = props;
  let html = {__html: workData.description}
  return workData && (
    <div className="ui-work-content">
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
        workData.tagList.length > 0 &&
        <div>
          标签：
          {workData.tagList.map((item, index) => {
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
                     onClick={() => {history.push(RouterConst.work.software.DETAIL_PAGE + linkWorkData.id)}}>
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
                  <div dangerouslySetInnerHTML={{__html: item.title}}></div>
                  <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(item.createdTime)}</div>
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
                 ownerId={workData.userId}
                 workType={"ui"}
                 reload={reGetCommentList}
                 reloadProposal={getProposalData} />
    </div>
  );
}

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
    return (
      <View {...this.state} {...this.props}
            reGetCommentList={this.reGetCommentList}
            getProposalData={this.reGetProposalData} />
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

  // 获取关联的软件作品
  getLinkSoftwareWorkById = (softWorkId = this.props.workData.linkSoftwareWorkId) => {
    softWorkId && WorkService.getSimpleSoftwareWorkDataById(softWorkId).then(res => {
      this.setState({
        linkWorkData: res
      })
    }).catch(err => {
      console.error(err);
    })
  }

  // 获取评论列表
  getCommentList = (workId) => {
    CommentService.getCommentListByWorkId(workId).then(res => {
      console.log("getCommentList", res)
      this.setState({
        commentList: res.list,
      })
    }).catch(err => {
      message.warning("评论列表获取失败");
    })
  }

  // 重新获取评论列表
  reGetCommentList = () => {
    let workId = this.props.workData.id;
    this.getCommentList(workId);
  }

  // 获取提案数据
  getProposalData = () => {
    let {workData} = this.props;
    workData && ProposalService.getProposalDataByWorkId(workData.id).then(res => {
      this.setState({
        proposalData: res
      })
    }).catch(err => {
      message.warning("获取提案数据失败");
    })
  }

  // 重新获取提案数据
  reGetProposalData = () => {
    this.getProposalData();
  }
}

export default UIWorkContent;
