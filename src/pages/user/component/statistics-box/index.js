import React from "react";
import {UserContext} from "../../context/UserContext";
import {ALFlexBox} from "../../../../components/al-component";
import {Divider, Row, Space} from "antd";

function DataBox(props) {
  const {data} = props;
  return (
    <ALFlexBox centerVH column>
      <h2 className='al-text-color-white' style={{margin: 0}}>{data.num}</h2>
      <p className='user-sign' style={{margin: 0}}>{data.text}</p>
    </ALFlexBox>
  )
}

export default function StatisticsBox(props) {
  const data = [
    {
      num: 4395,
      text: "浏览"
    },
    {
      num: 93,
      text: "获赞"
    },
    {
      num: 42,
      text: "收藏"
    }
  ];
  return (
    <UserContext.Consumer>
      {
        contextState => {
          const {userInfo} = contextState;
          return (
            <ALFlexBox>
              <Space size={40}>
                {
                  data.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <DataBox data={item} />
                        {
                          index === data.length-1 ? <></> : (
                            <Divider type="vertical" style={{borderColor: 'rgba(255,255,255,.5)', height: '2em'}} />
                          )
                        }
                      </React.Fragment>
                    )
                  })
                }
              </Space>
            </ALFlexBox>
          )
        }
      }
    </UserContext.Consumer>
  );
}
