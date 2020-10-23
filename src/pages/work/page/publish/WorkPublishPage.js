import React from "react";
import {PATH_LOGIN} from "../../../../util/router/config/RouterConst";
import {getCookieByName} from "../../../../util/cookieUtil";
import "./style.css";
import WorkPublishLeftLayout from "./component/layout/left/WorkPublishLeftLayout";
import WorkPublishRightLayout from "./component/layout/right/WorkPublishRightLayout";
import {ALFlexBox} from "../../../../components/al-component";


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
      this.goPage(PATH_LOGIN, {fromPath: '/work/publish'});
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
