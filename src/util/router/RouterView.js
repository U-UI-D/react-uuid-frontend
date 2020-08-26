import {Route, HashRouter as Router} from "react-router-dom";
import React from "react";
import routes from "./config/routers";

export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props => (
            <route.component {...props} routes={route.routes}/>
        )}
    />
);

class RouterView extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
        <Router>
          {
            routes.map((route, i) => {
              return <RouteWithSubRoutes key={route.path} {...route} />
            })
          }
        </Router>
    );
  }
}

export default RouterView;
