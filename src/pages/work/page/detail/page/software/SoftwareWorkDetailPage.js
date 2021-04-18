import React from "react";
import "./style.scss";
import {Affix, message} from "antd";
import {ALFlexBox} from "@components/al-component";
import HoverBox from "../../component/hover-box/HoverBox";
import store from "@store";
import SoftwareWorkContent from "./component/SoftwareWorkContent";
import {connect} from "react-redux";
import InfoTopBar from "../../component/info-top-bar/InfoTopBar";
import {WorkDetailContext} from "../../context/WorkDetailContext";
import {WorkService} from "@service/work/WorkService";

function View(props) {
  const {history, workData, scrollTop, hoverBoxData} = props;
  const {handleChangeForHoverBox, handleBackToTop} = props;
  const backTopData = {
    icon0: require("../../../../../../assets/icon/common/top1.png"),
    icon1: require("../../../../../../assets/icon/common/top1.png"),
  };

  return workData && (
    <WorkDetailContext.Provider value={{...props}}>
      <div className="software-work-view">
        {/*向下滚动后再顶部显示用户信息*/}
        <div style={{backgroundColor: "#fff"}}>
          {
            workData &&
            <div hidden={scrollTop <= 70}>
              {
                workData && <InfoTopBar workData={workData} history={history} workType={'software'} />
              }
            </div>
          }
        </div>

        <div>
          <div className="top-box">
            <div className="top-bg" style={{backgroundImage: `url(${workData.poster})`}}></div>
          </div>

          <div className="content-width al-position-rela" style={{top: "-100px"}}>
            <SoftwareWorkContent workData={workData}/>
          </div>
        </div>

        {/*右侧点赞、收藏、评论、返回顶部的按钮*/}
        <Affix offsetBottom={50} className="al-float-right">
          <ALFlexBox column width={60} className="al-m-right-40px">
            {
              hoverBoxData.map((item, index) => {
                return (
                  <div key={index} >
                    <HoverBox data={item}
                              isChangeNum={item.title !== '评论'}
                              showFloatDot
                              onChange={handleChangeForHoverBox}/>
                  </div>
                );
              })
            }

            <HoverBox style={{visibility: scrollTop > 70 ? "" : "hidden"}}
                      data={backTopData} onClick={handleBackToTop}/>

          </ALFlexBox>
        </Affix>
      </div>
    </WorkDetailContext.Provider>
  );
}


class SoftwareDetailPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    const {userInfo} = store.getState();
    this.state = {
      workData: null,
      userInfo: userInfo,
      activeColor: false,
      hoverBoxData: [
        {
          icon0: require("../../../../../../assets/icon/common/dianzan0.png"),
          icon1: require("../../../../../../assets/icon/common/dianzan1.png"),
          title: "点赞",
          num: 0
        },
        {
          icon0: require("../../../../../../assets/icon/common/shoucang0.png"),
          icon1: require("../../../../../../assets/icon/common/shoucang1.png"),
          title: "收藏",
          num: 0
        },
        {
          icon0: require("../../../../../../assets/icon/common/xiaoxi0.png"),
          icon1: require("../../../../../../assets/icon/common/xiaoxi1.png"),
          title: "评论",
          num: 0
        },
      ],
      countData: {},
      scrollTop: 0,
      isFollow: false,
    }
  }

  //渲染函数
  render() {
     return (
       <View {...this.state} {...this.props}
             handleChangeForHoverBox={this.handleChangeForHoverBox}
             handleBackToTop={this.handleBackToTop} />
     );
  }

  //组件挂载完成时调用
  componentDidMount() {
    window.addEventListener('scroll', this.bindHandleScroll);
    this.getWorkDataById();
  }

  //组件卸载前调用
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll);
    console.log("newWorkData", this.state.newWorkData);
  }

  // 获取作品
  getWorkDataById = () => {
    let workId = this.props.match.params.id;
    if (!workId) {
      message.warning("没有作品ID");
      return ;
    }
    WorkService.getSoftwareWorkDataById(workId).then(res => {
      console.warn('test-> SoftwareWorkDetailPage.js', res);
      let {hoverBoxData, countData} = this.state;
      let data = res;
      hoverBoxData[0].num = countData.likeCount = data.likeCount;
      hoverBoxData[1].num = countData.favorCount = data.favorCount;
      hoverBoxData[2].num = countData.commentCount = data.commentCount;

      this.setState({
        workData: res,
        hoverBoxData: hoverBoxData,
        countData
      });

      this.increaseLookCount();
    }).catch(err => {
      message.warning("获取数据失败");
    })
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
        return;
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

  handleChangeForHoverBox = (data) => {
    console.log("HoverBox data", data)
    let {countData} = this.state;

    switch (data.title) {
      case "点赞":
        countData.likeCount = data.num;
        break;
      case "收藏":
        countData.favorCount = data.num;
        break;
      case "评论":
        countData.commentCount = data.num;
        break;
      default:
        break;
    }
  }

  increaseLookCount = () => {
    const {workData} = this.state;
    workData.lookCount = ++workData.lookCount;
    this.setState({workData});
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(SoftwareDetailPage);
