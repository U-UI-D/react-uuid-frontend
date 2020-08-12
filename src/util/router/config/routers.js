
import {
  ABOUT,
  HOME,
  HOME_PAGE,
  LOGIN,
  PASSAGE_DETAIL,
  PASSAGE_LIST,
  REGISTER,
  TEST_ANTD, TEST_PAGE, USER_PAGE, WORK_DETAIL, WORK_PAGE
} from "./RouterConst";
import {About, Home, PassgaeDetail, PassgaeList} from "../../../pages/test/TestRouter";
import LoginPage from "../../../pages/common/LoginPage";
import RegisterPage from "../../../pages/common/RegisterPage";
import HomePage from "../../../pages/home/HomePage";
import WorkPage from "../../../pages/work/WorkPage";
import WorkDetail from "../../../pages/work/page/WorkDetail";
import UserPage from "../../../pages/user/UserPage";
import TestPage from "../../../pages/test/TestPage";

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
  },
  {
    path: WORK_PAGE,
    component: WorkPage,
    exact: true
  },
  {
    // path: '/passage-list/passage-detail/:id',
    path: WORK_DETAIL + '/:id',
    component: WorkDetail,
    exact: true
  },
  {
    path: USER_PAGE + "/:id",
    component: UserPage,
    exact: true
  },
  {
    path: TEST_PAGE,
    component: TestPage,
    exact: true
  },
];

export default routes;
