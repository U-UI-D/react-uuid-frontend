import React from "react";
import {Avatar, Button, Input, message} from "antd";
import {request} from "../../util/network/NetworkRequest";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";


const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class RegisterPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      username: "",
      password: "",
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
                       placeholder={"请输入密码"}
                       type="password"
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
                          this.register()
                        }}>注册</Button>
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
  validate = async () => {
    if (this.state.username.length === ''){
      message.error("用户名不能为空");
      return false;
    }

    if (this.state.username.length < 4){
      message.error("用户名不能小于4位数");
      return false;
    }

    if (this.state.password.length < 6){
      message.error("用户名不能小于6位数");
      return false;
    }

    // 判断用户名是否存在
    if ( await this.checkUsernameExisted()){
      return false;
    }
    return true;
  }

  // 检查用户名是否存在
  checkUsernameExisted = async () => {
    let url = "http://localhost:9001/user/u/" + this.state.username;
    let exist = false;

    let result = request({
      url: url,
      method: 'GET',
      data: {}
    }).then(res => {
      console.log(res);
      if (res.data.code === 0){
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
    if (! (await this.validate()) ){
      return ;
    }

    let url = "http://localhost:9001/user/register";

    request({
      url: url,
      method: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password,
      }
    }).then(res => {
      console.log(res);
      if (res.data.code === 1){
        this.setState({
          result: res.data
        });
        message.success("注册成功");
      }
    }).catch(err => {
      console.log(err);
      message.error("网络错误，请稍候再试！");
    });
  }

  // 处理窗口大小变化
  handleResize = (e) => {
    console.log(e.target.innerWidth);
    this.setState({
      windowWidth: e.target.innerWidth,
      windowHeight: e.target.innerHeight,
    })
  }

}

export default RegisterPage;
