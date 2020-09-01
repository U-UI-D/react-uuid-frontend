import React, {useState} from "react";
import {getUserInfoFromLocalStorage} from "../../../../../util/util";
import {Avatar, Button, Col, Input, Radio, Row} from "antd";
import ALFlexBox from "../../../../../components/al-flex-box/ALFlexBox";
import ALLabelBox from "../../../../../components/al-label-box/ALLabelBox";


function BaseInfoTabCard(props) {


  let [userInfo, setUserInfo] = useState(getUserInfoFromLocalStorage());
  return (
    <div>
      <h1>基本信息</h1>

      {/*头像*/}
      <ALFlexBox centerVH column>
        <Avatar src={userInfo.avatar} size={120} />
        <div className="al-p-tb-20px">
          <Button type="link">修改头像</Button>
        </div>
      </ALFlexBox>

      <div className="">
        <div className="al-flex-container al-m-bottom-20px">
          <div className="al-flex-item-grow-1">
            <ALLabelBox label={"用户名"}>
              <Input defaultValue={userInfo.username} disabled />
            </ALLabelBox>
          </div>
          <div className="al-flex-item-grow-1">
            <ALLabelBox label={"性别"}>
              <div>
                <Radio.Group value={userInfo.gender}>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </Radio.Group>
              </div>
            </ALLabelBox>
          </div>
        </div>

        <div className="al-flex-container al-m-bottom-20px">
          <div className="al-flex-item-grow-1">
            <ALLabelBox label={"昵称"}>
              <Input defaultValue={userInfo.nickname} />
            </ALLabelBox>
          </div>
          <div className="al-flex-item-grow-1">
            <ALLabelBox label={"年龄"}>
              <Input defaultValue={userInfo.age} />
            </ALLabelBox>
          </div>
        </div>

        <div className="al-flex-container al-m-bottom-20px">
          <div className="al-flex-item-grow-1">
            <ALLabelBox label={"手机"}>
              <Input defaultValue={userInfo.phone} />
            </ALLabelBox>
          </div>
          <div className="al-flex-item-grow-1">
            <ALLabelBox label={"邮箱"}>
              <Input defaultValue={userInfo.email} />
            </ALLabelBox>
          </div>
        </div>

        <div className="al-m-bottom-20px">
          <ALLabelBox label={"个性签名"}>
            <Input.TextArea rows={5} />
          </ALLabelBox>
        </div>

        <div className="al-flex-container-center-h">
          <Button type="primary"> 保 存 </Button>
        </div>

      </div>
    </div>
  );
}

export default BaseInfoTabCard;
