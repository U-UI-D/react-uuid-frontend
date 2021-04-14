import React, {useEffect, useState} from "react";
import {Avatar, Button, Divider} from "antd";
import {commonRequest} from "../../../../util/network/RequestHub";
import "./style.css";
import {GET_DESIGNER_RECOMMEND} from "../../../../util/network/config/ApiConst";
import {ALFlexBox, ALLoading} from "../../../../components/al-component";
import {connect} from "react-redux";

function ShowDesigner(props) {
  const {isMobile} = props;

  const [designerData, setDesignerData] = useState(null);
  useEffect( () => {
    commonRequest({url: GET_DESIGNER_RECOMMEND, env: "mock"}).then(res => {
      setDesignerData(res.data)
    })
  }, []);

  const style = {
    descText: "color: #bbb; font-size: 12px"
  }


  return designerData === null ? <ALLoading show height={200}/> : (
      <div>
        {
          designerData.map((item, index) => {
            return (
              <div key={index} className={`al-hover-bgcolor-white al-cursor-pointer ${isMobile ? "" : "content-width"}`}>
                <ALFlexBox centerV between={!isMobile} wrap={isMobile}>
                  <ALFlexBox padding={30}  centerV>
                    <div>
                      {/*头像*/}
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
                  <span>
                    作品
                    <span className="al-font-weight-bold al-m-left-5px"
                          style={{
                            fontSize: 14 + 'px',
                            color: "#282828"
                          }}>
                      {item.workCount}
                    </span>
                  </span>
                        <span className="al-m-lr-5px">|</span>
                        <span>
                    粉丝
                    <span className="al-font-weight-bold al-m-lr-5px"
                          style={{
                            fontSize: 14 + 'px',
                            color: "#282828"
                          }}>
                      {item.fans}
                    </span>
                  </span>
                      </div>

                      <div>{item.sign}</div>

                      <div className="al-m-top-20px">
                        <Button type="primary">关注</Button>
                      </div>

                    </div>

                  </ALFlexBox>

                  <ALFlexBox centerVH={isMobile}  className="al-text-right">
                    {
                      //封面图
                      item.workPoster.map((item, index) => {
                        return <Avatar shape="square"
                                       style={{
                                         width: '30%',
                                         height: '100%',
                                         margin: "0 5px"
                                       }}
                                       src={item}
                                       key={item}/>
                      })
                    }
                  </ALFlexBox>
                </ALFlexBox>
                {
                  index !== designerData.length ? <Divider /> : null
                }
              </div>
            )
          })
        }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobile
  }
}

export default connect(mapStateToProps)(ShowDesigner);
