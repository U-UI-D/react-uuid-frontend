import React, {useState} from "react";
import ALHeader from "../../../../components/al-header/ALHeader";
import "./style.css";
import WorkContentLeft from "./component/WorkContentLeft";
import WorkContentRight from "./component/WorkContentRight";
import {commonRequest, getWorkDetailByID} from "../../../../util/network/RequestHub";
import {Affix, Avatar, BackTop, Button} from "antd";
import {GET_USER_ID, GET_WORK_BY_ID} from "../../../../util/network/config/ApiConst";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import {getUserInfoFromLocalStorage} from "../../../../util/util";


function HoverBox(props) {
  const [activeColor, setActiveColor] = useState(false);

  return (
    <div>
      <div
        className="al-border-capsule al-p-5px al-display-inline-block al-cursor-pointer al-m-bottom-20px al-box-shadow"
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
      ],

      scrollTop: 0,
    }
  }

  //渲染函数
  render() {
    let layoutRightData = {
      userInfo: this.state.userInfo
    }

    let userInfo = getUserInfoFromLocalStorage();
    const {workData} = this.state;

    const workInfoTop = (
      <Affix offsetTop={0} className="animate">
        <ALFlexBox centerV className="al-bg-color-white work-info-top" style={{height: "70px"}}>
          <div className="content-width">
            <ALFlexBox centerV className="">
              <Avatar size={60} shape="circle" src={userInfo.avatar}/>

              <ALFlexBox column centerH className="al-m-left-10px">
                <h3>{workData === null ? "" : workData.title}</h3>
                <div>
                  {userInfo.nickname}
                  <Button type="link" className="al-m-lr-10px">关注</Button>
                </div>
              </ALFlexBox>
            </ALFlexBox>
          </div>
        </ALFlexBox>
      </Affix>
    );

    const backTopData = {
      icon0: require("../../../../assets/icon/common/dianzan0.png"),
      icon1: require("../../../../assets/icon/common/dianzan1.png"),
      title: "点赞",
      num: 666
    };

    return this.workData === null ? <div></div> : (
      <div>
        <div style={{backgroundColor: "#fff"}}>
          {
            this.state.scrollTop > 70 ? workInfoTop : <ALHeader/>
          }
        </div>


        {/*作品详情页：id={this.props.match.params.id}*/}

        <div style={{height: 30}}></div>

        <div className="content-width">
          <WorkContentLeft workData={this.state.workData}/>

          {/*<div className="al-flex-justify-space-between">*/}
          {/*  <WorkContentRight data={layoutRightData}/>*/}
          {/*</div>*/}
        </div>

        <Affix offsetBottom={50} className="al-float-right">
          <ALFlexBox column width={60} className="al-m-right-40px">
            {
              this.state.countData.map((item, index) => {
                return (
                  <HoverBox data={item}/>
                );
              })
            }

          </ALFlexBox>
        </Affix>

        <BackTop>
          <div className="al-m-right-40px">
            <HoverBox data={backTopData}/>
          </div>
        </BackTop>


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

    window.addEventListener('scroll', this.bindHandleScroll);
  }

  //组件卸载前调用
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll);
  }

  bindHandleScroll = (event) => {
    // 滚动的高度
    const scrollTop = event.target.documentElement.scrollTop;
    this.setState({
      scrollTop
    })
  }


}

export default WorkDetailPage;
