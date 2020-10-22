import React from "react";
import {Avatar, Button, Input, message} from "antd";
import {request} from "../../util/network/NetworkRequest";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import {commonRequest} from "../../util/network/RequestHub";
import {GET_CHECK_USER_EXIST, POST_USER_REGISTER} from "../../util/network/config/ApiConst";
import loginbg2 from "../../assets/image/login/loginbg2.svg";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";
import {GlobalContext} from "../../index";


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
        height: "100vh",
        padding: 0,
        backgroundImage: `url(${loginbg2})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "50%",
        backgroundAttachment: "fixed",
        backgroundColor: "white",
      }} className="al-box-container">

        <div className="content-width al-position-rela">
          <ALFlexBox between>
            <div></div>
            <ALFlexBox column className="al-position-abs"
                       style={{
                         width: 400 + 'px',
                         height: 300 + 'px',
                         top: "-30vh",
                         right: 0,
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
                              this.register()
                            }}>注册</Button>
                  </div>
                </div>

              </div>
            </ALFlexBox>
          </ALFlexBox>
        </div>

      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    document.getElementById("al-header").hidden = true;
  }

  //组件卸载前调用
  componentWillUnmount() {
    document.getElementById("al-header").hidden = false;
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
    let url = GET_CHECK_USER_EXIST + this.state.username;
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

    request({
      url: POST_USER_REGISTER,
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

}

export default RegisterPage;
