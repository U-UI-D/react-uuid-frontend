import React from "react";
import PropTypes from "prop-types";
import ALLoading from "../../../../../components/al-loading/ALLoading";
import {Avatar, Divider} from "antd";
import ALFlexBox from "../../../../../components/al-flex-box/ALFlexBox";
import ALPlaceBox from "../../../../../components/al-place-box/ALPlaceBox";

let windowHeight = window.innerHeight;

function WorkContentRight(props) {
  const {userInfo} = props.data;
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
                  <Avatar src={userInfo.avatar} size={100} />
                  <h2>
                    {userInfo.nickname}
                  </h2>
                  <div>
                    {userInfo.email}
                  </div>

                  <ALFlexBox centerV between>
                    <div>
                      关注
                    </div>
                    <ALPlaceBox width={60} />
                    <div>
                      粉丝
                    </div>
                  </ALFlexBox>

                  <Divider dashed style={{color: "#bbb"}} />

                  <h2>
                    作品信息
                  </h2>

                  <div>
                    <ul>
                      <li>点赞</li>
                      <li>收藏</li>
                      <li>评论</li>
                    </ul>
                  </div>

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
