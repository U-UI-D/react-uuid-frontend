import React from "react";
import {Avatar, Tag} from "antd";
import "./style.scss"
import {connect} from "react-redux";

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
    const {isMobile} = this.props;
    return (
        <div className="work-box" onClick={this.props.onClick}>
          <div className="work-poster">
            <img src={workInfo.poster}/>
          </div>
          <div className="desc" style={{lineHeight: "3em"}}>
            <h4 className="al-font-weight-bold" style={{lineHeight: 1.5}}>{workInfo.title}</h4>
            <div className="al-flex-container">
              <div>
                <Tag color="blue">{"原创"}</Tag>
              </div>
              <div>
                <Avatar size={20} src={require("../../../../assets/icon/home/look.png")} />
                <span className="al-m-left-5px al-m-right-20px">{workInfo.lookCount}</span>
              </div>
              <div>
                <Avatar size={20} src={require("../../../../assets/icon/home/comment.png")} />
                <span className="al-m-left-5px al-m-right-20px">{workInfo.commentCount}</span>
              </div>
              <div>
                <Avatar size={20} src={require("../../../../assets/icon/home/fenlei.png")} />
                <span className="al-m-left-5px al-m-right-20px">{workInfo.favorCount}</span>
              </div>
            </div>
          </div>

          <div>
            <Avatar src={workInfo.avatar}/>
            <span className="al-m-left-10px">{workInfo.nickname}</span>
          </div>
        </div>
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

const mapStateToProps = state => {
  return {
    isMobile: state.isMobile,
  }
}

export default connect(mapStateToProps)(ShowWorkBox);
