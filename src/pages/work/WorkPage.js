import React from "react";
import {Menu, message, Pagination, Spin} from "antd";
import ALHeader from "../../components/al-header/ALHeader";
import ALFooter from "../../components/al-footer/ALFooter";
import MenuItem from "antd/lib/menu/MenuItem";
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ShowWorkBox from "../home/component/show-work-box/ShowWorkBox";
import {getWorkList} from "../../util/network/RequestHub";
import {WORK_DETAIL} from "../../util/router/config/RouterConst";
import ALLoading from "../../components/al-loading/ALLoading";
import ALFlexBox from "../../components/al-flex-box/ALFlexBox";

class WorkPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      workData: null,
      loading: true,
      currentPageNo: 1
    }
  }

  //渲染函数
  render() {
    return (
        <div style={{backgroundColor: "#eff3f5"}}>
          <div className="al-bg-color-white">
            <ALHeader/>
          </div>
          <div className="al-box-size-20px"></div>

          <div>
            <div className="content-width">
              {/*标题*/}
              <div>
                <Menu mode="horizontal">
                  <MenuItem>首页推荐</MenuItem>
                  <MenuItem>即刻作品</MenuItem>
                  <MenuItem>最新作品</MenuItem>
                  <MenuItem>佳作分享</MenuItem>
                </Menu>
              </div>

              {/*作品列表*/}
              <div>
                {
                  this.state.workData === null ?
                      <ALLoading show height={200} />
                      :
                      <ALFlexBox between wrap>
                        {
                          this.state.workData.list.map((item, index) => {
                            return <span key={index} onClick={() => {
                              this.goPage(WORK_DETAIL + "/" + item.id)
                            }}>
                      <ShowWorkBox workInfo={item}/>
                    </span>
                          })
                        }
                      </ALFlexBox>
                }

                {/*分页*/}
                <div className="al-flex-container-center-vh">
                  <div>
                    {
                      this.state.workData === null ? <div></div>
                          :
                          <ALInlineWidthBox>
                            <Pagination current={this.state.currentPageNo}
                                        total={50}
                                        onChange={(page, pageSize) => {
                              console.log(page);
                              console.log(pageSize);
                              getWorkList(page).then(res => {
                                this.setState({
                                  currentPageNo: page
                                })
                              });
                            }} />

                          </ALInlineWidthBox>
                    }
                  </div>
                </div>
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
    getWorkList().then(res => {
      this.setState({
        workData: res.data,
        loading: false
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
