import React from "react";
import {Button, Col, Divider, Row, Space} from "antd";
import {ALComment, ALFlexBox, ALImage, ALLoading} from "../../../../components/al-component";
import DateTimeUtils from "../../../../util/DateTimeUtils";
import {HttpRequest} from "../../../../util/network/request";
import {NumberOutlined, Loading3QuartersOutlined} from "@ant-design/icons";
import {ApiConst} from "../../../../util/network/config/ApiConst";


class TopicDetailPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      topicData: null,
      commentList: [],
      proposalData: null,
    }
  }

  //渲染函数
  render() {
    const {topicData, commentList, proposalData} = this.state;
    return(
      <div className="content-width al-p-tb-20px">
        <Row gutter={[10]}>
          <Col span={18}>
            <div className="al-p-30px al-bg-color-white">
              {
                topicData ? (
                  <div>
                    <ALFlexBox wrap={false}>
                      <div>
                        <ALFlexBox centerV>
                          <ALImage src={topicData.avatar} circle style={{width: "40px", height: "40px"}} />
                          <div className="al-m-left-10px">
                            <h3 style={{margin: 0}}>{topicData.nickname}</h3>
                            <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(topicData.createdTime)}</div>
                          </div>
                        </ALFlexBox>
                        <p className="al-m-top-20px al-cursor-arrow al-m-bottom-20px">{topicData.content}</p>
                        <div>
                          {
                            topicData.imgUrls.map((item, index) =>{
                              return(
                                <div key={index}>
                                  <ALImage src={item} previewable style={{width: "100%"}} />
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </ALFlexBox>

                    {/*话题 圈子*/}
                    <div className="al-m-top-20px">
                      <Space>
                        <Button shape="round" style={{
                          backgroundColor: "rgba(0,141,255, .1)",
                          color: "rgb(0,141,255)",
                          border: "none",
                          fontSize: "13px"
                        }}> <NumberOutlined style={{marginLeft: "0"}} /> {topicData.topicTag}</Button>
                        <Button shape="round" danger style={{
                          backgroundColor: "rgba(255, 77, 79, .1)",
                          border: "none",
                          fontSize: "13px"
                        }}> <Loading3QuartersOutlined style={{marginLeft: "0"}} /> {topicData.boardTag}</Button>
                      </Space>
                    </div>

                    <div className="al-m-tb-20px"><Divider /></div>

                    {/*评论*/}
                    <div className="al-m-top-20px">
                      <h2>说说我的看法</h2>
                      <ALComment commentList={commentList}
                                 topicId={topicData.id} reload={this.reGetCommentList} reloadProposal={this.getProposalData}/>
                    </div>
                  </div>
                ) : <ALLoading />
              }
            </div>
          </Col>
          <Col span={6}>
            <div className="al-p-30px al-bg-color-white">
              {
                topicData?.workId ? (
                  <div>
                    <h2>关联作品</h2>
                    <ALFlexBox className="al-p-10px" style={{backgroundColor: "#fafafa"}}>
                      <ALImage src={topicData.workPoster} width={200} height={140} radius={10} />
                      <div className="al-m-left-20px">
                        <h3>{topicData.workTitle}</h3>
                      </div>
                    </ALFlexBox>
                  </div>
                ) : null
              }
            </div>

            <div className="al-p-30px al-bg-color-white al-m-top-10px">
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
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

    let {id} = this.props.match.params;
    console.log("id", id);
    console.log("props", this.props);

    this.getTopicDataById(id);
    this.getCommentList(id);
    this.getProposalData();
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  getTopicDataById = (id) => {
    HttpRequest.get({
      // url: "http://localhost:9005/topic/" + id
      url: ApiConst.topic.get.GET_DETAIL_BY_ID + id,
      env: 'dev'
    }).then(res => {
      if (res.err === null){
        this.setState({
          topicData: res.data.data
        })
      }
    })
  }

  getCommentList = (topicId) => {
    HttpRequest.get({
      url: ApiConst.comment.get.GET_BY_TOPIC_ID + topicId,
      env: 'dev'
      // url: "http://localhost:9003/comment/topic/" + topicId
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
    let {id} = this.props.match.params;
    this.getCommentList(id);
  }

  getProposalData = () => {
    let {id} = this.props.match.params;
    HttpRequest.get({
      url: `${ApiConst.work.proposal.get.GET_PROPOSAL_BY_WORK_ID_AND_TYPE_OR_TOPIC_ID}?topicId=${id}`,
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

export default TopicDetailPage;
