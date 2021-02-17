import React from "react";
import {ALFlexBox, ALImage} from "../../../../components/al-component";
import {Steps, Form, Input, Button, Select, Space, message} from "antd";
import {RouterConst} from "../../../../util/router/config/RouterConst";
import {HttpRequest} from "../../../../util/network/request";
import {ApiConst} from "../../../../util/network/config/ApiConst";

class EditProfilePage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      nickname: '',
      identity: 1,
      avatar: '',
      currentStep: 0,
      userInfo: {}
    }
  }

  //渲染函数
  render() {
    let {Step} = Steps;
    let designerAvatar = "https://gitee.com/AlanLee97/dev-mock/raw/master/project/uuid-react-native-app/avatar/designer-f.png";
    let developerAvatar = "https://gitee.com/AlanLee97/dev-mock/raw/master/project/uuid-react-native-app/avatar/developer-m.png";
    const {nickname, identity, currentStep} = this.state;
    return(
      <ALFlexBox centerVH column className='al-full-screen'>
        <div>
          <Steps size="small" current={currentStep} style={{width: '800px'}}>
            <Step title="填写昵称" />
            <Step title="选择身份" />
            <Step title="完成" />
          </Steps>
        </div>

        <div className='al-m-top-50px' style={{height: "200px"}}>
          <Form hidden={currentStep !== 0}>
            <Form.Item label="昵称">
              <Input value={nickname}
                     onChange={(e) => {this.setState({nickname: e.target.value})}}
                     placeholder={nickname}/>
            </Form.Item>
          </Form>

          <div hidden={currentStep !== 1}>
            <ALFlexBox>
              <Space size={40}>
                <ALFlexBox centerVH column padding={12}
                           style={{border: identity === 1 ? "2px solid #409EFF" : "", borderRadius: "4px"}}
                           onClick={() => {this.setState({identity: 1})}}>
                  <ALImage src={designerAvatar} size={100} />
                  <h3>UI设计师</h3>
                </ALFlexBox>

                <ALFlexBox centerVH column padding={12}
                           style={{border: identity === 2 ? "2px solid #409EFF" : "", borderRadius: "4px"}}
                           onClick={() => {this.setState({identity: 2})}}>
                  <ALImage src={developerAvatar} size={100} />
                  <h3>开发者</h3>
                </ALFlexBox>
              </Space>
            </ALFlexBox>

          </div>

          <div hidden={currentStep !== 2}>
            完成
          </div>
        </div>

        <div className='al-m-top-50px'>
          <Space size={10}>
            <Button onClick={() => {
              this.setState({currentStep: currentStep-1})
            }} hidden={currentStep === 0}>上一步</Button>
            <Button onClick={() => {
              this.setState({currentStep: currentStep+1})
            }} hidden={currentStep === 2}>下一步</Button>
            <Button onClick={() => {
              let data = {
                ...this.state.userInfo,
                nickname,
                identity,
                avatar: identity === 1 ? designerAvatar : developerAvatar,
                createdTime: new Date(),
                updatedTime: new Date()
              };
              console.log("sendData", data);
              this.saveUserInfo(data);
            }} hidden={currentStep !== 2} type='primary'>保存</Button>
          </Space>
        </div>
      </ALFlexBox>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    if (document.getElementById("al-header") && document.getElementById("al-footer")) {
      document.getElementById("al-header").hidden = true;
      document.getElementById("al-footer").hidden = true;
    }

    let userInfo =  this.props.history.location.state?.userInfo;
    console.log("userInfo", userInfo);
    if (!userInfo){
      message.error("获取用户信息失败，即将跳转回首页...");
      setTimeout(() => {
        this.props.history.push({pathname: RouterConst.home.HOME_PAGE})
      }, 2000);
      return ;
    }
    this.setState({userInfo});
    message.info("请先完善用户基本资料");

    let tempNickname = "USER_" + (Math.round(Math.random() * 100000));
    this.setState({nickname: tempNickname});
  }

  //组件卸载前调用
  componentWillUnmount() {
    if (document.getElementById("al-header") && document.getElementById("al-footer")) {
      document.getElementById("al-header").hidden = false;
      document.getElementById("al-footer").hidden = false;
    }
  }

  saveUserInfo = (data) => {
    HttpRequest.put({
      url: ApiConst.user.base.put.PUT_BASE_USER_INFO,
      data: data,
      env: "dev",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      if (res.err === null) {
        if (res.data.code === 1) {
          message.success("保存成功，即将跳转到登陆页面");
          setTimeout(() => {
            this.props.history.push({pathname: RouterConst.user.LOGIN_PAGE});
          }, 1500);
        }
      }else {
        message.error("网络错误，请稍候重试");
      }
    })
  }

}

export default EditProfilePage;
