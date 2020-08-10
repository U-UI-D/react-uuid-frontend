import React from "react";
import {Avatar} from "antd";

class ShowJikeWorkBox extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 渲染函数
  render() {
    const jikeWork = this.props.workJike;
    return (
        <div style={{borderRadius: 20 + 'px'}}>
          <Avatar
              src={jikeWork.poster}
              shape="square"

              style={{width: 220+'px', height: 400+'px', borderRadius: 20 + 'px'}}/>
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

export default ShowJikeWorkBox;
