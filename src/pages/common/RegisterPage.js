import React from "react";
import {Button} from "antd";

class RegisterPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div>
        RegisterPage
        <Button onClick={() => {
          console.log(this.props.history.push({pathname: "/", state: {}}));
        }}>回到首页</Button>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default RegisterPage;
