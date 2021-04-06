import React from "react";
import "./style.css";
import {commonRequest} from "../../../../../../util/network/RequestHub";
import {Affix, Avatar, Button} from "antd";
import {GET_WORK_SOFTWARE_BY_ID, GET_WORK_UI_BY_ID} from "../../../../../../util/network/config/ApiConst";
import {ALFlexBox} from "../../../../../../components/al-component";
import HoverBox from "../../component/HoverBox";
import store from "../../../../../../store";
import SoftwareWorkContent from "./component/SoftwareWorkContent";
import {PATH_LOGIN} from "../../../../../../util/router/config/RouterConst";
import {connect} from "react-redux";
import {HttpRequest} from "../../../../../../util/network/request";

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

                  <Button style={{height: "50px"}} shape="round">
                    <ALFlexBox centerVH>
                      <span className="al-m-right-10px">代码仓库</span>
                      <svg t="1603764483896" className="icon" viewBox="0 0 1024 1024" version="1.1"
                           xmlns="http://www.w3.org/2000/svg" p-id="2780" width="26" height="26">
                        <path
                          d="M512 12.672c-282.88 0-512 229.248-512 512 0 226.261333 146.688 418.133333 350.08 485.76 25.6 4.821333 34.986667-11.008 34.986667-24.618667 0-12.16-0.426667-44.373333-0.64-87.04-142.421333 30.890667-172.458667-68.693333-172.458667-68.693333C188.672 770.986667 155.008 755.2 155.008 755.2c-46.378667-31.744 3.584-31.104 3.584-31.104 51.413333 3.584 78.421333 52.736 78.421333 52.736 45.653333 78.293333 119.850667 55.68 149.12 42.581333 4.608-33.109333 17.792-55.68 32.426667-68.48-113.706667-12.8-233.216-56.832-233.216-253.013333 0-55.893333 19.84-101.546667 52.693333-137.386667-5.76-12.928-23.04-64.981333 4.48-135.509333 0 0 42.88-13.738667 140.8 52.48 40.96-11.392 84.48-17.024 128-17.28 43.52 0.256 87.04 5.888 128 17.28 97.28-66.218667 140.16-52.48 140.16-52.48 27.52 70.528 10.24 122.581333 5.12 135.509333 32.64 35.84 52.48 81.493333 52.48 137.386667 0 196.693333-119.68 240-233.6 252.586667 17.92 15.36 34.56 46.762667 34.56 94.72 0 68.522667-0.64 123.562667-0.64 140.202666 0 13.44 8.96 29.44 35.2 24.32C877.44 942.592 1024 750.592 1024 524.672c0-282.752-229.248-512-512-512"
                          fill="" p-id="2781"></path>
                      </svg>
                    </ALFlexBox>
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
            <SoftwareWorkContent workData={this.state.workData}/>
          </div>
        </div>

        {/*右侧点赞、收藏、评论、返回顶部的按钮*/}
        <Affix offsetBottom={50} className="al-float-right">
          <ALFlexBox column width={60} className="al-m-right-40px">
            {
              this.state.hoverBoxData.map((item, index) => {
                return (
                  <div key={index} >
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

    HttpRequest.get({
      url: GET_WORK_SOFTWARE_BY_ID + this.props.match.params.id,
      env: "dev"
    }).then(res => {
      if (res.err === null){
        let {hoverBoxData, countData} = this.state;
        hoverBoxData[0].num = countData.likeCount = res.data.likeCount;
        hoverBoxData[1].num = countData.favorCount = res.data.favorCount;
        hoverBoxData[2].num = countData.commentCount = res.data.commentCount;

        this.setState({
          workData: res.data.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(SoftwareDetailPage);
