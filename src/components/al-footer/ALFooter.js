import React from "react";
import {Avatar} from "antd";

class ALFooter extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 渲染函数
  render() {
    return (
        <div className="al-flex-container al-flex-container-center-v content-width">
          <div>
            <Avatar size={100} src={require('../../assets/icon/common/UUID2.png')} />
          </div>

          <div>
            <div className="al-flex-container">
              <div>首页</div><div style={{width: 30+'px'}}></div>
              <div>发现</div><div style={{width: 30+'px'}}></div>
              <div>学习</div><div style={{width: 30+'px'}}></div>
              <div>关于我们</div><div style={{width: 30+'px'}}></div>
              <div>联系我们</div>
            </div>
          </div>
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

export default ALFooter;
