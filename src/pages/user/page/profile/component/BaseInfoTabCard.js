import React, {useState} from "react";
import {getUserInfoFromLocalStorage} from "../../../../../util/util";
import {Upload, Modal, Avatar, Button, Input, Radio, message, Select} from "antd";
import ImgCrop from 'antd-img-crop';
import {commonRequest} from "../../../../../util/network/RequestHub";
import {PUT_USER} from "../../../../../util/network/config/ApiConst";
import {getCookieByName} from "../../../../../util/cookieUtil";
import {ALFlexBox, ALLabelBox, ALImage} from "../../../../../components/al-component";
import {HttpRequest} from "../../../../../util/network/request";
import moment from "moment";
import {RouterConst} from "../../../../../util/router/config/RouterConst";


function BaseInfoTabCard(props) {

  let [userInfo, setUserInfo] = useState(getUserInfoFromLocalStorage());
  const [mouseIn, setMouseIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [identity, setIdentity] = useState(1);
  const [sendData, sendSendData] = useState({});

  const [nickname, setNickname] = useState(userInfo.nickname ?? "");
  const [age, setAge] = useState(userInfo.age ?? "");
  const [phone, setPhone] = useState(userInfo.phone ?? "");
  const [email, setEmail] = useState(userInfo.email ?? "");
  const [sign, setSign] = useState(userInfo.personalitySign ?? "");


  const showModal = () => {
    setVisible(true)
  };

  const handleModalOk = e => {
    console.log(e);
    setVisible(false);
  };

  const handleModalCancel = e => {
    console.log(e);
    setVisible(false);
  };

  const handleUploadPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const saveUserInfo = () => {
    let sendData = {
      ...userInfo,
      avatar,
      createdTime: undefined,
      updatedTime: moment().format("YYYY-MM-DD HH:mm:ss")
    }
    console.log("sendData", sendData);

    let token = getCookieByName("sso_token");
    HttpRequest.put({
      url: PUT_USER,
      data: sendData,
      env: "dev",
      headers: {
      "Authorization": token
      }})
      .then(res => {
        console.log("PUT_USER", res);
        message.success("信息已变更，重新登录后生效");
      })
  }

  const uploadAvatar = {
    name: 'file',
    action: 'http://localhost:8000/api/v1/common/upload/return-url',
    data: {
      userId: 1
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        console.log(info.file, info.fileList);
        setAvatar(info.file.response);
        console.log("avatar", avatar)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };

  const modal = (
    <Modal
      title="上传头像"
      visible={visible}
      cancelText={"取消"}
      okText={"完成"}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
    >
      <ALFlexBox centerVH>
        <div>
          <ImgCrop rotate grid shape="round">
            <Upload
              {...uploadAvatar}
              onPreview={handleUploadPreview}
              className="avatar-uploader"
              listType="picture-card"
              showUploadList={false}
            >
              <ALFlexBox centerVH width={200} height={200}>
                {
                  avatar === "" ?
                    <div>选择图片上传</div> :
                    <ALImage circle width={200} height={200} src={avatar}/>
                }
              </ALFlexBox>
            </Upload>
          </ImgCrop>
        </div>
      </ALFlexBox>
    </Modal>
  );

  return (
    <div>
      {modal}

      {moment().format("YYYY-MM-DD HH:mm:ss")}
      <h1>基本信息</h1>

      {/*头像*/}
      <ALFlexBox centerVH column className="al-m-tb-20px">
        <div onMouseEnter={() => {
          setMouseIn(true);
        }}
             onMouseLeave={() => {
               setMouseIn(false);
             }}
             className="al-position-rela">
          <Avatar src={avatar === "" ? userInfo.avatar : avatar} size={120}/>
          {
            // 鼠标移入头像后的操作
            mouseIn ? (
              <ALFlexBox centerVH
                         className="al-position-abs al-mask-black-20 al-img-circle"
                         style={{top: 0, bottom: 0, left: 0, right: 0}}>
                <div onClick={() => {
                  showModal();
                }} className="al-text-color-white al-cursor-pointer">
                  修改头像
                </div>
              </ALFlexBox>
            ) : ""
          }
        </div>
      </ALFlexBox>

      {/*表单信息*/}
      <div className="">
        <ALFlexBox between>
          <ALFlexBox lineHeight={4} flexNum={1} centerH column>
            <ALLabelBox label={"用户名"}>
              <Input defaultValue={userInfo.username} disabled/>
            </ALLabelBox>

            <ALLabelBox label={"昵称"}>
              <Input defaultValue={userInfo.nickname}
                     onChange={(e) => {
                       setNickname(e.target.value);
                       userInfo.nickname = e.target.value;
                       setUserInfo(userInfo);
                     }}
                     allowClear
                     maxLength={16}
                     suffix={
                       <span className="suffix-text">
                         {(16 - nickname.length)}
                       </span>
                     }/>
            </ALLabelBox>

            <ALLabelBox label={"手机"}>
              <Input defaultValue={userInfo.phone}
                     onChange={(e) => {
                       setPhone(e.target.value);
                       userInfo.phone = e.target.value;
                       setUserInfo(userInfo);
                     }}
                     allowClear
                     maxLength={11}
                     suffix={
                       <span className="suffix-text">
                         {(11 - phone.length)}
                       </span>
                     }/>
            </ALLabelBox>
          </ALFlexBox>

          <ALFlexBox lineHeight={4} flexNum={1} centerH column>
            <ALLabelBox label={"身份"}>
              <ALFlexBox between>
                <div>
                  <Select placeholder="请选择"
                          style={{width: 120}}
                          onChange={(value) => {setIdentity(value)}}>
                    <Select.Option value={1}>UI设计师</Select.Option>
                    <Select.Option value={2}>开发者</Select.Option>
                  </Select>
                </div>

                <div>
                  <span>性别：</span>
                  <Radio.Group value={userInfo.gender}
                               onChange={(e) => {
                                 userInfo.gender = e.target.value;
                                 setUserInfo(userInfo)
                               }}>
                    <Radio value={"1"}>男</Radio>
                    <Radio value={"0"}>女</Radio>
                    <Radio value={"2"}>保密</Radio>
                  </Radio.Group>
                </div>
              </ALFlexBox>
            </ALLabelBox>

            <ALLabelBox label={"年龄"}>
              <Input defaultValue={userInfo.age}
                     onChange={(e) => {
                       if (e.target.value > 120) {
                         message.error("年龄超出正常范围");
                         return;
                       }
                       setAge(e.target.value);
                       userInfo.age = e.target.value;
                       setUserInfo(userInfo);
                     }}
                     allowClear
                     maxLength={3}
                     suffix={
                       <span className="suffix-text">
                         {(3 - age.toString().length)}
                       </span>
                     }/>
            </ALLabelBox>

            <ALLabelBox label={"邮箱"}>
              <Input defaultValue={userInfo.email}
                     onChange={(e) => {
                       setEmail(e.target.value);
                       userInfo.email = e.target.value;
                       setUserInfo(userInfo);
                     }}
                     allowClear
                     maxLength={32}
                     suffix={
                       <span className="suffix-text">
                         {32 - email.length}
                       </span>
                     }/>
            </ALLabelBox>
          </ALFlexBox>
        </ALFlexBox>

        <div className="al-m-top-10px al-m-bottom-20px">
          <ALLabelBox label={"个性签名"}>
            <Input.TextArea rows={3}
                            maxLength={100}
                            allowClear
                            onChange={(e) => {
                              setSign(e.target.value);
                              userInfo.personalitySign = e.target.value;
                              setUserInfo(userInfo);
                            }}/>
            <div className="suffix-text al-text-right">
              {sign.length} / 100
            </div>
          </ALLabelBox>
        </div>

        <div className="al-flex-container-center-h">
          <Button onClick={saveUserInfo} type="primary"> 保 存 </Button>
        </div>

      </div>
    </div>
  );
}

export default BaseInfoTabCard;
