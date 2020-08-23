import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import "./style.css";
import {request} from "../../util/network/NetworkRequest";
import {Avatar, Button, Divider, message} from "antd";
import ContentLeft from "./component/layout/ContentLeft";
import ContentRight from "./component/layout/ContentRight";

class UserPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
    }
  }

  //渲染函数
  render() {
    return (
        <div style={{backgroundColor: "rgb(239, 243, 245)"}}>
          <div className="header-box header-bg">
            <ALHeader color="#fff"/>
            <div style={{
              width: 100 + '%',
              height: 350 + 'px'
            }}></div>
          </div>

          <div>
            <div className="content-width" style={{marginTop: -60 + 'px'}}>
              <div className="al-flex-container">
                {/*左边栏*/}
                <div className="content-box-left al-box-radius">
                  <ContentLeft {...this.props} userInfo={this.state.userInfo} />
                </div>

                <div className="content-box-right">
                  <ContentRight {...this.props} />
                </div>
              </div>
            </div>

            {/*底部*/}
            <div>
              <div className="content-width al-text-align-center al-opacity-2">
                <Avatar size={70} src={require("../../assets/icon/common/UUID2.png")}/>
                <p>Powered by © 2020-2020 UUID</p>
              </div>
              <div className="al-box-size-20px"></div>
            </div>

          </div>
        </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    this.getUserInfoById(this.props.match.params.id);
  }

  //组件卸载前调用
  componentWillUnmount() {
  }

  getUserInfoById =  (id) => {
    let result = request({
      url: 'http://localhost:9001/user/' + id,
      method: 'GET',
      data: {}
    }).then(res => {
      this.setState({
        userInfo: res.data.data
      })
    }).catch(err => {
      console.log(err);
      message.error("网络错误，请稍候再试");
    });
  }

}

export default UserPage;
