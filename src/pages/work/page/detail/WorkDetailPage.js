import React from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import "./style.css";
import WorkContentLeft from "./component/WorkContentLeft";
import WorkContentRight from "./component/WorkContentRight";
import {commonRequest, getWorkDetailByID} from "../../../../util/network/RequestHub";
import {Affix} from "antd";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class WorkDetailPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null,
      userInfo: null
    }
  }

  //渲染函数
  render() {
    let layoutRightData = {
      userInfo: this.state.userInfo
    }
    return this.workData === null ? <div></div> : (
      <div>
        <div style={{backgroundColor: "#fff"}}>
          <ALHeader />
        </div>
        {/*作品详情页：id={this.props.match.params.id}*/}

        <div style={{height: 30}}></div>

        <div className="content-width">
          <div className="al-flex-justify-space-between">
            <WorkContentLeft workData={this.state.workData} />
            <Affix offsetTop={20}>
              <WorkContentRight data={layoutRightData} />
            </Affix>

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
      });

      commonRequest({mockURL: "/user/user.json", env: "mock"}).then(res => {
        this.setState({
          userInfo: res.data
        })
      })
    });
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  // 获取作品详情


}

export default WorkDetailPage;
