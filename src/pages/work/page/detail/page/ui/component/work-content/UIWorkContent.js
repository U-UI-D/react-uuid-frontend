import React from "react";
import {Button, Divider, Tag} from "antd";
import {ALComment, ALTitleBox} from "../../../../../../../../components/al-component";
import {HttpRequest} from "../../../../../../../../util/network/request";
import {ApiConst} from "../../../../../../../../util/network/config/ApiConst";
import ShowDevelopers from "../show-developers";
import Proposal from "../proposal";

class UIWorkContent extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      commentList: []
    }
  }

  //渲染函数
  render() {

    let {workData} = this.props;
    let {commentList} = this.state;
    let html = {__html: workData.description}
    return workData === null ? <></> :(
      <div style={{width: "auto", backgroundColor: "#fff", padding: 20}}>
        <h1>{workData.title}</h1>
        <div>
          <span style={{marginRight: 20}}>原创作品</span>
          <span style={{marginRight: 20}}>分类：{workData.typename}</span>
          <span style={{marginRight: 20}}>浏览：{workData.lookCount}</span>
          <span style={{marginRight: 20}}>实现：{workData.usingCount}</span>
          <span style={{marginRight: 20}}>可商用：{workData.commercialAvailable === '0' ? "否" : "是"}</span>
          <Button type="link" style={{marginRight: 20}}>举报</Button>
        </div>

        <div>
          标签：
          {this.props.workData.tagList.map((item, index) => {
            return <Tag key={index}>{item}</Tag>
          })}
        </div>

        <div className="al-m-tb-20px"><Divider /></div>

        <div>
          <div className="al-m-tb-20px" dangerouslySetInnerHTML={html}>

          </div>

          <div>
            {
              workData.imageUrls.map((item, index) => {
                return <img key={index} src={item} style={{width: 100+'%'}} alt=""/>
              })
            }
          </div>

        </div>

        <div className="al-m-tb-20px"><Divider /></div>
        <ShowDevelopers />


        <Divider />
        <h2>评论</h2>

        <ALComment commentList={commentList}
                   workId={workData.id}
                   workType={"ui"}
                   reload={this.reGetCommentList} />
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let workId = this.props.workData.id;
    this.getCommentList(workId);
  }

  //组件卸载前调用
  componentWillUnmount() {

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

}

export default UIWorkContent;
