import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import "./style.css";
import {request} from "../../util/network/NetworkRequest";
import {Avatar} from "antd";

class UserPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo : null
    }
  }

  //渲染函数
  render() {
    return(
      <div style={{backgroundColor: "rgb(239, 243, 245)"}}>
        <div className="header-box header-bg">
          <div style={{color: "rgba(255,255,255,0.4)"}}>
            <ALHeader />
          </div>
          <div style={{width: 100+'%', height: 350+'px'}}></div>
        </div>

        <div >
          <div className="content-width" style={{marginTop: -60+'px'}}>
            <div className="al-flex-container">
              <div className="content-box-left al-box-radius al-box-container">
                <Avatar size={80} src={"https://gitee.com/AlanLee97/assert/raw/master/note_images/naruto.jpg"} />

                <h2>AlanLee</h2>
                <p>这个人很懒，什么都没写！</p>
              </div>

              <div className="content-box-right"
                   style={{height: 60+'px', color: "rgba(255,255,255,0.4)"}}>
                <span className="al-p-lr-40px">首页</span>
                <span className="al-p-lr-40px">创作 · 1</span>
                <span className="al-p-lr-40px">即刻 · 0</span>
                <span className="al-p-lr-40px">收藏 · 35</span>
                <span className="al-p-lr-40px">赞过 · 30</span>
                <span className="al-p-lr-40px">更多</span>
              </div>

            </div>
          </div>

          <div>
            <div className="content-width">
              个人中心: id={this.props.match.params.id}

            </div>
          </div>

        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    console.log("========================")
    // this.getUserInfoById(1);
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  getUserInfoById = (id) => {
    request({
      url: 'https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/mock/user.json',
      method: 'GET',
      data: {}
    }).then(res => {
      console.log(res);
      console.log(res.data);
      this.setState({
        userInfo : res.data.data
      })
    }).catch(err => {
      console.log(err);
    });
  }

}

export default UserPage;
