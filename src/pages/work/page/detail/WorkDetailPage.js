import React from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import "./style.css";
import WorkContentLeft from "./component/WorkContentLeft";
import WorkContentRight from "./component/WorkContentRight";
import {request} from "../../../../util/network/NetworkRequest";
import {GET_WORK_BY_ID} from "../../../../util/network/config/ApiConst";
import {getWorkDetailByID} from "../../../../util/network/RequestHub";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class WorkDetailPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null
    }
  }

  //渲染函数
  render() {
    return this.workData === null ? <div></div> : (
      <div className="page" style={{width: windowWidth, height: "auto"}}>
        <div style={{backgroundColor: "#fff"}}>
          <ALHeader />
        </div>
        {/*作品详情页：id={this.props.match.params.id}*/}

        <div style={{height: 30}}></div>

        <div className="content-width">
          <div className="al-flex-justify-space-between">
            <WorkContentLeft workData={this.state.workData} />
            <WorkContentRight />
          </div>
        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    getWorkDetailByID(this.props.match.params.id).then(res => {
      this.setState({
        workData: res.data
      })
    });
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  // 获取作品详情


}

export default WorkDetailPage;
