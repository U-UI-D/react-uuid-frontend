import React from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import {LOGIN} from "../../../../util/router/config/RouterConst";
import {getCookieByName} from "../../../../util/cookieUtil";
import {request} from "../../../../util/network/NetworkRequest";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import ALPlaceBox from "../../../../components/al-place-box/ALPlaceBox";
import ALTitleBox from "../../../../components/al-title-box/ALTitleBox";
import {Select, Card, Input, Upload, message, Button} from "antd";
import {UploadOutlined} from '@ant-design/icons';


class WorkPublishPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      workData: null,
      currentTitle: "上传作品"
    }
  }

  componentDidMount() {
    //验证是否已单点登录
    // let token = getCookieByName("sso_token");
    // if (!token){
    //   this.goPage(LOGIN, {fromPath: '/work/publish'});
    //   return;
    // }
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
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

    const upload = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
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
                lineHeight: 4 + 'em'
              }}>
          <div>
            <Input style={{borderRadius: 5 + 'px'}}
                   size="large"
                   placeholder="请输入作品名称"
                   allowClear
                   suffix={
                     <span>
                       50
                     </span>
                   }
            />
          </div>
          <div>
            <span>选择类型</span>
            <Select defaultValue="lucy"
                    style={{width: 120}}
                    onChange={this.handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>

          <div>
            <Input.TextArea style={{borderRadius: 5 + 'px'}}
                            autoSize={{ minRows: 3}}
                            size="large"
                            placeholder="作品说明"
                            suffix={
                              <span>
                               50
                             </span>
                            }/>
          </div>
        </Card>

        <Card title="上传图片" bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <div>
            <Upload {...upload}>
              <ALFlexBox centerVH width={100} height={100} className="al-cursor-pointer al-show-border-blue">
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
          <div>
            <div>
              <Input style={{borderRadius: 5 + 'px'}} size="large" placeholder="请输入标签名称"/>
            </div>
          </div>
        </Card>

        <Card title="上传封面" bordered={false}
              style={{
                width: 100 + '%',
                lineHeight: 4 + 'em'
              }}>
          <div>
            <Upload {...upload}>
              <ALFlexBox centerVH width={100} height={100} className="al-cursor-pointer al-show-border-blue">
                <div>选择图片上传</div>
              </ALFlexBox>
            </Upload>
          </div>
        </Card>

        <ALFlexBox centerV between>
          <ALFlexBox centerV>
            <Button type="primary" style={{width: 100+'px'}} className="al-m-right-20px">发布</Button>
            <Button type="default" style={{width: 100+'px'}} className="al-m-right-20px">预览</Button>
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


}


export default WorkPublishPage;
