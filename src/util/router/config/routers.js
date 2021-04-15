
import {
  PATH_TEST_PAGE,
  RouterConst
} from "./RouterConst";
import LoginPage from "../../../pages/common/login/LoginPage";
import HomePage from "../../../pages/home/HomePage";
import WorkPage from "../../../pages/work/WorkPage";
import WorkDetailPage from "../../../pages/work/page/detail/page/ui/UIWorkDetailPage";
import UserPage from "../../../pages/user/UserPage";
import TestPage from "../../../pages/test/TestPage";
import NewWorkPage from "../../../pages/work/page/new-work/NewWorkPage";
import ShopPage from "../../../pages/shop/ShopPage";
import UserProfilePage from "../../../pages/user/page/profile/UserProfilePage";
import Demo from "../../../pages/test/demo/Demo";
import TopPage from "../../../pages/top/TopPage";
import MaterialPage from "../../../pages/material/MaterialPage";
import SearchPage from "../../../pages/search/SearchPage";
import MessagePage from "../../../pages/message/MessagePage";
import SoftwareDetailPage from "../../../pages/work/page/detail/page/software/SoftwareWorkDetailPage";
import TopicPage from "../../../pages/topic/TopicPage";
import TopicDetailPage from "../../../pages/topic/page/topic-detail/TopicDetailPage";
import NewTopicPage from "../../../pages/topic/page/new-topic/NewTopicPage";
import EditProfilePage from "../../../pages/user/page/edit-profile/EditProfilePage";

let routes = [
  {
    title: "UUID | UI设计师与软件开发者交流合作平台",
    path: RouterConst.home.HOME_PAGE,
    component: HomePage,
    exact: true,
  },
  {
    title: "登录",
    path: RouterConst.user.LOGIN_PAGE,
    component: LoginPage,
    exact: true
  },
  {
    title: "完善信息",
    path: RouterConst.user.EDIT_PROFILE_PAGE,
    component: EditProfilePage,
    exact: true
  },
  {
    title: "作品",
    path: RouterConst.work.WORK_PAGE,
    component: WorkPage,
    exact: true
  },
  {
    title: "UI作品详情页",
    path: RouterConst.work.ui.DETAIL_PAGE + ':id',
    component: WorkDetailPage,
    exact: true
  },
  {
    title: "软件作品详情页",
    path: RouterConst.work.software.DETAIL_PAGE + ':id',
    component: SoftwareDetailPage,
    exact: true
  },
  {
    title: "个人中心",
    path: RouterConst.user.USER_PAGE + ":id",
    component: UserPage,
    exact: true,
    requireLogin: true,
  },
  {
    title: "用户资料页",
    path: RouterConst.user.PROFILE_PAGE + ":id",
    component: UserProfilePage,
    exact: true,
    requireLogin: true,
  },
  {
    title: "测试",
    path: PATH_TEST_PAGE,
    component: TestPage,
    exact: true
  },
  {
    title: "发布作品",
    path: RouterConst.work.NEW_WORK_PAGE,
    component: NewWorkPage,
    exact: true,
    requireLogin: true,
  },
  {
    title: "商城",
    path: RouterConst.shop.SHOP_PAGE,
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
    path: RouterConst.top.TOP_PAGE,
    component: TopPage,
    exact: true
  },
  {
    title: "话题",
    path: RouterConst.topic.TOPIC_PAGE,
    component: TopicPage,
    exact: true
  },
  {
    title: "话题详情",
    path: RouterConst.topic.TOPIC_DETAIL_PAGE + "/:id",
    component: TopicDetailPage,
    exact: true
  },
  {
    title: "发表话题",
    path: RouterConst.topic.NEW_TOPIC_PAGE,
    component: NewTopicPage,
    exact: true,
    requireLogin: true,
  },
  {
    title: "素材",
    path: RouterConst.material.MATERIAL_PAGE,
    component: MaterialPage,
    exact: true
  },
  {
    title: "搜索",
    path: RouterConst.search.SEARCH_PAGE,
    component: SearchPage,
    exact: true
  },
  {
    title: "消息",
    path: RouterConst.message.MESSAGE_PAGE,
    component: MessagePage,
    exact: true,
    requireLogin: true,
  },
];

export default routes;
