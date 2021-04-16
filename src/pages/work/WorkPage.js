import React from "react";
import {commonRequest} from "../../util/network/RequestHub";
import {ApiConst, GET_WORK_SOFTWARE_ALL, GET_WORK_UI_ALL} from "../../util/network/config/ApiConst";
import "./style.css"
import {HttpRequest} from "../../util/network/request";
import WorkPageView from "./WorkPageView";
import {connect} from "react-redux";
import {WorkService} from "../../service/work/WorkService";

class WorkPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null,
      loading: true,
      currentPageNum: 1,
      currentPageSize: 20,
      total: 0,
      workType: "UI作品"
    }
  }

  //渲染函数
  render() {
    const {workData, workType} = this.state;
    const {isMobile} = this.props;
    return (
      <WorkPageView workData={workData}
                    workType={workType}
                    isMobile={isMobile}
                    goPage={this.goPage}
                    handleTitleListChange={this.handleTitleListChange}
                    onShowSizeChange={this.onShowSizeChange}
                    handlePageChange={this.handlePageChange} />
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    //获取作品列表
    this.getWorkData();
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  //获取作品列表
  getWorkData = (url=ApiConst.work.ui.get.GET_ALL, data = {}) => {
    HttpRequest.get({
      url: url,
      data: data,
      env: 'dev'
    }).then(res => {
      if (res.err === null) {
        this.setState({
          workData: res.data.data,
          loading: false,
          total: res.data.data.total || 0
        })
      }
    })

    // WorkService.getUIWorkData({url, data}).then(res => {
    //   this.setState({
    //     workData: res,
    //     loading: false,
    //     total: res.total || 0
    //   })
    // }).catch(err => {
    //
    // });
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  handleTitleListChange = data => {
    console.log("TitleListChange", data);
    const {currentPageNum, currentPageSize} = this.state;
    this.setState({workType: data.firstTitle})
    let url = "";
    let param = {};
    if (data.firstTitle === 'UI作品'){
      let typename = data.secondTitle === '全部' ? '' : this.handleSecondTitleForTypename(data.secondTitle);
      let orderBy = this.handleSecondTitleForOrderBy(data.secondTitle);
      url = `${ApiConst.work.ui.get.GET_ALL}?orderBy=${orderBy}&pageNum=${currentPageNum}&pageSize=${currentPageSize}&typename=${typename}`;
    }else {
      url = ApiConst.work.software.get.GET_ALL;
      param.finished = data.secondTitle === '成品' ? '1' : '0';
    }
    this.getWorkData(url, {...param});
  }

  handleSecondTitleForTypename = (title) => {
    switch (title) {
      case '最新作品' :
      case '佳作分享':
        return '';
      default:
        return title;
    }
  }

  handleSecondTitleForOrderBy = (title) => {
    switch (title) {
      case '最新作品' :
        return 'created_time';
      case '佳作分享':
        return 'like_count';
      default:
        return '';
    }
  }

  onShowSizeChange = (pageNum, pageSize) => {
    console.log("pageNum", pageNum);
    console.log("pageSize", pageSize);
    commonRequest({url: GET_WORK_UI_ALL, data: {pageNum, pageSize}}).then(res => {
      this.setState({
        currentPageNum: pageNum,
        total: res.data.total,
        workData: res.data
      })
    });
  }

  handlePageChange = (pageNum, pageSize) => {
    console.log("pageNum", pageNum);
    console.log("pageSize", pageSize);
    this.setState({
      workData: null
    });
    commonRequest({url: GET_WORK_UI_ALL, data: {pageNum, pageSize: 20}}).then(res => {
      this.setState({
        currentPageNum: pageNum,
        total: res.data.total,
        workData: res.data
      })
    });
  }

}

const mapStateToProps = state => {
  return {
    isMobile: state.isMobile,
  }
}

export default connect(mapStateToProps)(WorkPage);
