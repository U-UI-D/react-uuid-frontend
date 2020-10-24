import React, {useState} from "react";
import "./style.css";
import WorkContentLeft from "./component/WorkContentLeft";
import {commonRequest} from "../../../../util/network/RequestHub";
import {Affix, Avatar, Button} from "antd";
import {GET_USER_ID, GET_WORK_UI_BY_ID} from "../../../../util/network/config/ApiConst";
import {getUserInfoFromLocalStorage} from "../../../../util/util";
import {ALFlexBox} from "../../../../components/al-component";
import {HoverBox} from "./component/HoverBox";



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
          num: 0
        },
        {
          icon0: require("../../../../assets/icon/common/shoucang0.png"),
          icon1: require("../../../../assets/icon/common/shoucang1.png"),
          title: "收藏",
          num: 0
        },
        {
          icon0: require("../../../../assets/icon/common/xiaoxi0.png"),
          icon1: require("../../../../assets/icon/common/xiaoxi1.png"),
          title: "评论",
          num: 0
        },
      ],

      scrollTop: 0,
      isFollow: false,
      dotNums: []
    }
  }

  //渲染函数
  render() {
    const {workData} = this.state;

    const workInfoTop =
    (
      // 向下滚动后在顶部显示用户信息
      <div hidden={this.state.scrollTop <= 70}>
        <Affix offsetTop={0} className="animate">
          <ALFlexBox centerV className="al-bg-color-white work-info-top" style={{height: "70px"}}>
            <ALFlexBox between className="content-width">
              <ALFlexBox centerV>
                <Avatar size={60} shape="circle" src={workData === null ? "" : workData.avatar}/>

                <ALFlexBox column centerH evenly className="al-m-left-10px">
                  <div className="al-font-weight-bold">{workData === null ? "" : workData.title}</div>
                  <div>
                    {workData === null ? "" : workData.nickname}
                    <Button type="link" className="al-m-lr-10px" onClick={() => {this.setState({isFollow: !this.state.isFollow})}}>
                      {this.state.isFollow ? "已关注" : "关注"}
                    </Button>
                  </div>
                </ALFlexBox>
              </ALFlexBox>

              <ALFlexBox centerVH className="appendix" padding={10}>
                <div className="al-m-right-10px">
                  附件
                  <span className="al-p-lr-10px">12MB</span>
                </div>
                <a>下载</a>
              </ALFlexBox>
            </ALFlexBox>
          </ALFlexBox>
        </Affix>
      </div>
    );

    const backTopData = {
      icon0: require("../../../../assets/icon/common/top1.png"),
      icon1: require("../../../../assets/icon/common/top1.png"),
    };

    return this.workData === null ? <div></div> : (
      <div>

        {/*向下滚动后再顶部显示用户信息*/}
        <div style={{backgroundColor: "#fff"}}>
          {workInfoTop}
        </div>


        {/*作品详情页：id={this.props.match.params.id}*/}

        <div style={{height: 30}}></div>

        <div className="content-width">
          <WorkContentLeft workData={this.state.workData}/>
        </div>

        {/*右侧点赞、收藏、评论、返回顶部的按钮*/}
        <Affix offsetBottom={50} className="al-float-right">
          <ALFlexBox column width={60} className="al-m-right-40px">
            {
              this.state.countData.map((item, index) => {
                return (
                  <HoverBox key={index}
                            data={item}
                            showFloatDot
                            onChange={this.handleChangeForHoverBox}/>
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


    commonRequest({url: GET_WORK_UI_BY_ID + this.props.match.params.id}).then(res => {
      let arr = [];
      arr.push(res.data.likeCount);
      arr.push(res.data.favorCount);
      arr.push(res.data.commentCount);

      let countData = this.state.countData;
      arr.map((item, index) => {
        countData[index].num = item;
      })

      this.setState({
        workData: res.data,
        countData: countData
      });

      console.log("countData", this.state.countData);


      // commonRequest({url: GET_USER_ID + "/" + res.data.userId}).then(res => {
      //   this.setState({
      //     userInfo: res.data
      //   })
      // })
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

  handleChangeForHoverBox = (data) => {
    console.log("HoverBox data", data)
  }


}

export default WorkDetailPage;
