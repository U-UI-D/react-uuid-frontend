import React from "react";

class ALImage extends React.Component {

  //构造器
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 渲染函数
  render() {
    return (
        <div style={{display: "inline-block"}}>
          <img src={this.props.src}
               alt={this.props.alt ?? "this is an image"}
               style={{
                 objectFit: this.props.fit ?? "fit",
                 display: "inline-block",
                 width: this.props.width + 'px',
                 height: this.props.height + 'px',
                 borderRadius: this.props.circle ? 50+'%' : this.props.radius + 'px',
               }}/>
        </div>
    );
  }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {

  }

  //组件将要卸载时
  componentWillUnmount() {

  }


}

export default ALImage;
