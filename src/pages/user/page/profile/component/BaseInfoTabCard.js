import React, {useState} from "react";
import {getUserInfoFromLocalStorage} from "../../../../../util/util";
import {Upload, Modal, Avatar, Button, Col, Input, Radio, Row, message} from "antd";
import ALFlexBox from "../../../../../components/al-flex-box/ALFlexBox";
import ALLabelBox from "../../../../../components/al-label-box/ALLabelBox";
import ALImage from "../../../../../components/al-image/ALImage";
import ImgCrop from 'antd-img-crop';


function BaseInfoTabCard(props) {

  let [userInfo, setUserInfo] = useState(getUserInfoFromLocalStorage());
  const [mouseIn, setMouseIn] = useState(false);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [sendData, sendSendData] = useState({});


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
      ...userInfo
    }
    console.log("sendData", sendData);
  }

  const uploadAvatar = {
    name: 'file',
    action: 'http://localhost:9000/upload/return-url',
    data: {
      userId: 1
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        setAvatar(info.file.response);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
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

      <h1>基本信息</h1>

      {/*头像*/}
      <ALFlexBox centerVH column>
        <div onMouseEnter={() => {
          setMouseIn(true);
        }}
             onMouseLeave={() => {
               setMouseIn(false);
             }}
             className="al-position-rela">
          <Avatar src={userInfo.avatar} size={120}/>
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

        <div className="al-p-tb-20px">
          <Button type="link">修改头像</Button>
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
                       userInfo.nickname = e.target.value;
                       setUserInfo(userInfo)
                     }}/>
            </ALLabelBox>

            <ALLabelBox label={"手机"}>
              <Input defaultValue={userInfo.phone}
                     onChange={(e) => {
                       userInfo.phone = e.target.value;
                       setUserInfo(userInfo)
                     }}/>
            </ALLabelBox>
          </ALFlexBox>

          <ALFlexBox lineHeight={4} flexNum={1} centerH column>
            <ALLabelBox label={"性别"}>
              <div>
                <Radio.Group value={userInfo.gender}
                             onChange={(e) => {
                               userInfo.gender = e.target.value;
                               setUserInfo(userInfo)
                             }}>
                  <Radio value={"1"}>男</Radio>
                  <Radio value={"0"}>女</Radio>
                  <Radio value={null}>保密</Radio>
                </Radio.Group>
              </div>
            </ALLabelBox>

            <ALLabelBox label={"年龄"}>
              <Input defaultValue={userInfo.age}
                     onChange={(e) => {
                       userInfo.age = e.target.value;
                       setUserInfo(userInfo)
                     }}/>
            </ALLabelBox>

            <ALLabelBox label={"邮箱"}>
              <Input defaultValue={userInfo.email}
                     onChange={(e) => {
                       userInfo.email = e.target.value;
                       setUserInfo(userInfo)
                     }}/>
            </ALLabelBox>
          </ALFlexBox>
        </ALFlexBox>

        <div className="al-m-bottom-20px">
          <ALLabelBox label={"个性签名"}>
            <Input.TextArea rows={5}/>
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
