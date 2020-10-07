import React, {useState} from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import "./style.css";
import WorkContentLeft from "./component/WorkContentLeft";
import WorkContentRight from "./component/WorkContentRight";
import {commonRequest, getWorkDetailByID} from "../../../../util/network/RequestHub";
import {Affix, Avatar, Button} from "antd";
import {GET_USER_ID, GET_WORK_BY_ID} from "../../../../util/network/config/ApiConst";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";


function HoverBox(props) {
  const [activeColor, setActiveColor] = useState(false);

  return (
    <div>
      <div className="al-border-capsule al-p-5px al-display-inline-block al-cursor-pointer al-m-bottom-20px al-box-shadow"
           onMouseEnter={() => {
             setActiveColor(true);
           }}
           onMouseLeave={() => {
             setActiveColor(false);
           }}
           style={{backgroundColor: activeColor ? "rgb(225,239,255)" : "rgb(255,255,255)"}}>
        <Avatar
          src={activeColor ? props.data.icon1 : props.data.icon0}
          size={30}/>
      </div>
    </div>
  );
}

class WorkDetailPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null,
      userInfo: null,
      activeColor: false,
      countData: [
        {
          icon0: require("../../../../assets/icon/common/dianzan0.png"),
          icon1: require("../../../../assets/icon/common/dianzan1.png"),
          title: "点赞",
          num: 666
        },
        {
          icon0: require("../../../../assets/icon/common/shoucang0.png"),
          icon1: require("../../../../assets/icon/common/shoucang1.png"),
          title: "收藏",
          num: 33
        },
        {
          icon0: require("../../../../assets/icon/common/xiaoxi0.png"),
          icon1: require("../../../../assets/icon/common/xiaoxi1.png"),
          title: "评论",
          num: 88
        },
      ]
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
          <ALHeader/>
        </div>
        {/*作品详情页：id={this.props.match.params.id}*/}

        <div style={{height: 30}}></div>

        <div className="content-width">
          <div className="al-flex-justify-space-between">
            <WorkContentLeft workData={this.state.workData}/>
            <WorkContentRight data={layoutRightData}/>
          </div>
        </div>

        <Affix offsetBottom={50}>
          <ALFlexBox column width={60} className="al-m-left-40px">
            {
              this.state.countData.map((item, index) => {
                return (
                  <HoverBox data={item} />
                );
              })
            }
          </ALFlexBox>
        </Affix>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    commonRequest({url: GET_WORK_BY_ID + this.props.match.params.id}).then(res => {
      this.setState({
        workData: res.data
      });

      commonRequest({url: GET_USER_ID, env: "mock"}).then(res => {
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
