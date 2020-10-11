import React from "react";
import {Spin, Button, Carousel, Menu, Pagination, Avatar} from "antd";
import ALHeader from "../../components/al-header/ALHeader";
import ALFooter from "../../components/al-footer/ALFooter";
import ShowWorkBox from "../work/component/show-work-box/ShowWorkBox";
import MenuItem from "antd/lib/menu/MenuItem";
import ShowJikeWorkBox from "./component/show-jike-work-box/ShowJikeWorkBox";
import {commonRequest} from "../../util/network/RequestHub";
import ALLoading from "../../components/al-loading/ALLoading";
import ShowDesigner from "./component/show-designer/ShowDesigner";
import ALPlaceBox from "../../components/al-place-box/ALPlaceBox";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";
import {GET_CAROUSEL_ALL, GET_WORK_ALL} from "../../util/network/config/ApiConst";
import {WORK_DETAIL} from "../../util/router/config/RouterConst";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";

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
      currentPageNo: 1,
      carouselList: null,
    }
  }

  //渲染函数
  render() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return (
      <div>
        <div className="al-bg-color-white">
          <ALHeader/>
        </div>
        <div className="al-box-size-20px"></div>


        <div className="content-width">
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
          <br/>

          {/*标题*/}
          <div className="al-m-tb-20px">
            <Menu mode="horizontal">
              <MenuItem>首页推荐</MenuItem>
              <MenuItem>即刻作品</MenuItem>
              <MenuItem>最新作品</MenuItem>
              <MenuItem>佳作分享</MenuItem>
            </Menu>
          </div>

          {/*作品列表*/}
          <div>
            {/*作品列表*/}
            <div>
              {
                this.state.workData === null ? <ALLoading show/> :
                  <ALFlexBox between wrap>
                    {
                      this.state.workData.list.map((item, index) => {
                        return <div key={index} onClick={() => {
                          this.goPage(WORK_DETAIL + "/" + item.id)
                        }}>
                          <ShowWorkBox workInfo={item}/>
                        </div>
                      })
                    }
                  </ALFlexBox>
              }
            </div>

            {/*分页*/}
            <ALFlexBox centerH className="al-m-tb-20px">
              {

                <ALInlineWidthBox>
                  <Pagination current={this.state.currentPageNum}
                              total={56}
                              onChange={(pageNum, pageSize) => {
                                console.log(pageNum);
                                console.log(pageSize);
                                this.setState({
                                  workData: null
                                })
                                commonRequest({url: GET_WORK_ALL, data: {pageNum, pageSize: 20}}).then(res => {
                                  this.setState({
                                    pagination: {
                                      currentPageNum: pageNum,
                                    },
                                    workData: res.data
                                  })
                                });
                              }} />

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
    commonRequest({url: GET_WORK_ALL, data: {pageNum: 1, pageSize: 20}}).then(res => {
      this.setState({workData: res.data})
    });

    commonRequest({url: GET_CAROUSEL_ALL, env: "mock"}).then(res => {
      this.setState({
        carouselList: res.data
      })
    })
  }

  //组件卸载前调用
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    }
  }


  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

}

export default HomePage;
