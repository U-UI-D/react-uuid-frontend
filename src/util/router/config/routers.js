
import {
  PATH_DISCOVERY_PAGE,
  PATH_HOME_PAGE,
  PATH_LOGIN,
  PATH_MATERIAL_PAGE,
  PATH_MESSAGE_PAGE,
  PATH_REGISTER,
  PATH_SEARCH_PAGE,
  PATH_TEST_PAGE,
  PATH_TOP_PAGE,
  PATH_USER_PAGE,
  PATH_USER_PROFILE_PAGE,
  PATH_WORK_UI_DETAIL,
  PATH_WORK_PAGE,
  PATH_WORK_SOFTWARE_DETAIL
} from "./RouterConst";
import LoginPage from "../../../pages/common/LoginPage";
import RegisterPage from "../../../pages/common/RegisterPage";
import HomePage from "../../../pages/home/HomePage";
import WorkPage from "../../../pages/work/WorkPage";
import WorkDetailPage from "../../../pages/work/page/detail/WorkDetailPage";
import UserPage from "../../../pages/user/UserPage";
import TestPage from "../../../pages/test/TestPage";
import WorkPublishPage from "../../../pages/work/page/publish/WorkPublishPage";
import ShopPage from "../../../pages/shop/ShopPage";
import UserProfilePage from "../../../pages/user/page/profile/UserProfilePage";
import Demo from "../../../pages/test/demo/Demo";
import TopPage from "../../../pages/top/TopPage";
import DiscoveryPage from "../../../pages/discovery/DiscoveryPage";
import MaterialPage from "../../../pages/material/MaterialPage";
import SearchPage from "../../../pages/search/SearchPage";
import MessagePage from "../../../pages/message/MessagePage";
import SoftwareDetailPage from "../../../pages/work/page/detail/page/software/SoftwareWorkDetailPage";

let routes = [
  {
    title: "UUID",
    path: PATH_HOME_PAGE,
    component: HomePage,
    exact: true
  },
  {
    title: "登录",
    path: PATH_LOGIN,
    component: LoginPage,
    exact: true
  },
  {
    title: "注册",
    path: PATH_REGISTER,
    component: RegisterPage,
    exact: true
  },
  {
    title: "作品",
    path: PATH_WORK_PAGE,
    component: WorkPage,
    exact: true
  },
  {
    title: "UI作品详情页",
    // path: '/passage-list/passage-detail/:id',
    path: PATH_WORK_UI_DETAIL + '/:id',
    component: WorkDetailPage,
    exact: true
  },
  {
    title: "软件作品详情页",
    path: PATH_WORK_SOFTWARE_DETAIL + '/:id',
    component: SoftwareDetailPage,
    exact: true
  },
  {
    title: "个人中心",
    path: PATH_USER_PAGE + "/:id",
    component: UserPage,
    exact: true
  },
  {
    title: "用户资料页",
    path: PATH_USER_PROFILE_PAGE + "/:id",
    component: UserProfilePage,
    exact: true
  },
  {
    title: "测试",
    path: PATH_TEST_PAGE,
    component: TestPage,
    exact: true
  },
  {
    title: "发布作品",
    path: "/work/publish",
    component: WorkPublishPage,
    exact: true
  },
  {
    title: "商城",
    path: "/shop",
    component: ShopPage,
    exact: true
  },
  {
    title: "Demo",
    path: "/demo",
    component: Demo,
    exact: true
  },
  {
    title: "排行榜",
    path: PATH_TOP_PAGE,
    component: TopPage,
    exact: true
  },
  {
    title: "发现",
    path: PATH_DISCOVERY_PAGE,
    component: DiscoveryPage,
    exact: true
  },
  {
    title: "素材",
    path: PATH_MATERIAL_PAGE,
    component: MaterialPage,
    exact: true
  },
  {
    title: "搜索",
    path: PATH_SEARCH_PAGE,
    component: SearchPage,
    exact: true
  },
  {
    title: "消息",
    path: PATH_MESSAGE_PAGE,
    component: MessagePage,
    exact: true
  },
];

export default routes;
