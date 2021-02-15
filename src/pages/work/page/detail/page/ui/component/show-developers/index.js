import React from "react";
import {Avatar} from "antd";
import {ALFlexBox} from "../../../../../../../../components/al-component";

function ShowDevelopers(props) {

  const developers = [
    {
      id: 1,
      avatar: "https://gitee.com/AlanLee97/assert/raw/master/note_images/naruto.jpg",
      username: "AlanLee",
      nickname: "AlanLee"
    },
    {
      id: 2,
      avatar: "https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar2.jpg",
      username: "ss0001",
      nickname: "John"
    },
    {
      id: 3,
      avatar: "https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar3.jpg",
      username: "dd0001",
      nickname: "DD"
    }
  ];

  return (
    <div>
      <p className="al-m-top-20px">以下开发者正在开发此项目</p>
      <ALFlexBox className='al-m-tb-20px'>
        {
          developers.map((item, index) => <Avatar key={index} src={item.avatar} size={50} style={{marginRight: "10px"}} />)
        }
      </ALFlexBox>
    </div>
  );
}

export default ShowDevelopers;
