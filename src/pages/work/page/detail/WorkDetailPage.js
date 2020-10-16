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
    <div style={props.style}>
      <div
        className="al-border-capsule al-p-5px al-display-inline-block al-cursor-pointer al-m-bottom-20px al-box-shadow"
        onMouseEnter={() => {
          setActiveColor(true);
        }}
        onMouseLeave={() => {
          setActiveColor(false);
        }}
        onClick={props.onClick}
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
      <div hidden={this.state.scrollTop <= 70}>
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
      </div>
    );

    const backTopData = {
      icon0: require("../../../../assets/icon/common/top0.png"),
      icon1: require("../../../../assets/icon/common/top1.png"),
      title: "点赞",
      num: 666
    };

    return this.workData === null ? <div></div> : (
      <div>
        <div style={{backgroundColor: "#fff"}}>
          {workInfoTop}
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

            {
              <HoverBox style={{visibility: this.state.scrollTop > 70 ? "" : "hidden"}} data={backTopData} onClick={this.handleBackToTop}/>
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

  handleBackToTop = () => {
    let timer = setInterval(() => {
      if (this.state.scrollTop === 0) {
        clearInterval(timer);
        return ;
      }
      let speed = Math.ceil(this.state.scrollTop / 5);
      this.setState({
        scrollTop: this.state.scrollTop - speed
      })

      this.handleBackToTop();
    }, 30);
    document.body.scrollTop = this.state.scrollTop;
    document.documentElement.scrollTop = this.state.scrollTop;

    // 滚动的高度
    this.setState({
      scrollTop: 0
    });
  }


}

export default WorkDetailPage;
