import React from "react";
import {Button} from "antd";
import {Link} from "react-router-dom";
import {LOGIN, REGISTER} from "../../util/router/config/RouterConst";
import ALHeader from "../../components/al-header/ALHeader";

class HomePage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;


    return(
      <div style={{backgroundColor: "#eff3f5"}}>

        <ALHeader />

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
