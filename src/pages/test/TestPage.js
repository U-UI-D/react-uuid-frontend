import React from "react";
import ALImage from "../../components/al-image/ALImage";

class TestPage extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  // 渲染函数
  render() {
    return (
        <div>
          <center><h1 >测试页面</h1></center>

          {/*测试内容*/}
          <div>
            <ALImage fit={"fill"} src={require('../../assets/image/home/poster1.jpg')} />
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

export default TestPage;
