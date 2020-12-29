import React from "react";
import {Dropdown, Avatar, Button, Menu, message} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {RouterConst} from "../../util/router/config/RouterConst";
import {withRouter} from "react-router-dom";
import {deleteCookie, getCookieByName} from "../../util/cookieUtil";
import {request} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";
import ALFlexBox from "../al-flex-box/ALFlexBox";

import "./style.css"
import store from "../../store";
import {connect} from "react-redux";
import {ActionTypes} from "../../store/action-types";

class ALHeader extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      currentTitle: ["首页"],
      menuItems: [
        {
          text: "首页",
          path: RouterConst.home.INDEX_PAGE
        },
        {
          text: "作品",
          path: RouterConst.work.WORK_PAGE
        },
        {
          text: "话题",
          path: RouterConst.topic.TOPIC_PAGE
        },
        {
          text: "素材",
          path: RouterConst.material.MATERIAL_PAGE
        },
        {
          text: "榜单",
          path: RouterConst.top.TOP_PAGE
        },
        {
          text: "商城",
          path: RouterConst.shop.SHOP_PAGE
        },
        // {
        //   text: "测试",
        //   path: PATH_TEST_PAGE
        // }
      ],
      menuItems2: [
        {
          text: "搜索",
          path: RouterConst.search.SEARCH_PAGE
        },
        {
          text: "上传",
          path: "/"
        },
        {
          text: "通知",
          path: RouterConst.message.MESSAGE_PAGE
        }
      ],
      hidden: false,
    }

    console.log("store", store.getState());
  }

  //渲染函数
  render() {

    let isLoginDiv;
    const {userInfo, isLogin} = this.props;

    const uploadDropdownMenu = (
      <div style={{color: this.props.color ?? "#000"}}>
        <Menu>
          <MenuItem style={{width: "100px"}}>
            <a onClick={() => {
              this.goPage(RouterConst.work.NEW_WORK_PAGE)
            }}>
              上传作品
            </a>
          </MenuItem>
          <MenuItem>
            <a onClick={() => {
              this.goPage(RouterConst.work.NEW_WORK_PAGE)
            }}>
              上传素材
            </a>
          </MenuItem>
        </Menu>
      </div>
    );

    if (!isLogin) {
      isLoginDiv = (
        <div className="al-flex-container-center-v">
          <Button className="al-m-right-30px"
                  shape="round"
                  onClick={() => this.goPage(RouterConst.user.LOGIN_PAGE)}
          >登录</Button>
          <Button shape="round"
                  onClick={() => this.goPage(RouterConst.user.REGISTER_PAGE)}
          >注册</Button>
        </div>
      );
    } else {
      const avatarDropdownMenu = (
        <Menu>
          <MenuItem style={{width: "100px"}}>
            <a onClick={() => {
              this.goPage(RouterConst.user.USER_PAGE + "/" + userInfo.id)
            }}>
              个人中心
            </a>
          </MenuItem>
          <MenuItem>
            <a className="" onClick={() => {
              this.logout();
            }}>
              退出
            </a>
          </MenuItem>
        </Menu>
      );

      isLoginDiv = <div className="al-flex-container-center-v">
        <Dropdown overlay={avatarDropdownMenu}
                  placement="bottomCenter">
          <a className="ant-dropdown-link al-m-left-20px" onClick={e => e.preventDefault()}>
            <Avatar src={userInfo === null ? "" : userInfo.avatar}/>
          </a>
        </Dropdown>
      </div>
    }

    return (
      <div id="al-header" style={{backgroundColor: ""}} hidden={this.state.hidden}>

        <div style={{
          width: 1180 + 'px',
          margin: "0 auto"
        }}>
          <div className="al-flex-container al-flex-container-center-v">
            <Avatar className="al-display-inline" src={require("../../assets/icon/common/UUID2.png")} size={70}/>

            <ALFlexBox id="header-menu"
                       centerVH
                       between
                       className="header-menu" style={{flex: 1}}>
              {/*菜单1*/}
              <div>
                <Menu mode="horizontal" style={{backgroundColor: "#00000000"}}>
                  {
                    this.state.menuItems.map((item, index) => {
                      return <MenuItem key={item.text}
                                       style={{color: this.props.color ?? "#000"}}
                                       onClick={
                                         () => this.goPage(item.path)
                                       }>{item.text}</MenuItem>
                    })
                  }
                </Menu>
              </div>

              {/*菜单2*/}
              <ALFlexBox centerV>
                <ALFlexBox centerV style={{marginTop: "4px"}}>
                  <div className="al-p-lr-20px">
                    <a style={{color: this.props.color ?? "#000"}}
                       onClick={() => this.goPage(RouterConst.search.SEARCH_PAGE)}>搜索</a>
                  </div>

                  <div className="al-p-lr-20px">
                    <Dropdown overlay={uploadDropdownMenu}
                              placement="bottomCenter">
                      <a style={{color: this.props.color ?? "#000"}}>上传</a>
                    </Dropdown>
                  </div>

                  <div className="al-p-lr-20px">
                    <a style={{color: this.props.color ?? "#000"}}
                       onClick={() => this.goPage(RouterConst.message.MESSAGE_PAGE)}>消息</a>
                  </div>
                </ALFlexBox>
                {isLoginDiv}
              </ALFlexBox>
            </ALFlexBox>

          </div>
        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  // 退出
  logout = () => {
    let token = getCookieByName("sso_token");
    console.log(token);
    request({
      url: ApiConst.user.LOGOUT,
      method: 'POST',
      data: {
        token: token
      },
      headers: {}
    }).then(res => {
      console.log(res);
      if (res.data.code === 0) {
        message.warning("网络繁忙，请稍候再试");
      }
      this.clearUserInfo();
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  clearUserInfo = () =>  {
    localStorage.removeItem("isLogin");
    sessionStorage.removeItem("store");
    this.props.updateLoginState(false);
    this.props.updateUserInfo(null);
    deleteCookie("sso_token");
    this.setState({
      isLogin: false
    });
    this.goPage(RouterConst.home.INDEX_PAGE);
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ALHeader));
