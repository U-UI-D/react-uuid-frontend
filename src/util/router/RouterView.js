import {Route, HashRouter as Router, Switch, Redirect} from "react-router-dom";
import React from "react";
import routes from "./config/routers";
import ALHeader from "../../components/al-header/ALHeader";
import {ALFooter} from "../../components/al-component";
import {connect} from "react-redux";
import NotFoundPage from "../../pages/common/not-found/NotFoundPage";
import {message} from "antd";
import {ActionTypes} from "../../store/action-types";

function RouterView(props){
  const setIsMobile = (width) => {
    if (width < 768 && props) {
      props.updateIsMobile(true);
    }else {
      if (props) {
        props.updateIsMobile(false);
      }
    }
  }
  window.addEventListener('load', () => {
    setIsMobile(window.innerWidth);
  });
  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth);
  });

  let devMode = window.location.host.includes('dev');
  if (devMode) {
    props.updateRunMode('dev');
  }

  const {isLogin} = props;

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
