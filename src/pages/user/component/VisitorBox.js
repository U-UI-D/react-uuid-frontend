import React from "react";
import {Avatar} from "antd";

class VisitorBox extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div>
        <Avatar src={this.props.avatar} size={60} />
        <div className="al-text-align-center">{this.props.nickname}</div>
        <div className="al-text-align-center">{this.props.visitDate}</div>
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

export default VisitorBox;
