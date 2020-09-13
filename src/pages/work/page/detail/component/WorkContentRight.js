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
  ];
  return (
    <div style={{
      width: 220,
      height: windowHeight - 40 + 'px',
      backgroundColor: "#fff",
      padding: 20
    }}>
      {
        props.data.userInfo === null ? <ALLoading/>
          :
          <div>
            <ALFlexBox centerV column>
              <Avatar src={userInfo.avatar} size={100}/>
              <h2>
                {userInfo.nickname}
              </h2>
              <div>
                {userInfo.email}
              </div>

              <ALFlexBox centerV between>
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

              <ALFlexBox column className="al-width-100">
                {
                  countData.map((item, index) => {
                    return (
                      <ALFlexBox key={item.title} centerV className="al-m-tb-10px" >
                        <span className="al-border-capsule al-p-5px al-display-inline-block"
                              style={{backgroundColor: "rgb(225,239,255)"}}>
                          <Avatar src={item.icon} size={25}/>
                        </span>
                        <span className="al-m-lr-10px">{item.title} {item.num}</span>
                      </ALFlexBox>
                    )
                  })
                }
              </ALFlexBox>

              <div>
                <ul>
                  <li>作品使用量</li>
                  <li>是否可商用</li>
                  <li>是否征集实现</li>
                </ul>
              </div>

              <div>
                以下开发者正在参与实现作品
              </div>
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
