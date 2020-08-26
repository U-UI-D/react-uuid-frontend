import React from "react";
import {Menu, message, Pagination, Spin} from "antd";
import ALHeader from "../../components/al-header/ALHeader";
import ALFooter from "../../components/al-footer/ALFooter";
import MenuItem from "antd/lib/menu/MenuItem";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ShowWorkBox from "../home/component/show-work-box/ShowWorkBox";
import {request} from "../../util/network/NetworkRequest";

class WorkPage extends React.Component{
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
      loading: true
    }
  }

  //渲染函数
  render() {

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;


    let workList = this.state.workList2;

    return workList === null ? <div>

    </div> : (
      <div style={{backgroundColor: "#eff3f5"}}>
        <div className="al-bg-color-white">
          <ALHeader />
        </div>
        <div className="al-box-size-20px"></div>


        <div >
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
              {/*作品列表*/}
              {
                this.state.loading ?
                    <div className="al-flex-container-center-vh" style={{height: 200+'px'}}>
                      <Spin size="large" />
                    </div>
                    :
                    <div>
                      {
                        workList.map((item, index) => {
                          return <span key={index} onClick={() => {
                            this.goPage("/work/detail/" + (index + 1))
                          }}>
                      <ShowWorkBox workInfo={item}  />
                    </span>
                        })
                      }
                    </div>
              }

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
    this.getWorkList();
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) =>{
    this.props.history.push({pathname: path, state: {}})
  }

  getWorkList = () => {
    let url = "http://localhost:9002/work";
    request({
      url: url,
      method: 'GET',
      data: {}
    }).then(res => {
      console.log(res);
      this.setState({
        workList2: res.data.data,
        loading: false
      })
    }).catch(err => {
      message.warning("网络错误，请稍候重试！");
      console.log(err);
    });
  }

}

export default WorkPage;
