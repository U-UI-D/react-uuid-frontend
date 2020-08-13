import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import "./style.css";
import {request} from "../../util/network/NetworkRequest";
import {Avatar, Button, Divider} from "antd";
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
                  <ContentLeft />
                </div>

                <div className="content-box-right">
                  <ContentRight />
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
    console.log("========================")
    // this.getUserInfoById(1);
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  getUserInfoById = (id) => {
    request({
      url: 'https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/mock/user.json',
      method: 'GET',
      data: {}
    }).then(res => {
      console.log(res);
      console.log(res.data);
      this.setState({
        userInfo: res.data.data
      })
    }).catch(err => {
      console.log(err);
    });
  }

}

export default UserPage;
