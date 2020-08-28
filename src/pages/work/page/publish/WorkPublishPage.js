import React from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import {LOGIN} from "../../../../util/router/config/RouterConst";
import {getCookieByName} from "../../../../util/cookieUtil";
import {request} from "../../../../util/network/NetworkRequest";


class WorkPublishPage extends React.Component{
  constructor(props) {
    super();
    this.state = {
      workData: null,
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

  render() {
    return (
      <div style={{backgroundColor: "#eff3f5"}}>
        <div className="al-bg-color-white">
          <ALHeader />
        </div>
        <div className="content-width al-m-top-20px" >
          <div className="al-flex-container-center-v">
            <h1>上传列表</h1>
            <div className="al-flex-container-center-v">
              <div>上传作品</div>
              <div>上传素材</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}



export default WorkPublishPage;
