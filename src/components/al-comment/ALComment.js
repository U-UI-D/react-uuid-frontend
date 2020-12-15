import React from "react";
import {Comment, Avatar, Form, Button, List, Input, Divider} from 'antd';
import moment from 'moment';
import {connect} from "react-redux";
import {PATH_LOGIN, PATH_REGISTER} from "../../util/router/config/RouterConst";
import {withRouter} from "react-router-dom";

class ALComment extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      submitting: false,
      value: '',
    };
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

    render() {
      const { TextArea } = Input;

      const CommentList = ({ comments }) => (
        <List
          dataSource={comments}
          header={`${comments.length} 个回复`}
          itemLayout="horizontal"
          renderItem={props => <Comment {...props} />}
        />
      );

      const Editor = ({ onChange, onSubmit, submitting, value }) => (
        <>
          <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
          </Form.Item>
          <div className="al-text-right">
            <Form.Item>

              {
                this.props.isLogin ? <></> : (
                  <span>
                    登录后发表评论
                    <span className="al-m-lr-10px">
                      <Button type="link" style={{margin: 0, padding: 0}} onClick={() => {
                        this.props.history.push({pathname: PATH_LOGIN, state: {fromPath: this.props.match.url}})
                      }}>登录</Button>
                      <Divider type="vertical" />
                      <Button type="link" style={{margin: 0, padding: 0}} onClick={() => {
                        this.props.history.push({pathname: PATH_REGISTER})
                      }}>注册</Button>
                    </span>
                  </span>
                )
              }

              <Button disabled={!this.props.isLogin} htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                发表评论
              </Button>
            </Form.Item>
          </div>
        </>
      );

      const { comments, submitting, value } = this.state;

      return this.props.userInfo === null ? <div></div> : (
          <>
            <Comment
                avatar={
                  this.props.isLogin ?
                  <Avatar src={this.props.userInfo.avatar}/>
                  : <></>
                }
                content={
                  <Editor
                      onChange={this.handleChange}
                      onSubmit={this.handleSubmit}
                      submitting={submitting}
                      value={value}
                  />
                }
            />

            {comments.length > 0 && <CommentList comments={comments} />}
          </>
      );
    }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {

  }

  //组件将要卸载时
  componentWillUnmount() {

  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginState(data){
      let action = {
        type: "updateLoginState",
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ALComment));
