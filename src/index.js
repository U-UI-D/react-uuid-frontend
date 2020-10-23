import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RouterView from "./util/router/RouterView";
import {initForUser} from "./util/init/init";

console.log("================ initForUser ================== ");
initForUser();

export const GlobalContext = React.createContext();
React.userInfo = null;


ReactDOM.render(
  <React.StrictMode>
    <RouterView />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
