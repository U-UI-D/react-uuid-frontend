
//主页
export const PATH_HOME_PAGE = "/";

export const PATH_HOME = "/home";
export const PATH_LOGIN = "/login";
export const PATH_REGISTER = "/register";

//作品 ==========================
//作品
export const PATH_WORK_PAGE =  "/work";
//作品详情
export const PATH_WORK_UI_DETAIL =  "/work/ui/detail";
//软件作品详情
export const PATH_WORK_SOFTWARE_DETAIL =  "/work/software/detail";


//用户 ==========================
//用户
export const PATH_USER_PAGE =  "/user";
export const PATH_USER_PROFILE_PAGE =  "/user/profile";


//测试页面 ==========================
//测试
export const PATH_TEST_PAGE =  "/test";

//商城 ==========================
//商城
export const PATH_SHOP_PAGE =  "/shop";

//排行榜 ==========================
//排行榜
export const PATH_TOP_PAGE =  "/top";

//发现 ==========================
//发现
export const PATH_DISCOVERY_PAGE =  "/discovery";

//话题 ==========================
//话题
export const PATH_TOPIC_PAGE =  "/topic";

//素材 ==========================
//素材
export const PATH_MATERIAL_PAGE =  "/material";

//搜索 ==========================
//搜索
export const PATH_SEARCH_PAGE =  "/search";

//消息 ==========================
//消息
export const PATH_MESSAGE_PAGE =  "/message";

export const RouterConst = {
  home: {
    INDEX_PAGE: "/",
    HOME_PAGE: "/home",
  },

  user: {
    LOGIN_PAGE: "/login",
    REGISTER_PAGE: "/register",
    USER_PAGE:  "/user",
    PROFILE_PAGE:  "/user/profile",
  },

  topic: {
    TOPIC_PAGE: "/topic",
    TOPIC_DETAIL_PAGE: "/topic/detail",
    NEW_TOPIC_PAGE: "/topic/new",

  },

  work: {
    WORK_PAGE:  "/work",
    NEW_WORK_PAGE: "/work/publish",
    ui: {
      DETAIL_PAGE: "/work/ui/detail"
    },

    software: {
      DETAIL_PAGE: "/work/software/detail"
    }
  },

  shop: {
    SHOP_PAGE:  "/shop"
  },

  material: {
    MATERIAL_PAGE: "/material"
  },

  top: {
    TOP_PAGE: "/top"
  },

  search: {
    SEARCH_PAGE: "/search"
  },

  message: {
    MESSAGE_PAGE:  "/message"
  },

  discovery: {
    DISCOVERY_PAGE:  "/discovery"
  },

  test: {
    TEST_PAGE:  "/test"
  }
}
