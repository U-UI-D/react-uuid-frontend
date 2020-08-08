import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";
import {LOGIN, REGISTER} from "../../util/router/config/RouterConst";

class HomePage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div>
        HomePage

        <br/>
        <Button onClick={() => {
          this.goPage(REGISTER)
        }}>
          注册
        </Button>
        <br/>

        <Button >登录</Button>

      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) =>{
    this.props.history.push({pathname: path, state: {}})
  }

}

export default HomePage;
