import React from "react";
import {UserContext} from "../../context/UserContext";
import {Avatar, Button, Col, Row} from "antd";
import './style.scss';
import {ALFlexBox} from "../../../../components/al-component";

export default function UserInfoBox(props) {

  const getIdentity = (num) => {
    if (num == '1') return "UI设计师";
    if (num == '2') return "开发者";
    return null;
  }

  return (
    <UserContext.Consumer>
      {
        contextState => {
          const {userInfo} = contextState;
          return (
            <div className='user-info-wrapper'>
              <Row gutter={20}>
                <Col>
                  <Row justify='center' align='middle' >
                    <Avatar src={userInfo.avatar} style={{width: '100px', height: '100px'}}  />
                  </Row>
                </Col>

                <Col>
                  <ALFlexBox centerH column style={{height: '100px'}}>
                    <h3 className='al-text-color-white al-cursor-arrow'>{userInfo.nickname}</h3>
                    <div>
                      <span className='user-identity-box'>{getIdentity(userInfo.identity) ?? "未设置身份"}</span>
                    </div>
                    <p className='user-sign'>{userInfo.personalitySign ?? "这个人太懒了，什么都没留下。"}</p>
                  </ALFlexBox>
                </Col>
              </Row>
            </div>
          )
        }
      }
    </UserContext.Consumer>
  );
}
