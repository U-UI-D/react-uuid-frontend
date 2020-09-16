import React from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import {LOGIN} from "../../../../util/router/config/RouterConst";
import {getCookieByName} from "../../../../util/cookieUtil";
import {request} from "../../../../util/network/NetworkRequest";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import ALPlaceBox from "../../../../components/al-place-box/ALPlaceBox";
import ALTitleBox from "../../../../components/al-title-box/ALTitleBox";


class WorkPublishPage extends React.Component{
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

  render() {
    const leftLayout = (
        <ALFlexBox width={200}
                   className="al-bg-color-white" >
          <ALFlexBox column flexNum={1}>
            <ALTitleBox hNum={2} isBeauty text={"上传作品"} className="al-m-tb-10px" />
            <ALTitleBox hNum={2} text={"上传素材"} />
          </ALFlexBox>
        </ALFlexBox>
    )

    const rightLayout = (
        <ALFlexBox width={960} padding={30} column
                   className="al-bg-color-white">
          <h2 className="al-show-border">右边</h2>
          <h2>右边</h2>
        </ALFlexBox>
    )

    return (
      <div>
        <div className="al-bg-color-white">
          <ALHeader />
        </div>
        <div className="content-width al-p-tb-20px" >
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
