import React from "react";
import {Dropdown, Avatar, Button, Menu, message} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {
  DISCOVERY_PAGE,
  HOME_PAGE,
  LOGIN, MATERIAL_PAGE, MESSAGE_PAGE,
  REGISTER, SEARCH_PAGE,
  SHOP_PAGE,
  TEST_PAGE,
  TOP_PAGE,
  WORK_PAGE
} from "../../util/router/config/RouterConst";
import {withRouter} from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import {deleteCookie, getCookieByName} from "../../util/cookieUtil";
import {request} from "../../util/network/NetworkRequest";
import {getUserInfoFromLocalStorage} from "../../util/util";

// import "./style.css"

class ALHeader extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [
        {
          text: "首页",
          path: HOME_PAGE
        },
        {
          text: "作品",
          path: WORK_PAGE
        },
        {
          text: "发现",
          path: DISCOVERY_PAGE
        },
        {
          text: "素材",
          path: MATERIAL_PAGE
        },
        {
          text: "榜单",
          path: TOP_PAGE
        },
        {
          text: "商城",
          path: SHOP_PAGE
        },
        {
          text: "测试",
          path: TEST_PAGE
        }
      ],
      menuItems2: [
        {
          text: "搜索",
          path: SEARCH_PAGE
        },
        {
          text: "上传",
          path: HOME_PAGE
        },
        {
          text: "通知",
          path: MESSAGE_PAGE
        }
      ],
      isLogin: false,
    }
  }

  //渲染函数
  render() {

    let isLoginDiv;
    if (!this.state.isLogin) {
      isLoginDiv = <div className="al-flex-container-center-v">
        <Button className="al-m-right-30px"
                shape="round"
                onClick={() => this.goPage(LOGIN)}
        >登录</Button>
        <Button shape="round"
                onClick={() => this.goPage(REGISTER)}
        >注册</Button>
      </div>
    } else {
      let userInfo = getUserInfoFromLocalStorage();

      const menu = (
          <Menu>
            <Menu.Item>
              <a onClick={() => {
                this.goPage("/user/" + userInfo.id)
              }}>
                个人中心
              </a>
            </Menu.Item>
            <Menu.Item>
            <span className="" onClick={() => {
              this.logout();
            }}>退出</span>
            </Menu.Item>
          </Menu>
      );

      isLoginDiv = <div className="al-flex-container-center-v">
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link al-m-left-20px" onClick={e => e.preventDefault()}>
            <Avatar src={userInfo.avatar}/>
          </a>
        </Dropdown>
      </div>
    }

    return (
        <div style={{backgroundColor: ""}}>
          <div style={{
            width: 1180 + 'px',
            margin: "0 auto"
          }}>
            <div className="al-flex-container al-flex-container-center-v">
              <Avatar className="al-display-inline" src={require("../../assets/icon/common/UUID2.png")} size={70}/>

              <div id="header-menu"
                   className="header-menu al-flex-container al-flex-justify-space-between"
                   style={{flex: 1}}>

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
                <div className="al-flex-container">
                  <Menu mode="horizontal" style={{backgroundColor: "#00000000"}}>
                    <MenuItem style={{color: this.props.color ?? "#000"}} onClick={() => this.goPage(SEARCH_PAGE)}>搜索</MenuItem>
                    <SubMenu title="上传" style={{color: this.props.color ?? "#000"}}>
                      <Menu.Item >
                        <a onClick={() => {
                          this.goPage("/work/publish")
                        }}>
                          上传作品
                        </a>
                      </Menu.Item>
                      <Menu.Item>
                        <a onClick={() => {
                          this.goPage("/sucai/publish")
                        }}>
                          上传素材
                        </a>
                      </Menu.Item>
                    </SubMenu>
                    <MenuItem style={{color: this.props.color ?? "#000"}} onClick={() => this.goPage(MESSAGE_PAGE)}>消息</MenuItem>
                  </Menu>

                  {isLoginDiv}
                </div>
              </div>
            </div>


          </div>
        </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let isLogin = JSON.parse(localStorage.getItem("isLogin"));
    if (isLogin) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
    }
    this.setState({
      isLogin: isLogin
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: {}})
  }

  // 退出
  logout() {
    let token = getCookieByName("sso_token");
    console.log(token);
    request({
      url: 'http://localhost:1111/user/logout',
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

  clearUserInfo() {
    localStorage.removeItem("isLogin");
    deleteCookie("sso_token");
    this.setState({
      isLogin: false
    });
    this.goPage(HOME_PAGE);
  }


}

export default withRouter(ALHeader);
