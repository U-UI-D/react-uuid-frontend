import React from "react";
import {Carousel, Menu, Pagination, Avatar, Affix} from "antd";
import ShowWorkBox from "../work/component/show-work-box/ShowWorkBox";
import MenuItem from "antd/lib/menu/MenuItem";
import ShowJikeWorkBox from "./component/show-jike-work-box/ShowJikeWorkBox";
import {commonRequest} from "../../util/network/RequestHub";
import ShowDesigner from "./component/show-designer/ShowDesigner";
import {ApiConst, GET_CAROUSEL_ALL, GET_WORK_UI_ALL} from "../../util/network/config/ApiConst";
import {PATH_WORK_UI_DETAIL} from "../../util/router/config/RouterConst";
import {ALFlexBox, ALLoading, ALPlaceBox, ALInlineWidthBox} from "../../components/al-component";
import ShowCarousel from "./component/show-carousel/ShowCarousel";
import {HttpRequest} from "../../util/network/request";
import {ActionTypes} from "../../store/action-types";
import {connect} from "react-redux";

class HomePage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null,
      jikeWorkList: [
        {
          poster: require("../../assets/image/home/jike1.png"),
          title: "迟来的永中优云提案作品集",
          tag: "原创",
          look: 3429,
          comment: 543,
          favor: 243,
          user: {
            avatar: require("../../assets/image/home/avatar1.jpg"),
            nickname: "迷失方向的龙龙"
          }
        },
        {
          poster: require("../../assets/image/home/jike2.png"),
          title: "迟来的永中优云提案作品集",
          tag: "原创",
          look: 3429,
          comment: 543,
          favor: 243,
          user: {
            avatar: require("../../assets/image/home/avatar1.jpg"),
            nickname: "迷失方向的龙龙"
          }
        },
        {
          poster: require("../../assets/image/home/jike3.png"),
          title: "迟来的永中优云提案作品集",
          tag: "原创",
          look: 3429,
          comment: 543,
          favor: 243,
          user: {
            avatar: require("../../assets/image/home/avatar1.jpg"),
            nickname: "迷失方向的龙龙"
          }
        },
        {
          poster: require("../../assets/image/home/jike4.png"),
          title: "迟来的永中优云提案作品集",
          tag: "原创",
          look: 3429,
          comment: 543,
          favor: 243,
          user: {
            avatar: require("../../assets/image/home/avatar1.jpg"),
            nickname: "迷失方向的龙龙"
          }
        },
        {
          poster: require("../../assets/image/home/jike5.png"),
          title: "迟来的永中优云提案作品集",
          tag: "原创",
          look: 3429,
          comment: 543,
          favor: 243,
          user: {
            avatar: require("../../assets/image/home/avatar1.jpg"),
            nickname: "迷失方向的龙龙"
          }
        }
      ],
      // pagination
      currentPageNum: 1,
      currentPageSize: 20,
      total: 0,
      carouselList: null,
      scrollTop: 0,
      showTitleBoxShadow: false
    }
  }

  //渲染函数
  render() {

    return (
      <div>
        <div className="al-bg-color-white">
          <div className="content-width al-p-tb-20px">
            {/*轮播图*/}
            <ShowCarousel />
          </div>

          {/*标题*/}
          <Affix offsetTop={0}
                 onChange={(val) => {
                   this.setState({
                     showTitleBoxShadow: val
                   })

                 }}>
            <div id="index-menu-title"
                 className={`al-bg-color-white ${this.state.showTitleBoxShadow ? 'al-box-shadow' : ''}`}>

              <Menu mode="horizontal" defaultSelectedKeys={["index"]}>
                <MenuItem key={"index"} onClick={() => {this.getWorkData('look_count')}}>首页推荐</MenuItem>
                <MenuItem key={"lasted"} onClick={() => {this.getWorkData('created_time')}}>最新作品</MenuItem>
              </Menu>
            </div>

          </Affix>
        </div>


        <div className="content-width al-p-tb-20px">
          {/*作品列表*/}
          <ALPlaceBox height={20}/>
          <div style={{marginLeft: "15px"}}>
            {
              this.state.workData === null ?
                <ALLoading show height={200}/>
                :
                <ALFlexBox wrap margin={-15}>
                  {
                    this.state.workData.list.map((item, index) => {
                      return (
                        <div key={index} onClick={() => {
                          this.goPage(PATH_WORK_UI_DETAIL + "/" + item.id)
                        }}>
                          <ShowWorkBox workInfo={item}/>
                        </div>
                      )
                    })
                  }
                </ALFlexBox>
            }

            {/*分页*/}
            <ALFlexBox centerH className="al-m-tb-20px">
              {
                <ALInlineWidthBox>
                  <Pagination current={this.state.currentPageNum}
                              total={this.state.total}
                              defaultPageSize={this.state.currentPageSize}
                              pageSizeOptions={["20", "40", "60", "80", "100"]}
                              hideOnSinglePage
                              onShowSizeChange={this.handlePageChange}
                              onChange={this.handlePageChange}/>

                </ALInlineWidthBox>
              }
            </ALFlexBox>
          </div>

        </div>

        {/*即刻作品*/}
        <div style={{backgroundColor: "#e9eef2"}} className="al-p-tb-30px">
          <div className="content-width">
            <h2>热门即刻</h2>
            <div className="al-m-top-20px">
              <div className="al-flex-container al-flex-justify-space-between">
                {
                  this.state.jikeWorkList.map((item, index) => {
                    return <ShowJikeWorkBox workJike={item} key={index}/>
                  })
                }
              </div>
            </div>
          </div>
        </div>

        <ALPlaceBox height={30}/>
        {/*显示设计师*/}
        <div className="content-width">
          <h2>设计师/开发者推荐</h2>
          <ShowDesigner/>
        </div>

      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    //获取作品列表
    this.getWorkData('look_count');
    this.props.updateCurrentHeaderTitle('首页');
    window.addEventListener('scroll', this.bindHandleScroll);
  }

  //组件卸载前调用
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }

    window.removeEventListener('scroll', this.bindHandleScroll);

  }

  bindHandleScroll = (event) => {
    // 滚动的高度
    const scrollTop = event.target.documentElement.scrollTop;
    this.setState({
      scrollTop
    })
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  // 获取作品数据
  getWorkData = (orderBy, pageNum=1, pageSize=20) => {
    HttpRequest.get({
      url: `${ApiConst.work.ui.get.GET_ALL}?orderBy=${orderBy}&pageNum=${pageNum}&pageSize=${pageSize}&typename=`,
      env: 'dev'
    }).then(res => {
      if (res.err === null){
        this.setState({
          currentPageNum: pageNum,
          workData: res.data.data,
          total: res.data.data.total
        })
      }else {
        this.setState({
          workData: null,
          total: 0
        })
      }
    })
  }

  // 处理页面大小改变，重新获取作品列表
  handlePageChange = (pageNum, pageSize) => {
    this.getWorkData('', pageNum, pageSize);
  }

}

const mapStateToProps = (state) => {
  return {
    currentHeaderTitle: state.currentHeaderTitle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentHeaderTitle(data) {
      let action = {
        type: ActionTypes.header.UPDATE_CURRENT_HEADER_TITLE,
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
