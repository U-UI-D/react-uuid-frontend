import React from "react";
import {Comment, Avatar, Button, List, Input, Divider, message, Space} from 'antd';
import {connect} from "react-redux";
import {PATH_LOGIN, PATH_REGISTER} from "../../util/router/config/RouterConst";
import {withRouter} from "react-router-dom";
import {HttpRequest} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";
import PropTypes from "prop-types";
import CommentBox from "./component/comment-box/CommentBox";
import ALRichTextEditor from "../al-rich-text-editor";

const {TextArea} = Input;

class ALComment extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      inputValue: ''
    };
  }

  render() {
    const {commentList, ownerId} = this.props;
    const CommentList = (({commentList}) => (
      <List
        dataSource={commentList}
        itemLayout="horizontal"
        locale={{emptyText: '暂无评论'}}
        renderItem={item => {
          return <CommentBox {...item}
                             reload={this.props.reload}
                             reloadProposal={this.props.reloadProposal}
                             ownerId={ownerId}
                             topicId={this.props.topicId}/>
        }}
      />
    ));

    const {submitting, inputValue} = this.state;

    return (
      <div>
        <Comment
          avatar={
            this.props.isLogin ?
              <Avatar src={this.props.userInfo.avatar}/>
              : null
          }
          content={
            <div>
              {/*<TextArea rows={6}*/}
              {/*          placeholder={"输入你的评论..."}*/}
              {/*          onChange={this.handleTextAreaChange} value={inputValue}/>*/}

              <ALRichTextEditor style={{
                border: '1px solid rgba(235,235,235,.8)'
              }} onChange={(data) => {
                console.log("输入的内容", data);
                this.setState({
                  inputValue: data
                })
              }} clearContent={c => this.ALRichTextEditor = c} />

              <div className="al-text-right al-m-top-20px">
                {
                  this.props.isLogin ? <></> : (
                    <span>
                    登录后发表评论
                    <span className="al-m-lr-10px">
                      <Button type="link" style={{margin: 0, padding: 0}} onClick={() => {
                        this.props.history.push({pathname: PATH_LOGIN, state: {fromPath: this.props.match.url}})
                      }}>登录</Button>
                      <Divider type="vertical"/>
                      <Button type="link" style={{margin: 0, padding: 0}} onClick={() => {
                        this.props.history.push({pathname: PATH_REGISTER})
                      }}>注册</Button>
                    </span>
                  </span>
                  )
                }
                <Space>
                  <Button disabled={!this.props.isLogin}
                          htmlType="submit"
                          loading={submitting}
                          onClick={this.clearContent} type="primary">
                    清空
                  </Button>
                  <Button disabled={!this.props.isLogin}
                          htmlType="submit"
                          loading={submitting}
                          onClick={this.handleCommentSubmit} type="primary">
                    发表评论
                  </Button>
                </Space>
              </div>
            </div>
          }
        />

        {commentList && <CommentList commentList={commentList}/>}
      </div>
    )

  }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {

  }

  //组件将要卸载时
  componentWillUnmount() {

  }

  clearContent = () => {
    if(this.ALRichTextEditor) {
      this.ALRichTextEditor.clearContent();
    }
  }

  // 提交评论
  handleCommentSubmit = () => {
    const {inputValue} = this.state;
    if (!inputValue || inputValue === '<p></p>') {
      return;
    }

    this.setState({
      submitting: false,
    });

    const {userInfo, topicId, workId, workType} = this.props;
    let postData = {
      userId: userInfo.id,
      topicId: topicId,
      workId: workId,
      workType: workType,
      content: inputValue
    }

    console.log("postData", postData);

    HttpRequest.post({
      url: ApiConst.comment.post.POST_COMMENT,
      env: 'dev',
      // url: "http://localhost:9003/comment",
      data: postData
    }).then(res => {
      if (res.err === null) {
        this.setState({
          submitting: false,
          inputValue: ""
        });
        message.success("评论成功");
        this.props.reload();
        this.clearContent();
      } else {
        message.error("评论失败，请稍候重试");
      }
    }).catch(err => {
      message.error("网络错误，请稍候重试");
    });
  };

  // 监听改变
  handleTextAreaChange = e => {
    this.setState({
      inputValue: e.target.value,
    });
  };

}


// prop类型
ALComment.propTypes = {
  commentList: PropTypes.string,
  reload: PropTypes.func,
  workId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  workType: PropTypes.string,
  topicId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}

// prop默认值
ALComment.defaultProps = {
  commentList: [],
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ALComment));
