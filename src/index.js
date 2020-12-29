import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RouterView from "./util/router/RouterView";
import {initForUser} from "./util/init/init";
import {Provider} from "react-redux";
import store from "./store";

console.log("================ initForUser ================== ");
initForUser();

export const GlobalContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterView />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
