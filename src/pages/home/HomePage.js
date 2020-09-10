import React from "react";
import {Spin, Button, Carousel, Menu, Pagination, Avatar} from "antd";
import ALHeader from "../../components/al-header/ALHeader";
import ALFooter from "../../components/al-footer/ALFooter";
import ShowWorkBox from "./component/show-work-box/ShowWorkBox";
import MenuItem from "antd/lib/menu/MenuItem";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ShowJikeWorkBox from "./component/show-jike-work-box/ShowJikeWorkBox";
import {getWorkList} from "../../util/network/RequestHub";
import ALLoading from "../../components/al-loading/ALLoading";
import {getUserInfoFromLocalStorage} from "../../util/util";
import ShowDesigner from "./component/show-designer/ShowDesigner";
import ALPlaceBox from "../../components/al-place-box/ALPlaceBox";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";

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
      carouselList: [
        {
          title: "",
          poster: 'https://img.ui.cn/data/upload/202008/1598162172_155?imageView/1/w/1480/h/350',
          url: "/"
        },
        {
          title: "",
          poster: 'https://img.ui.cn/data/upload/202008/1597827366_118?imageView/1/w/1480/h/350',
          url: "/"
        },
        {
          title: "",
          poster: 'https://img.ui.cn/data/upload/202008/1597723301_547?imageView/1/w/1480/h/350',
          url: "/"
        },


      ],
    }
  }

  //渲染函数
  render() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return (
        <div style={{backgroundColor: "#eff3f5"}}>
          <div className="al-bg-color-white">
            <ALHeader/>
          </div>
          <div className="al-box-size-20px"></div>


          <div className="content-width">
            {/*轮播图*/}
            <Carousel autoplay>
              {
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
            <div>
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
                              this.goPage("/work/detail/" + (index + 1))
                            }}>
                              <ShowWorkBox workInfo={item}/>
                              </div>
                          })
                        }
                      </ALFlexBox>
                }
              </div>

              {/*分页*/}
              <div className="al-flex-container-center-vh">
                <div>
                  {
                    this.state.workData === null ? <div></div> :
                        <ALInlineWidthBox>
                          <Pagination current={this.state.currentPageNo}
                                      total={this.state.workData.total}
                                      onChange={(page, pageSize) => {
                                        console.log(page);
                                        console.log(pageSize);
                                        this.setState({
                                          currentPageNo: page
                                        })
                                      }}/>
                        </ALInlineWidthBox>
                  }
                </div>
              </div>
            </div>

          </div>

          {/*即刻作品*/}
          <div style={{backgroundColor: "#e9eef2"}} className="al-p-tb-30px">
            <div className="content-width">
              <div>
                热门即刻
              </div>
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

          <ALPlaceBox height={30} />
          {/*显示设计师*/}
          <div className="content-width">
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
    getWorkList().then(res => {
      this.setState({workData: res.data})
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

}

export default HomePage;
