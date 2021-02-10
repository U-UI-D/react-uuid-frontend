import React from "react";
import {WorkDetailContext} from "../../../../context/WorkDetailContext";
import {ALFlexBox} from "../../../../../../../../components/al-component";
import HoverBox from "../../../../component/HoverBox";
import {Affix} from "antd";

export default function RightBottomBar(props) {
  return (
    <WorkDetailContext.Consumer>
      {
        contextState => {
          const {hoverBoxData, backTopData} = contextState;
          return (
            <Affix offsetBottom={50} className="al-float-right">
              <ALFlexBox column width={60} className="al-m-right-40px">
                {
                  hoverBoxData.map((item, index) => {
                    return (
                      <div key={index}>
                        <HoverBox data={item}
                                  isChangeNum={item.title !== '评论'}
                                  showFloatDot
                                  onChange={props.handleChangeForHoverBox}/>
                      </div>
                    );
                  })
                }

                {
                  <HoverBox style={{visibility: props.scrollTop > 70 ? "" : "hidden"}}
                            data={backTopData} onClick={props.handleBackToTop}/>
                }

              </ALFlexBox>
            </Affix>
          );
        }
      }
    </WorkDetailContext.Consumer>
  )
}