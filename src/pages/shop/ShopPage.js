import React from "react";
import ALHeader from "../../components/al-header/ALHeader";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";
import ALImage from "../../components/al-image/ALImage";
import {Affix, Avatar, Button, Divider} from "antd";
import ALLoading from "../../components/al-loading/ALLoading";
import {commonRequest} from "../../util/network/RequestHub";
import {getUserInfoFromLocalStorage} from "../../util/util";

function GoodsBox(props) {
  const {data} = props;
  return (
    <ALFlexBox column
               padding={10}
               width={177.5}
               lineHeight={2}>
      <ALImage src={data.poster} width={157.5} />
      <div className="al-text-overflow-show-point " style={{width: 157.5}}>{data.title}</div>
      <div>{data.price}</div>
      <Button>兑换</Button>
    </ALFlexBox>
  )
}




class ShopPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      diyGoodsList: null,
      userInfo: null
    }
  }

  //渲染函数
  render() {
    let bgImage = "https://uploadfiles.nowcoder.com/images/20180307/1_1520413042341_384F22719191B2BCA1BD12AD276E47B7";

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
        <div className="al-bg-color-white">
          <ALHeader />
        </div>
        <ALFlexBox centerH style={{backgroundColor: "#e44f37"}}>
          <ALImage src={bgImage} style={{width: 100+"%"}} height={220}/>
        </ALFlexBox>

        <div className="content-width al-p-tb-30px">

          <ALFlexBox between>
            {/*左边栏*/}
            <ALFlexBox column width={800} padding={30} className="al-bg-color-white">

              {/*icon组*/}
              <ALFlexBox around>
                {
                  iconGroup.map((item, index) => {
                    return (
                      <ALFlexBox centerVH column lineHeight={3} key={item}>
                        <ALImage src={item.icon} />
                        <div>{item.title}</div>
                      </ALFlexBox>
                    )
                  })
                }
              </ALFlexBox>

              <Divider />

              <div className="al-m-top-20px">
                <h2>UU定制</h2>
                <ALFlexBox between>
                  {
                    this.state.diyGoodsList === null ? <ALLoading /> :
                    this.state.diyGoodsList.map((item, index) => {
                      return (
                        <div key={item.title}
                             className="al-hover-border-color-light-black al-cursor-pointer al-m-bottom-10px">
                          <GoodsBox data={item} />
                        </div>
                      )
                    })
                  }
                </ALFlexBox>
              </div>

              <div className="al-m-top-20px">
                <h2>热门商品</h2>
                <ALFlexBox between>
                  {
                    this.state.diyGoodsList === null ? <ALLoading /> :
                      this.state.diyGoodsList.map((item, index) => {
                        return (
                          <div key={item.title}
                               className="al-hover-border-color-light-black al-cursor-pointer al-m-bottom-10px">
                            <GoodsBox data={item} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>

              <div className="al-m-top-20px">
                <h2>名企周边</h2>
                <ALFlexBox between>
                  {
                    this.state.diyGoodsList === null ? <ALLoading /> :
                      this.state.diyGoodsList.map((item, index) => {
                        return (
                          <div key={item.title}
                               className="al-hover-border-color-light-black al-cursor-pointer al-m-bottom-10px">
                            <GoodsBox data={item} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>

              <div className="al-m-top-20px">
                <h2>专业书籍</h2>
                <ALFlexBox between>
                  {
                    this.state.diyGoodsList === null ? <ALLoading /> :
                      this.state.diyGoodsList.map((item, index) => {
                        return (
                          <div key={item.title}
                               className="al-hover-border-color-light-black al-cursor-pointer al-m-bottom-10px">
                            <GoodsBox data={item} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>

              <div className="al-m-top-20px">
                <h2>虚拟商品</h2>
                <ALFlexBox between>
                  {
                    this.state.diyGoodsList === null ? <ALLoading /> :
                      this.state.diyGoodsList.map((item, index) => {
                        return (
                          <div key={item.title}
                               className="al-hover-border-color-light-black al-cursor-pointer al-m-bottom-10px">
                            <GoodsBox data={item} />
                          </div>
                        )
                      })
                  }
                </ALFlexBox>
              </div>


            </ALFlexBox>

            {/*右边栏*/}
            <Affix offsetTop={20}>
              <ALFlexBox width={360}
                         padding={30}
                         column
                         className="al-bg-color-white al-m-bottom-10px"
                         style={{height: 95 + "vh"}}>
                <ALFlexBox className="al-width-100">
                  {
                    this.state.userInfo === null ? <div></div> :
                      <ALFlexBox centerV height={100} between flexNum={1}
                                 className="">
                        <ALFlexBox centerV>
                          <Avatar src={this.state.userInfo.avatar} size={80} />
                          <h2 className="al-m-left-20px">{this.state.userInfo.username}</h2>
                        </ALFlexBox>
                        <div>剩余66积分</div>
                      </ALFlexBox>
                  }
                </ALFlexBox>
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
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    commonRequest({mockURL: "/shop/diy-goods-list.json", env: "mock"}).then(res => {
      this.setState({
        diyGoodsList: res.data
      })
    });

    this.setState({
      userInfo: getUserInfoFromLocalStorage()
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default ShopPage;
