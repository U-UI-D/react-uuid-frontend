import {Avatar, Button, Card, Divider, Input, Space} from "antd";
import {ALFlexBox} from "../../../components/al-component";
import React from "react";
import {RouterConst} from "../../../util/router/config/RouterConst";
import {connect} from "react-redux";

function TopBar(props) {
  const {history, isMobile} = props;
  return (
    <div className="top-bar">
      <ALFlexBox centerV>
        <Avatar src={require('../../../assets/icon/common/UUID2.png')}
                className="al-cursor-pointer"
                size={isMobile ? 45 : 60}
                onClick={() => {
                  history.push(RouterConst.home.HOME_PAGE)
                }}/>
        <h1 onClick={() => {
          history.push(RouterConst.home.HOME_PAGE)
        }}>UUID</h1>
        <Divider type="vertical" style={{height: '24px'}} />
        <h2 className="platform-title">UI设计师与开发者合作交流平台</h2>
      </ALFlexBox>
    </div>
  );
}

function LoginView(props) {
  const {history, noTitleKey, currentKey, isMobile} = props;
  const {onTabChange, handleChangeForUsername, handleChangeForPassword, register, login} = props;
  const tabListNoTitle = [
    {
      key: 'login',
      tab: '登录',
    },
    {
      key: 'register',
      tab: '注册',
    },
  ];
  const formBox = () => {
    return (
      <div className="form">
        <Space direction="vertical" size={40} className="al-width-100">
          <div className="input-wrapper">
            <Input placeholder={"帐号"} onChange={handleChangeForUsername}/>
          </div>
          <div className="input-wrapper">
            <Input placeholder={"密码"}
                   type="password"
                   onChange={handleChangeForPassword}/>
          </div>
          <Button type="primary"
                  className="al-width-100"
                  style={{height: "60px"}}
                  onClick={() => {
                    currentKey === 'register' ? register() : login();
                  }}>{currentKey === 'register' ? '注册' : '登录'}</Button>
        </Space>
      </div>
    );
  }
  const contentListNoTitle = {
    login: formBox({mode: 'login'}),
    register: formBox({mode: 'register'}),
  };

  const image = (
    <div style={{flex: 1}}>
      <div className={`${isMobile ? 'poster-image-mobile' : "al-position-fixed"}`}>
        <img src={require('./bg.png')} width={ isMobile ? "100%" : "56%"} alt=""/>
      </div>
    </div>
  );

  return (
    <div className="login-page">
      <ALFlexBox column={isMobile}>
        {isMobile ? null : image}

        <div style={{flex: 2}}>
          <TopBar history={history} isMobile={isMobile}/>
          <div className="al-position-rela al-width-100">
            <div className="al-position-abs al-flex-container-center-vh" style={{
              left: 0,
              right: 0,
            }}>
              <Card
                style={isMobile ? {
                  width: '80%',
                  padding: "12px",
                  marginTop: '60px',
                  zIndex: 100
                } : {
                  width: '450px',
                  padding: "21px",
                  marginTop: '60px'
                }}
                bordered={false}
                tabList={tabListNoTitle}
                activeTabKey={noTitleKey}
                onTabChange={key => {
                  onTabChange(key, 'noTitleKey');
                }}
              >
                {contentListNoTitle[noTitleKey]}
              </Card>
            </div>
          </div>
        </div>

        {!isMobile ? null : image}
      </ALFlexBox>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isMobile: state.isMobile
  }
}

export default connect(mapStateToProps)(LoginView);
