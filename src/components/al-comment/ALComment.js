import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';


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
          <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            发表评论
          </Button>
        </Form.Item>
      </div>
    </>
);

class ALComment extends React.Component{


  state = {
    comments: [],
    submitting: false,
    value: '',
    userInfo: null
  };

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
    const { comments, submitting, value } = this.state;

    return this.state.userInfo === null ? <div></div> : (
        <>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
              avatar={
                <Avatar
                    src={this.state.userInfo.avatar}
                    alt="Han Solo"
                />
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
        </>
    );
  }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {
    // getWorkList().then(res => this.setState({result: res}))
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({
      userInfo: userInfo
    })
    console.log(userInfo);
  }

  //组件将要卸载时
  componentWillUnmount() {

  }

}

export default ALComment;
