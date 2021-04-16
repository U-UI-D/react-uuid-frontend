import React from "react";
import {Dropdown, Avatar, Button, Menu, message} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {RouterConst} from "../../util/router/config/RouterConst";
import {withRouter} from "react-router-dom";
import {deleteCookie, getCookieByName} from "../../util/cookieUtil";
import {request} from "../../util/network/request";
import {ApiConst} from "../../util/network/config/ApiConst";
import ALFlexBox from "../al-flex-box/ALFlexBox";

import "./style.scss"
import store from "../../store";
import {connect} from "react-redux";
import {ActionTypes} from "../../store/action-types";

class ALHeader extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      currentTitle: [this.props.currentHeaderTitle],
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
      isMobile: false,
      menuBg: "rgba(255,255,255,.5)"
    }

  }

  //渲染函数
  render() {

    let isLoginDiv;
    const {userInfo, isLogin, isMobile} = this.props;
    const {menuBg} = this.state;

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
          <Button shape="round"
                  className="al-m-left-20px"
                  onClick={() => this.goPage(RouterConst.user.LOGIN_PAGE)}
          >登录 / 注册</Button>
          {/*<Button shape="round"*/}
          {/*        onClick={() => this.goPage(RouterConst.user.REGISTER_PAGE)}*/}
          {/*>注册</Button>*/}
        </div>
      );
    } else {
      const avatarDropdownMenu = (
        <Menu>
          <MenuItem style={{width: "100px"}}>
            <a onClick={() => {
              this.goPage(RouterConst.user.USER_PAGE + userInfo.id);
              this.clearCurrentHeaderTitle();
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

    const headerMenu = (
      <ALFlexBox id="header-menu"
                 centerVH={!isMobile}
                 between
                 column={isMobile}
                 style={{backgroundColor: isMobile ? menuBg : null, width: "100%"}}
                 className="header-menu">
        {/*菜单1*/}
        <div className="left-menu">
          <Menu selectedKeys={[this.props.currentHeaderTitle]}
                style={{backgroundColor: isMobile ? menuBg : null}}
                mode={isMobile ? 'vertical' : 'horizontal'} >
            {
              this.state.menuItems.map((item, index) => {
                return <MenuItem key={item.text}
                                 style={{color: this.props.color ?? "#000"}}
                                 onClick={
                                   () => {
                                     this.props.updateCurrentHeaderTitle(item.text);
                                     this.goPage(item.path);
                                   }}>{item.text}</MenuItem>
              })
            }
          </Menu>
        </div>

        {/*菜单2*/}
        <ALFlexBox centerV={!isMobile} column={isMobile}
                   className="right-menu"
                   style={{backgroundColor: isMobile ? menuBg : null}}>
          <ALFlexBox centerV={!isMobile}  column={isMobile}>
            <div>
              <Button type="link"
                      style={{color: this.props.currentHeaderTitle === '搜索' ? '#1890ff' : "#000"}}
                      onClick={() => {
                        this.props.updateCurrentHeaderTitle('搜索');
                        this.goPage(RouterConst.search.SEARCH_PAGE)
                      }} className="right-menu-text">搜索</Button>
            </div>

            <div>
              <Dropdown overlay={uploadDropdownMenu}
                        placement="bottomCenter">
                <Button type="link"
                        style={{color: this.props.currentHeaderTitle === '上传' ? '#1890ff' : "#000"}}
                        className="right-menu-text"
                >上传</Button>
              </Dropdown>
            </div>

            <div>
              <Button type="link"
                      style={{color: this.props.currentHeaderTitle === '消息' ? '#1890ff' : "#000"}}
                      onClick={() => {
                        this.props.updateCurrentHeaderTitle('消息');
                        this.goPage(RouterConst.message.MESSAGE_PAGE)
                      }} className="right-menu-text">消息</Button>
            </div>
          </ALFlexBox>
          <div className="al-m-top-10px">
            {isMobile ? null : isLoginDiv}
          </div>
        </ALFlexBox>
      </ALFlexBox>
    );

    return (
      <div id="al-header" hidden={this.state.hidden}>
        <ALFlexBox between>
          <Dropdown overlay={headerMenu}
                    trigger="click" overlayStyle={{width: "100%"}}
                    placement="bottomCenter">
            <Button className="btn-show">=</Button>
          </Dropdown>

          {
            <ALFlexBox>
              {isMobile ? isLoginDiv : null}
              {
                isLogin && isMobile ? null :
                <Avatar className="al-display-inline"
                        src={require("../../assets/icon/common/UUID2.png")}
                        size={isMobile ? 36 : 70}/>
              }
            </ALFlexBox>
          }
        </ALFlexBox>

        {isMobile ? null : headerMenu}
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    // window.addEventListener('resize', () => {
    //   if (window.innerWidth < 768) {
    //     this.setState({
    //       isMobile: true
    //     })
    //   }else {
    //     this.setState({
    //       isMobile: false
    //     })
    //   }
    // });
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
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("store");
    this.props.updateLoginState(false);
    this.props.updateUserInfo(null);
    deleteCookie("sso_token");
    this.setState({
      isLogin: false
    });
    this.goPage(RouterConst.home.INDEX_PAGE);
  }

  clearCurrentHeaderTitle = () => {
    this.props.updateCurrentHeaderTitle('');
  }


}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfo: state.userInfo,
    isMobile: state.isMobile,
    currentHeaderTitle: state.currentHeaderTitle
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
    },
    updateCurrentHeaderTitle(data) {
      let action = {
        type: ActionTypes.header.UPDATE_CURRENT_HEADER_TITLE,
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ALHeader));
