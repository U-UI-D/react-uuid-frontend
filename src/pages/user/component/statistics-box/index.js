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
  return (
    <UserContext.Consumer>
      {
        contextState => {
          const {userInfo} = contextState;
          let data = {
            num: 2242,
            text: "描述"
          }
          return (
            <ALFlexBox>
              <Space size={40}>
                <DataBox data={data} />
                <Divider type="vertical" style={{borderColor: 'rgba(255,255,255,.5)', height: '2em'}} />
                <DataBox data={data} />
                <Divider type="vertical" style={{borderColor: 'rgba(255,255,255,.5)', height: '2em'}} />
                <DataBox data={data} />
              </Space>
            </ALFlexBox>
          )
        }
      }
    </UserContext.Consumer>
  );
}