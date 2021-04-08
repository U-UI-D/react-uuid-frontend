import React from "react";
import {getUserInfoFromLocalStorage} from "../../util/util";
import {Avatar, Divider, message, Empty} from "antd";
import "./style.css";
import {commonRequest} from "../../util/network/RequestHub";
import ChatWindow from "./component/ChatWindow";
import {GET_MESSAGE_ALL, GET_MESSAGE_CHAT} from "../../util/network/config/ApiConst";
import {getCookieByName} from "../../util/cookieUtil";
import {PATH_LOGIN} from "../../util/router/config/RouterConst";
import {ALFlexBox, ALLoading} from "../../components/al-component";
import {connect} from "react-redux";


class MessagePage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
      messageData: null,
      messageChatData: null,
      currentMenuTitle: "全部",
      activeChatWindow: false,
      currentChatUser: null
    }
  }

  //渲染函数
  render() {
    let userInfo = this.state.userInfo;
    const layoutLeft = this.state.userInfo === null ? <ALLoading show/> :
      <ALFlexBox centerVH column className="al-p-30px">
        <div>
          <Avatar src={userInfo.avatar} size={100} />
        </div>
        <h2>{userInfo.nickname}</h2>

      </ALFlexBox>

    const messageMenuList = [
      {
        key: "all",
        icon: require('../../assets/icon/message/notice.png'),
        title: "全部"
      },
      {
        key: "chat",
        icon: require('../../assets/icon/message/chat.png'),
        title: "聊天"
      },
      {
        key: "like",
        icon: require('../../assets/icon/message/like.png'),
        title: "点赞"
      },
      {
        key: "favor",
        icon: require('../../assets/icon/message/favor.png'),
        title: "收藏"
      },
      {
        key: "comment",
        icon: require('../../assets/icon/message/comment.png'),
        title: "评论"
      },
      {
        key: "message",
        icon: require('../../assets/icon/message/message.png'),
        title: "留言"
      },
      {
        key: "fans",
        icon: require('../../assets/icon/message/fans.png'),
        title: "粉丝"
      },
      {
        key: "team",
        icon: require('../../assets/icon/message/team.png'),
        title: "团队"
      }
    ];

    // 全部消息内容
    const contentAllMessage = this.state.messageData === null ? <ALLoading show /> : <div>
      {
        this.state.messageData.map((item, index) => {
          return (
            <ALFlexBox key={index} centerV
                       className="al-p-30px al-hover-bgcolor-light-white al-cursor-pointer">
              <Avatar src={item.nickname === 'UU通知' ? require('../../assets/icon/common/UUID2.png') : item.avatar} size={70} />
              <ALFlexBox column className="al-m-left-20px">
                <ALFlexBox centerV>
                  <h2 className="al-p-right-20px">{item.nickname}</h2>
                  <div className="al-m-right-20px" style={{fontSize: 12+'px', color: "#bbb"}}>{item.reachTime}</div>
                </ALFlexBox>
                <div>
                  {item.message}
                </div>
              </ALFlexBox>
            </ALFlexBox>
          );
        })
      }
    </div>;

    // 聊天消息
    const contentChat = this.state.messageChatData === null ? <ALLoading show /> : <div>
      {
        this.state.messageChatData.map((item, index) => {
          return (
            <ALFlexBox key={index} centerV
                       className="al-p-30px al-hover-bgcolor-light-white al-cursor-pointer"
                       onClick={() => {
                         this.setState({
                           activeChatWindow: true,
                           currentChatUser: item
                         })
                       }}>
              <Avatar src={item.avatar} size={70} />
              <ALFlexBox column className="al-m-left-20px">
                <ALFlexBox centerV>
                  <h2 className="al-m-right-20px">{item.nickname}</h2>
                  <div style={{fontSize: 12+'px', color: "#bbb"}}>{item.reachTime}</div>
                </ALFlexBox>
                <div>
                  {item.message}
                </div>
              </ALFlexBox>
            </ALFlexBox>
          );
        })
      }
    </div>;

    // 点赞消息
    const contentLike = this.state.messageData === null ? <ALLoading show /> : <div>
      <Empty />
    </div>;

    // 收藏消息
    const contentFavor = this.state.messageData === null ? <ALLoading show /> :  <div>
      <Empty />
    </div>;

    // 评论消息
    const contentComment = this.state.messageData === null ? <ALLoading show /> :  <div>
      <Empty />
    </div>;

    // 留言消息
    const contentMessage = this.state.messageData === null ? <ALLoading show /> : <div>
      <Empty />
    </div>;

    // 粉丝消息
    const contentFans = this.state.messageData === null ? <ALLoading show /> : <div>
      <Empty />
    </div>;

    // 团队消息
    const contentTeam = this.state.messageData === null ? <ALLoading show /> : <div>
      <Empty />
    </div>;

    // 切换内容页
    const switchContent = (title) => {
      switch (title) {
        case messageMenuList[0].title:
          return contentAllMessage;
        case messageMenuList[1].title:
          return contentChat;
        case messageMenuList[2].title:
          return contentLike;
        case messageMenuList[3].title:
          return contentFavor;
        case messageMenuList[4].title:
          return contentComment;
        case messageMenuList[5].title:
          return contentMessage;
        case messageMenuList[6].title:
          return contentFans;
        case messageMenuList[7].title:
          return contentTeam;
        default:
          return contentAllMessage;
      }
    }

    const handleChangeChatWindow = (value) => {
      // message.info("父组件接收子组件数据：" + value);
      this.setState({
        activeChatWindow: false
      })
    }

    return (
      <div className="primary-bg-color ">
        <div className="content-width al-p-tb-30px">
          <ALFlexBox>
            {/*左侧内容*/}
            <div style={{width: 280+'px'}} className="al-bg-color-white primary-border-radius">
              <div className="al-p-30px">
                <h1>消息</h1>
              </div>
              <Divider style={{margin: 0}}/>
              {layoutLeft}
            </div>

            {/*右侧内容*/}
            <div className="al-flex-item-grow-1 al-m-left-20px al-p-tb-30px al-bg-color-white primary-border-radius">
              {
                this.state.activeChatWindow ?
                  <ChatWindow user={this.state.currentChatUser}
                              onBack={handleChangeChatWindow} />
                  :
                  <div>
                    {/*消息菜单列表*/}
                    <ALFlexBox centerV className="al-p-lr-30px">
                      {
                        messageMenuList.map((item, index) => {
                          return (
                            <ALFlexBox key={index} centerVH column
                                       className={`al-m-right-30px al-cursor-pointer hover-${item.key}`}
                                       style={{lineHeight: 3.0+'em'}}
                                       onClick={() => {
                                         this.setState({
                                           currentMenuTitle: item.title
                                         })
                                       }}>
                              <div className={`al-hover-lifting-5px`}>
                                <Avatar src={item.icon} size={60} />
                              </div>
                              <div className={`checked-title-${this.state.currentMenuTitle === item.title ? item.key : ""}`}>
                                {item.title}
                              </div>
                            </ALFlexBox>
                          )
                        })
                      }
                    </ALFlexBox>
                    <Divider />
                    {/*消息内容*/}
                    <div>
                      {switchContent(this.state.currentMenuTitle)}
                    </div>
                  </div>
              }
            </div>
          </ALFlexBox>
        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

    //验证是否已单点登录
    let token = getCookieByName("sso_token");
    if (!token){
      this.goPage(PATH_LOGIN, {fromPath: '/message'});
      return;
    }

    this.setState({
      userInfo: getUserInfoFromLocalStorage()
    });

    commonRequest({url: GET_MESSAGE_ALL, env: "mock"}).then(res => {
      this.setState({
        messageData: res.data
      })
    });

    commonRequest({url: GET_MESSAGE_CHAT, env: "mock"}).then(res => {
      this.setState({
        messageChatData: res.data
      })
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }
}

export default connect(mapStateToProps)(MessagePage);
