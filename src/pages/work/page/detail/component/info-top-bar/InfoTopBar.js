import React from "react";
import {ALFlexBox, ALIcon} from "@components/al-component";
import {Affix, Avatar, Button, message, Tooltip} from "antd";
import {RouterConst} from "@util/router/config/RouterConst";
import {WorkDetailContext} from "../../context/WorkDetailContext";
import {connect} from "react-redux";
import {getUserIdentity} from "@util/util";
import {WorkService} from "@service/work/WorkService";
import './style.scss';

function View(props) {
  const {workIdList, isJoin, workType, isMobile} = props;
  const {joinWork} = props;
  const {fileUrl, projectUrl} = props.workData;
  return (
    <WorkDetailContext.Consumer>
      {
        (contextState) => {
          const {workData, isFollow, setIsFollow, isLogin, userInfo, history, match} = contextState;
          return (
            <Affix offsetTop={0} className="animate">
              <ALFlexBox centerV className="info-top-bar">
                <ALFlexBox between className="content-width">
                  {/*左侧内容*/}
                  <ALFlexBox centerV className="left-content">
                    {/*头像*/}
                    <img src={workData.avatar !== undefined ? workData.avatar : require('../../../../../../assets/icon/common/UUID2.png')}/>
                    {/*个人信息*/}
                    <ALFlexBox column centerH evenly className="al-m-left-10px person-info">
                      <div className="al-font-weight-bold work-title">{workData.title}</div>
                      <div className="username">
                        {workData.nickname} <span className="al-m-lr-10px">·</span> <span>{getUserIdentity(workData.identity)}</span>
                        {
                          isLogin ?
                            (
                              <span className="follow-text" onClick={() => {setIsFollow(!isFollow);}}>
                                {
                                  workData.userId === userInfo.id ? null : <span>{isFollow ? "已关注" : "关注"}</span>
                                }
                              </span>
                            )
                            :
                            (
                              <span className="follow-text" onClick={() => {
                                history.push({pathname: RouterConst.user.LOGIN_PAGE, state: {fromPath: match.url}})
                              }}>关注</span>
                            )
                        }
                      </div>
                    </ALFlexBox>
                  </ALFlexBox>

                  {/*右侧图标按钮*/}
                  <ALFlexBox centerVH id='top-icon'>
                    <Button type="text" onClick={() => {joinWork()}} disabled={isJoin}
                            style={isMobile ? {padding: '2px 8px'} : {}}>
                      <Tooltip title='添加到我的项目' placement="bottom" color={'#1890ff'}>
                        <ALIcon type='icon-tianjia' className='al-cursor-pointer' />
                      </Tooltip>
                    </Button>
                    <Button type='text' disabled={!fileUrl} href={fileUrl}
                            style={isMobile ? {padding: '2px 8px'} : {}}>
                      <Tooltip title='下载' placement="bottom" color={'#1890ff'}>
                        <ALIcon type='icon-xiazai' className='al-cursor-pointer'/>
                      </Tooltip>
                    </Button>
                    {
                      workType !== 'software' ? null :
                      <Button type='text' disabled={!projectUrl}
                              style={isMobile ? {padding: '2px 8px'} : {}}>
                        <Tooltip title='github' placement="bottom" color={'#1890ff'}>
                          <ALIcon type='icon-github' className='al-cursor-pointer'/>
                        </Tooltip>
                      </Button>
                    }
                  </ALFlexBox>
                </ALFlexBox>
              </ALFlexBox>
            </Affix>
          );
        }
      }
    </WorkDetailContext.Consumer>
  );
}

class InfoTopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workIdList: [],
      isJoin: false
    }
  }

  componentDidMount() {
    const {isLogin} = this.props;
    if (isLogin) {
      this.getJoinWorkIdList();
    }
  }

  render() {
    return (
      <View {...this.state} {...this.props}
            joinWork={this.joinWork} />
    );
  }

  getJoinWorkIdList = () => {
    let userId = this.props.userInfo.id;

    WorkService.getJoinWorkIdListByUserId(userId).then(res => {
      this.setState({
        workIdList: res,
      }, () => {
        this.setState({
          isJoin: this.state.workIdList.indexOf(this.props.workData.id) !== -1
        })
      });
    }).catch(err => {
      console.error("获取作品加入的id列表失败");
    })
  }

  joinWork = () => {
    if (this.props.isLogin) {
      let data = {
        userId: this.props.userInfo.id,
        workId: this.props.workData.id
      }
      WorkService.joinWork(data).then(res => {
        if (res.code === 1) {
          this.setState({isJoin: true});
          message.success("已添加到我的项目");
        }else {
          message.error("添加失败，请稍候重试");
        }
      })
    }else {
      this.props.history.push({
        pathname: RouterConst.user.LOGIN_PAGE,
        state: {fromPath: this.props.history.location}
      })
    }
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
    isMobile: state.isMobile
  }
}

export default connect(mapStateToProps)(InfoTopBar);
