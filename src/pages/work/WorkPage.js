import React from "react";
import {Menu, message, Pagination, Spin} from "antd";
import ALHeader from "../../components/al-header/ALHeader";
import ALFooter from "../../components/al-footer/ALFooter";
import MenuItem from "antd/lib/menu/MenuItem";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ShowWorkBox from "./component/show-work-box/ShowWorkBox";
import {commonRequest} from "../../util/network/RequestHub";
import {WORK_DETAIL} from "../../util/router/config/RouterConst";
import ALLoading from "../../components/al-loading/ALLoading";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";
import {GET_WORK_ALL} from "../../util/network/config/ApiConst";
import ALPlaceBox from "../../components/al-place-box/ALPlaceBox";

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
      total: 0
    }
  }

  //渲染函数
  render() {

    const {SubMenu} = Menu;

    return (
      <div>
        <div className="al-bg-color-white">
          <ALHeader/>
        </div>

        <div className="al-bg-color-white">
          {/*标题*/}
          <div className="content-width">
            <div id="work-menu-title">
              <Menu mode="horizontal">
                <MenuItem>全部</MenuItem>
                <SubMenu key="UIWorkSubMenu" title={"UI作品"}>
                  <div className="al-bg-color-white" style={{width: "100vw"}}>
                    <div className="content-width">
                      <Menu mode="horizontal">
                        <MenuItem>首页推荐</MenuItem>
                        <MenuItem>即刻作品</MenuItem>
                        <MenuItem>最新作品</MenuItem>
                        <MenuItem>佳作分享</MenuItem>
                      </Menu>
                    </div>
                  </div>
                </SubMenu>
                <MenuItem>软件作品</MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        <div>
          <div className="content-width">

            {/*作品列表*/}
            <ALPlaceBox height={20} />
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
                            this.goPage(WORK_DETAIL + "/" + item.id)
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
                                  commonRequest({url: GET_WORK_ALL, data: {pageNum, pageSize}}).then(res => {
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
                                  commonRequest({url: GET_WORK_ALL, data: {pageNum, pageSize: 20}}).then(res => {
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
    commonRequest({url: GET_WORK_ALL}).then(res => {
      this.setState({
        workData: res.data,
        loading: false,
        total: res.data.total
      })
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  goPage = (path, data = {}) => {
    this.props.history.push({pathname: path, state: {}})
  }


}

export default WorkPage;
