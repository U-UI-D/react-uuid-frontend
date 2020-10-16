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
import WorkPublishLeftLayout from "./component/layout/left/WorkPublishLeftLayout";
import WorkPublishRightLayout from "./component/layout/right/WorkPublishRightLayout";


class WorkPublishPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      workData: null,
      currentTitle: "上传作品",
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

  handleChangeForTitle = (val) => {
    console.log("WorkPublishLeftLayout", val);
    this.setState({
      currentTitle: val,
    })
  }



  render() {

    return (
      <div id="work-publish-page">
        <div className="content-width al-p-tb-20px">
          <ALFlexBox between>
            <WorkPublishLeftLayout onChange={this.handleChangeForTitle}/>
            <WorkPublishRightLayout title={this.state.currentTitle} />
          </ALFlexBox>
        </div>
      </div>
    );
  }

}


export default WorkPublishPage;
