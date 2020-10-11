import React from "react";
import {Button, Card, Input, message, Select, Switch, Upload} from "antd";
import ALFlexBox from "../../../../../../components/al-flex-box/ALFlexBox";
import ALPlaceBox from "../../../../../../components/al-place-box/ALPlaceBox";
import ALInput from "../../../../../../components/al-input/ALInput";
import ALImage from "../../../../../../components/al-image/ALImage";
import {getUserInfoFromLocalStorage} from "../../../../../../util/util";
import {commonRequest} from "../../../../../../util/network/RequestHub";
import {POST_WORK_ADD} from "../../../../../../util/network/config/ApiConst";
import {CloseOutlined} from "@ant-design/icons";

class PublishMaterial extends React.Component {

  constructor(props) {
    super();
    this.state = {
      workData: null,
      currentTitle: "上传素材",
      //sendData
      title: "",
      type: "",
      description: "",
      imageIds: [],
      poster: "",
      tag: "",
      tagList: [],
      raiseRealization: 0,
      commercialAvailable: 0,

      // tip
      titleTip: false,
      posterTip: false,
      imageTip: false,
      typeTip: false,

      // flag
      clearTag: false

    }
  }

  render() {
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
            imageIds: imageIds,
            imageTip: !(that.state.imageIds.length > 0)
          })
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
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
        <ALFlexBox column className="al-bg-color-white">

          {/*素材信息*/}
          <Card title={
            <h3>素材信息</h3>
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
                           placeholder="请输入素材名称"
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
                  <Option value="icon">icon</Option>
                  <Option value="poster">海报</Option>
                  <Option value="illustration">插画</Option>
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
                <Input.TextArea placeholder={"请输入素材说明"}
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
                <Upload {...uploadImages} multiple className="avatar-uploader" listType="picture-card">
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
                <span className="al-m-right-20px">可商业化</span>
                <Switch checkedChildren="是" unCheckedChildren="否"
                        onChange={(val) => {
                          this.setState({
                            commercialAvailable: val ? 1 : 0
                          })
                        }}/>
              </ALFlexBox>
              <div>
                <span className="al-m-right-20px">上传附件</span>
                <Upload>
                  <Button type="link">选择文件上传</Button>
                </Upload>
              </div>
            </div>
          </Card>

          {/*按钮*/}
          <ALFlexBox centerV between>
            <ALFlexBox centerV>
              <Button type="primary" style={{width: 100 + 'px'}} className="al-m-right-20px"
                      onClick={this.sendRequest}>发布</Button>
              <Button type="default" style={{width: 100 + 'px'}} className="al-m-right-20px">预览</Button>
            </ALFlexBox>
            <div>草稿箱</div>
          </ALFlexBox>
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

  handleChangeInputForDesc = (value) => {
    console.log("handleChangeInputForDesc", value);
    this.setState({
      description: value
    });
  }

  handleChangeSelect = (value) => {
    console.log("handleChangeSelect", value);
    this.setState({
      type: value
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
    })

    let sendData = {
      title: this.state.title,
      description: this.state.description,
      imageId: this.state.imageIds.join(";"),
      poster: this.state.poster,
      tagList: this.state.tagList.join(";"),
      userId: getUserInfoFromLocalStorage().id,
      raiseRealization: this.state.raiseRealization,
      commercialAvailable: this.state.commercialAvailable,
      createdTime: Date(),
      updatedTime: Date(),
    }
    console.log("sendData", sendData);

    // commonRequest({
    //   url: POST_WORK_ADD,
    //   method: "post",
    //   data: sendData
    // }).then(res => {
    //   if (res.err === null){
    //     message.success("发布成功");
    //   }else {
    //     console.log(res.err);
    //     message.error("发布失败");
    //   }
    // })
  }


}

export default PublishMaterial;
