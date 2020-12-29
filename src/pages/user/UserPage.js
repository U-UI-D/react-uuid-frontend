import React from "react";
import "./style.css";
import {Avatar} from "antd";
import ContentLeft from "./component/layout/ContentLeft";
import ContentRight from "./component/layout/ContentRight";
import {PATH_LOGIN, RouterConst} from "../../util/router/config/RouterConst";
import {getUserInfoFromLocalStorage} from "../../util/util";
import {connect} from "react-redux";
import {ActionTypes} from "../../store/action-types";

class UserPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  //渲染函数
  render() {
    return (
        <div>
          <div className="header-box header-bg">
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
                  <ContentLeft {...this.props} userInfo={this.props.userInfo} />
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
    // 判断是否登录
    if (!this.props.isLogin){
      this.goPage(RouterConst.user.USER_PAGE);
    }

  }

  //组件卸载前调用
  componentWillUnmount() {
  }



  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLoginState(data){
      let action = {
        type: ActionTypes.user.UPDATE_LOGIN_STATE,
        value: data
      }
      dispatch(action);
    },
    updateUserInfo(data){
      let action = {
        type: ActionTypes.user.UPDATE_USER_INFO,
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
