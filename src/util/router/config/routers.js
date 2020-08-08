
import {
  ABOUT,
  HOME,
  HOME_PAGE,
  LOGIN,
  PASSAGE_DETAIL,
  PASSAGE_LIST,
  REGISTER,
  TEST_ANTD
} from "./RouterConst";
import {About, Home, PassgaeDetail, PassgaeList} from "../../../pages/test/TestRouter";
import LoginPage from "../../../pages/common/LoginPage";
import RegisterPage from "../../../pages/common/RegisterPage";
import HomePage from "../../../pages/home/HomePage";

let routes = [
  {
    path: HOME_PAGE,
    component: HomePage,
    exact: true
  },
  {
    path: HOME,
    component: Home,
    exact: true
  },
  {
    path: ABOUT,
    component: About,
  },
  {
    path: PASSAGE_LIST,
    component: PassgaeList,
    exact: true
  },
  {
    // path: '/passage-list/passage-detail/:id',
    path: PASSAGE_DETAIL + ':id',
    component: PassgaeDetail,
  },
  {
    path: LOGIN,
    component: LoginPage,
    exact: true
  },
  {
    path: REGISTER,
    component: RegisterPage,
    exact: true
  }
];

export default routes;
