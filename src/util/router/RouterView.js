import {Route, HashRouter as Router} from "react-router-dom";
import React from "react";
import routes from "./config/routers";
import {GlobalContext} from "../../index";
import {getUserInfoFromLocalStorage} from "../util";

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      <route.component {...props} routes={route.routes}/>
    )}
  />
);

function RouterView() {
  let contextData = {
    userInfo: getUserInfoFromLocalStorage(),
    setUserInfo: (val) => {
      contextData.userInfo = val;
    }
  };

  return (
    <GlobalContext.Provider value={contextData}>
      <Router>
        {
          routes.map((route, i) => {
            return <RouteWithSubRoutes key={route.path} {...route} />
          })
        }
      </Router>
    </GlobalContext.Provider>
  );
}

export default RouterView;
