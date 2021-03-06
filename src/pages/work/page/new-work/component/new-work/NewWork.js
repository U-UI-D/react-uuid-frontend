import React from "react";
import {Modal, Button, Card, Input, message, Select, Switch, Upload} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {ALFlexBox, ALPlaceBox, ALImage} from "@components/al-component";
import {HttpRequest} from "@util/network/request";
import {RouterConst} from "@util/router/config/RouterConst";
import {connect} from "react-redux";
import ALRichTextEditor from "@components/al-rich-text-editor";
import {ApiConst} from "@util/network/config/ApiConst";
import AppConfig from "@config/AppConfig";
import {WorkService} from "../../../../../../service/work/WorkService";

function View(props) {
  const {Option} = Select;
  const {
    workTypeList, projectUrl, previewVisible, previewImage, previewTitle,
    title, titleTip, posterTip, imageTip, typeTip, tag, tagList, poster, uploadImages, uploadPoster, uploadFile
  } = props;
  const {
    handlePreview, handleCancelPreview, handleChangeInputForTitle,
    handleChangeSelect, handleChangeInputForDesc,
    handleChangeInputForTag, handlePressEnterForTag, handleRemoveTag,
    handleSwitchChangeForRealization, handleSwitchChangeForCommercial,
    handleChangeInputForProjectUrl, sendRequest
  } = props;

  return (
    <div className="new-work">

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancelPreview}>
        <img alt="example" style={{width: '100%'}} src={previewImage}/>
      </Modal>

      <ALFlexBox column className="al-bg-color-white">

        {/*作品信息*/}
        <Card title={
          <h3>作品信息</h3>
        } bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 5 + 'em'
              }}>

          {/*标题*/}
          <div className="">
            <ALFlexBox centerV between lineHeight={0}>
              <ALFlexBox centerV flexNum={1}>
                <div className="dot-red"/>
                <div className="al-flex-item-grow-1">
                  <Input style={{borderRadius: 5 + 'px'}}
                         size="large"
                         placeholder="请输入作品名称"
                         maxLength={50}
                         allowClear
                         onChange={handleChangeInputForTitle}
                         suffix={
                           <span>
                             {title.length >= 50 ? 0 : (50 - title.length)}
                           </span>
                         }
                  />
                </div>
              </ALFlexBox>
              {/*必填项*/}
              <ALPlaceBox width={150} style={{color: "orangered"}} className="al-text-right">
                {titleTip ? "必填项" : ""}
              </ALPlaceBox>
            </ALFlexBox>
          </div>

          {/*选择类型*/}
          <ALFlexBox between>
            <div>
              <div className="dot-red"/>
              <span className="al-m-right-20px">选择类型</span>
              <Select placeholder="请选择"
                      style={{width: 120}}
                      onChange={handleChangeSelect}>
                {
                  workTypeList.map((item, index) => {
                    return (
                      <Option key={index} value={item.id}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </div>

            <div style={{color: "orangered"}}>
              {typeTip ? "必填项" : ""}
            </div>
          </ALFlexBox>

          {/*描述*/}
          <ALFlexBox>
            <div><ALPlaceBox width={28}/></div>
            <div className="al-flex-item-grow-1">
              <p>描述</p>
              <ALRichTextEditor style={{
                border: '1px solid rgba(235,235,235,.8)'
              }} onChange={handleChangeInputForDesc}/>
            </div>
            <div><ALPlaceBox width={150}/></div>
          </ALFlexBox>
        </Card>

        {/*上传图片*/}
        <Card title={
          <ALFlexBox between>
            <div>上传图片</div>
            <div style={{color: "orangered"}}>
              {imageTip ? "必填项" : ""}
            </div>
          </ALFlexBox>
        } bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <ALFlexBox wrap={false}>
            <ALPlaceBox width={20}>
              <div className="dot-red" style={{marginTop: "15px"}}></div>
            </ALPlaceBox>
            <div>
              <Upload {...uploadImages} multiple
                      className="avatar-uploader"
                      listType="picture-card"
                      onPreview={handlePreview}>
                <ALFlexBox centerVH>
                  <div>选择图片上传</div>
                </ALFlexBox>
              </Upload>
            </div>
          </ALFlexBox>
        </Card>

        {/*添加标签*/}
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
                       allowClear
                       maxLength={10}
                       value={tag}
                       onChange={handleChangeInputForTag}
                       onPressEnter={handlePressEnterForTag}
                       suffix={
                         <span>
                           {tag.length >= 10 ? 0 : (10 - tag.length)}
                         </span>
                       }/>
              </div>
              <ALPlaceBox width={150}>
                <div className="al-m-left-20px">
                  贴标签({5 - tagList.length})
                </div>
              </ALPlaceBox>
            </ALFlexBox>

            <div>
              {
                tagList && tagList.map((item, index) => {
                  return (
                    <span key={index}
                          className="al-p-10px al-m-right-10px al-bg-color-light-white"
                          style={{radius: "5px"}}>
                      {item}
                      <span className="al-m-left-10px al-cursor-pointer" onClick={handleRemoveTag(index)}>
                        <CloseOutlined style={{fontSize: "0.7em"}}/>
                      </span>
                    </span>
                  )
                })
              }
            </div>
          </div>
        </Card>

        {/*上传封面*/}
        <Card title={
          <ALFlexBox between>
            <div>上传封面</div>
            <div style={{color: "orangered"}}>
              {posterTip ? "必填项" : ""}
            </div>
          </ALFlexBox>
        } bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <ALFlexBox>
            <div className="dot-red" style={{marginTop: "15px"}}></div>

            <ALFlexBox>
              <Upload {...uploadPoster} className="avatar-uploader"
                      listType="picture-card"
                      onPreview={handlePreview}
                      showUploadList={false}>
                <ALFlexBox centerVH className="al-cursor-pointer">
                  {
                    poster === "" ?
                      <div>选择图片上传</div> :
                      <ALImage width={240} height={160} src={poster}/>
                  }
                </ALFlexBox>
              </Upload>
            </ALFlexBox>
          </ALFlexBox>
        </Card>

        {/*更多设置*/}
        <Card title="更多设置" bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <div style={{marginLeft: '28px'}}>
            <ALFlexBox centerV>
              <span className="al-m-right-20px">征集实现</span>
              <Switch checkedChildren="是" unCheckedChildren="否"
                      onChange={handleSwitchChangeForRealization}/>
            </ALFlexBox>
            <ALFlexBox centerV>
              <span className="al-m-right-20px">可商业化</span>
              <Switch checkedChildren="是" unCheckedChildren="否"
                      onChange={handleSwitchChangeForCommercial}/>
            </ALFlexBox>
            <ALFlexBox centerV>
              <span className="al-m-right-20px">项目链接</span>
              <div className="al-flex-item-grow-1">
                <div style={{width: 400 + 'px'}}>
                  <Input value={projectUrl}
                         onChange={handleChangeInputForProjectUrl}/>
                </div>
              </div>
            </ALFlexBox>
            <div>
              <span>上传附件</span>
              <Upload {...uploadFile}>
                <Button type="link">选择文件上传</Button>
              </Upload>
            </div>
          </div>
        </Card>

        {/*按钮*/}
        <div>
          <Button type="primary" style={{width: 100 + 'px'}}
                  className="al-m-right-20px"
                  onClick={sendRequest}>发布</Button>
        </div>
      </ALFlexBox>
    </div>
  );
}

class NewWork extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      workData: null,
      currentTitle: "上传作品",
      //sendData
      title: "",
      type: "",
      typeId: 1,
      desc: "",
      imageIds: [],
      poster: "",
      tag: "",
      tagList: [],
      raiseRealization: 0,
      commercialAvailable: 0,
      fileUrl: '',
      projectUrl: '',

      workTypeList: [],

      // tip
      titleTip: false,
      posterTip: false,
      imageTip: false,
      typeTip: false,

      // flag
      clearTag: false,

      previewVisible: false,
      previewImage: '',
      previewTitle: '',

    }
  }

  componentDidMount() {
    this.getWorkType();
  }

  render() {
    let that = this;
    let imageIds = [];
    let devMode = this.props.appRunMode === 'dev';
    const {host, port, prefix} = AppConfig.backend[devMode ? 'dev' : 'prod'];
    let backEndBaseUrl = `http://${host}:${port}/${prefix}/`;

    const uploadImages = {
      name: 'file',
      action: backEndBaseUrl + ApiConst.upload.UPLOAD_RETURN_ID,
      data: {
        userId: that.props.userInfo.id
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);

        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          info.fileList.map((item, index) => {
            imageIds.push(item.response);
          })
          that.setState({
            imageIds: imageIds,
            imageTip: !(that.state.imageIds.length > 0)
          })
          console.log("imageIds", that.state.imageIds)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    const uploadPoster = {
      name: 'file',
      action: backEndBaseUrl + ApiConst.upload.UPLOAD_RETURN_URL,
      data: {
        userId: that.props.userInfo.id
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          that.setState({
            poster: info.file.response
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          console.log("poster", that.state.poster)
          that.setState({
            posterTip: that.state.poster === "",
          })
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    const uploadFile = {
      name: 'file',
      action: backEndBaseUrl + ApiConst.upload.UPLOAD_RETURN_URL,
      data: {
        userId: that.props.userInfo.id
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
          that.setState({
            fileUrl: info.file.response
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };

    return (
      <View {...this.state} {...this.props}
            uploadImages={uploadImages}
            uploadPoster={uploadPoster}
            uploadFile={uploadFile}
            handleChangeInputForTitle={this.handleChangeInputForTitle}
            handleChangeInputForDesc={this.handleChangeInputForDesc}
            handleChangeSelect={this.handleChangeSelect}
            handleChangeInputForTag={this.handleChangeInputForTag}
            handlePressEnterForTag={() => this.handlePressEnterForTag()}
            handlePreview={this.handlePreview}
            handleCancelPreview={this.handleCancelPreview}
            handleRemoveTag={this.handleRemoveTag}
            handleSwitchChangeForRealization={this.handleSwitchChangeForRealization}
            handleSwitchChangeForCommercial={this.handleSwitchChangeForCommercial}
            handleChangeInputForProjectUrl={this.handleChangeInputForProjectUrl}
            sendRequest={this.sendRequest}
      />
    )
  }


  handleChangeInputForTitle = (e) => {
    if (e.target.value.length <= 50) {
      this.setState({
        title: e.target.value
      })
    }
    this.setState({
      titleTip: e.target.value.length <= 0 ? true : false
    })
  }

  handleChangeInputForDesc = (value) => {
    console.log("handleChangeInputForDesc", value);
    this.setState({
      desc: value
    });
  }

  handleChangeSelect = (value) => {
    console.log("handleChangeSelect", value);
    this.setState({
      typeId: value
    });
  }

  handleChangeInputForTag = (e) => {
    if (e.target.value.length <= 50) {
      this.setState({
        tag: e.target.value
      })
    }
  }

  handlePressEnterForTag = () => {
    console.warn("test-> 按下回车键", this.state.tagList);
    // debugger;
    let {tagList} = this.state;
    if (this.state.tag !== "" && this.state.tagList.length < 5) {
      if (this.state.tagList.indexOf(this.state.tag) >= 0) {
        message.warning("标签已存在");
        return;
      }
      tagList.push(this.state.tag);
    }
    this.setState({
      tagList: tagList,
      tag: "",
    });

    console.log("test-> tagList", this.state.tagList);
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleCancelPreview = () => this.setState({previewVisible: false});

  handleRemoveTag = (index) => {
    let temp = this.state.tagList;
    temp.splice(index, 1);
    this.setState({
      tagList: temp
    })
  }

  handleSwitchChangeForRealization = (val) => {
    this.setState({
      raiseRealization: val ? 1 : 0
    })
  }

  handleSwitchChangeForCommercial = (val) => {
    this.setState({
      commercialAvailable: val ? 1 : 0
    })
  }

  handleChangeInputForProjectUrl = (e) => {
    this.setState({
      projectUrl: e.target.value
    })
  }

  sendRequest = () => {
    this.setState({
      titleTip: this.state.title === "",
      posterTip: this.state.poster === "",
      typeTip: this.state.type === "",
      imageTip: !(this.state.imageIds.length > 0)
    });

    let sendData = {
      title: this.state.title,
      description: this.state.desc,
      imageId: this.state.imageIds.join(";"),
      poster: this.state.poster,
      tagId: this.state.tagList.join(";"),
      typeId: this.state.typeId,
      userId: this.props.userInfo.id,
      raiseRealization: this.state.raiseRealization,
      commercialAvailable: this.state.commercialAvailable,
      fileUrl: this.state.fileUrl,
      projectUrl: this.state.projectUrl,
    }
    console.log("sendData", sendData);

    if (this.state.title === "" || this.state.poster === "" || !this.state.typeId || !(this.state.imageIds.length > 0)) {
      message.warning("请填写相关信息");
      return;
    }

    WorkService.addUIWorkData(sendData).then(res => {
      message.success("发布成功");
      setTimeout(() => {
        this.props.history.push({pathname: RouterConst.work.WORK_PAGE});
      }, 500);
    }).catch(err => {
      console.error(err);
      message.error("发布失败");
    })
  }

  // 获取作品类型
  getWorkType = () => {
    WorkService.getWorkTypeList().then(res => {
      this.setState({
        workTypeList: res
      })
    })
  }


}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
    appRunMode: state.appRunMode
  }
};
export default connect(mapStateToProps)(NewWork);
