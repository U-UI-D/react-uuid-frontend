import React from "react";
import ALHeader from "../../components/al-header/ALHeader";

class DiscoveryPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div className="primary-bg-color">
        <div className="al-bg-color-white">
          <ALHeader />
        </div>
        <div className="content-width">
          发现页面
        </div>
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

export default DiscoveryPage;
