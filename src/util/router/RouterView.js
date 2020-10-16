import {Route, HashRouter as Router} from "react-router-dom";
import React from "react";
import routes from "./config/routers";
import {GlobalContext} from "../../index";
import ALHeader from "../../components/al-header/ALHeader";

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      <route.component {...props} routes={route.routes}/>
    )}
  />
);

function RouterView(props){
  return (
    <GlobalContext.Provider value={{
      hello: "Hello React"
    }}>
      <Router>
        <ALHeader />
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
