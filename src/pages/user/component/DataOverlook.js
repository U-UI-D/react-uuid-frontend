import React from "react";
import CountBox from "./CountBox";
import ButtonGroup from "antd/lib/button/button-group";
import {Button} from "antd";
import "../style.css";

class DataOverlook extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {
      totalCountData: [
        {
          num: 0,
          text: "总阅读量"
        },
        {
          num: 0,
          text: "总颜值"
        },
        {
          num: 0,
          text: "人气值"
        },
        {
          num: 0,
          text: "访问量"
        },
        {
          num: 0,
          text: "总粉丝"
        },
        {
          num: 0,
          text: "被点赞总量"
        },
        {
          num: 0,
          text: "被收藏总量"
        },
        {
          num: 0,
          text: "被评论总量"
        },
      ],
    };
  }

  // 渲染函数
  render() {
    return (
        <div>
          <p className="title-text al-m-top-20px">数据总览</p>

          <div className="al-flex-wrap">
            {
              this.state.totalCountData.map((item, index) => {
                return <div
                    className="count-box-hover al-flex-container-center-vh"
                    style={{
                      width: 208 + 'px',
                      height: 108 + 'px'
                    }} key={item.text}>
                  <CountBox num={item.num} text={item.text} />
                </div>
              })
            }
          </div>

          {/*图表*/}
          <div>
            {/*时间按钮组*/}
            <div className="al-m-top-20px">
              <ButtonGroup >
                <Button type="primary">7天</Button>
                <Button type="">30天</Button>
                <Button type="">自定义时间</Button>
              </ButtonGroup>
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

export default DataOverlook;
