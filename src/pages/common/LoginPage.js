import React from "react";
import {Affix, Avatar, Button, Divider, Input, message} from "antd";
import {HttpRequest} from "../../util/network/request";
import {PATH_USER_PAGE} from "../../util/router/config/RouterConst";
import {GET_USER_BY_TOKEN, POST_USER_LOGIN} from "../../util/network/config/ApiConst";
import {setCookie} from "../../util/cookieUtil";
import loginbg2 from "../../assets/image/login/loginbg2.svg"
import {ALFlexBox, ALInlineWidthBox} from "../../components/al-component";
import store from "../../store";
import {connect} from "react-redux";
import {ActionTypes} from "../../store/action-types";
import './style.css'


class LoginPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    const {userInfo} = store.getState();
    this.state = {
      userInfo: userInfo,
      username: "",
      password: "",
    }
  }

  //渲染函数
  render() {
    return (
      <div style={{
        backgroundImage: `url(${loginbg2})`,
      }} className="page">

        <ALFlexBox column flexNum={1}>

          <Affix>
            <div className="al-text-right">
              <Button type="link" onClick={() => this.goPage('/register')}>注册</Button>
              <Divider type="vertical" style={{borderLeft: "1px solid #ccc"}} />
              <Button type="link" onClick={() => this.goPage('/')}>首页</Button>
            </div>
          </Affix>

          <ALFlexBox between centerV flexNum={1} className="content-width">
            <div></div>
            <ALFlexBox column
                       style={{
                         width: 400 + 'px',
                         height: 300 + 'px',
                       }}>
              <div>
                <div className="al-box-container">
                  <Avatar size={100} src={require('../../assets/icon/common/UUID2.png')}/>
                </div>
                <div className="al-box-container">
                  <div className="al-flex-container al-flex-container-center-v">
                    <ALInlineWidthBox style={{flex: 2}}>
                      帐号：
                    </ALInlineWidthBox>
                    <Input style={{flex: 8}}
                           placeholder={"请输入帐号"}
                           onChange={(e) => {
                             this.setState({username: e.target.value})
                           }}/>
                  </div>
                  <div className="al-m-top-20px al-flex-container al-flex-container-center-v">
                    <ALInlineWidthBox style={{flex: 2}}>
                      密码：
                    </ALInlineWidthBox>
                    <Input style={{flex: 8}}
                           type="password"
                           placeholder={"请输入密码"}
                           onChange={(e) => {
                             this.setState({password: e.target.value})
                           }}/>
                  </div>
                </div>

                <div className="al-box-container">
                  <div>
                    <Button shape="round"
                            style={{padding: "0 50px 0 50px"}}
                            onClick={() => {
                              this.login()
                            }}>登录</Button>
                  </div>
                </div>

              </div>
            </ALFlexBox>
          </ALFlexBox>
        </ALFlexBox>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    console.log("props", this.props);

    document.getElementById("al-header").hidden = true;
    document.getElementById("al-footer").hidden = true;

  }

  //组件卸载前调用
  componentWillUnmount() {
    document.getElementById("al-header").hidden = false;
    document.getElementById("al-footer").hidden = false;
  }

  //验证账号密码
  validate = () => {
    if (this.state.username.length === 0) {
      message.error("用户名不能为空");
      return false;
    }

    if (this.state.username.length < 4) {
      message.error("用户名不能小于4位数");
      return false;
    }

    return true;
  }

  login = () => {
    if (!this.validate()) {
      return;
    }
    //去sso登录
    HttpRequest.post({
      url: POST_USER_LOGIN,
      data: {
        username: this.state.username,
        password: this.state.password,
      }
    }).then(res => {
      console.log(res);
      if (res.data.code === 1) {
        message.success("登录成功");
        setCookie("sso_token", res.data.data.token);
        this.getUserInfoByToken(res.data.data.token);
      } else {
        message.error(res.err);
        message.error("网络错误，请稍候再试！");
        // console.log(res.data.msg);
      }
    });
  }

  handleResize = (e) => {
    this.setState({
      windowWidth: e.target.innerWidth,
      windowHeight: e.target.innerHeight,
    })
  }

  getUserInfoByToken = (token) => {
    console.log("location", this.props.location);
    let from = "";
    if (this.props.location.state?.from) {
      from = this.props.location.state.from;
    }

    HttpRequest.get({
      url: GET_USER_BY_TOKEN + token
    }).then(res => {
      // 成功获取用户信息
      if (res.err === null) {
        this.setState({
          userInfo: res.data.data,
        });

        this.props.updateUserInfo(res.data.data);
        this.props.updateLoginState(true);

        // 跳转页面
        if (from) {
          this.goPage(from);
        } else {
          this.goPage(PATH_USER_PAGE + "/" + this.state.userInfo.id);
        }
      }
    });
  }

  goPage = (path, state = {}) => {
    this.props.history.push({pathname: path, state: state})
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfo: state.userInfo,
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
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
