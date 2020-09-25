import React, {useEffect, useState} from "react";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import {Avatar, Button} from "antd";
import {commonRequest} from "../../../../util/network/RequestHub";
import ALLoading from "../../../../components/al-loading/ALLoading";
import "./style.css";
import {GET_DESIGNER_RECOMMEND} from "../../../../util/network/config/ApiConst";

function ShowDesigner(props) {

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
              <div key={index} className="al-hover-bgcolor-white al-cursor-pointer">
                <ALFlexBox centerV between>
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

                  <ALFlexBox  className="al-text-right al-m-right-30px">
                    {
                      //封面图
                      item.workPoster.map((item, index) => {
                        return <Avatar shape="square"
                                       style={{
                                         width: 200 + 'px',
                                         height: 150 + 'px',
                                         margin: "0 5px"
                                       }}
                                       src={item}
                                       key={item}/>
                      })
                    }
                  </ALFlexBox>
                </ALFlexBox>
              </div>
            )
          })
        }
      </div>
  );
}

export default ShowDesigner;
