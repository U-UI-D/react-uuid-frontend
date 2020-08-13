import React from "react";
import DataOverlook from "../DataOverlook";
import "../../style.css";

class ContentRight extends React.Component{

  //构造器
  constructor(props) {
    super(props);
    this.state = {
      titles: [
        {
          text: "首页",
          num: ""
        },
        {
          text: "创作",
          num: "0"
        },
        {
          text: "即刻",
          num: "43"
        },
        {
          text: "收藏",
          num: "21"
        },
        {
          text: "赞过",
          num: "43"
        },
        {
          text: "更多",
          num: ""
        }
      ],
      currentTitleIndex: 0
    };
  }

  // 渲染函数
  render() {
    return (
        <div>
          {/*标题栏*/}
          <div style={{
            height: 60 + 'px',
            color: "rgba(255,255,255,0.4)",
            lineHeight: 60 + 'px'
          }}>
            {
              this.state.titles.map((item, index) => {
                return <span key={item.text} className="al-p-lr-30px"
                             onClick={() => {
                               console.log(index);
                               this.setState({
                                 currentTitleIndex: index
                               })
                             }}>
                  {item.text}
                  {
                    item.num !== "" ? " · "+item.num : ""
                  }
                </span>;
              })
            }
          </div>

          {/*内容*/}
          <div>
            <DataOverlook />
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

export default ContentRight;
