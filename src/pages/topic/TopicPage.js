import React from "react";
import {ALFlexBox, ALImage, ALPlaceBox} from "../../components/al-component";
import {Button, Col, Divider, Input, message, Row, Space} from "antd";
import {SearchOutlined} from '@ant-design/icons';
import "./style.css";
import TopicListItem from "./component/topic-list-item/TopicListItem";
import {RouterConst} from "../../util/router/config/RouterConst";
import {HttpRequest} from "../../util/network/request";
import {NumberOutlined} from "@ant-design/icons";
import {ApiConst} from "../../util/network/config/ApiConst";


// 话题页面
class TopicPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      topicList: [],
      hotTopicList: ["色彩搭配", "渐变颜色", "阴影效果", "3D效果", "主题", "模糊效果"],
      hotBoardList: [
        {
          poster: "https://tenfei04.cfp.cn/creative/vcg/veer/800water/veer-308303418.jpg",
          title: "设计",
          desc: ""
        },
        {
          poster: "https://p6-tt.byteimg.com/origin/pgc-image/SJlElx3ID5K089?from=pc",
          title: "UI",
          desc: ""
        },
        {
          poster: "https://tenfei04.cfp.cn/creative/vcg/veer/800water/veer-134696158.jpg",
          title: "开发",
          desc: ""
        }
      ],
      pageNum: 1,
      loading: false
    }
  }

  //渲染函数
  render() {
    const {topicList, hotTopicList, hotBoardList, loading} = this.state;
    return(
      <div className="content-width al-p-tb-20px">
        <ALFlexBox between>
          <h3>话题首页</h3>

          <Space>
            <span className="search-topic-wrap">
              <input placeholder="搜索话题"
                     className="search-input-box" />
              <SearchOutlined />
            </span>
            <Button shape={"round"} danger onClick={() => {
              message.info("功能正在开发中...")
            }}>热门话题</Button>
            <Button shape={"round"} type={"text"}>最新发表</Button>

            <Button shape={"round"} type="primary"
                    onClick={() => {
                      this.props.history.push({pathname: RouterConst.topic.NEW_TOPIC_PAGE});
                    }}>发表话题</Button>
          </Space>
        </ALFlexBox>


        <Row>
          <Col span={18}>
            <Divider />

            <div className="al-bg-color-white al-p-tb-30px">
              {
                topicList.map((item, index) => {
                  return (
                    <div key={index}>
                      <TopicListItem data={item}
                                     history={this.props.history}
                                     showBottomLine={index !== topicList.length-1} />

                    </div>
                  )
                })
              }
            </div>

            <ALFlexBox centerVH className="al-m-20px">
              <Button shape="round"
                      loading={loading}
                      onClick={this.handleLoadMore}>加载更多</Button>
            </ALFlexBox>
          </Col>
          <Col span={6}>

            <div className="al-p-10px al-m-top-20px">
              <h2>热门圈子</h2>
              <ALFlexBox>
                {
                  hotBoardList.map((item, index)=> {
                    return(
                      <div key={index} className="al-p-15px al-bg-color-white">
                        <ALFlexBox column centerVH wrap={false}>
                          <div style={{width: "60px", height: "60px"}}>
                            <ALImage circle src={item.poster} style={{width: "60px", height: "60px"}} fit={"cover"}/>
                          </div>
                          <h3 className="al-text-overflow-show-point">{item.title}</h3>
                        </ALFlexBox>
                      </div>
                    )
                  })
                }
              </ALFlexBox>
            </div>

            <div className="al-p-10px">
              <h2>热门话题</h2>
              <ALFlexBox className="al-p-15px al-bg-color-white">
                {
                  hotTopicList.map((item, index)=> {
                    return(
                      <Button key={index}
                              shape="round"
                              size="small"
                              style={{fontSize: "12px"}}
                              className="al-m-right-10px al-m-bottom-10px">
                        <NumberOutlined style={{marginLeft: "0"}} />
                        {item}
                      </Button>
                    )
                  })
                }
              </ALFlexBox>
            </div>


          </Col>
        </Row>



      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    this.getTopicList();
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  getTopicList = (pageNum=1, pageSize=3) => {
    this.setState({loading: true});
    HttpRequest.get({
      // url: ApiConst.topic.get.GET_ALL + `?pageNum=${pageNum}&pageSize=${pageSize}`
      url: "http://localhost:9005/topic" + `?pageNum=${pageNum}&pageSize=${pageSize}`
    }).then(res => {
      if (res.err === null){
        this.setState({
          topicList: res.data.data.list.reverse(),
          pageNum: pageNum,
          loading: false
        })
      }
    }).catch(err => {

    })
  }

  // 加载更多
  handleLoadMore = () => {
    this.getTopicList(this.state.pageNum+1, 10);
  }

}

export default TopicPage;
