import {Route, HashRouter as Router, Switch, Redirect} from "react-router-dom";
import React from "react";
import routes from "./config/routers";
import ALHeader from "../../components/al-header/ALHeader";
import {ALFooter} from "../../components/al-component";
import {connect} from "react-redux";
import NotFoundPage from "../../pages/common/NotFoundPage";
import {message} from "antd";


function RouterView(props){
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
    isLogin: state.isLogin
  }
}

export default connect(mapStateToProps)(RouterView);
