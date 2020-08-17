import React from "react";

class ALInlineWidthBox extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return (
        <div {...this.props} style={{
          display: "inline-block",
          width: this.props.width + 'px',
          height: this.props.height + 'px'
        }} className={this.props.className}>
          {this.props.children}
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

export default ALInlineWidthBox;
