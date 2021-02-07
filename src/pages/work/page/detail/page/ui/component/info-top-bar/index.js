import React from "react";
import {ALFlexBox} from "../../../../../../../../components/al-component";
import {Affix, Avatar, Button, message, Space, Tooltip} from "antd";
import {RouterConst} from "../../../../../../../../util/router/config/RouterConst";
import ALIcon from "../../../../../../../../components/al-icon";
import {WorkDetailContext} from "../../../../context/WorkDetailContext";

function InfoTopBar(props) {
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

                  <ALFlexBox centerVH>
                    <Space id='top-icon'>
                      <Tooltip title='添加到我的项目' placement="bottom" color={'#1890ff'}>
                        <ALIcon type='icon-tianjia' className='al-cursor-pointer' onClick={() => {
                          message.success("已添加到我的项目")
                        }}/>
                      </Tooltip>
                      <Tooltip title='下载' placement="bottom" color={'#1890ff'}>
                        <ALIcon type='icon-xiazai' className='al-cursor-pointer'/>
                      </Tooltip>
                      <Tooltip title='github' placement="bottom" color={'#1890ff'}>
                        <ALIcon type='icon-github' className='al-cursor-pointer'/>
                      </Tooltip>
                    </Space>
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


export default InfoTopBar;