import React from "react";
import {Dropdown, Avatar, Button, Menu} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {HOME_PAGE, LOGIN, REGISTER, TEST_PAGE, WORK_PAGE} from "../../util/router/config/RouterConst";
import {withRouter} from "react-router-dom";
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
          path: HOME_PAGE
        },
        {
          text: "学习",
          path: HOME_PAGE
        },
        {
          text: "版权素材",
          path: HOME_PAGE
        },
        {
          text: "招聘",
          path: HOME_PAGE
        },
        {
          text: "榜单",
          path: HOME_PAGE
        },
        {
          text: "更多",
          path: HOME_PAGE
        },
        {
          text: "测试",
          path: TEST_PAGE
        }
      ],
      menuItems2: [
        {
          text: "搜索",
          path: HOME_PAGE
        },
        {
          text: "上传",
          path: HOME_PAGE
        },
        {
          text: "通知",
          path: HOME_PAGE
        }
      ],
      isLogin: false,
    }
  }

  //渲染函数
  render() {

    let isLogin;
    if (!this.state.isLogin){
      isLogin = <div className="al-flex-container-center-v">
        <Button className="al-m-right-30px"
                shape="round"
                onClick={() => this.goPage(LOGIN)}
        >登录</Button>
        <Button shape="round"
                onClick={() => this.goPage(REGISTER)}
        >注册</Button>
      </div>
    }else {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" onClick={() => {this.goPage("/user/" + userInfo.id)}}>
              个人中心
            </a>
          </Menu.Item>
          <Menu.Item>
            <span className="" onClick={() => {
              localStorage.removeItem("isLogin");
              this.setState({
                isLogin: false
              });
              this.goPage(HOME_PAGE);
            }}>退出</span>
          </Menu.Item>
        </Menu>
      );

      isLogin = <div className="al-flex-container-center-v">


        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Avatar src={userInfo.avatar} />
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
                    {
                      this.state.menuItems2.map((item, index) => {
                        return <MenuItem key={item.text}
                                         style={{color: this.props.color ?? "#000"}}
                                         onClick={
                                           () => this.goPage(item.path)
                                         }>{item.text}</MenuItem>
                      })
                    }
                  </Menu>

                  {isLogin}
                </div>
              </div>
            </div>


          </div>
        </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    this.setState({
      isLogin: localStorage.getItem("isLogin")
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: {}})
  }

}

export default withRouter(ALHeader);
