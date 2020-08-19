import React from "react";
import ALHeader from "../../../components/al-header/ALHeader";
import "./style.css";
import WorkContentLeft from "./component/WorkContentLeft";
import WorkContentRight from "./component/WorkContentRight";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class WorkDetail extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    return(
      <div className="page" style={{width: windowWidth, height: "auto"}}>
        <div style={{backgroundColor: "#fff"}}>
          <ALHeader />
        </div>
        {/*作品详情页：id={this.props.match.params.id}*/}

        <div style={{height: 30}}></div>

        <div className="content-width">
          <div className="al-flex-justify-space-between">
            <WorkContentLeft />
            <WorkContentRight />
          </div>
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

export default WorkDetail;
