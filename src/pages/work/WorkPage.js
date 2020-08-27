import React from "react";
import {Menu, message, Pagination, Spin} from "antd";
import ALHeader from "../../components/al-header/ALHeader";
import ALFooter from "../../components/al-footer/ALFooter";
import MenuItem from "antd/lib/menu/MenuItem";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ShowWorkBox from "../home/component/show-work-box/ShowWorkBox";
import {getWorkList} from "../../util/network/RequestHub";

class WorkPage extends React.Component {
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
      workList2: [],
      loading: true,
      currentPageNo: 1
    }
  }

  //渲染函数
  render() {
    return this.state.workData === null ? <div>

    </div> : (
        <div style={{backgroundColor: "#eff3f5"}}>
          <div className="al-bg-color-white">
            <ALHeader/>
          </div>
          <div className="al-box-size-20px"></div>

          <div>
            <div className="content-width">
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
                {
                  this.state.loading ?
                      <div className="al-flex-container-center-vh" style={{height: 200 + 'px'}}>
                        <Spin size="large"/>
                      </div>
                      :
                      <div>
                        {
                          this.state.workData.list.map((item, index) => {
                            return <span key={index} onClick={() => {
                              this.goPage("/work/detail/" + item.id)
                            }}>
                      <ShowWorkBox workInfo={item}/>
                    </span>
                          })
                        }
                      </div>
                }

                {/*分页*/}
                <div className="al-flex-container-center-vh">
                  <div>
                    {
                      this.state.workData === null ? <div></div>
                          :
                          <ALInlineWidthBox>
                            <Pagination current={this.state.currentPageNo}
                                        total={50} onChange={(page, pageSize) => {
                              console.log(page);
                              console.log(pageSize);
                              getWorkList(page).then(res => {
                                this.setState({
                                  currentPageNo: page
                                })
                              });
                            }} />

                          </ALInlineWidthBox>
                    }
                  </div>
                </div>
              </div>
            </div>

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
      this.setState({
        workData: res.data,
        loading: false
      })
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: {}})
  }


}

export default WorkPage;
