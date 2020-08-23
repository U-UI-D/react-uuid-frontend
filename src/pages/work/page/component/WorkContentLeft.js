import React from "react";
import {Divider} from "antd";

class WorkContentLeft extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {

    let workData = this.props.workData;
    return workData === null ? <div></div> :(
      <div style={{width: 940, backgroundColor: "#fff", padding: 20}}>
        <h1>{workData.title}</h1>
        <div>
          <span style={{marginRight: 20}}>原创作品</span>
          <span style={{marginRight: 20}}>分类：APP</span>
          <span style={{marginRight: 20}}>版权：APP</span>
          <span style={{marginRight: 20}}>举报</span>
        </div>

        <div className="al-m-tb-20px"><Divider /></div>

        <div>
          {
            workData.imageUrls.map((item, index) => {
              return <img key={index} src={item} style={{width: 100+'%'}} alt=""/>
            })
          }

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

}

export default WorkContentLeft;
