import React from "react";
import {Avatar, Button, Menu} from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {LOGIN, REGISTER, TEST_PAGE} from "../../util/router/config/RouterConst";
import {withRouter} from "react-router-dom";

class ALHeader extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return (
        <div style={{backgroundColor: ""}}>
          <div style={{
            width: 1180 + 'px',
            margin: "0 auto"
          }}>
            <div className="al-flex-container al-flex-container-center-v">
              <Avatar className="al-display-inline" src={require("../../assets/icon/common/UUID2.png")} size={70}/>

              <div className="header-menu al-flex-container al-flex-justify-space-between" style={{flex: 1}}>
                <div>
                  <Menu mode="horizontal" style={{backgroundColor: "#00000000"}}>
                    <MenuItem>首页</MenuItem>
                    <MenuItem>作品</MenuItem>
                    <MenuItem>发现</MenuItem>
                    <MenuItem>学习</MenuItem>
                    <MenuItem>版权素材</MenuItem>
                    <MenuItem>招聘</MenuItem>
                    <MenuItem>榜单</MenuItem>
                    <MenuItem>更多</MenuItem>
                    <MenuItem onClick={() => this.goPage(TEST_PAGE)}>测试</MenuItem>
                  </Menu>
                </div>

                <div>
                  <Menu mode="horizontal" style={{backgroundColor: "#00000000"}}>
                    <MenuItem>搜索</MenuItem>
                    <MenuItem>上传</MenuItem>
                    <MenuItem>通知</MenuItem>
                  </Menu>
                </div>
              </div>

              <div>
                <Button className="al-m-right-30px"
                        shape="round"
                        onClick={() => this.goPage(LOGIN)}
                >登录</Button>
                <Button shape="round"
                        onClick={() => this.goPage(REGISTER)}
                >注册</Button>
              </div>
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
    this.props.history.push({pathname: path, state: {}})
  }

}

export default withRouter(ALHeader);
