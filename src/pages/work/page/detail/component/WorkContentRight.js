import React from "react";
import PropTypes from "prop-types";
import ALLoading from "../../../../../components/al-loading/ALLoading";
import {Avatar, Divider} from "antd";
import ALFlexBox from "../../../../../components/al-flex-box/ALFlexBox";
import ALPlaceBox from "../../../../../components/al-place-box/ALPlaceBox";

let windowHeight = window.innerHeight;

function WorkContentRight(props) {
  const {userInfo} = props.data;

  const countData = [
    {
      icon: require("../../../../../assets/icon/common/dianzan1.png"),
      title: "点赞",
      num: 666
    },
    {
      icon: require("../../../../../assets/icon/common/shoucang1.png"),
      title: "收藏",
      num: 33
    },
    {
      icon: require("../../../../../assets/icon/common/xiaoxi1.png"),
      title: "评论",
      num: 88
    },
    {
      icon: require("../../../../../assets/icon/common/ziliao1.png"),
      title: "使用",
      num: 3
    },
  ];

  const developerList = [
    {
      id: 1,
      avatar: "https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar1.jpg",
      nickname: "AlanLee1",
      username: "alanlee",
      identity: "全栈工程师",
    },
    {
      id: 1,
      avatar: "https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar2.jpg",
      nickname: "AlanLee2",
      username: "alanlee",
      identity: "前端工程师",
    },
    {
      id: 1,
      avatar: "https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar3.jpg",
      nickname: "AlanLee3",
      username: "alanlee",
      identity: "前端工程师",
    },
    {
      id: 1,
      avatar: "https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar4.jpg",
      nickname: "AlanLee4",
      username: "alanlee",
      identity: "Java工程师",
    },
    {
      id: 1,
      avatar: "https://gitee.com/AlanLee97/react_native_mock_uicn/raw/master/src/assets/image/other/avatar/avatar5.jpg",
      nickname: "AlanLee5",
      username: "alanlee",
      identity: "PHP工程师",
    }
  ];
  return (
    <div style={{
      width: 220,
      height: 'auto',
      backgroundColor: "#fff",
      padding: 20
    }}>
      {
        props.data.userInfo === null ? <ALLoading/>
          :
          <div>
            <ALFlexBox column>
              <ALFlexBox centerV>
                <Avatar src={userInfo.avatar} size={50}/>
                <ALFlexBox column className="al-m-left-10px">
                  <h2 style={{margin: 0}}>
                    {userInfo.nickname}
                  </h2>
                  <div className="desc-text">
                    {userInfo.identity}
                  </div>
                </ALFlexBox>
              </ALFlexBox>


              <ALFlexBox centerV between className="al-m-tb-10px">
                <div>
                  关注 23
                </div>
                <ALPlaceBox width={60}/>
                <div>
                  粉丝 11
                </div>
              </ALFlexBox>

              <Divider dashed style={{color: "#bbb"}}/>

              <h2>
                作品信息
              </h2>

              <ALFlexBox between>
                {
                  countData.map((item, index) => {
                    return (
                      <ALFlexBox key={item.title} centerV
                                 className="al-m-bottom-10px primary-border-radius al-p-5px"
                                 style={{backgroundColor: "#f6f6f6"}}>
                        <span className="al-border-capsule al-p-5px al-display-inline-block"
                              style={{backgroundColor: "rgb(225,239,255)"}}>
                          <Avatar src={item.icon} size={25}/>
                        </span>
                        <ALFlexBox column centerV className="al-m-lr-5px">
                          <div>{item.title}</div>
                          <div>{item.num}</div>
                        </ALFlexBox>
                      </ALFlexBox>
                    )
                  })
                }
              </ALFlexBox>

              <div>
                <ul>
                  <li>可商用：允许</li>
                  <li>征集开发：征集中</li>
                </ul>
              </div>

              <div>
                以下开发者正在开发作品
              </div>
              <ALFlexBox>
                {
                  developerList.map((item, index) => {
                    return (
                        <ALFlexBox key={item.nickname} margin={4}>
                          <Avatar src={item.avatar} size={50} />
                        </ALFlexBox>
                    )
                  })
                }
              </ALFlexBox>
            </ALFlexBox>
          </div>
      }
    </div>
  );
}

WorkContentRight.propTypes = {
  data: PropTypes.object
}

export default WorkContentRight;
