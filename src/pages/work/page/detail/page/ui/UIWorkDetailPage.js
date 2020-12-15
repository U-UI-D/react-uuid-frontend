import React from "react";
import "./style.css";
import UIWorkContent from "./component/UIWorkContent";
import {commonRequest} from "../../../../../../util/network/RequestHub";
import {Affix, Avatar, Button} from "antd";
import {GET_WORK_UI_BY_ID} from "../../../../../../util/network/config/ApiConst";
import {ALFlexBox} from "../../../../../../components/al-component";
import HoverBox from "../../component/HoverBox";
import store from "../../../../../../store";
import {PATH_LOGIN} from "../../../../../../util/router/config/RouterConst";
import {connect} from "react-redux";

class UIWorkDetailPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    const {userInfo, isLogin} = store.getState();
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
      isLogin: isLogin
    }
  }

  //渲染函数
  render() {
    const {workData} = this.state;
    const workInfoTop = workData === null ? <></> :
      (
        // 向下滚动后在顶部显示用户信息
        <div hidden={this.state.scrollTop <= 70}>
          <Affix offsetTop={0} className="animate">
            <ALFlexBox centerV className="al-bg-color-white work-info-top" style={{height: "70px"}}>
              <ALFlexBox between className="content-width">
                <ALFlexBox centerV>
                  <Avatar size={60} shape="circle" src={workData.avatar}/>

                  <ALFlexBox column centerH evenly className="al-m-left-10px">
                    <div className="al-font-weight-bold">{workData.title}</div>
                    <div>
                      {workData.nickname}
                      {
                        this.props.isLogin ?
                          (
                            <Button type="link" className="al-m-lr-10px" onClick={() => {
                              this.setState({isFollow: !this.state.isFollow})
                            }}>
                              {
                                workData.userId === this.state.userInfo.id ? <></> :
                                  <span>
                                    {this.state.isFollow ? "已关注" : "关注"}
                                  </span>
                              }
                            </Button>
                          )
                          :
                          (
                            <Button type="link" className="al-m-lr-10px" onClick={() => {
                              this.props.history.push({pathname: PATH_LOGIN, state: {fromPath: this.props.match.url}})
                            }}>关注</Button>
                          )
                      }

                    </div>
                  </ALFlexBox>
                </ALFlexBox>

                <ALFlexBox centerVH>

                  <Button style={{height: "50px", marginRight: "10px"}} shape="round">
                    添加到我的项目
                  </Button>

                  <Button style={{height: "50px"}} shape="round">
                    <span>附件下载</span>
                    <span className="al-p-left-10px">12MB</span>
                  </Button>
                </ALFlexBox>
              </ALFlexBox>
            </ALFlexBox>
          </Affix>
        </div>
      );

    const backTopData = {
      icon0: require("../../../../../../assets/icon/common/top1.png"),
      icon1: require("../../../../../../assets/icon/common/top1.png"),
    };

    return workData === null ? <></> : (
      <div>
        {/*向下滚动后再顶部显示用户信息*/}
        <div style={{backgroundColor: "#fff"}}>
          {workInfoTop}
        </div>


        {/*作品详情页：id={this.props.match.params.id}*/}


        <div>
          <div className="top-box">
            <div className="top-bg" style={{backgroundImage: `url(${workData.poster})`}}></div>
          </div>

          <div className="content-width al-position-rela" style={{top: "-100px"}}>
            <UIWorkContent workData={this.state.workData}/>
          </div>
        </div>

        {/*右侧点赞、收藏、评论、返回顶部的按钮*/}
        <Affix offsetBottom={50} className="al-float-right">
          <ALFlexBox column width={60} className="al-m-right-40px">
            {
              this.state.hoverBoxData.map((item, index) => {
                return (
                  <div key={index}>
                    <HoverBox data={item}
                              isChangeNum={item.title !== '评论'}
                              showFloatDot
                              onChange={this.handleChangeForHoverBox}/>
                  </div>
                );
              })
            }

            {
              <HoverBox style={{visibility: this.state.scrollTop > 70 ? "" : "hidden"}}
                        data={backTopData} onClick={this.handleBackToTop}/>
            }

          </ALFlexBox>
        </Affix>

      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

    console.log("props", this.props);

    commonRequest({url: GET_WORK_UI_BY_ID + this.props.match.params.id}).then(res => {
      if (res.err === null) {
        let {hoverBoxData, countData} = this.state;
        hoverBoxData[0].num = countData.likeCount = res.data.likeCount;
        hoverBoxData[1].num = countData.favorCount = res.data.favorCount;
        hoverBoxData[2].num = countData.commentCount = res.data.commentCount;

        this.setState({
          workData: res.data,
          hoverBoxData: hoverBoxData,
          countData
        });

        this.increaseLookCount();
      }

    });

    window.addEventListener('scroll', this.bindHandleScroll);
  }

  //组件卸载前调用
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll);
    console.log("newWorkData", this.state.newWorkData);
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateName(data){
      let action = {
        type: "updateName",
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UIWorkDetailPage);