import React from "react";
import {UserContext} from "../../context/UserContext";
import {Avatar, Button, Col, Row} from "antd";
import './style.css';
import {ALFlexBox} from "../../../../components/al-component";

export default function UserInfoBox(props) {
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
                    <h3 className='al-text-color-white'>漩涡鸣人</h3>
                    <div>
                      <span className='user-identity-box'>UI设计师</span>
                    </div>
                    <p className='user-sign al-m-top-10px'>这个人太懒了，什么都没留下。</p>
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