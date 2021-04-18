import React from "react";
import {Avatar} from "antd";
import {ALFlexBox} from "@components/al-component";

function ShowDevelopers(props) {
  const {list} = props;

  return (
    <div className="show-developer-view">
      <p className="al-m-top-20px">以下开发者正在开发此项目</p>
      <ALFlexBox className='al-m-tb-20px'>
        {
          list.map((item, index) => <Avatar key={index} src={item.avatar} size={50} style={{marginRight: "10px"}} />)
        }
      </ALFlexBox>
    </div>
  );
}

export default ShowDevelopers;
