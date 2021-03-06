import React from "react";
import "./style.scss";
import {Menu, Avatar, Button, Tooltip} from "antd";
import ContentLeft from "./component/layout/ContentLeft";
import ContentRight from "./component/layout/ContentRight";
import {PATH_LOGIN, RouterConst} from "../../util/router/config/RouterConst";
import {UserContext} from "./context/UserContext";
import {connect} from "react-redux";
import ContentTop from "./component/layout/context-top";
import {ALFlexBox} from "../../components/al-component";
import DataOverlook from "./component/DataOverlook";
import Favorite from "./component/Favorite";
import MyPublished from "./component/my-published";
import MyLiked from "./component/my-liked";
import MyFavored from "./component/my-favored";
import {SendOutlined, FormOutlined} from '@ant-design/icons';
import MyJoined from "./component/my-joined";
import {ActionTypes} from "../../store/action-types";
import store from "../../store";

class UserPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: this.props.userInfo,
      current: 'published',
      history: this.props.history,
      isMobile: this.props.isMobile
    }
  }

  //渲染函数
  render() {
    const {isMobile} = this.props;
    return (
      <UserContext.Provider value={this.state}>
        <div className='user-page-container'>
          <div className="header-box header-bg">
          </div>

          <div className='content-wrapper'>
            <div className='al-position-rela content-width'>
              <div className='setting-wrapper'>
                <Tooltip color='rgba(255,255,255, .5)' placement="bottom" title='编辑资料'>
                  <span onClick={() => {
                    this.goPage(RouterConst.user.PROFILE_PAGE + this.props.userInfo.id);
                  }}>
                    <FormOutlined className='icon' />
                  </span>
                </Tooltip>
              </div>
            </div>
            <ContentTop/>

            <div className='content-width menu-wrapper' id='menu-wrapper'>
              <Menu onClick={this.handleClick}
                    selectedKeys={this.state.current}
                    className='menu-style'
                    mode="horizontal">
                <Menu.Item key="published">
                  我发布的
                </Menu.Item>
                <Menu.Item key="joined">
                  我参与的
                </Menu.Item>
                <Menu.Item key="favored">
                  收藏
                </Menu.Item>
                <Menu.Item key="liked">
                  点赞
                </Menu.Item>
              </Menu>

              {
                !isMobile &&
                <div style={{position: 'absolute', top: '-18px', right: 0}}>
                  <Button type='primary'
                          shape='round'
                          icon={<SendOutlined />}
                          onClick={() => {
                            this.goPage(RouterConst.work.NEW_WORK_PAGE);
                          }}>发布作品</Button>
                </div>
              }
            </div>

            <div className='content-width content'>
              <div hidden={this.state.current !== 'published'}>
                <MyPublished/>
              </div>
              <div hidden={this.state.current !== 'joined'}>
                <MyJoined />
              </div>
              <div hidden={this.state.current !== 'liked'}>
                <MyLiked/>
              </div>
              <div hidden={this.state.current !== 'favored'}>
                <MyFavored/>
              </div>
            </div>

          </div>
        </div>
      </UserContext.Provider>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    let isLogin = this.props.isLogin;
    // 判断是否登录
    if (!isLogin) {
      this.goPage(PATH_LOGIN);
    }

    let s = store.getState();
    console.warn("store", s);
    this.props.updateCurrentHeaderTitle('');
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
}

UserPage.contextType = UserContext;

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfo: state.userInfo,
    isMobile: state.isMobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentHeaderTitle(data) {
      let action = {
        type: ActionTypes.header.UPDATE_CURRENT_HEADER_TITLE,
        value: data
      }
      dispatch(action);
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
