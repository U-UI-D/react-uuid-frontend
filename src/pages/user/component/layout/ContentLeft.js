import React from "react";
import {Avatar, Button, Divider} from "antd";
import CountBox from "../CountBox";
import VisitorBox from "../VisitorBox";
import "../../style.css";

class ContentLeft extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {
      countData: [
        {
          num: 0,
          text: "粉丝"
        },
        {
          num: 32,
          text: "关注"
        },
        {
          num: 104,
          text: "颜值"
        },
      ],
      visitorData: [
        {
          id: 2,
          nickname: "戴沐白i",
          avatar: require("../../../../assets/image/user/avatar2.jpg"),
          visitDate: "8-10"
        },
        {
          id: 3,
          nickname: "绽放0525",
          avatar: require("../../../../assets/image/user/avatar3.jpg"),
          visitDate: "7-28"
        },
        {
          id: 4,
          nickname: "苍麓i",
          avatar: require("../../../../assets/image/user/avatar4.jpg"),
          visitDate: "7-21"
        }
      ],
    };
  }

  // 渲染函数
  render() {
    return (
        <div>
          <div className="al-box-container">
            <Avatar size={80} src={"https://gitee.com/AlanLee97/assert/raw/master/note_images/naruto.jpg"}/>

            <h2>AlanLee</h2>
            <p>这个人很懒，什么都没写！</p>
          </div>

          {/*统计数据*/}
          <div className="al-flex-justify-space-around">
            {this.state.countData.map((item, index) => {
              return <CountBox num={item.num} text={item.text} key={item.text}/>
            })}
          </div>

          {/*我的资料*/}
          <div className="al-flex-justify-space-around al-m-top-30px">
            <Button shape="round">编辑资料</Button>
            <Button shape="round">我的简历</Button>
          </div>

          {/*个人名片*/}
          <div className="al-m-20px">
            <p>个人名片</p>
            <div>1岁</div>
          </div>
          <Divider/>

          {/*最近访问*/}
          <div className="al-m-20px">
            <p>最近访问</p>
            <div className="al-flex-justify-space-between">
              {this.state.visitorData.map((item, index) => {
                return <VisitorBox key={item.avatar} avatar={item.avatar} nickname={item.nickname} visitDate={item.visitDate}/>
              })}
            </div>
          </div>
        </div>
    );
  }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {

  }

  //组件将要卸载时
  componentWillUnmount() {

  }


}

export default ContentLeft;