import React from "react";
import "./style.scss";
import {Menu, Avatar, Button} from "antd";
import ContentLeft from "./component/layout/ContentLeft";
import ContentRight from "./component/layout/ContentRight";
import {PATH_LOGIN} from "../../util/router/config/RouterConst";
import {UserContext} from "./context/UserContext";
import {connect} from "react-redux";
import ContentTop from "./component/layout/context-top";
import {ALFlexBox} from "../../components/al-component";
import DataOverlook from "./component/DataOverlook";
import Favorite from "./component/Favorite";
import MyPublished from "./component/my-published";
import MyLiked from "./component/my-liked";
import MyFavored from "./component/my-favored";
import {SendOutlined} from '@ant-design/icons';

class UserPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: this.props.userInfo,
      current: 'published',
    }
  }

  //渲染函数
  render() {
    return (
      <UserContext.Provider value={this.state}>
        <div className='user-page-container'>
          <div className="header-box header-bg">
            <div style={{
              width: 100 + '%',
              height: 350 + 'px'
            }}></div>
          </div>

          <div className='content-wrapper'>
            <ContentTop/>

            <div className='content-width menu-wrapper' id='menu-wrapper'>
              <Menu onClick={this.handleClick}
                    selectedKeys={this.state.current}
                    className='menu-style'
                    mode="horizontal">
                <Menu.Item key="published">
                  我的发布
                </Menu.Item>
                <Menu.Item key="favored">
                  收藏
                </Menu.Item>
                <Menu.Item key="liked">
                  点赞
                </Menu.Item>
              </Menu>

              <div style={{position: 'absolute', top: '-18px', right: 0}}>
                <Button type='primary' shape='round' icon={<SendOutlined />}>发布作品</Button>
              </div>
            </div>

            <div className='content-width'>
              <div hidden={this.state.current !== 'published'}>
                <MyPublished/>
              </div>
              <div hidden={this.state.current !== 'liked'}>
                <MyLiked/>
              </div>
              <div hidden={this.state.current !== 'favored'}>
                <MyFavored/>
              </div>
            </div>

            {/*              <div>

                <div className="content-width" style={{marginTop: -60 + 'px'}}>
                  <div className="al-flex-container">
                    左边栏
                    <div className="content-box-left al-box-radius">
                      <ContentLeft {...this.props} userInfo={this.state.userInfo} />
                    </div>

                    <div className="content-box-right">
                      <ContentRight {...this.props} />
                    </div>
                  </div>
                </div>


                底部
                <div>
                  <div className="content-width al-text-align-center al-opacity-2">
                    <Avatar size={70} src={require("../../assets/icon/common/UUID2.png")}/>
                    <p>Powered by © 2020-2020 UUID</p>
                  </div>
                  <div className="al-box-size-20px"></div>
                </div>

              </div>*/}
          </div>
        </div>
      </UserContext.Provider>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let isLogin = localStorage.getItem("isLogin");
    // 判断是否登录
    if (!isLogin) {
      this.goPage(PATH_LOGIN);
    }
  }

  //组件卸载前调用
  componentWillUnmount() {
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({current: e.key});
  };


  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  switchMenuItem = (title) => {
    switch (title) {
      case "published":
        return <MyPublished/>
      case "liked":
        return <MyLiked/>
      case "favored":
        return <MyFavored/>
      default:
        break;
    }
  }
}

UserPage.contextType = UserContext;

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
}

export default connect(mapStateToProps)(UserPage);
