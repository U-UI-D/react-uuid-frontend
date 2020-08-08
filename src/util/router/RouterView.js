import {Route, HashRouter as Router} from "react-router-dom";
import React from "react";
import routes from "./config/routers";


export const RouteWithSubRoutes  = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props => (
            <route.component {...props} routes={route.routes} />
        )}
    />
);

function RouterView() {
  return (
      <div>
        <Router>
          {routes.map((route, i) => <RouteWithSubRoutes key={route.path} {...route} />)}
        </Router>
      </div>
  );
}

export default RouterView;
