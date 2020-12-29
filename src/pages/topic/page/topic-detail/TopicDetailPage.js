import React from "react";
import {Button, Col, Divider, Row, Space} from "antd";
import {ALComment, ALFlexBox, ALImage, ALLoading} from "../../../../components/al-component";
import DateTimeUtils from "../../../../util/DateTimeUtils";
import {HttpRequest} from "../../../../util/network/request";
import {NumberOutlined, Loading3QuartersOutlined} from "@ant-design/icons";


class TopicDetailPage extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      topicData: null
    }
  }

  //渲染函数
  render() {
    const {topicData} = this.state;
    return(
      <div className="content-width al-p-tb-20px">
        <Row gutter={[10]}>
          <Col span={18}>
            <div className="al-p-30px al-bg-color-white">
              {
                topicData ? (
                  <div>
                    <ALFlexBox wrap={false}>
                      <div>
                        <ALFlexBox centerV>
                          <ALImage src={topicData.avatar} circle style={{width: "40px", height: "40px"}} />
                          <div className="al-m-left-10px">
                            <h3 style={{margin: 0}}>{topicData.nickname}</h3>
                            <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(topicData.createdTime)}</div>
                          </div>
                        </ALFlexBox>
                        <p className="al-m-top-20px al-cursor-arrow al-m-bottom-20px">{topicData.content}</p>
                        <div>
                          {
                            topicData.imgUrls.map((item, index) =>{
                              return(
                                <div key={index}>
                                  <ALImage src={item} previewable style={{width: "100%"}} />
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </ALFlexBox>

                    {/*话题 圈子*/}
                    <div className="al-m-top-20px">
                      <Space>
                        <Button shape="round" style={{
                          backgroundColor: "rgba(0,141,255, .1)",
                          color: "rgb(0,141,255)",
                          border: "none",
                          fontSize: "13px"
                        }}> <NumberOutlined style={{marginLeft: "0"}} /> {topicData.topicTag}</Button>
                        <Button shape="round" danger style={{
                          backgroundColor: "rgba(255, 77, 79, .1)",
                          border: "none",
                          fontSize: "13px"
                        }}> <Loading3QuartersOutlined style={{marginLeft: "0"}} /> {topicData.boardTag}</Button>
                      </Space>
                    </div>

                    <Divider />

                    {/*评论*/}
                    <div className="al-m-top-20px">
                      <h2>说说我的看法</h2>
                      <ALComment />
                    </div>
                  </div>
                ) : <ALLoading />
              }
            </div>
          </Col>
          <Col span={6}>
            <div className="al-p-30px al-bg-color-white">
              {
                topicData?.workId ? (
                  <div className="al-m-top-20px">
                    <h2>关联作品</h2>
                    <ALFlexBox className="al-p-10px" style={{backgroundColor: "#fafafa"}}>
                      <ALImage src={topicData.workPoster} width={200} height={140} radius={10} />
                      <div className="al-m-left-20px">
                        <h3>{topicData.workTitle}</h3>
                      </div>
                    </ALFlexBox>
                  </div>
                ) : null
              }
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

    let {id} = this.props.match.params;
    console.log("id", id);
    console.log("props", this.props);

    this.getTopicDataById(id);
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

  getTopicDataById = (id) => {
    HttpRequest.get({
      url: "http://localhost:9005/topic/" + id
    }).then(res => {
      if (res.err === null){
        this.setState({
          topicData: res.data.data
        })
      }
    })
  }

}

export default TopicDetailPage;
