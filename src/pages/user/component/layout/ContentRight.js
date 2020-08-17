import React from "react";
import DataOverlook from "../DataOverlook";
import "../../style.css";
import Favorite from "../Favorite";

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
      currentTitle: "首页"
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
                return <span key={item.text} className="al-p-lr-30px al-cursor-pointer"
                             onClick={() => {
                               this.setState({
                                 currentTitle: item.text
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
            <div className="al-m-left-30px">
              {this.switchTitle(this.state.currentTitle)}
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

  switchTitle = (title) => {
    switch (title){
      case "首页":
        console.log(this.state.currentTitle);
        return <DataOverlook />
        break;
      case "创作":
        return <div>创作</div>
      case "即刻":
        return <div>即刻</div>
      case "收藏":
        return <Favorite {...this.props} />
      case "赞过":
        return <div>赞过</div>
      case "更多":
        return <div>更多</div>
      default: break;
    }
  }


}

export default ContentRight;
