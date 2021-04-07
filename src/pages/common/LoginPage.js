import React from "react";
import {Affix, Avatar, Button, Divider, Input, message, Card, Space} from "antd";
import {HttpRequest, request} from "../../util/network/request";
import {RouterConst} from "../../util/router/config/RouterConst";
import {ApiConst, GET_CHECK_USER_EXIST, GET_USER_BY_TOKEN, POST_USER_LOGIN} from "../../util/network/config/ApiConst";
import {setCookie} from "../../util/cookieUtil";
import {ALFlexBox} from "../../components/al-component";
import store from "../../store";
import {connect} from "react-redux";
import {ActionTypes} from "../../store/action-types";
import './style.scss'


function TopBar(props) {
  const {history} = props;
  return (
    <div className="top-bar">
      <ALFlexBox centerV>
        <Avatar src={require('../../assets/icon/common/UUID2.png')}
                className="al-cursor-pointer"
                size={60}
                onClick={() => {
                  history.push(RouterConst.home.HOME_PAGE)
                }}/>
        <h1 onClick={() => {
          history.push(RouterConst.home.HOME_PAGE)
        }}>UUID</h1>
        <Divider type="vertical" style={{height: '24px'}} />
        <h2 className="platform-title">UI设计师与开发者合作交流平台</h2>
      </ALFlexBox>
    </div>
  );
}


class LoginPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    const {userInfo} = store.getState();
    this.state = {
      userInfo: userInfo,
      username: "",
      password: "",
      tabListNoTitle: [],
      key: 'login',
      noTitleKey: 'login',
    }
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({[type]: key, key});
  };


  //渲染函数
  render() {
    const tabListNoTitle = [
      {
        key: 'login',
        tab: '登录',
      },
      {
        key: 'register',
        tab: '注册',
      },
    ];

    const formBox = props => {
      return (
        <div className="form">
          <Space direction="vertical" size={40} className="al-width-100">
            <div className="input-wrapper">
              <Input placeholder={"帐号"} onChange={(e) => {
                this.setState({username: e.target.value});
              }}/>
            </div>
            <div className="input-wrapper">
              <Input placeholder={"密码"}
                     type="password"
                     onChange={(e) => {
                       this.setState({password: e.target.value});
                     }}/>
            </div>
            <Button type="primary"
                    className="al-width-100"
                    style={{height: "60px"}}
                    onClick={() => {
                      this.state.key === 'register' ? this.register() : this.login();
                    }}>{this.state.key === 'register' ? '注册' : '登录'}</Button>
          </Space>

        </div>
      );
    }

    const contentListNoTitle = {
      login: formBox({mode: 'login'}),
      register: formBox({mode: 'register'}),
    };

    return (
      <div className="page">
        <div>

          <ALFlexBox>
            <div style={{flex: 1}}>
              <div className="al-position-fixed">
                <img src={require('./bg.png')} width={"56%"} alt=""/>
              </div>

            </div>

            <div style={{flex: 2}}>
              <TopBar history={this.props.history}/>
              <div className="al-position-rela al-width-100">
                <div className="al-position-abs al-flex-container-center-vh" style={{
                  left: 0,
                  right: 0,
                }}>
                  <Card
                    style={{width: '450px', padding: "21px", marginTop: '60px'}} bordered={false}
                    tabList={tabListNoTitle}
                    activeTabKey={this.state.noTitleKey}
                    onTabChange={key => {
                      this.onTabChange(key, 'noTitleKey');
                    }}
                  >
                    {contentListNoTitle[this.state.noTitleKey]}
                  </Card>
                </div>
              </div>
            </div>
          </ALFlexBox>


          {/*<ALFlexBox column flexNum={1}>*/}

          {/*  <Affix>*/}
          {/*    <div className="al-text-right">*/}
          {/*      <Button type="link" onClick={() => this.goPage('/register')}>注册</Button>*/}
          {/*      <Divider type="vertical" style={{borderLeft: "1px solid #ccc"}} />*/}
          {/*      <Button type="link" onClick={() => this.goPage('/')}>首页</Button>*/}
          {/*    </div>*/}
          {/*  </Affix>*/}

          {/*  <ALFlexBox between centerV flexNum={1} className="content-width">*/}
          {/*    <div></div>*/}
          {/*    <ALFlexBox column*/}
          {/*               style={{*/}
          {/*                 width: 400 + 'px',*/}
          {/*                 height: 300 + 'px',*/}
          {/*               }}>*/}
          {/*      <div>*/}
          {/*        <div className="al-box-container">*/}
          {/*          <Avatar size={100} src={require('../../assets/icon/common/UUID2.png')}/>*/}
          {/*        </div>*/}
          {/*        <div className="al-box-container">*/}
          {/*          <div className="al-flex-container al-flex-container-center-v">*/}
          {/*            <ALInlineWidthBox style={{flex: 2}}>*/}
          {/*              帐号：*/}
          {/*            </ALInlineWidthBox>*/}
          {/*            <Input style={{flex: 8}}*/}
          {/*                   placeholder={"请输入帐号"}*/}
          {/*                   onChange={(e) => {*/}
          {/*                     this.setState({username: e.target.value})*/}
          {/*                   }}/>*/}
          {/*          </div>*/}
          {/*          <div className="al-m-top-20px al-flex-container al-flex-container-center-v">*/}
          {/*            <ALInlineWidthBox style={{flex: 2}}>*/}
          {/*              密码：*/}
          {/*            </ALInlineWidthBox>*/}
          {/*            <Input style={{flex: 8}}*/}
          {/*                   type="password"*/}
          {/*                   placeholder={"请输入密码"}*/}
          {/*                   onChange={(e) => {*/}
          {/*                     this.setState({password: e.target.value})*/}
          {/*                   }}/>*/}
          {/*          </div>*/}
          {/*        </div>*/}

          {/*        <div className="al-box-container">*/}
          {/*          <div>*/}
          {/*            <Button shape="round"*/}
          {/*                    style={{padding: "0 50px 0 50px"}}*/}
          {/*                    onClick={() => {*/}
          {/*                      this.login()*/}
          {/*                    }}>登录</Button>*/}
          {/*          </div>*/}
          {/*        </div>*/}

          {/*      </div>*/}
          {/*    </ALFlexBox>*/}
          {/*  </ALFlexBox>*/}
          {/*</ALFlexBox>*/}
        </div>
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
      },
      env: "prod"
    }).then(res => {
      console.log(res);
      if (res.data.code === 1) {
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
        message.success("登录成功");
        this.props.updateUserInfo(res.data.data);
        this.props.updateLoginState(true);

        // debugger;
        // 跳转页面
        if (from) {
          this.goPage(from);
        } else {
          // this.goPage(RouterConst.user.USER_PAGE + this.state.userInfo.id);
          this.props.history.push(RouterConst.user.USER_PAGE + this.state.userInfo.id);
        }
      }
    });
  }


  // 检查用户名是否存在
  checkUsernameExisted = async () => {
    let url = GET_CHECK_USER_EXIST + this.state.username;
    let exist = false;

    let result = request({
      url: url,
      method: 'GET',
      data: {}
    }).then(res => {
      console.log(res);
      if (res.data.code === 0) {
        exist = true;
        message.warn("用户名已存在，请更换用户名。")
      }
      return exist;
    }).catch(err => {
      console.log(err);
      message.warn("网络错误，请稍候再试！");
      exist = false;
      return exist;
    });

    exist = await result;
    console.log("=========exist:" + exist);

    return exist;
  }

  register = async () => {
    if (!(await this.validate())) {
      return;
    }

    HttpRequest.post({
      url: ApiConst.user.REGISTER,
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      env: 'dev'
    }).then(res => {
      console.log("register result", res);
      if (res.data.code === 1) {
        this.setState({
          userInfo: res.data.data
        });
        message.success("注册成功");
        this.goPage(RouterConst.user.EDIT_PROFILE_PAGE, {userInfo: res.data.data});
      }
    }).catch(err => {
      console.log(err);
      message.error("网络错误，请稍候再试！");
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
    updateLoginState(data) {
      let action = {
        type: ActionTypes.user.UPDATE_LOGIN_STATE,
        value: data
      }
      dispatch(action);
    },
    updateUserInfo(data) {
      let action = {
        type: ActionTypes.user.UPDATE_USER_INFO,
        value: data
      }
      dispatch(action);
    },
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
