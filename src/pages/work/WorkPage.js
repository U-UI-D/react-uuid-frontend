import React from "react";
import {ApiConst} from "../../util/network/config/ApiConst";
import {connect} from "react-redux";
import {WorkService} from "../../service/work/WorkService";
import {Affix, Empty, message, Pagination} from "antd";
import {WorkPageContext} from "./context/WorkPageContext";
import TitleList from "./component/title-list/TitleList";
import {ALFlexBox, ALLoading, ALPlaceBox} from "../../components/al-component";
import {RouterConst} from "../../util/router/config/RouterConst";
import ShowWorkBox from "./component/show-work-box/ShowWorkBox";
import './style.scss'


function View(props) {
  const {isMobile, workData, workType, currentPageNum, currentPageSize, total} = props;
  const {goPage, handleTitleListChange, onShowSizeChange, handlePageChange} = props;
  return (
    <WorkPageContext.Provider value={props}>
      <div className="work-page-view">
        <Affix>
          <TitleList onChange={handleTitleListChange} />
        </Affix>

        {/*作品列表*/}
        <div className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
          <ALPlaceBox height={10}/>
          <div style={{marginLeft: isMobile ? null : "15px"}}>
            {
              workData === null ? <ALLoading show height={200}/>
                :
                (
                  workData.total === 0 ? <Empty /> :
                    <ALFlexBox centerVH={isMobile} wrap margin={isMobile ? 0 : -15}>
                      {
                        workData.list && workData.list.map((item, index) => {
                          return (
                            <div key={index} onClick={() => {
                              goPage((workType === 'UI作品' ? RouterConst.work.ui.DETAIL_PAGE : RouterConst.work.software.DETAIL_PAGE) + item.id);
                            }} className={`${isMobile ? "al-width-96" : ""}`}>
                              <ShowWorkBox workInfo={item}/>
                            </div>
                          )
                        })
                      }
                    </ALFlexBox>
                )
            }
          </div>

          {/*分页*/}
          <ALFlexBox centerH className="al-m-tb-20px">
            <Pagination current={currentPageNum}
                        total={total}
                        defaultPageSize={currentPageSize}
                        pageSizeOptions={["20", "40", "60", "80", "100"]}
                        hideOnSinglePage
                        onShowSizeChange={onShowSizeChange}
                        onChange={handlePageChange}/>
          </ALFlexBox>
        </div>
      </div>
    </WorkPageContext.Provider>
  );
}


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
    return (
      <View {...this.state}
            {...this.props}
            goPage={this.goPage}
            handleTitleListChange={this.handleTitleListChange}
            onShowSizeChange={this.handlePageChange}
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
    WorkService.getUIWorkData({url, data, pageNum: data.pageNum, pageSize: data.pageSize}).then(res => {
      console.warn('test-> WorkPage.getWorkData', res);
      this.setState({
        workData: res,
        loading: false,
        total: res.total || 0
      })
    }).catch(err => {
      message.warning("数据获取失败");
    });
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

  handlePageChange = (pageNum, pageSize) => {
    this.setState({
      loading: true,
      workData: null
    });
    this.getWorkData(null, {pageNum, pageSize});
  }

}

const mapStateToProps = state => {
  return {
    isMobile: state.isMobile,
  }
}

export default connect(mapStateToProps)(WorkPage);
