import React from "react";

class CountBox extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div className="al-flex-container-center-vh al-flex-direction-col">
        <h3 style={{color: this.props.numColor}}
            className="al-font-weight-bold">
          {this.props.num}
        </h3>
        <div>{this.props.text}</div>
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

export default CountBox;
