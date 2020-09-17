import React from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import {LOGIN} from "../../../../util/router/config/RouterConst";
import {getCookieByName} from "../../../../util/cookieUtil";
import {request} from "../../../../util/network/NetworkRequest";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import ALPlaceBox from "../../../../components/al-place-box/ALPlaceBox";
import ALTitleBox from "../../../../components/al-title-box/ALTitleBox";
import {Select, Card, Input} from "antd";


class WorkPublishPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      workData: null,
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
                   className="al-bg-color-white">
          <ALFlexBox column flexNum={1}>
            <ALTitleBox hNum={2} isBeauty text={"上传作品"} className="al-m-tb-10px"/>
            <ALTitleBox hNum={2} text={"上传素材"}/>
          </ALFlexBox>
        </ALFlexBox>
    )

    const {Option} = Select;

    const rightLayout = (
        <ALFlexBox width={960} padding={30} column
                   className="al-bg-color-white">
          <Card title="作品信息" bordered={false}
                style={{
                  width: 100 + '%',
                  lineHeight: 4 + 'em'
                }}>
            <div>
              <Input placeholder="请输入作品名称"/>
            </div>
            <div>
              <Select defaultValue="lucy" style={{width: 120}} onChange={this.handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>

            <div>
              <Input placeholder="作品说明"/>
            </div>
          </Card>
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
