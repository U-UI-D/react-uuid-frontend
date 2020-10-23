import React from "react";
import {Carousel, Menu, Pagination, Avatar, Affix} from "antd";
import ShowWorkBox from "../work/component/show-work-box/ShowWorkBox";
import MenuItem from "antd/lib/menu/MenuItem";
import ShowJikeWorkBox from "./component/show-jike-work-box/ShowJikeWorkBox";
import {commonRequest} from "../../util/network/RequestHub";
import ShowDesigner from "./component/show-designer/ShowDesigner";
import {GET_CAROUSEL_ALL, GET_WORK_UI_ALL} from "../../util/network/config/ApiConst";
import {PATH_WORK_DETAIL} from "../../util/router/config/RouterConst";
import {ALFlexBox, ALFooter, ALLoading, ALPlaceBox, ALInlineWidthBox} from "../../components/al-component";

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

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return (
      <div>
        <div className="al-bg-color-white">
          <div className="content-width al-p-tb-20px">
            {/*轮播图*/}
            <Carousel autoplay>
              {
                this.state.carouselList === null ? <ALLoading/> :
                  this.state.carouselList.map((item, index) => {
                    return (
                      <div key={item.poster}>
                        <a href={item.url}>
                          <Avatar shape="square" src={item.poster} style={{height: 350 + 'px', width: 'auto'}}/>
                        </a>
                      </div>
                    );
                  })
              }
            </Carousel>
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
                <MenuItem key={"index"}>首页推荐</MenuItem>
                <MenuItem key={"lasted"}>最新作品</MenuItem>
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
                          this.goPage(PATH_WORK_DETAIL + "/" + item.id)
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
                              onShowSizeChange={(pageNum, pageSize) => {
                                console.log("pageNum", pageNum);
                                console.log("pageSize", pageSize);
                                commonRequest({url: GET_WORK_UI_ALL, data: {pageNum, pageSize}}).then(res => {
                                  this.setState({
                                    currentPageNum: pageNum,
                                    total: res.data.total,
                                    workData: res.data
                                  })
                                });
                              }}
                              onChange={(pageNum, pageSize) => {
                                console.log("pageNum", pageNum);
                                console.log("pageSize", pageSize);
                                this.setState({
                                  workData: null
                                });
                                commonRequest({url: GET_WORK_UI_ALL, data: {pageNum, pageSize: 20}}).then(res => {
                                  this.setState({
                                    currentPageNum: pageNum,
                                    total: res.data.total,
                                    workData: res.data
                                  })
                                });
                              }}/>

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


        <div className="al-box-size-20px"></div>
        <div className="al-bg-color-light-white">
          <ALFooter/>
        </div>

      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    //获取作品列表
    commonRequest({url: GET_WORK_UI_ALL, data: {pageNum: 1, pageSize: 20}}).then(res => {
      if (res.err === null){
        this.setState({
          workData: res.data,
          total: res.data.total
        })
      }else {
        this.setState({
          workData: null,
          total: 0
        })
      }
    });

    commonRequest({url: GET_CAROUSEL_ALL, env: "mock"}).then(res => {
      this.setState({
        carouselList: res.data
      })
    });

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

}

export default HomePage;
