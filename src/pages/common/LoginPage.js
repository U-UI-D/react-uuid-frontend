import React from "react";
import {Avatar, Button, Input, message} from "antd";
import {request} from "../../util/network/NetworkRequest";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import {USER_PAGE} from "../../util/router/config/RouterConst";


const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class LoginPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      username: "",
      password: ""
    }

  }

  //渲染函数
  render() {


    return (
      <div style={{
        width: 100 + '%',
        height: this.state.windowHeight - 20 + 'px',
        backgroundColor: "#eff3f5"
      }} className="al-box-container">

        <div className="al-box-container al-box-pretty"
             style={{width: 400 + 'px', height: 300 + 'px', marginTop: 140 + 'px'}}>
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
        </div>

      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.setState({
      windowWidth: windowWidth,
      windowHeight: windowHeight,
    });
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  //验证账号密码
  validate = () => {
    if (this.state.username.length === ''){
      message.error("用户名不能为空");
      return false;
    }

    if (this.state.username.length < 4){
      message.error("用户名不能小于4位数");
      return false;
    }

    return true;

  }

  login = () => {
    console.log(this.state);
    let url = "http://localhost:9001/user/login";

    if (!this.validate()){
      return ;
    }

    request({
      url: url,
      method: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password,
      }
    }).then(res => {
      // console.log(res);
      if (res.data.code === 1){
        message.success("登录成功");
        this.setState({
          result: res.data
        });
        this.goPage(USER_PAGE + "/" + res.data.data.id);
      }else {
        message.error(res.data.msg);
        // console.log(res.data.msg);
      }
    }).catch(err => {
      message.error("网络错误，请稍候再试！");
      // console.log(err);
    });
  }

  handleResize = (e) => {
    this.setState({
      windowWidth: e.target.innerWidth,
      windowHeight: e.target.innerHeight,
    })
  }

  goPage = (path, data = {}) =>{
    this.props.history.push({pathname: path, state: {}})
  }

}

export default LoginPage;
