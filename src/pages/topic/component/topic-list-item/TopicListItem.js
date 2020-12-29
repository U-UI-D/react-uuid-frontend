import React from "react";
import {ALFlexBox, ALImage} from "../../../../components/al-component";
import {Button, Divider, Space} from "antd";
import DateTimeUtils from "../../../../util/DateTimeUtils";
import {NumberOutlined, Loading3QuartersOutlined, MessageOutlined, StarOutlined, LikeOutlined} from "@ant-design/icons";
import {RouterConst} from "../../../../util/router/config/RouterConst";

function TopicListItem(props) {
  const {data, showBottomLine} = props;


  return (
    <div className="al-p-lr-30px al-bg-color-white">
      <ALFlexBox wrap={false}>
        <div>
          <ALFlexBox centerV>
            <ALImage src={data.avatar} circle style={{width: "40px", height: "40px"}} />

            <div className="al-m-left-10px">
              <h3 style={{margin: 0}}>{data.nickname}</h3>
              <div className="uuid-text-desc">{DateTimeUtils.getFormerTime(DateTimeUtils.getFormatDateTime(data.createdTime, -8))}</div>
            </div>
          </ALFlexBox>
          <div onClick={() => {
            props.history.push({pathname: RouterConst.topic.TOPIC_DETAIL_PAGE + "/" + data.id});
          }}>
            <p className="al-m-top-20px al-cursor-arrow">{data.content}</p>
            <ALFlexBox className="al-m-top-20px">
              {
                data.imgUrls.map((item, index) => {
                  return(
                    <ALImage src={item}
                             key={index}
                             size={200}
                             className="al-m-right-10px al-m-bottom-10px"
                             style={{border: "solid 1px #f6f6f6"}} />
                  )
                })
              }
            </ALFlexBox>
          </div>
        </div>
      </ALFlexBox>

      {
        data.workId ? (
          <div className="al-m-top-20px">
            <h2>关联作品</h2>
            <ALFlexBox className="al-p-10px al-cursor-pointer"
                       style={{backgroundColor: "#fafafa"}}
                       onClick={() => {
                         let pathname = data.workType === "ui" ? RouterConst.work.ui.DETAIL_PAGE : RouterConst.work.software.DETAIL_PAGE;
                         pathname += "/" + data.workId;
                         props.history.push({pathname: pathname})
                       }}>
              <ALImage src={data.workPoster} width={200} height={140} radius={10} />
              <div className="al-m-left-20px">
                <h3>{data.workTitle}</h3>
              </div>
            </ALFlexBox>
          </div>
        ) : null
      }

      <ALFlexBox between centerV className="al-m-top-20px">
        <Space>
          {
            data.topicTag ? (
              <Button shape="round" style={{
                backgroundColor: "rgba(0,141,255, .1)",
                color: "rgb(0,141,255)",
                border: "none",
                fontSize: "13px"
              }}> <NumberOutlined style={{marginLeft: "0"}} /> {data.topicTag}</Button>
            ) : null
          }

          {
            data.boardTag ? (
              <Button shape="round" danger style={{
                backgroundColor: "rgba(255, 77, 79, .1)",
                border: "none",
                fontSize: "13px"
              }}> <Loading3QuartersOutlined style={{marginLeft: "0"}} /> {data.boardTag}</Button>
            ) : null
          }
        </Space>

        <Space size={"large"}>
          <span>643 浏览</span>
          <span><LikeOutlined className="uuid-icon-style" /> 15</span>
          <span><MessageOutlined className="uuid-icon-style" /> 6</span>
          <span><StarOutlined className="uuid-icon-style" /> 3</span>
        </Space>
      </ALFlexBox>

      {
        showBottomLine ? (
          <div className="al-m-tb-30px">
            <Divider style={{margin: 0}} />
          </div>
        ) : null
      }
    </div>
  );
}

export default TopicListItem;
