import React from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import {LOGIN} from "../../../../util/router/config/RouterConst";
import {getCookieByName} from "../../../../util/cookieUtil";
import {request} from "../../../../util/network/NetworkRequest";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import ALPlaceBox from "../../../../components/al-place-box/ALPlaceBox";
import ALTitleBox from "../../../../components/al-title-box/ALTitleBox";
import {Select, Card, Input, Upload, message, Button} from "antd";
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import "./style.css";
import ALInput from "../../../../components/al-input/ALInput";
import {commonRequest} from "../../../../util/network/RequestHub";
import {POST_WORK_ADD} from "../../../../util/network/config/ApiConst";


class WorkPublishPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      workData: null,
      currentTitle: "上传作品",
      //sendData
      title: "",
      description: "",
      imageIds: [],
      poster: "",

    }
  }

  componentDidMount() {
    //验证是否已单点登录
    let token = getCookieByName("sso_token");
    if (!token){
      this.goPage(LOGIN, {fromPath: '/work/publish'});
      return;
    }
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  handleChangeInputForTitle = (value) => {
    console.log("handleChangeInputForTitle", value);
    this.setState({
      title: value
    });
  }

  handleChangeInputForDesc = (value) => {
    console.log("handleChangeInputForDesc", value);
    this.setState({
      description: value
    });
  }

  handleChangeSelect = (value) =>{
    console.log("handleChangeSelect", value);
    this.setState({
      type: value
    });
  }


  render() {
    const leftLayout = (
      <ALFlexBox width={200}
                 height={200}
                 className="al-bg-color-white">
        <ALFlexBox column flexNum={1}>
          <div className="hover-bg-color-primary al-m-bottom-10px"
               onClick={() => {
                 this.setState({
                   currentTitle: "上传作品"
                 })
               }}>
            <ALTitleBox hNum={3}
                        isBeauty={this.state.currentTitle === "上传作品"}
                        text={"上传作品"}
                        className="hover-bg-color-primary al-cursor-pointer"
            />
          </div>


          <div className="al-cursor-pointer"
               onClick={() => {
                 console.log("点击了 上传素材")
                 this.setState({
                   currentTitle: "上传素材"
                 })
               }}>
            <ALTitleBox hNum={3}
                        text={"上传素材"}
                        isBeauty={this.state.currentTitle === "上传素材"}
                        className="hover-bg-color-primary"
            />

          </div>

        </ALFlexBox>
      </ALFlexBox>
    )

    const {Option} = Select;

    let that = this;
    let imageIds = [];
    const uploadImages = {
      name: 'file',
      action: 'http://localhost:9000/upload/return-id',
      data: {
        userId: 1
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          info.fileList.map((item, index) => {
            imageIds.push(item.response);
          })
          that.setState({
            imageIds: imageIds
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          console.log("imageIds", that.state.imageIds)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const uploadPoster = {
      name: 'file',
      action: 'http://localhost:9000/upload/return-url',
      data: {
        userId: 1
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          that.setState({
            poster: info.file.response
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          console.log("poster", that.state.poster)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const rightLayout = (
      <ALFlexBox width={960} padding={30} column
                 className="al-bg-color-white">
        <Card title="作品信息" bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 5 + 'em'
              }}>

          {/*标题*/}
          <div className="">
            <ALInput required onChange={this.handleChangeInputForTitle}/>
          </div>
          <div>
            <div className="dot-red" />
            <span className="al-m-right-20px">选择类型</span>
            <Select defaultValue="work"
                    style={{width: 120}}
                    onChange={this.handleChangeSelect}>
              <Option value="work">作品</Option>
              <Option value="icon">icon</Option>
              <Option value="image">图片</Option>
            </Select>
          </div>

          <div>
            {/*描述*/}
            <ALInput type={"textarea"} onChange={this.handleChangeInputForDesc}/>
          </div>
        </Card>

        <Card title="上传图片" bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <div className="al-cursor-pointer" style={{marginLeft: '28px'}}>
            <Upload {...uploadImages} multiple className="avatar-uploader" listType="picture-card">
              <ALFlexBox centerVH >
                <div>选择图片上传</div>
              </ALFlexBox>
            </Upload>
          </div>
        </Card>

        <Card title="添加标签" bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <div style={{marginLeft: '28px'}}>
            <ALFlexBox>
              <div className="al-flex-item-grow-1">
                <Input style={{borderRadius: 5 + 'px'}}
                       size="large"
                       placeholder="请输入标签名称"
                       suffix={
                         <span>
                         50
                       </span>
                       }/>
              </div>
              <ALPlaceBox width={150} />
            </ALFlexBox>
          </div>
        </Card>

        <Card title="上传封面" bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <div style={{marginLeft: '28px'}}>
            <Upload {...uploadPoster} className="avatar-uploader" listType="picture-card">
              <ALFlexBox centerVH className="al-cursor-pointer">
                <div>选择图片上传</div>
              </ALFlexBox>
            </Upload>
          </div>
        </Card>

        <ALFlexBox centerV between>
          <ALFlexBox centerV>
            <Button type="primary" style={{width: 100 + 'px'}} className="al-m-right-20px" onClick={this.sendRequest}>发布</Button>
            <Button type="default" style={{width: 100 + 'px'}} className="al-m-right-20px">预览</Button>
          </ALFlexBox>
          <div>草稿箱</div>
        </ALFlexBox>
      </ALFlexBox>
    )

    return (
      <div>
        <div className="al-bg-color-white">
          <ALHeader/>
        </div>
        <div className="content-width al-p-tb-20px">
          <ALFlexBox between>
            {leftLayout}
            {rightLayout}
          </ALFlexBox>
        </div>
      </div>
    );
  }

  sendRequest = () => {
    let sendData = {
      title: this.state.title,
      description: this.state.description,
      imageId: this.state.imageIds.join(";"),
      poster: this.state.poster,
      userId: 1,
      createdTime: Date(),
      updatedTime: Date(),
    }
    console.log("sendData", sendData);

    commonRequest({
      url: POST_WORK_ADD,
      method: "post",
      data: sendData
    }).then(res => {
      if (res.err === null){
        message.success("发布成功");
      }else {
        console.log(res.err);
        message.error("发布失败");
      }
    })
  }


}


export default WorkPublishPage;
