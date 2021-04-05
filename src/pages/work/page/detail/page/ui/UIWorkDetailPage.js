import React from "react";
import "./style.css";
import UIWorkContent from "./component/work-content/UIWorkContent";
import {Affix, message, Anchor } from "antd";
import {ApiConst, GET_WORK_UI_BY_ID} from "../../../../../../util/network/config/ApiConst";
import {ALFlexBox} from "../../../../../../components/al-component";
import HoverBox from "../../component/HoverBox";
import {connect} from "react-redux";
import InfoTopBar from "./component/info-top-bar";
import {WorkDetailContext} from "../../context/WorkDetailContext";
import RightBottomBar from "./component/right-bottom-bar";
import {HttpRequest} from "../../../../../../util/network/request";

class UIWorkDetailPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    let contextAction = {
      updateName: this.updateName,
      setIsFollow: this.setIsFollow
    }

    this.state = {
      ...contextAction,
      workData: null,
      userInfo: this.props.userInfo,
      activeColor: false,
      commentList: [],
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
      isLogin: this.props.isLogin,
      history: this.props.history,
      match: this.props.match,
      backTopData: {
        icon0: require("../../../../../../assets/icon/common/top1.png"),
        icon1: require("../../../../../../assets/icon/common/top1.png"),
      }
    }
  }

  setIsFollow = (isFollow) => {
    this.setState({isFollow: isFollow})
  }

  //渲染函数
  render() {
    const {workData} = this.state;
    const {Link} = Anchor;

    const backTopData = {
      icon0: require("../../../../../../assets/icon/common/top1.png"),
      icon1: require("../../../../../../assets/icon/common/top1.png"),
    };

    const jsx = (
      <div>
        {/*向下滚动后再顶部显示用户信息*/}
        <div style={{backgroundColor: "#fff"}}>
          {
            workData === null ? <></> :
              (
                // 向下滚动后在顶部显示用户信息
                <div hidden={this.state.scrollTop <= 70}>
                  <InfoTopBar workData={workData} history={this.props.history} />
                </div>
              )
          }
        </div>

        {/*显示内容*/}
        <div>
          <div className="content-width" style={{marginTop: '20px'}}>
            <UIWorkContent workData={this.state.workData} history={this.props.history}/>
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
                              onChange={this.handleChangeForHoverBox}
                              onClick={() => {
                                console.log("点击了" + item.title);
                              }}/>
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
{/*        <RightBottomBar handleChangeForHoverBox={this.handleChangeForHoverBox}
                        handleBackToTop={this.handleBackToTop}
                        scrollTop={this.state.scrollTop}
        />*/}

      </div>
    );

    return workData === null ? <></> : (

      <WorkDetailContext.Provider value={{...this.state}}>
        {jsx}
      </WorkDetailContext.Provider>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

    this.getWorkDataById();

    window.addEventListener('scroll', this.bindHandleScroll);
  }

  //组件卸载前调用
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll);
  }

  componentDidCatch(error, errorInfo) {
    this.goPage("/");
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  // 处理滚动
  bindHandleScroll = (event) => {
    // 滚动的高度
    const scrollTop = event.target.documentElement.scrollTop;
    this.setState({
      scrollTop
    })
  }

  // 返回顶部
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

  // 点击hover box
  handleChangeForHoverBox = (data) => {
    console.log("HoverBox data", data)
    let {countData} = this.state;

    switch (data.title) {
      case "点赞":
        countData.likeCount = data.num;
        this.increaseLikeCount();
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

  // 获取作品
  getWorkDataById = () => {
    HttpRequest.get({
      url: ApiConst.work.ui.get.GET_BY_ID + this.props.match.params.id,
      env: 'dev'
    }).then(res => {
      if (res.err === null) {
        let {hoverBoxData, countData} = this.state;
        let data = res.data.data;
        hoverBoxData[0].num = countData.likeCount = data.likeCount;
        hoverBoxData[1].num = countData.favorCount = data.favorCount;
        hoverBoxData[2].num = countData.commentCount = data.commentCount;

        this.setState({
          workData: res.data.data,
          hoverBoxData: hoverBoxData,
          countData
        });

        this.increaseLookCount();
      }
    })
  }

  // 增加浏览量
  increaseLookCount = () => {
    const {workData, userInfo} = this.state;
    HttpRequest.put({
      env: 'dev',
      url: ApiConst.work.common.increase.lookCount,
      data: {
        userId: this.props.isLogin ? userInfo.id : null,
        workId: workData.id,
        workType: 'ui'
      }
    }).then(res => {
      if (res.err === null) {
        // this.setState({workData});
      }
    })
  }

  // TODO 增加点赞量
  increaseLikeCount = () => {
    // TODO
  }

}

UIWorkDetailPage.contextType = WorkDetailContext;

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(UIWorkDetailPage);
