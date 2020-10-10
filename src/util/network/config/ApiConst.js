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
//获取首页显示的设计师
export const GET_USER_DESIGNER_SHOW = "/user/user/designer/show";

// 获取推荐的设计师
export const GET_DESIGNER_RECOMMEND = "/user/designer/recommend";



//作品接口 ============================
//所有作品
export const GET_WORK_ALL = "/work/work";
//作品详情
export const GET_WORK_BY_ID = "/work/work/";
//添加作品
export const POST_WORK_ADD = "/work/work";

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

