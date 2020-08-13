import React from "react";
import {Button, Carousel, Menu, Pagination} from "antd";
import ALHeader from "../../components/al-header/ALHeader";
import ALFooter from "../../components/al-footer/ALFooter";
import ShowWorkBox from "./component/show-work-box/ShowWorkBox";
import MenuItem from "antd/lib/menu/MenuItem";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ShowJikeWorkBox from "./component/show-jike-work-box/ShowJikeWorkBox";

class HomePage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workList: [
        {
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
          poster: require("../../assets/image/home/poster1.jpg"),
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
      ]
    }
  }

  //渲染函数
  render() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;



    return(
      <div style={{backgroundColor: "#eff3f5"}}>
        <div className="al-bg-color-white">
          <ALHeader />
        </div>
        <div className="al-box-size-20px"></div>


        <div >
          <div className="content-width">
            {/*轮播图*/}
            <Carousel autoplay>
              <div className="al-box-size-200px al-bg-color-blue">1</div>
              <div className="al-box-size-200px al-bg-color-red">2</div>
              <div className="al-box-size-200px al-bg-color-green">3</div>
              <div className="al-box-size-200px al-bg-color-yellow">4</div>
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
                  this.state.workList.map((item, index) => {
                    return <span key={index} onClick={() => {
                      this.goPage("/work/detail/" + (index + 1))
                    }}>
                      <ShowWorkBox workInfo={item}  />
                    </span>
                  })
                }
              </div>

              {/*分页*/}
              <div className="al-flex-container-center-vh">
                <div>
                  <ALInlineWidthBox>
                    <Pagination current={1} total={50}  />
                  </ALInlineWidthBox>
                </div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: "#e9eef2"}}>
            <div className="content-width">
              <div>
                热门即刻
              </div>
              <div className="al-m-top-20px">
                <div className="al-flex-container al-flex-justify-space-between">
                  {
                    this.state.jikeWorkList.map((item, index) => {
                      return <ShowJikeWorkBox workJike={item} key={index} />
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="al-box-size-20px"></div>
        <div className="al-bg-color-light-white">
          <ALFooter />
        </div>

      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) =>{
    this.props.history.push({pathname: path, state: {}})
  }

}

export default HomePage;
