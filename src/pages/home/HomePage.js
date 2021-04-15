import React from "react";
import { Menu, Pagination, Affix} from "antd";
import ShowWorkBox from "../work/component/show-work-box/ShowWorkBox";
import ShowDesigner from "./component/show-designer/ShowDesigner";
import {ApiConst} from "../../util/network/config/ApiConst";
import {RouterConst} from "../../util/router/config/RouterConst";
import {ALFlexBox, ALLoading, ALPlaceBox} from "../../components/al-component";
import ShowCarousel from "./component/show-carousel/ShowCarousel";
import {HttpRequest} from "../../util/network/request";
import {ActionTypes} from "../../store/action-types";
import {connect} from "react-redux";

class HomePage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null,
      currentPageNum: 1,
      currentPageSize: 20,
      total: 0,
      carouselList: null,
      scrollTop: 0,
      showTitleBoxShadow: false
    }
  }

  //渲染函数
  render() {
    const {isMobile, history} = this.props;
    const {total, currentPageNum, currentPageSize, showTitleBoxShadow, workData} = this.state;

    const MenuItem = Menu.Item;

    return (
      <div>
        {/*上半部分*/}
        <div className="al-bg-color-white">
          <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
            {/*轮播图*/}
            <ShowCarousel history={history} />
          </div>

          {/*标题*/}
          <Affix offsetTop={0} onChange={this.handleTitleChange}>
            <div id="index-menu-title"
                 className={`al-bg-color-white ${showTitleBoxShadow ? 'al-box-shadow' : ''}`}>
              <Menu mode="horizontal" defaultSelectedKeys={["index"]}>
                <MenuItem key={"index"} onClick={() => {this.getWorkData('look_count')}}>首页推荐</MenuItem>
                <MenuItem key={"lasted"} onClick={() => {this.getWorkData('created_time')}}>最新作品</MenuItem>
              </Menu>
            </div>
          </Affix>
        </div>

        {/*作品列表*/}
        <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
          {/*作品列表*/}
          <ALPlaceBox height={20}/>
          <div style={{marginLeft: isMobile ? null : "15px"}}>
            {
              workData === null ?
                <ALLoading show height={200}/>
                :
                <ALFlexBox centerVH={isMobile} wrap margin={isMobile ? 0 : -15}>
                  {
                    workData.list.map((item, index) => {
                      return (
                        <div key={index} onClick={() => {
                          this.goPage(RouterConst.work.ui.DETAIL_PAGE + item.id)
                        }} className={`${isMobile ? "al-width-96" : ""}`}>
                          <ShowWorkBox workInfo={item}/>
                        </div>
                      )
                    })
                  }
                </ALFlexBox>
            }

            {/*分页*/}
            <ALFlexBox centerH className="al-m-tb-20px">
              <Pagination current={currentPageNum}
                          total={total}
                          defaultPageSize={currentPageSize}
                          pageSizeOptions={["20", "40", "60", "80", "100"]}
                          hideOnSinglePage
                          onShowSizeChange={this.handlePageChange}
                          onChange={this.handlePageChange}/>
            </ALFlexBox>
          </div>
        </div>

        {/*显示设计师*/}
        <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
          <h2 style={isMobile ? {marginLeft:  "20px"} : {}}>设计师/开发者推荐</h2>
          <ShowDesigner/>
        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    //获取作品列表
    this.getWorkData('look_count');
    this.props.updateCurrentHeaderTitle('首页');
    window.addEventListener('scroll', this.bindHandleScroll);
  }

  //组件卸载前调用
  componentWillUnmount() {
    window.removeEventListener('scroll', this.bindHandleScroll);
  }

  bindHandleScroll = (event) => {
    // 滚动的高度
    const scrollTop = event.target.documentElement.scrollTop;
    this.setState({
      scrollTop
    })
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  // 获取作品数据
  getWorkData = (orderBy, pageNum=1, pageSize=20) => {
    HttpRequest.get({
      url: `${ApiConst.work.ui.get.GET_ALL}?orderBy=${orderBy}&pageNum=${pageNum}&pageSize=${pageSize}&typename=`,
      env: 'dev'
    }).then(res => {
      if (res.err === null){
        this.setState({
          currentPageNum: pageNum,
          workData: res.data.data,
          total: res.data.data.total
        })
      }else {
        this.setState({
          workData: null,
          total: 0
        })
      }
    })
  }

  // 处理页面大小改变，重新获取作品列表
  handlePageChange = (pageNum, pageSize) => {
    this.getWorkData('', pageNum, pageSize);
  }

  // 处理标题的切换（首页推荐/最新作品）
  handleTitleChange = (val) => {
    this.setState({
      showTitleBoxShadow: val
    });
  }
}

const mapStateToProps = (state) => {
  return {
    currentHeaderTitle: state.currentHeaderTitle,
    isMobile: state.isMobile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentHeaderTitle(data) {
      let action = {
        type: ActionTypes.header.UPDATE_CURRENT_HEADER_TITLE,
        value: data
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
