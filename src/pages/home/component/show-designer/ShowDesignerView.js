import {ALFlexBox, ALLoading} from "../../../../components/al-component";
import {Avatar, Button, Divider} from "antd";
import React from "react";
import "./style.scss";

export default function (props) {
  const {designerData, isMobile} = props;
  return designerData === null ? <ALLoading show height={200}/> : (
    <div className="show-designer-view">
      {
        designerData.map((item, index) => {
          return (
            <div key={index} className={`al-hover-bgcolor-white al-cursor-pointer ${isMobile ? "" : "content-width"}`}>
              <ALFlexBox centerV between={!isMobile} wrap={isMobile}>
                <ALFlexBox padding={30} centerV>
                  {/*头像*/}
                  <div>
                    <Avatar src={item.avatar} size={100}/>
                  </div>

                  {/*个人信息*/}
                  <div className="al-m-lr-20px desc-text">
                    <h3 className="al-font-weight-bold">{item.nickname}</h3>
                    <div>
                      <span>{item.city}</span>
                      <span className="al-m-lr-5px">|</span>
                      <span>{item.occupation}</span>
                    </div>

                    <div>
                      <span className="work-text">
                        作品<span className="num">{item.workCount}</span>
                      </span>
                      <span className="al-m-lr-5px">|</span>
                      <span>
                        粉丝<span className="num">{item.fans}</span>
                      </span>
                    </div>

                    <div>{item.sign}</div>
                      <div className="al-m-top-20px">
                        <Button type="primary">关注</Button>
                      </div>
                    </div>
                </ALFlexBox>

                {/*封面图*/}
                <ALFlexBox centerVH={isMobile} className="al-text-right">
                  {
                    item.workPoster.map((item, index) => {
                      return <Avatar shape="square"
                                     className="poster"
                                     src={item}
                                     key={item}/>
                    })
                  }
                </ALFlexBox>
              </ALFlexBox>
              {
                index !== designerData.length ? <Divider/> : null
              }
            </div>
          )
        })
      }
    </div>
  );
}
