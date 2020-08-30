
import {
  ABOUT,
  HOME,
  HOME_PAGE,
  LOGIN,
  PASSAGE_DETAIL,
  PASSAGE_LIST,
  REGISTER,
  TEST_ANTD, TEST_PAGE, USER_PAGE, USER_PROFILE_PAGE, WORK_DETAIL, WORK_PAGE
} from "./RouterConst";
import {About, Home, PassgaeDetail, PassgaeList} from "../../../pages/test/TestRouter";
import LoginPage from "../../../pages/common/LoginPage";
import RegisterPage from "../../../pages/common/RegisterPage";
import HomePage from "../../../pages/home/HomePage";
import WorkPage from "../../../pages/work/WorkPage";
import WorkDetailPage from "../../../pages/work/page/detail/WorkDetailPage";
import UserPage from "../../../pages/user/UserPage";
import TestPage from "../../../pages/test/TestPage";
import WorkPublishPage from "../../../pages/work/page/publish/WorkPublishPage";
import ShopPage from "../../../pages/shop/ShopPage";
import UserProfilePage from "../../../pages/user/page/UserProfilePage";

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
    component: WorkDetailPage,
    exact: true
  },
  {
    path: USER_PAGE + "/:id",
    component: UserPage,
    exact: true
  },
  {
    path: USER_PROFILE_PAGE + "/:id",
    component: UserProfilePage,
    exact: true
  },
  {
    path: TEST_PAGE,
    component: TestPage,
    exact: true
  },
  {
    path: "/work/publish",
    component: WorkPublishPage,
    exact: true
  },
  {
    path: "/shop",
    component: ShopPage,
    exact: true
  },
];

export default routes;
