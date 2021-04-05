import React, {useEffect, useState} from "react";
import ALAvatarNickname from "../../../al-avatar-nickname/ALAvatarNickname";
import {ALFlexBox} from "../../../al-component";
import {Button, Input, List, message, Tooltip, Modal, Form, Tag} from "antd";
import {connect} from "react-redux";
import ReplyBox from "../reply-box/ReplyBox";
import {HttpRequest} from "../../../../util/network/request";
import DateTimeUtils from "../../../../util/DateTimeUtils";
import ALIcon from "../../../al-icon";
import './style.scss';
import {ApiConst} from "../../../../util/network/config/ApiConst";
import {getUserIdentity} from "../../../../util/util";

function CommentBox(props) {
  const [hiddenTextArea, setHiddenTextArea] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [proposalTitle, setProposalTitle] = useState(props.content);
  const [proposalContent, setProposalContent] = useState(props.content);

  const handleReplyBtn = () => {
    setIsSubmitting(true);
    let postData = {
      userId: props.userInfo.id,
      commentId: props.id,
      content: inputValue,
      originUserId: props.userId
    };

    HttpRequest.post({
      url: "/comment/reply",
      data: postData,
      env: 'dev'
    }).then(res => {
      if (res.err === null){
        setHiddenTextArea(!hiddenTextArea);
        setInputValue("");
        props.reload();
        message.success("回复成功");
      }else {
        message.error("回复失败，请稍候再试！");
      }
    }).catch(err => {
      message.error("网络错误，请稍候再试！");
    })
  };
  const addProposal = () => {
    let data = {
      title: proposalTitle,
      content: proposalContent,
      userId: props.userId,
      workId: props.workId,
      workType: 1,
      topicId: props?.topicId
    }
    console.log("data", data);
    HttpRequest.post({
      url: ApiConst.work.proposal.post.POST_PROPOSAL,
      env: 'dev',
      data: data
    }).then(res => {
      if (res.data.code === 1){
        setIsModalVisible(false);
        message.success("已添加到提案");
        props.reloadProposal();
      }else {
        message.error("添加失败，请稍候重试");
      }
    })
  }
  useEffect(() => {}, []);

  console.log("props", props);
  return (
    <div style={{
      padding: "30px 0 0",
      borderTop: "1px solid #eee"
    }}>

      <Modal
        title="添加到提案"
        visible={isModalVisible}
        onOk={() => {addProposal();}}
        onCancel={() => {setIsModalVisible(false);}}
        okText={"提交"}
        cancelText={"取消"}
      >
        <Form>
          <Form.Item label="标题">
            <Input placeholder="输入标题..." value={proposalTitle} onChange={e => {setProposalTitle(e.target.value)}} />
          </Form.Item>
          <Form.Item label="描述">
            <Input placeholder="输入描述..." value={proposalContent} onChange={e => {setProposalContent(e.target.value)}}/>
          </Form.Item>
        </Form>
      </Modal>


      <ALAvatarNickname avatar={props.avatar}
                        nickname={props.nickname}
                        tagSlot={props.identity && <Tag color={props.identity == '1' ? 'processing' : 'success'}
                                      style={{marginLeft: "10px", borderRadius: '20px'}}>
                          {getUserIdentity(props.identity)}
                        </Tag>}/>
      <div className="al-m-left-50px al-m-bottom-50px" id="comment-box">

        <span id="add-proposal">
          {
            props.userInfo && (props.userInfo.id === props.workId) ?
            <Tooltip placement="bottom" title="添加到提案">
              <span id="al-icon"
                    onClick={() => {
                      setIsModalVisible(!isModalVisible);
                    }}>
                <ALIcon type='icon-tianjia1' />
              </span>
            </Tooltip> : ""
          }
        </span>

        <p dangerouslySetInnerHTML={{__html: props.content}}></p>

        <ALFlexBox between className="al-m-top-20px">
          <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(props.createdTime)}</div>
          {/*打开回复输入框*/}
          <Button type="text"
                  disabled={!props.isLogin}
                  onClick={() => {
                    setHiddenTextArea(!hiddenTextArea)
                  }}>{hiddenTextArea ? "回复" : "取消回复"}</Button>
        </ALFlexBox>

        <Input.TextArea hidden={hiddenTextArea}
                  rows={6}
                  placeholder={"正在回复 " + props.nickname}
                  style={{marginTop: "20px"}}
                  value={inputValue}
                  onChange={e => {
                    setInputValue(e.target.value);
                  }}/>
        {/*发表回复的按钮*/}
        <Button type="primary"
                disabled={!props.isLogin}
                className="al-m-top-20px"
                hidden={hiddenTextArea}
                loading={isSubmitting}
                onClick={handleReplyBtn}>回复</Button>

        {
          props.reply.list.length > 0 &&
          <List
            dataSource={props.reply.list}
            itemLayout="horizontal"
            locale={{emptyText: ""}}
            renderItem={_props => {
              return <ReplyBox {..._props} reload={props.reload} />
            }}
          />
        }

      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
}

export default connect(mapStateToProps)(CommentBox);
