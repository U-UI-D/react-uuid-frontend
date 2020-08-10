import React from "react";
import {Avatar, Tag} from "antd";
import "./style.css"
import ALInlineWidthBox from "../../../../components/al-inline-width-box/ALInlineWidthBox";

class ShowWorkBox extends React.Component {

  //构造器
  constructor(props) {
    super(props);
    this.state = {
      workInfo: null
    };
  }

  // 渲染函数
  render() {
    const workInfo = this.props.workInfo;
    return (
        <ALInlineWidthBox>
          <div className="work-box al-m-5px al-p-5px al-float-left">
            <Avatar shape="square" src={workInfo.poster}
                    style={{width: 274 + 'px', height: 208 + 'px'}}/>
            <div className="desc">
              <h4 className="al-font-weight-bold" style={{lineHeight: 1.5}}>{workInfo.title}</h4>
              <div className="al-flex-container">
                <div>
                  <Tag color="blue">{workInfo.tag}</Tag>
                </div>
                <div>
                  <Avatar size={20} src={require("../../../../assets/icon/home/look.png")} />
                  <span className="al-m-right-20px">{workInfo.look}</span>
                </div>
                <div>
                  <Avatar size={20} src={require("../../../../assets/icon/home/comment.png")} />
                  <span className="al-m-right-20px">{workInfo.comment}</span>
                </div>
                <div>
                  <Avatar size={20} src={require("../../../../assets/icon/home/fenlei.png")} />
                  <span className="al-m-right-20px">{workInfo.favor}</span>
                </div>
              </div>
            </div>

            <div>
              <Avatar src={workInfo.user.avatar}/>
              <span className="al-m-left-10px">{workInfo.user.nickname}</span>
            </div>
          </div>
        </ALInlineWidthBox>
    );
  }

  // 生命周期函数
  //组件已挂载
  componentDidMount() {
    this.setState({
      workInfo: this.props.workInfo
    })
  }

  //组件将要卸载时
  componentWillUnmount() {

  }


}

export default ShowWorkBox;
