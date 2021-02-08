import React from "react";
import "./style.css";
import {Avatar} from "antd";
import ContentLeft from "./component/layout/ContentLeft";
import ContentRight from "./component/layout/ContentRight";
import {PATH_LOGIN} from "../../util/router/config/RouterConst";
import {UserContext} from "./context/UserContext";
import {connect} from "react-redux";
import UserInfo from "./component/user-info-box";
import ContentTop from "./component/layout/context-top";
import {ALFlexBox} from "../../components/al-component";

class UserPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: this.props.userInfo,
    }
  }

  //渲染函数
  render() {
    return (
        <UserContext.Provider value={this.state}>
          <div className='user-page-container'>
            <div className="header-box header-bg">
              <div style={{
                width: 100 + '%',
                height: 350 + 'px'
              }}></div>
            </div>

            <div className='content-wrapper'>
              <ContentTop />

              <div>
{/*
                <div className="content-width" style={{marginTop: -60 + 'px'}}>
                  <div className="al-flex-container">
                    左边栏
                    <div className="content-box-left al-box-radius">
                      <ContentLeft {...this.props} userInfo={this.state.userInfo} />
                    </div>

                    <div className="content-box-right">
                      <ContentRight {...this.props} />
                    </div>
                  </div>
                </div>
*/}

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
          </div>
        </UserContext.Provider>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let isLogin = localStorage.getItem("isLogin");
    // 判断是否登录
    if (!isLogin){
      this.goPage(PATH_LOGIN);
    }
  }

  //组件卸载前调用
  componentWillUnmount() {
  }



  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

}

UserPage.contextType = UserContext;

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
}

export default connect(mapStateToProps)(UserPage);
