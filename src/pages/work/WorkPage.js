import React from "react";
import {Affix, Pagination} from "antd";
import ShowWorkBox from "./component/show-work-box/ShowWorkBox";
import {commonRequest} from "../../util/network/RequestHub";
import {PATH_WORK_DETAIL} from "../../util/router/config/RouterConst";
import {GET_WORK_UI_ALL} from "../../util/network/config/ApiConst";
import "./style.css"
import TitleList from "./component/title-list/TitleList";
import {ALFlexBox, ALFooter, ALInlineWidthBox, ALLoading, ALPlaceBox} from "../../components/al-component";

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
      workType: null
    }
  }

  //渲染函数
  render() {
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
                this.state.workData === null ?
                  <ALLoading show height={200}/>
                  :
                  <ALFlexBox wrap margin={-15}>
                    {
                      this.state.workData.list.map((item, index) => {
                        return (
                          <div key={index} onClick={() => {
                            this.goPage(PATH_WORK_DETAIL + "/" + item.id)
                          }}>
                            <ShowWorkBox workInfo={item}/>
                          </div>
                        )
                      })
                    }
                  </ALFlexBox>
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

        <div className="al-box-size-20px"></div>
        <div className="al-bg-color-light-white">
          <ALFooter/>
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
  getWorkData = (data = {}) => {
    commonRequest({url: GET_WORK_UI_ALL, data}).then(res => {
      if (res.err === null) {
        this.setState({
          workData: res.data,
          loading: false,
          total: res.data.total || 0
        })
      }
    })
  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: {}})
  }

  handleTitleListChange = data => {
    console.log("TitleListChange", data);
    this.getWorkData({typename: data.secondTitle === '全部' ? null : data.secondTitle});
  }


}

export default WorkPage;
