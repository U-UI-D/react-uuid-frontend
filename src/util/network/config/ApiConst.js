//API路径常量

//sso接口 ============================
//登录
export const POST_USER_LOGIN = "/sso/sso/login";
//通过token获取用户信息
export const GET_USER_BY_TOKEN = "/sso/sso/";
//退出登录
export const POST_USER_LOGOUT = "/sso/sso/logout";

//用户接口 ============================
//所有用户
export const GET_USER_ALL = "/user/user";
//用户资料
export const GET_USER_ID = "/user/user";
//更新用户资料
export const PUT_USER = "/user/user";
//查询用户名是否存在
export const GET_CHECK_USER_EXIST = "/user/user/u/";
//注册
export const POST_USER_REGISTER = "/user/user/register";
//获取首页显示的设计师
export const GET_USER_DESIGNER_SHOW = "/user/user/designer/show";

// 获取推荐的设计师
export const GET_DESIGNER_RECOMMEND = "/user/designer/recommend";



//作品接口 ============================
//所有ui作品
export const GET_WORK_UI_ALL = "/work/work/ui";
//ui作品详情
export const GET_WORK_UI_BY_ID = "/work/work/ui/";
//添加ui作品
export const POST_WORK_UI_ADD = "/work/work/ui";

//所有软件作品
export const GET_WORK_SOFTWARE_ALL = "/work/work/software";
//软件作品详情
export const GET_WORK_SOFTWARE_BY_ID = "/work/work/software/";
//添加软件作品
export const POST_WORK_SOFTWARE_ADD = "/work/work/software";

//轮播图接口 ============================
//所有轮播图
export const GET_CAROUSEL_ALL = "/carousel/carousel";

//排行榜接口 ============================
//设计师-排行榜
export const GET_TOP_WORK = "/top/top-work";
//设计师-排行榜
export const GET_TOP_DESIGNER = "/top/top-designer";
//设计师-排行榜
export const GET_TOP_DEVELOPER = "/top/top-developer";

//商城接口 ============================
//自定义商品
export const GET_SHOP_DIY_GOODS = "/shop/diy-goods-list";

//消息接口 ============================
// 所有消息
export const GET_MESSAGE_ALL = "/message/message-all";
// 聊天消息接口
export const GET_MESSAGE_CHAT = "/message/message-all";

export const ApiConst = {
  // 用户模块
  user: {
    LOGIN: "/sso/sso/login",
    REGISTER: "/user/user/register",
    LOGOUT: "/sso/sso/logout",
    userdata: {
      get: {
        GET_REWARD_POINTS_BY_USER_ID: "/user/userdata/reward-points?userId="
      }
    },

    usermore: {
      get: {
        GET_DELIVERY_ADDRESS_BY_USER_ID: "/user/usermore/address?userId="
      },
      put: {
        PUT_DELIVERY_ADDRESS: "/user/usermore/address"
      }
    }
  },

  // 作品模块
  work: {
    ui: {
      get: {
        GET_BY_USER_ID: "/work/work/ui/user/",
        GET_LIKED_BY_USER_ID: "/work/work/common/get/liked-work/user/",
        GET_ALL: "/work/work/ui"
      }
    },

    software: {
      get: {
        GET_BY_USER_ID: "/work/work/software/user/"
      }
    }
  },

  // 商城模块
  shop: {
    // 商品接口
    product: {
      get: {
        GET_ALL: "/shop/product",
        GET_BY_TYPE_ID: "/shop/product/type/",
      },

      post: {

      },
    },

    // 秒杀接口
    seckill: {
      get: {
        GET_ALL: "/shop/seckill",
      },

      post: {
        POST_SECKILL: "/shop/seckill"
      },
    },

    // 订单接口
    order: {
      get: {
        GET_EXCHANGE_RECORD_BY_USER_ID: "/shop/order/info-list/user/",
        GET_ORDERED_PRODUCT_ID_LIST_BY_USER_ID: "/shop/order/product-id-list?userId=",
      },

      post: {
        POST_ORDER: "/shop/order"
      }
    },

  },

  // 轮播图接口
  carousel: {
    get: {
      GET_CAROUSEL_ALL: "/common/carousel"
    }
  },

  // 上传接口
  upload: {
    UPLOAD_RETURN_ID: "/common/upload/return-id",
    UPLOAD_RETURN_URL: "/common/upload/return-url",
  },

  // 评论模块
  comment: {
    get: {
      GET_BY_UI_WORK_ID: "/comment/comment/work/ui/",
      GET_BY_SOFTWARE_WORK_ID: "/comment/comment/work/software/",
      GET_BY_TOPIC_ID: "/comment/comment/topic/",
    },

    post: {
      POST_WORK: "/comment/comment",
    }
  },

  // 话题模块
  topic: {
    get: {
      GET_ALL: "/topic/topic",
      GET_DETAIL_BY_ID: "/topic/topic/",
    }
  }
}
