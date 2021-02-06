import React from "react";
import {Modal, Button, Card, Input, message, Select, Switch, Upload} from "antd";
import {getUserInfoFromLocalStorage} from "../../../../../../util/util";
import {CloseOutlined} from "@ant-design/icons";
import {ALFlexBox, ALPlaceBox, ALImage} from "../../../../../../components/al-component";
import {HttpRequest} from "../../../../../../util/network/request";
import {RouterConst} from "../../../../../../util/router/config/RouterConst";
import {connect} from "react-redux";


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
      projectUrl: undefined,

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
    const {Option} = Select;

    const {workTypeList, projectUrl} = this.state;

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

    return (
      <div>

        <Modal
          visible={this.state.previewVisible}
          title={this.state.previewTitle}
          footer={null}
          onCancel={this.handleCancelPreview}
        >
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
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
              {/*<ALInput required onChange={this.handleChangeInputForTitle}/>*/}
              <ALFlexBox centerV between lineHeight={0}>
                <ALFlexBox centerV flexNum={1}>
                  <div className="dot-red"/>
                  <div className="al-flex-item-grow-1">
                    <Input style={{borderRadius: 5 + 'px'}}
                           size="large"
                           placeholder="请输入作品名称"
                           maxLength={50}
                           allowClear
                           onChange={this.handleChangeInputForTitle}
                           suffix={
                             <span>
                               {
                                 this.state.title.length >= 50 ? 0 : (50 - this.state.title.length)
                               }
                             </span>
                           }
                    />
                  </div>
                </ALFlexBox>
                <ALPlaceBox width={150} style={{color: "orangered"}} className="al-text-right">
                  {/*必填项*/}
                  {
                    this.state.titleTip ? "必填项" : ""
                  }
                </ALPlaceBox>
              </ALFlexBox>

            </div>
            <ALFlexBox between>

              <div>
                <div className="dot-red"/>
                <span className="al-m-right-20px">选择类型</span>
                <Select placeholder="请选择"
                        style={{width: 120}}
                        onChange={this.handleChangeSelect}>
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
                {
                  this.state.typeTip ? "必填项" : ""
                }
              </div>
            </ALFlexBox>

            <ALFlexBox>
              {/*描述*/}
              <div><ALPlaceBox width={28}/></div>
              <div className="al-flex-item-grow-1">
                <Input.TextArea placeholder={"请输入作品说明"}
                                style={{borderRadius: 5 + 'px'}}
                                autoSize={{minRows: 3}}
                                size="large"
                                onChange={this.handleChangeInputForDesc}/>
              </div>
              <div><ALPlaceBox width={150}/></div>
            </ALFlexBox>
          </Card>

          {/*上传图片*/}
          <Card title={
            <ALFlexBox between>
              <div>上传图片</div>
              <div style={{color: "orangered"}}>
                {
                  this.state.imageTip ? "必填项" : ""
                }
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
                        onPreview={this.handlePreview}>
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
                         value={this.state.tag}
                         onChange={this.handleChangeInputForTag}
                         onPressEnter={this.handlePressEnterForTag}
                         suffix={
                           <span>
                               {
                                 this.state.tag.length >= 10 ? 0 : (10 - this.state.tag.length)
                               }
                             </span>
                         }/>
                </div>
                <ALPlaceBox width={150}>
                  <div className="al-m-left-20px">
                    贴标签({5 - this.state.tagList.length})
                  </div>
                </ALPlaceBox>
              </ALFlexBox>

              <div>
                {
                  this.createTagList()
                }
              </div>
            </div>
          </Card>

          {/*上传封面*/}
          <Card title={
            <ALFlexBox between>
              <div>上传封面</div>
              <div style={{color: "orangered"}}>
                {
                  this.state.posterTip ? "必填项" : ""
                }
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
                        onPreview={this.handlePreview}
                        showUploadList={false}>
                  <ALFlexBox centerVH className="al-cursor-pointer">
                    {
                      this.state.poster === "" ?
                        <div>选择图片上传</div> :
                        <ALImage width={240} height={160} src={this.state.poster}/>
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
                        onChange={(val) => {
                          this.setState({
                            raiseRealization: val ? 1 : 0
                          })
                        }}/>
              </ALFlexBox>
              <ALFlexBox centerV>
                <span className="al-m-right-20px">可商业化</span>
                <Switch checkedChildren="是" unCheckedChildren="否"
                        onChange={(val) => {
                          this.setState({
                            commercialAvailable: val ? 1 : 0
                          })
                        }}/>
              </ALFlexBox>
              <ALFlexBox centerV>
                <span className="al-m-right-20px">项目链接</span>
                <div className="al-flex-item-grow-1">
                  <div style={{width: 400+'px'}}>
                    <Input value={projectUrl}
                           onChange={e => {this.setState({projectUrl: e.target.value})}} />
                  </div>
                </div>
              </ALFlexBox>
              <div>
                <span>上传附件</span>
                <Upload>
                  <Button type="link">选择文件上传</Button>
                </Upload>
              </div>
            </div>
          </Card>

          {/*按钮*/}
          <div>
            <Button type="primary" style={{width: 100 + 'px'}}
                    className="al-m-right-20px"
                    onClick={this.sendRequest}>发布</Button>
          </div>
        </ALFlexBox>
      </div>
    );
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

  handleChangeInputForDesc = (e) => {
    console.log("handleChangeInputForDesc", e.target.value);
    this.setState({
      desc: e.target.value
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
    let {tagList} = this.state;
    if (this.state.tag !== "" && this.state.tagList.length < 5){
      if (this.state.tagList.indexOf(this.state.tag) >= 0){
        message.warning("标签已存在");
        return;
      }
      tagList.push(this.state.tag);
    }
    this.setState({
      tagList: tagList,
      tag: "",
    });

    console.log("tagList", this.state.tagList);
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

  handleCancelPreview = () => this.setState({ previewVisible: false });

  createTagList = () => {
    return (
      <div>
        {
          this.state.tagList.map((item, index) => {
            return (
              <span key={index}
                    className="al-p-10px al-m-right-10px al-bg-color-light-white"
                    style={{radius: "5px"}}>
                {item}
                <span className="al-m-left-10px al-cursor-pointer"
                      onClick={() => {
                        let temp = this.state.tagList;
                        temp.splice(index, 1);
                        this.setState({
                          tagList: temp
                        })
                      }}>
                  <CloseOutlined style={{fontSize: "0.7em"}} />
                </span>
              </span>
            )
          })
        }
      </div>
    )
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
      projectUrl: this.state.projectUrl,
    }
    console.log("sendData", sendData);

    if (this.state.title === "" || this.state.poster === "" || this.state.type === "" || !(this.state.imageIds.length > 0)){
      message.warning("请填写相关信息");
      return ;
    }




/*    HttpRequest.post({
      url: "http://localhost:9002/work/ui",
      data: sendData
    }).then(res => {
      if (res.err === null){
        message.success("发布成功");
        setTimeout(() => {
          this.props.history.push({pathname: RouterConst.work.WORK_PAGE});
        }, 500);
      }else {
        console.log(res.err);
        message.error("发布失败");
      }
    })*/
  }

  // 获取作品类型
  getWorkType = () => {
    HttpRequest.get({
      url: "http://localhost:9002/work/type"
    }).then(res => {
      if (res.err === null){
        this.setState({
          workTypeList: res.data.data
        })
      }
    })
  }


}
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
};
export default connect(mapStateToProps)(NewWork);
