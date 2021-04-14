import {Route, HashRouter as Router, Switch, Redirect} from "react-router-dom";
import React from "react";
import routes from "./config/routers";
import ALHeader from "../../components/al-header/ALHeader";
import {ALFooter} from "../../components/al-component";
import {connect} from "react-redux";
import NotFoundPage from "../../pages/common/NotFoundPage";
import {message} from "antd";
import {ActionTypes} from "../../store/action-types";


function RouterView(props){

  const setIsMobile = (width) => {
    console.warn('test-> rv props', props, props);
    if (width < 768 && props) {
      props.updateIsMobile(true);
    }else {
      if (props) {
        props.updateIsMobile(false);
      }
    }
  }
  window.addEventListener('load', () => {
    setIsMobile(window.outerWidth);
  });
  window.addEventListener('resize', () => {
    setIsMobile(window.outerWidth);
  });
  // debugger;
  console.warn("router-view window.location", window.location);
  let devMode = window.location.host.includes('dev');
  console.warn("devMode", devMode);
  if (devMode) {
    props.updateRunMode('dev');
  }
  console.warn('store runMode', props.appRunMode);

  const {isLogin, isMobile} = props;


  return (
    <Router>
      <ALHeader />

      <div id="content">
        <Switch>
          {
            routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => {
                    let component = <route.component {...props} />;
                    let redirect = (
                      <Redirect to={{
                        pathname: "/login",
                        state: {
                          from: route.path
                        }
                      }} />
                    );

                    // 登录判断
                    if (route.requireLogin && !isLogin) {
                      message.warning("请先登录");
                      return redirect;
                    }
                    // 设置文档标题
                    document.title = route.title;
                    return component;
                  }}
                />
              );
            })
          }

          <Route
            path={"/404"}
            exact={true}
            render={(props) => {
              return (
                <NotFoundPage />
              )
            }}
          />
        </Switch>
      </div>

      <ALFooter />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    isMobile: state.isMobile,
    appRunMode: state.appRunMode
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateRunMode(data){
      let action = {
        type: ActionTypes.common.UPDATE_RUN_MODE,
        value: data
      }
      dispatch(action);
    },
    updateIsMobile(data){
      let action = {
        type: ActionTypes.common.UPDATE_IS_MOBILE,
        value: data
      }
      dispatch(action);
    }
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(RouterView);
