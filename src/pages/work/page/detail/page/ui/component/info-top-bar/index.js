import React from "react";
import {ALFlexBox} from "../../../../../../../../components/al-component";
import {Affix, Avatar, Button, message, Space, Tooltip} from "antd";
import {RouterConst} from "../../../../../../../../util/router/config/RouterConst";
import ALIcon from "../../../../../../../../components/al-icon";
import {WorkDetailContext} from "../../../../context/WorkDetailContext";
import {HttpRequest} from "../../../../../../../../util/network/request";
import {ApiConst} from "../../../../../../../../util/network/config/ApiConst";
import {connect} from "react-redux";
import './style.scss';


class InfoTopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workIdList: [],
      isJoin: false
    }
  }

  componentDidMount() {
    const {isLogin, history} = this.props;
    if (isLogin) {
      this.getJoinWorkIdList();
    }

    // console.log("history", history);
  }

  render() {
    const {workIdList, isJoin} = this.state;
    const {fileUrl, projectUrl} = this.props;
    return (
      <WorkDetailContext.Consumer>
        {
          (contextState) => {
            const {workData, isFollow, setIsFollow, isLogin, userInfo, history, match} = contextState;
            return (
              <Affix offsetTop={0} className="animate">
                <ALFlexBox centerV className="al-bg-color-white work-info-top" style={{height: "70px"}}>
                  <ALFlexBox between className="content-width">
                    <ALFlexBox centerV>
                      <Avatar size={60} shape="circle" src={workData.avatar}/>

                      <ALFlexBox column centerH evenly className="al-m-left-10px">
                        <div className="al-font-weight-bold">{workData.title}</div>
                        <div>
                          {workData.nickname}
                          {
                            isLogin ?
                              (
                                <Button type="link" className="al-m-lr-10px" onClick={() => {
                                  setIsFollow(!isFollow);
                                }}>
                                  {
                                    workData.userId === userInfo.id ? <></> :
                                      <span>{isFollow ? "已关注" : "关注"}</span>
                                  }
                                </Button>
                              )
                              :
                              (
                                <Button type="link" className="al-m-lr-10px" onClick={() => {
                                  history.push({pathname: RouterConst.user.LOGIN_PAGE, state: {fromPath: match.url}})
                                }}>关注</Button>
                              )
                          }

                        </div>
                      </ALFlexBox>
                    </ALFlexBox>

                    <ALFlexBox centerVH id='top-icon'>
                      <Button type="text" onClick={() => {this.joinWork()}} disabled={isJoin}>
                        <Tooltip title='添加到我的项目' placement="bottom" color={'#1890ff'}>
                          <ALIcon type='icon-tianjia' className='al-cursor-pointer' />
                        </Tooltip>
                      </Button>
                      <Button type='text' disabled={!fileUrl}>
                        <Tooltip title='下载' placement="bottom" color={'#1890ff'}>
                          <ALIcon type='icon-xiazai' className='al-cursor-pointer'/>
                        </Tooltip>
                      </Button>
                      <Button type='text' disabled={!projectUrl}>
                        <Tooltip title='github' placement="bottom" color={'#1890ff'}>
                          <ALIcon type='icon-github' className='al-cursor-pointer'/>
                        </Tooltip>
                      </Button>
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

  getJoinWorkIdList = () => {
    HttpRequest.get({
      url: ApiConst.work.common.get.GET_JOIN_WORK_ID_LIST_BY_USER_ID + this.props.userInfo.id,
      env: "dev",
    }).then(res => {
      if (res.err === null) {
        res.data.code === 1 && this.setState({
          workIdList: res.data.data,
        }, () => {
          this.setState({
            isJoin: this.state.workIdList.indexOf(this.props.workData.id) !== -1
          })
        });
      }
    })
  }

  joinWork = () => {
    if (this.props.isLogin) {
      HttpRequest.put({
        url: `${ApiConst.work.common.put.UPDATE_JOIN_WORK_BY_USER_ID}?userId=${this.props.userInfo.id}&joinWorkId=${this.props.workData.id}`,
        env: 'dev'
      }).then(res => {
        if (res.data.code === 1) {
          this.setState({isJoin: true});
          message.success("已添加到我的项目");
        }else {
          message.error("添加失败，请稍候重试");
        }
      })
    }else {
      this.props.history.push({
        pathname: RouterConst.user.LOGIN_PAGE,
        state: {fromPath: this.props.history.location
        }})
    }
  }

}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
    isLogin: state.isLogin,
  }
}

export default connect(mapStateToProps)(InfoTopBar);
