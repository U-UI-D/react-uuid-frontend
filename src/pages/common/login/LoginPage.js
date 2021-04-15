import React from "react";
import {message} from "antd";
import {RouterConst} from "../../../util/router/config/RouterConst";
import {setCookie} from "../../../util/cookieUtil";
import {connect} from "react-redux";
import {ActionTypes} from "../../../store/action-types";
import './style.scss'
import LoginView from "./LoginView";
import {UserService} from "../../../service/user/UserService";

class LoginPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      key: 'login',
      noTitleKey: 'login',
    }
  }

  onTabChange = (key, type) => {
    this.setState({[type]: key, key});
  };

  handleChangeForUsername = (e) => {
    this.setState({username: e.target.value});
  }

  handleChangeForPassword = (e) => {
    this.setState({password: e.target.value});
  }

  //渲染函数
  render() {
    const {noTitleKey, key} = this.state;
    const {history} = this.props;
    return (
      <LoginView handleChangeForUsername={this.handleChangeForUsername}
                 handleChangeForPassword={this.handleChangeForPassword}
                 onTabChange={this.onTabChange}
                 noTitleKey={noTitleKey}
                 currentKey={key}
                 history={history}
                 register={() => this.register()}
                 login={() => this.login()} />
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    document.getElementById("al-header").hidden = true;
    document.getElementById("al-footer").hidden = true;
  }

  //组件卸载前调用
  componentWillUnmount() {
    document.getElementById("al-header").hidden = false;
    document.getElementById("al-footer").hidden = false;
  }

  //验证账号密码
  validate = async () => {
    if (this.state.username.length === 0) {
      message.error("用户名不能为空");
      return false;
    }

    if (this.state.username.length < 4) {
      message.error("用户名不能小于4位数");
      return false;
    }

    // 判断用户名是否存在
    if (this.state.key === 'register' && await this.checkUsernameExisted()){
      return false;
    }

    return true;
  }

  login = () => {
    if (!this.validate()) {
      return;
    }
    //去sso登录
    let data = {
      username: this.state.username,
      password: this.state.password,
    }

    UserService.login(data).then(res => {
      console.log('test-> LoginPage login res', res);
      if (res) {
        setCookie("sso_token", res.token);
        this.getUserInfoByToken(res.token);
      } else {
        message.error("网络错误，请稍候再试！");
      }
    });
  }

  getUserInfoByToken = (token) => {
    let from = "";
    if (this.props.location.state?.from) {
      from = this.props.location.state.from;
    }

    UserService.getUserInfoByToken(token).then(res => {
      // 成功获取用户信息
      if (res.err === null) {
        message.success("登录成功");
        this.props.updateUserInfo(res);
        this.props.updateLoginState(true);

        // 跳转页面
        if (from) {
          this.goPage(from);
        } else {
          this.props.history.push(RouterConst.user.USER_PAGE + this.state.userInfo.id);
        }
      }
    });
  }

  // 检查用户名是否存在
  checkUsernameExisted = async () => {
    let username = this.state.username;
    let exist = false;

    let result = UserService.checkUserExist(username).then(res => {
      if (res.data.code === 0) {
        exist = true;
        message.warn("用户名已存在，请更换用户名。")
      }
      return exist;
    }).catch(err => {
      message.warn("网络错误，请稍候再试！");
      exist = false;
      return exist;
    });

    exist = await result;

    return exist;
  }

  register = async () => {
    if (!(await this.validate())) {
      return;
    }

    let data = {
      username: this.state.username,
      password: this.state.password,
    };
    UserService.register(data).then(res => {
      console.log("register result", res);
      if (res) {
        message.success("注册成功");
        this.goPage(RouterConst.user.EDIT_PROFILE_PAGE, {userInfo: res});
      }
    }).catch(err => {
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
