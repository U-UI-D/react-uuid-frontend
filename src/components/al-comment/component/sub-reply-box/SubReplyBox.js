import React, {useState} from "react";
import {Button, Divider, Input, message, Tag} from "antd";
import {ALFlexBox} from "../../../al-component";
import ALAvatarNickname from "../../../al-avatar-nickname/ALAvatarNickname";
import {CaretRightOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import DateTimeUtils from "../../../../util/DateTimeUtils";
import {HttpRequest} from "../../../../util/network/request";
import {getUserIdentity} from "../../../../util/util";
import './style.scss';

function SubReplyBox(props) {
  const {isMobile} = props;
  const [hiddenTextArea, setHiddenTextArea] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleReplyBtn = () => {
    setIsSubmitting(true);
    let postData = {
      userId: props.userInfo.id,
      commentId: props.id,
      content: inputValue,
      originUserId: props.userId,
      mainReplyId: props.mainReplyId
    };

    console.log("SubReplyBox props", props)
    console.log("postData", postData)

    HttpRequest.post({
      url: "/comment/reply",
      data: postData,
      env: "dev"
    }).then(res => {
      if (res.err === null) {
        setHiddenTextArea(!hiddenTextArea);
        setInputValue("");
        props.reload();
        message.success("回复成功");
      } else {
        message.error("回复失败，请稍候再试！");
      }
    }).catch(err => {
      message.error("网络错误，请稍候再试！");
    })
  };
  return (
    <div className="sub-reply-box">
      <Divider style={{marginTop: 0, marginBottom: "20px"}}/>

      <ALFlexBox centerV>


        <ALAvatarNickname avatar={props.avatar}
                          avatarSize={30}
                          nickname={isMobile ? "" : props.nickname}
                          tagSlot={props.identity && <Tag color={props.identity == '1' ? 'processing' : 'success'}
                                                                                    style={{marginLeft: "10px", borderRadius: '20px'}}>
          {getUserIdentity(props.identity)}
        </Tag>}/>

        <CaretRightOutlined className="al-m-lr-20px"/>

        <ALAvatarNickname avatar={props.originUserAvatar}
                          avatarSize={30}
                          nickname={isMobile ? "" : props.originUserNickname}
                          tagSlot={props.originUserIdentity && <Tag color={props.originUserIdentity == '1' ? 'processing' : 'success'}
                                                                                              style={{marginLeft: "10px", borderRadius: '20px'}}>
          {getUserIdentity(props.originUserIdentity)}
        </Tag>}/>

      </ALFlexBox>
      <div className="reply-content-wrapper">
        <p>{props.content}</p>

        <ALFlexBox centerV className="al-m-top-20px">
          <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(props.createdTime)}</div>
          <Button type="text"
                  className="al-m-left-20px"
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

        <Button type="primary"
                className="al-m-top-20px"
                hidden={hiddenTextArea}
                loading={isSubmitting}
                disabled={!props.isLogin}
                onClick={handleReplyBtn}>回复</Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
    isMobile: state.isMobile
  }
}

export default connect(mapStateToProps)(SubReplyBox);
