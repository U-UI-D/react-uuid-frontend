import React from "react";
import {Affix, Avatar, Button, Divider, Input, message, Modal} from "antd";
import {commonRequest} from "../../util/network/RequestHub";
import {ApiConst, GET_SHOP_DIY_GOODS} from "../../util/network/config/ApiConst";
import {ALFlexBox, ALImage, ALLoading} from "../../components/al-component";
import {connect} from "react-redux";
import SecKillProductBox from "./component/seckill-product-box/SecKillProductBox";
import TimeCountDown from "./component/time-count-down/TimeCountDown";
import {HttpRequest} from "../../util/network/request";
import "./style.css";
import DateTimeUtils from "../../util/DateTimeUtils";

import { EditOutlined } from '@ant-design/icons';
import {ProductBox} from "./component/product-box/ProductBox";
import ExchangeRecordModal from "./component/exchange-record-modal/ExchangeRecordModal";

class ShopPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      diyGoodsList: null,
      seckillList: [],
      isModalVisible: false,
      isProductDetailModalVisible: false,
      isAddressFormModalVisible: false,
      isExchangeRecordModalVisible: false,
      onConfirmAddressFormLoading: false,
      disableSecKillBtn: false,
      orderedProductIdList: [],

      // 书籍商品
      bookProductList: [],
      // 虚拟商品
      virtualProductList: [],
      // 实体商品
      realityProductList: [],

      // 兑换记录列表
      exchangeRecordList: [],

      btnType: "",

      rewardPoints: 0,
      deliveryAddress: "",
      inputDeliveryAddress: "",
    }
  }

  //渲染函数
  render() {
    let bgImage = require("../../assets/banner/shop-banner.png");

    const {isModalVisible, isAddressFormModalVisible,isProductDetailModalVisible, isExchangeRecordModalVisible,
      rewardPoints, deliveryAddress, inputDeliveryAddress, onConfirmAddressFormLoading,
      disableSecKillBtn, orderedProductIdList, exchangeRecordList, btnType} = this.state;
    const iconGroup = [
      {
        icon: "https://static.nowcoder.com//images/res/mall/mod/2.png",
        title: "UU定制"
      },
      {
        icon: "https://static.nowcoder.com//images/res/mall/mod/5.png",
        title: "热门商品"
      },
      {
        icon: "https://static.nowcoder.com//images/res/mall/mod/3.png",
        title: "名企周边"
      },
      {
        icon: "https://static.nowcoder.com//images/res/mall/mod/4.png",
        title: "专业书籍"
      },
      {
        icon: "https://static.nowcoder.com//images/res/mall/mod/1.png",
        title: "虚拟商品"
      }
    ];


    return(
      <div>
        <ALFlexBox centerH className="banner-bg al-position-rela">
          <ALImage src={bgImage} style={{width: 100+"%"}} height={220}/>
          <ALFlexBox centerVH height={220} className="al-position-abs">
            <h1 style={{color: "#fff", fontSize: "40px"}}>商城兑换中心</h1>
          </ALFlexBox>
        </ALFlexBox>

        <div className="content-width al-p-tb-30px">

          <ALFlexBox between>
            {/*左边栏*/}
            <ALFlexBox column width={840} padding={30} className="al-bg-color-white">

              {/*icon组*/}
              <ALFlexBox around>
                {
                  iconGroup.map((item, index) => {
                    return (
                      <ALFlexBox centerVH column lineHeight={3} key={index}>
                        <ALImage src={item.icon} />
                        <div>{item.title}</div>
                      </ALFlexBox>
                    )
                  })
                }
              </ALFlexBox>

              <Divider />

              <div className="al-m-top-20px" >

                <h2>秒杀兑换</h2>

                <ALFlexBox centerVH style={{
                  backgroundColor: "#ff4d4f",
                  marginBottom: "20px",
                }}>
                  <h2 style={{color: "#fff", marginBottom: "0",}}><TimeCountDown /> 后结束秒杀</h2>
                </ALFlexBox>

                <ALFlexBox evenly={this.state.seckillList.length <= 4}>
                  {
                    this.state.seckillList.length === 0 ? <ALLoading /> :
                      this.state.seckillList.map((item, index) => {
                        return (
                          <div key={index}
                               className="al-cursor-pointer al-m-bottom-10px al-m-right-10px">
                            <SecKillProductBox data={item}
                                               disableSecKillBtn={disableSecKillBtn || item.quantity <= 0 || orderedProductIdList.indexOf(item.id) !== -1}
                                               onBtnClick={this.handleExchangeBtnClick}
                                               btnText={orderedProductIdList.indexOf(item.id) !== -1 ? "已兑换" : "秒杀兑换"} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>

              <Divider />

{/*              <div className="al-m-top-20px">
                <h2>热门商品</h2>
                <ALFlexBox between>
                  {
                    this.state.diyGoodsList === null ? <ALLoading /> :
                      this.state.diyGoodsList.map((item, index) => {
                        return (
                          <div key={index}
                               className="al-cursor-pointer al-m-bottom-10px">
                            <ProductBox data={item} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>*/}

              <div className="al-m-top-20px">
                <h2>实体商品</h2>
                <ALFlexBox>
                  {
                    this.state.realityProductList === null ? <ALLoading /> :
                      this.state.realityProductList.map((item, index) => {
                        return (
                          <div key={index}
                               className="al-cursor-pointer al-m-bottom-10px al-m-right-10px">
                            <ProductBox data={item} onBtnClick={this.handleExchangeBtnClick} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>

              <Divider />

              <div className="al-m-top-20px">
                <h2>专业书籍</h2>
                <ALFlexBox>
                  {
                    this.state.bookProductList === null ? <ALLoading /> :
                      this.state.bookProductList.map((item, index) => {
                        return (
                          <div key={index}
                               className="al-cursor-pointer al-m-bottom-10px al-m-right-10px">
                            <ProductBox data={item} onBtnClick={this.handleExchangeBtnClick} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>

              <Divider />

              <div className="al-m-top-20px">
                <h2>虚拟商品</h2>
                <ALFlexBox>
                  {
                    this.state.virtualProductList === null ? <ALLoading /> :
                      this.state.virtualProductList.map((item, index) => {
                        return (
                          <div key={index}
                               className="al-cursor-pointer al-m-bottom-10px al-m-right-10px">
                            <ProductBox data={item} onBtnClick={this.handleExchangeBtnClick} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>

            </ALFlexBox>

            {/*右边栏*/}
            <Affix offsetTop={20}>
              <ALFlexBox width={320}
                         padding={30}
                         column
                         className="al-bg-color-white al-m-bottom-10px"
                         >
                <ALFlexBox className="al-width-100">
                  {
                    this.props.userInfo === null ? <div></div> :
                      <ALFlexBox between flexNum={1}>
                        <Avatar src={this.props.userInfo.avatar} size={80} />
                        <div className="al-m-left-20px" style={{flex: 1}}>
                          <h2 style={{margin: 0}}>{this.props.userInfo.username}</h2>
                          <div>剩余 <span style={{
                            backgroundColor: "#f1f1f1",
                            borderRadius: "4px",
                            padding: "4px",
                            fontSize: "12px",
                            color: "#48caff"
                          }}>{rewardPoints}</span> 积分</div>
                          <div style={{marginTop: "4px"}}>
                            收货地址：{deliveryAddress ?? "未填写"}
                            <EditOutlined className="al-cursor-pointer"
                                          style={{color: "#48caff", marginLeft: "10px"}}
                                          onClick={() => {
                                            this.setState({isAddressFormModalVisible: !isAddressFormModalVisible})
                                          }} />
                          </div>
                        </div>
                      </ALFlexBox>
                  }
                </ALFlexBox>

                <Divider />

                <div>
                  <h3>兑换记录</h3>
                  <div>
                    {
                      exchangeRecordList.map((item, index) => {
                        return (
                          <div key={index}>
                            <ALFlexBox between height={50} className="al-m-bottom-20px al-hover-bgcolor-light-white">
                              <ALImage src={item.poster} size={50} fit={"contain"} />

                              <div className="al-m-left-10px" style={{width: "200px"}}>
                                <h3 className="al-text-overflow-show-point" style={{margin: 0}}>{item.title}</h3>
                                <p>兑换时间：{DateTimeUtils.getFormatDateTime(item.createdTime, -8)}</p>
                              </div>
                            </ALFlexBox>
                          </div>
                        )
                      })
                    }
                  </div>

                  <ALFlexBox centerVH>
                    {
                      this.props.isLogin ? (
                        <Button size={"small"} style={{fontSize: "8px"}} onClick={() => {
                          this.setState({
                            isExchangeRecordModalVisible: !this.state.isExchangeRecordModalVisible
                          })
                        }}>
                          查看更多
                        </Button>
                      ) : (
                        <span style={{fontSize: "10px", color: "#ccc"}}>登录后查看</span>
                      )
                    }

                  </ALFlexBox>
                </div>

                <Divider />

                <div>
                  <h3>如何获取积分？</h3>
                  <ul>
                    <li>完善个人信息</li>
                    <li>身份认证</li>
                    <li>发布作品</li>
                    <li>参与作品实现</li>
                    <li>邀请用户</li>
                  </ul>
                </div>

              </ALFlexBox>
            </Affix>
          </ALFlexBox>
        </div>



        {/*弹框*/}
        {/*排队下单提示Modal*/}
        <Modal visible={isModalVisible}
               title={btnType === "seckill" ? "秒杀兑换" : "兑换商品"}
               closable={false}
               maskClosable={false}
               footer={
                 <Button type="primary"
                         onClick={() => {
                           this.setState({isModalVisible: !isModalVisible})
                         }}>
                   取消
                 </Button>
               }>
          <p>正在排队下单...</p>
        </Modal>

        {/*填写收货地址Modal*/}
        <Modal visible={isAddressFormModalVisible}
               title="填写收货地址"
               cancelText={"取消"}
               okText={"保存"}
               onCancel={() => {
                 this.toggleAddressFormModal();
               }}
               onOk={() => {
                 this.putDeliveryAddress(inputDeliveryAddress);
               }}
               confirmLoading={onConfirmAddressFormLoading}
               maskClosable={false}>
          <p>
            <p>请输入有效的收货地址，否则无法送出商品</p>
            <Input placeholder={"请输入收货地址"}
                   defaultValue={deliveryAddress}
                   size="large"
                   onChange={(event => {
                     this.setState({
                       inputDeliveryAddress: event.target.value
                     })
                   })} />
          </p>
        </Modal>

        <ExchangeRecordModal
          data={this.state.exchangeRecordList}
          visible={isExchangeRecordModalVisible}
          onCancel={() => {
            this.setState({
              isExchangeRecordModalVisible: !isExchangeRecordModalVisible
            })
          }} />



      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    this.initProductData();

    if (this.props.userInfo) {
      this.getDeliveryAddressByUserId(this.props.userInfo.id);
    }
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  // 初始化商品数据
  initProductData = () => {
    this.getSecKillProductList();
    this.getProductListByTypeId(2, (res) => {
      this.setState({
        virtualProductList: res.data.data.list
      })
    });
    this.getProductListByTypeId(1, (res) => {
      this.setState({
        bookProductList: res.data.data.list
      })
    });
    this.getProductListByTypeId(3, (res) => {
      this.setState({
        realityProductList: res.data.data.list
      })
    });

    if (this.props.userInfo){
      this.getRewardPointsByUserId(this.props.userInfo.id);
      this.getExchangeRecordByUserId(this.props.userInfo.id);
      this.getOrderedProductIdListByUserId(this.props.userInfo.id);
    }

  }

  // 获取秒杀商品列表
  getSecKillProductList = () => {
    HttpRequest.get({
      url: ApiConst.shop.seckill.get.GET_ALL
      // url: "http://localhost:9004/seckill"
    }).then(res => {
      if (res.err === null){
        this.setState({
          seckillList: res.data.data.list
        });
      }else {
        message.warning("获取商品列表失败");
      }
    })
  }

  // 获取兑换记录
  getExchangeRecordByUserId = (userId) => {
    HttpRequest.get({
      url: ApiConst.shop.order.get.GET_EXCHANGE_RECORD_BY_USER_ID + userId
      // url: "http://localhost:9004/order/info-list/user/" + userId
    }).then(res => {
      if (res.err === null){
        this.setState({
          exchangeRecordList: res.data.data.list
        })
      }
    })
  }

  // 执行秒杀请求
  postSecKillRequest = (productId, price) => {
    console.log("postSecKillRequest", "执行秒杀请求");
    if (!productId){
      console.log("secKillProductId 为空");
      return ;
    }
    let data = {
      userId: this.props.userInfo.id,
      productId,
      tradePrice: price
    };

    HttpRequest.post({
      // url: "http://localhost:9004/seckill",
      url: ApiConst.shop.seckill.post.POST_SECKILL,
      data: data,
    }).then(res => {
      if (res.data.code === 1){
        message.success("兑换成功");
      }else {
        message.warning(res.data.msg);
      }
      this.initProductData();
    }).catch(err => {
      message.warning("网络繁忙，请重试");
      this.setState({isModalVisible: !this.state.isModalVisible});
    });
  }

  // 兑换按钮点击处理事件
  handleExchangeBtnClick = (productId, price, btnType) => {
    if (!this.props.isLogin){
      message.warning("请先登录");
      return ;
    }
    if (this.state.rewardPoints < price){
      message.warning("积分不足");
      return ;
    }

    this.setState({
      btnType: btnType === "seckill" ? btnType : "",
      isModalVisible: !this.state.isModalVisible,
    });

    if (btnType === "seckill"){
      // 发送秒杀请求
      this.postSecKillRequest(productId, price);
    }else {
      // 添加订单
      this.postOrderRequest(productId, price);
    }
  }

  // 获取已下单的商品id列表
  getOrderedProductIdListByUserId = (userId) => {
    if (!userId){
      return ;
    }
    HttpRequest.get({
      // url: "http://localhost:9004/order/product-id-list?userId=" + userId,
      url: ApiConst.shop.order.get.GET_ORDERED_PRODUCT_ID_LIST_BY_USER_ID + userId,
    }).then(res => {
      if (res.data.code === 1){
        this.setState({
          orderedProductIdList: res.data.data,
          isModalVisible: false
        });
      }
    }).catch(err => {
      console.log(err);
    })
  }

  // 通过商品类型id获取商品
  getProductListByTypeId = (typeId, callback) => {
    HttpRequest.get({
      // url: "http://localhost:9004/product/type/" + typeId,
      url: ApiConst.shop.product.get.GET_BY_TYPE_ID + typeId,
    }).then(res => {
      if (!res.err){
        callback(res);
      }
    })
  }

  // 执行添加普通订单请求
  postOrderRequest = (productId, price) => {
    console.log("postOrderRequest", "执行添加普通订单请求");
    if (!productId){
      console.log("productId 为空");
      return ;
    }
    let data = {
      userId: this.props.userInfo.id,
      productId,
      tradePrice: price
    };

    HttpRequest.post({
      // url: "http://localhost:9004/order",
      url: ApiConst.shop.order.post.POST_ORDER,
      data: data,
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
      if (res.data.code === 1){
        message.success("兑换成功");
      }else {
        message.warning(res.data.msg);
      }
      this.initProductData();

    }).catch(err => {
      message.warning("网络繁忙，请重试");
      this.setState({isModalVisible: !this.state.isModalVisible});
    });
  }

  // 获取用户积分
  getRewardPointsByUserId = (userId) => {
    if (!userId){
      return ;
    }
    HttpRequest.get({
      // url: "http://localhost:9001/userdata/reward-points?userId=" + userId
      url: ApiConst.user.userdata.get.GET_REWARD_POINTS_BY_USER_ID + userId
    }).then(res => {
      if (res.err === null){
        this.setState({
          rewardPoints: res.data.data
        })
      }
    });
  }

  // 获取收货地址
  getDeliveryAddressByUserId = (userId) => {
    HttpRequest.get({
      // url: "http://localhost:9001/usermore/address?userId=" + userId
      url: ApiConst.user.usermore.get.GET_DELIVERY_ADDRESS_BY_USER_ID + userId
    }).then(res => {
      if (res.err === null){
        this.setState({
          deliveryAddress: res.data.data
        })
      }
    });
  }

  // 更新收货地址
  putDeliveryAddress = (address) => {
    if (!this.props.isLogin){
      message.warning("请先登录！");
      return ;
    }
    this.setState({
      onConfirmAddressFormLoading: true
    })
    HttpRequest.put({
      // url: "http://localhost:9001/usermore/address",
      url: ApiConst.user.usermore.put.PUT_DELIVERY_ADDRESS,
      data: {address, userId: this.props.userInfo.id}
    }).then(res => {
      if (res.err === null){
        message.success("收货地址更新成功");
        this.getDeliveryAddressByUserId(this.props.userInfo.id);
        this.toggleAddressFormModal();
        this.setState({
          onConfirmAddressFormLoading: false
        })
      }else {
        message.error("失败成功，请重试！");
      }
    }).catch(err => {
      message.warning("网络错误，请重试！")
    })
  }

  // 切换地址modal状态
  toggleAddressFormModal = () => {
    this.setState({
      isAddressFormModalVisible: !this.state.isAddressFormModalVisible
    })
  }

}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
