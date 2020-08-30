import React from "react";
import {getUserInfoFromLocalStorage} from "../../../util/util";
import {Avatar} from "antd";
import ALLoading from "../../../components/al-loading/ALLoading";

class UserProfilePage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null
    }
  }

  //渲染函数
  render() {
    return this.state.userInfo === null ? <ALLoading show /> : (
      <div style={{backgroundColor: ""}}>
        <div style={{
          width: 1180 + 'px',
          margin: "0 auto"
        }}>
          <div className="al-flex-container al-flex-container-center-v">
            <Avatar src={require("../../../assets/icon/common/UUID2.png")} size={70}/>

            <div id="header-menu"
                 className="header-menu al-flex-container al-flex-justify-space-between"
                 style={{flex: 1}}>
              <div>账户中心</div>


              {/*菜单2*/}
              <div className="al-flex-container">
                {
                  this.state.userInfo === null ? <div></div> :
                    <Avatar src={this.state.userInfo.avatar} />
                  // <div>头像</div>
                }
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let userInfo = getUserInfoFromLocalStorage()
    this.setState({
      userInfo: userInfo
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default UserProfilePage;
