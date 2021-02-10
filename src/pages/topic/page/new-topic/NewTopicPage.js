import React from "react";
import {Button, Card, Input, message, Select, Upload} from "antd";
import {ALFlexBox, ALPlaceBox} from "../../../../components/al-component";
import {connect} from "react-redux";
import {HttpRequest} from "../../../../util/network/request";
import {RouterConst} from "../../../../util/router/config/RouterConst";

class NewTopicPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      imageIds: [],
      title: "",
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      content: "",
      imageId: "",
      topicTagId: undefined,
      boardTagId: undefined,
      workId: undefined,
      workType: undefined,
      isSubmitting: false,
      selectTopic: "",
      selectBoard: "",
    }
  }

  //渲染函数
  render() {

    const {Option} = Select;
    let that = this;
    const imageIds = [];
    const uploadImages = {
      name: 'file',
      action: 'http://localhost:9000/upload/return-id',
      data: {
        userId: this.props.userInfo.id
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
            imageIds: imageIds
          })
          console.log("imageIds", that.state.imageIds)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    const {content, isSubmitting, workId} = this.state;

    return(
      <div className="content-width al-p-tb-20px">
        {/*作品信息*/}
        <Card title={
          <h3>发表话题</h3>
        } bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 5 + 'em'
              }}>

          <ALFlexBox>
            {/*描述*/}
            <div className="al-flex-item-grow-1">
              <Input.TextArea placeholder={"请输入你的想法"}
                              style={{borderRadius: 5 + 'px'}}
                              autoSize={{minRows: 6}}
                              size="large"
                              value={content}
                              onChange={e => {this.setState({content: e.target.value})}}/>
            </div>
            <div><ALPlaceBox width={150}/></div>
          </ALFlexBox>

          {/*上传图片*/}
          <ALFlexBox wrap={false} style={{marginTop: "30px"}}>
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

          {/*选择话题*/}
          <ALFlexBox >

            <div>
              <div>
                <span className="al-m-right-20px">选择话题</span>
                <Select placeholder="请选择"
                        style={{width: 120}}
                        onChange={value => {this.setState({selectTopic: value})}}>
                  <Option value="14">网站</Option>
                  <Option value="15">APP</Option>
                  <Option value="16">小程序</Option>
                </Select>
              </div>

              <div style={{color: "orangered"}}>
                {
                  this.state.typeTip ? "必填项" : ""
                }
              </div>
            </div>

            <div className="al-m-left-50px">
              <div>
                <span className="al-m-right-20px">选择圈子</span>
                <Select placeholder="请选择"
                        style={{width: 120}}
                        onChange={value => {this.setState({selectBoard: value})}}>
                  <Option value="11">设计</Option>
                  <Option value="12">UI</Option>
                  <Option value="13">开发</Option>
                </Select>
              </div>

              <div style={{color: "orangered"}}>
                {
                  this.state.typeTip ? "必填项" : ""
                }
              </div>
            </div>

            <ALFlexBox className="al-m-left-50px" centerV>
              <span className="al-m-right-20px">关联作品</span>
              <ALFlexBox>
                <Input.Group compact>
                  <Select placeholder="请选择" onChange={value => {this.setState({workType: value})}}>
                    <Option value="ui">UI</Option>
                    <Option value="software">软件</Option>
                  </Select>
                  <Input
                    style={{ width: '180px' }}
                    placeholder="请输入作品ID"
                    value={workId}
                    onChange={e => {this.setState({workId: e.target.value})}}
                  />
                </Input.Group>
              </ALFlexBox>

              <div style={{color: "orangered"}}>
                {
                  this.state.typeTip ? "必填项" : ""
                }
              </div>
            </ALFlexBox>
          </ALFlexBox>

          <Button type={"primary"}
                  shape={"round"}
                  loading={isSubmitting}
                  onClick={this.handleNewTopic}>发表</Button>

        </Card>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

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

  handleNewTopic = () => {
    const {content, imageIds, selectTopic, selectBoard, workId, workType} = this.state;
    if (!content){
      return ;
    }
    this.setState({
      isSubmitting: true
    })
    let postData = {
      userId: this.props.userInfo.id,
      content: content,
      imageId: imageIds.join(";").toString(),
      topicTagId: selectTopic,
      boardTagId: selectBoard,
      workId: workId,
      workType: workType,
    }

    console.log("postData", postData);

    HttpRequest.post({
      url: "http://localhost:9005/topic",
      data: postData
    }).then(res => {
      if (res.err === null){
        this.setState({
          isSubmitting: false
        });
        message.success("发表成功");
        setTimeout(() => {
          this.props.history.push({pathname: RouterConst.topic.TOPIC_PAGE});
        }, 500);
      }else {
        message.error("发表失败，请稍候重试！");
      }
    }).catch(err => {
      message.error("发表失败，请稍候重试！");
    })

  }

}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
};
export default connect(mapStateToProps)(NewTopicPage);
