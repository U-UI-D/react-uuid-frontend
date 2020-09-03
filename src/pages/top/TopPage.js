import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import {commonRequest} from "../../util/network/RequestHub";
import ALLoading from "../../components/al-loading/ALLoading";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";
import {Avatar} from "antd";

class TopPage extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {
      topData: null
    };
  }

  // 渲染函数
  render() {
    return (
        <div style={{backgroundColor: "#e74c3c"}} className="al-full-screen">
          <div style={{backgroundColor: "#fff"}}>
            <ALHeader />
          </div>
          <div className="content-width">
            排行榜页面
            {
              this.state.topData === null ? <ALLoading show /> :
                <div>
                  {
                    this.state.topData.map((item, index) => {
                      return <div key={index} className="al-bg-color-white">
                        <ALFlexBox centerV padding={30} className="al-show-border">
                          <ALFlexBox>
                            <ALFlexBox centerV>
                              <h1 className="al-m-40px">TOP {item.top}</h1>
                            </ALFlexBox>
                            <div className="al-m-lr-50px">
                              <Avatar shape="square"
                                      src={item.poster}
                                      style={{width: 280+'px', height: 210+'px'}} />
                            </div>
                          </ALFlexBox>
                          <div className="al-m-left-50px">
                            <div>
                              <h2>{item.title}</h2>
                              <div>{item.createdTime}</div>
                              <div>
                                <span className="al-m-10px">{"浏览" + item.lookCount}</span>
                                <span className="al-m-10px">{"评论" + item.commentCount}</span>
                                <span className="al-m-10px">{"点赞" + item.likeCount}</span>
                                <span className="al-m-10px">{"收藏" + item.favorCount}</span>
                              </div>
                              <div>{item.createdTime}</div>
                            </div>

                            <ALFlexBox centerV>
                              <Avatar src={item.user.avatar} />
                              <span>{item.user.nickname}</span>
                            </ALFlexBox>
                          </div>
                        </ALFlexBox>
                      </div>
                    })
                  }
                </div>
            }
          </div>
        </div>
    );
  }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {
    commonRequest({env: "mock", mockURL: "/top/top.json"}).then(res => {
      this.setState({
        topData: res.data
      })
      console.log(res);
    })
  }

  //组件将要卸载时
  componentWillUnmount() {

  }


}

export default TopPage;
