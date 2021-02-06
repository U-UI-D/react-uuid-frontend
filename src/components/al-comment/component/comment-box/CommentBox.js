import React, {useState} from "react";
import ALAvatarNickname from "../../../al-avatar-nickname/ALAvatarNickname";
import {ALFlexBox} from "../../../al-component";
import {Button, Input, List, message} from "antd";
import {connect} from "react-redux";
import ReplyBox from "../reply-box/ReplyBox";
import {HttpRequest} from "../../../../util/network/request";
import DateTimeUtils from "../../../../util/DateTimeUtils";

function CommentBox(props) {
  const [hiddenTextArea, setHiddenTextArea] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleReplyBtn = () => {
    setIsSubmitting(true);
    let postData = {
      userId: props.userInfo.id,
      commentId: props.id,
      content: inputValue,
      originUserId: props.userId
    };

    HttpRequest.post({
      url: "http://localhost:9003/reply",
      data: postData
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
  return (
    <div style={{
      padding: "30px 0 0",
      borderTop: "1px solid #eee"
    }}>
      <ALAvatarNickname avatar={props.avatar}
                        nickname={props.nickname}/>
      <div className="al-m-left-50px al-m-bottom-50px">
        <p>{props.content}</p>

        <ALFlexBox between className="al-m-top-20px">
          <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(props.createdTime)}</div>
          <Button type="text"
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
