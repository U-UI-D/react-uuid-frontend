import React from "react";
import {Empty, Affix, Pagination} from "antd";
import ShowWorkBox from "./component/show-work-box/ShowWorkBox";
import {commonRequest} from "../../util/network/RequestHub";
import {PATH_WORK_SOFTWARE_DETAIL, PATH_WORK_UI_DETAIL} from "../../util/router/config/RouterConst";
import {ApiConst, GET_WORK_SOFTWARE_ALL, GET_WORK_UI_ALL} from "../../util/network/config/ApiConst";
import "./style.css"
import TitleList from "./component/title-list/TitleList";
import {ALFlexBox, ALInlineWidthBox, ALLoading, ALPlaceBox} from "../../components/al-component";
import {HttpRequest} from "../../util/network/request";

class WorkPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null,
      loading: true,
      // pagination
      currentPageNum: 1,
      currentPageSize: 20,
      total: 0,
      workType: "UI作品"
    }
  }

  //渲染函数
  render() {
    const {workData, workType} = this.state;

    return (
      <div>
        <Affix>
          <TitleList onChange={this.handleTitleListChange} />
        </Affix>

        <div>
          <div className="content-width">



            {/*作品列表*/}
            <ALPlaceBox height={20}/>
            <div style={{marginLeft: "15px"}}>
              {
                workData === null ?
                  (
                    <ALLoading show height={200}/>
                  )
                  :
                  (
                    workData.total === 0 ?
                      <div>
                        <Empty />
                      </div>
                      :
                    <ALFlexBox wrap margin={-15}>
                      {
                        workData.list && workData.list.map((item, index) => {
                          return (
                            <div key={index} onClick={() => {
                              this.goPage((workType === 'UI作品' ? PATH_WORK_UI_DETAIL : PATH_WORK_SOFTWARE_DETAIL) + "/" + item.id);
                            }}>
                              <ShowWorkBox workInfo={item}/>
                            </div>
                          )
                        })
                      }
                    </ALFlexBox>
                  )
              }

              {/*分页*/}
              <ALFlexBox centerH className="al-m-tb-20px">
                {

                  <ALInlineWidthBox>
                    <Pagination current={this.state.currentPageNum}
                                total={this.state.total}
                                defaultPageSize={this.state.currentPageSize}
                                pageSizeOptions={["20", "40", "60", "80", "100"]}
                                hideOnSinglePage
                                onShowSizeChange={(pageNum, pageSize) => {
                                  console.log("pageNum", pageNum);
                                  console.log("pageSize", pageSize);
                                  commonRequest({url: GET_WORK_UI_ALL, data: {pageNum, pageSize}}).then(res => {
                                    this.setState({
                                      currentPageNum: pageNum,
                                      total: res.data.total,
                                      workData: res.data
                                    })
                                  });
                                }}
                                onChange={(pageNum, pageSize) => {
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
                                }}/>

                  </ALInlineWidthBox>
                }
              </ALFlexBox>
            </div>
          </div>

        </div>

      </div>
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
      // url: "http://localhost:9002/work/ui",
      data: data
    }).then(res => {
      if (res.err === null) {

        this.setState({
          workData: res.data.data,
          loading: false,
          total: res.data.total || 0
        })
      }
    })
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: data})
  }

  handleTitleListChange = data => {
    console.log("TitleListChange", data);
    this.setState({workType: data.firstTitle})
    let url = "";
    let param = {};
    if (data.firstTitle === 'UI作品'){
      url = GET_WORK_UI_ALL;
      param.typename = data.secondTitle === '全部' ? '' : data.secondTitle;
    }else {
      url = GET_WORK_SOFTWARE_ALL;
      // param.typename = data.secondTitle;
      param.finished = data.secondTitle === '成品' ? '1' : '0';
    }
    this.getWorkData(url, {...param});
  }


}

export default WorkPage;
