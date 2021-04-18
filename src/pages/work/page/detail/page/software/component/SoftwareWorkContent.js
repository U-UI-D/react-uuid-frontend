import React from "react";
import {Button, Divider} from "antd";
import {ALComment} from "@components/al-component";
import './style.scss';

function View(props) {
  const {workData} = props;
  return workData && (
    <div className="software-work-content-view">
      <h1>{workData.title}</h1>
      <div>
        <span style={{marginRight: 20}}>ID: {workData.id}</span>
        <span style={{marginRight: 20}}>分类：{workData.typename}</span>
        <span style={{marginRight: 20}}>浏览：{workData.lookCount}</span>
        <span style={{marginRight: 20}}>实现：{workData.usingCount}</span>
        <span style={{marginRight: 20}}>可商用：{workData.commercialAvailable === '0' ? "否" : "是"}</span>
        <Button type="link" style={{marginRight: 20}}>举报</Button>
      </div>

      <div>
        标签：
        {/*{this.props.workData.tagList.map((item, index) => {*/}
        {/*  return <Tag key={index}>{item}</Tag>*/}
        {/*})}*/}
      </div>

      <div className="al-m-tb-20px"><Divider /></div>

      <div>
        <div className="al-m-tb-20px">
          <div dangerouslySetInnerHTML={{__html: workData.description}}></div>
        </div>

        <div>
          {
            workData && workData.imageUrls.map((item, index) => {
              return <img key={index} src={item} style={{width: 100+'%'}} alt=""/>
            })
          }
        </div>
      </div>

      <div className="al-m-tb-20px"><Divider /></div>

      {/*<div>*/}
      {/*  以下开发者正在开发此项目*/}
      {/*</div>*/}

      <ALComment />
    </div>
  );
}


class SoftwareWorkContent extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {

    return (
      <View {...this.state} {...this.props} />
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default SoftwareWorkContent;
