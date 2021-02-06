import React, {useState} from "react";
import ALAvatarNickname from "../../../al-avatar-nickname/ALAvatarNickname";
import {ALFlexBox} from "../../../al-component";
import {Button, List, Input, message} from "antd";
import SubReplyBox from "../sub-reply-box/SubReplyBox";
import {connect} from "react-redux";
import DateTimeUtils from "../../../../util/DateTimeUtils";
import {HttpRequest} from "../../../../util/network/request";

function ReplyBox(props) {
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
      mainReplyId: props.id
    };

    console.log("postData", postData)

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
      padding: "20px 20px 5px",
      borderRadius: "10px",
      backgroundColor: "#fafafa"
    }} className="al-m-top-20px">
      <ALAvatarNickname avatar={props.avatar}
                        nickname={props.nickname}/>
      <div className="al-m-left-50px al-m-bottom-20px">
        <p>{props.content}</p>
        <ALFlexBox centerV between className="al-m-top-20px">
          <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(props.createdTime)}</div>
          <Button type="text" onClick={() => {
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

        {/*显示子回复*/}
        {
          props.subReply.list.length > 0 && (
            <List
              dataSource={props.subReply.list}
              itemLayout="horizontal"
              renderItem={_props => {
                return <SubReplyBox {..._props} reload={props.reload} />
              }}
            />
          )
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

export default connect(mapStateToProps)(ReplyBox);
