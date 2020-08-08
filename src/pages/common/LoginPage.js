import React from "react";
import {Link} from "react-router-dom";
import {Button} from "antd";

class LoginPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div>
        LoginPage
        <Link to={"/register"}>
          <Button>注册</Button>
        </Link>
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

export default LoginPage;
