import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import {commonRequest} from "../../util/network/RequestHub";
import ALLoading from "../../components/al-loading/ALLoading";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";
import {Avatar, Divider, Menu, Dropdown} from "antd";

class TopPage extends React.Component {

  //构造器
  constructor(props) {
    super(props);
    this.state = {
      topWorkData: null,
      topDesignerData: null,
      topDeveloperData: null,
      currentTab: "优秀作品榜",
      tabCardData: ["优秀作品榜", "人气设计师榜", "人气开发者榜"]
    };
  }

  // 渲染函数
  render() {

    const dropDownMenu = (
        <Menu>
          <Menu.Item>
            <a onClick={() => {}}>
              第1期
            </a>
          </Menu.Item>
          <Menu.Item>
            <a onClick={() => {}}>
              第2期
            </a>
          </Menu.Item>
        </Menu>
    );

    const tabCardTitle = <ALFlexBox centerV between>
      <ALFlexBox centerV
                 className="al-text-color-white"
                 style={{
                   height: 100 + 'px',
                 }}>
        {
          this.state.tabCardData.map((item, index) => {
            return <a onClick={() => {
              this.setState({
                currentTab: item
              })
            }}>
              <h3 key={index}
                  className="al-m-right-30px al-text-color-white"
                  style={
                    item === this.state.currentTab ?
                        {
                          fontSize: 22+"px"
                        } : {}
                  }
              >
                {item}
              </h3>
            </a>
          })
        }

      </ALFlexBox>
      <div className="al-text-color-white">
        <Dropdown overlay={dropDownMenu}>
          <span className="al-cursor-pointer">第1期</span>
        </Dropdown>
      </div>
    </ALFlexBox>

    // 优秀作品榜
    const tabCardContent1 = <div>
      {
        this.state.topWorkData === null ? <ALLoading show/> :
            <div>
              {
                this.state.topWorkData.map((item, index) => {
                  return <div key={index}
                              className="al-bg-color-white al-hover-bgcolor-light-white al-cursor-pointer">
                    <ALFlexBox centerV padding={30} className="">
                      <ALFlexBox>
                        <ALFlexBox centerV>
                          <h1 className="al-m-40px">TOP {item.top}</h1>
                        </ALFlexBox>
                        <div className="al-m-lr-50px">
                          <Avatar shape="square"
                                  src={item.poster}
                                  style={{
                                    width: 280 + 'px',
                                    height: 210 + 'px'
                                  }}/>
                        </div>
                      </ALFlexBox>
                      <div className="al-m-left-50px">
                        <div style={{lineHeight: 2.5 + 'em'}}>
                          <h2 className="al-text-overflow-show-point">{item.title}</h2>
                          <div>{item.createdTime}</div>
                          <div>
                            浏览<span className="al-m-right-10px">{item.lookCount}</span>
                            评论<span className="al-m-right-10px">{item.commentCount}</span>
                            点赞<span className="al-m-right-10px">{item.likeCount}</span>
                            收藏<span className="al-m-right-10px">{item.favorCount}</span>
                          </div>
                        </div>

                        <ALFlexBox centerV className="al-m-top-30px">
                          <Avatar src={item.user.avatar}/>
                          <span className="al-m-lr-20px">{item.user.nickname}</span>
                        </ALFlexBox>
                      </div>
                    </ALFlexBox>
                    <Divider style={{margin: 0}}/>
                  </div>
                })
              }
            </div>
      }
    </div>

    const tabCardContent2 = <div>
      {
        this.state.topDesignerData === null ? <ALLoading show/> :
            <div>
              {
                this.state.topDesignerData.map((item, index) => {
                  return <div key={index}
                              className="al-bg-color-white al-hover-bgcolor-light-white al-cursor-pointer">
                    <ALFlexBox centerV padding={30} className="">
                      <ALFlexBox>
                        <ALFlexBox centerV>
                          <h1 className="al-m-40px">TOP {item.top}</h1>
                        </ALFlexBox>
                        <div className="al-m-lr-50px">
                          <Avatar src={item.avatar} size={100}/>
                        </div>
                      </ALFlexBox>
                      <div className="al-m-left-50px">
                        <div style={{lineHeight: 2.5 + 'em'}}>
                          <h2 className="al-text-overflow-show-point">{item.nickname}</h2>
                          <div>
                            作品<span className="al-m-right-10px">{item.workCount}</span>
                            粉丝<span className="al-m-right-10px">{item.fansCount}</span>
                            浏览<span className="al-m-right-10px">{item.visitCount}</span>
                          </div>
                        </div>
                      </div>
                    </ALFlexBox>
                    <Divider style={{margin: 0}}/>
                  </div>
                })
              }
            </div>
      }
    </div>

    const tabCardContent3 = <div>
      {
        this.state.topDeveloperData === null ? <ALLoading show/> :
            <div>
              {
                this.state.topDeveloperData.map((item, index) => {
                  return <div key={index}
                              className="al-bg-color-white al-hover-bgcolor-light-white al-cursor-pointer">
                    <ALFlexBox centerV padding={30} className="">
                      <ALFlexBox>
                        <ALFlexBox centerV>
                          <h1 className="al-m-40px">TOP {item.top}</h1>
                        </ALFlexBox>
                        <div className="al-m-lr-50px">
                          <Avatar src={item.avatar} size={100}/>
                        </div>
                      </ALFlexBox>
                      <div className="al-m-left-50px">
                        <div style={{lineHeight: 2.5 + 'em'}}>
                          <h2 className="al-text-overflow-show-point">{item.nickname}</h2>
                          <div>
                            作品<span className="al-m-right-10px">{item.workCount}</span>
                            粉丝<span className="al-m-right-10px">{item.fansCount}</span>
                            浏览<span className="al-m-right-10px">{item.visitCount}</span>
                          </div>
                        </div>
                      </div>
                    </ALFlexBox>
                    <Divider style={{margin: 0}}/>
                  </div>
                })
              }
            </div>
      }
    </div>

    const showTabCardContent = (title) => {
      switch (title){
        case this.state.tabCardData[0]:
          return tabCardContent1;
        case this.state.tabCardData[1]:
          return tabCardContent2;
        case this.state.tabCardData[2]:
          return tabCardContent3;
        default:
          return <ALLoading show />
      }
    }

    return (
        <div style={{backgroundColor: "#e74c3c"}} className="al-width-100">
          <div style={{backgroundColor: "#fff"}}>
            <ALHeader/>
          </div>

          <div className="content-width">
            {/*顶部选项卡*/}
            {tabCardTitle}

            {showTabCardContent(this.state.currentTab)}


          </div>
        </div>
    );
  }



  // 生命周期函数
  //组件已挂载
  componentDidMount() {
    commonRequest({env: "mock", mockURL: "/top/top-work.json"}).then(res => {
      this.setState({
        topWorkData: res.data
      })
    });

    commonRequest({env: "mock", mockURL: "/top/top-designer.json"}).then(res => {
      this.setState({
        topDesignerData: res.data
      });
      console.log(res);
    });

    commonRequest({env: "mock", mockURL: "/top/top-developer.json"}).then(res => {
      this.setState({
        topDeveloperData: res.data
      });
      console.log(res);
    });
  }

  //组件将要卸载时
  componentWillUnmount() {

  }


}

export default TopPage;
