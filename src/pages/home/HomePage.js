import React from "react";
import {ActionTypes} from "../../store/action-types";
import {connect} from "react-redux";
import HomeView from "./HomeView";
import {WorkService} from "../../service/work/WorkService";

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

    return (
      <HomeView isMobile={isMobile}
                history={history}
                total={total}
                currentPageNum={currentPageNum}
                currentPageSize={currentPageSize}
                showTitleBoxShadow={showTitleBoxShadow}
                workData={workData}
                getWorkData={this.getWorkData}
                handlePageChange={this.handlePageChange}
                handleTitleChange={this.handleTitleChange}/>
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
    WorkService.getUIWorkData({orderBy, pageNum, pageSize}).then(res => {
      this.setState({
        currentPageNum: pageNum,
        workData: res,
        total: res.total
      })
    }).catch(err => {

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
