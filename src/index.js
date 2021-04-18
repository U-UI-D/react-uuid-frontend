import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import RouterView from "./util/router/RouterView";
import {initForUser} from "./util/init/init";
import {Provider} from "react-redux";
import store from "./store";
import {ActionTypes} from "./store/action-types";

console.log("================ initForUser ================== ");
initForUser();

export const GlobalContext = React.createContext();

store.dispatch({
  type: ActionTypes.common.UPDATE_IS_MOBILE,
  value: window.innerWidth < 768
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterView />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
