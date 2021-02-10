import React, {useState} from "react";
import {ALFlexBox, ALTitleBox} from "../../../../../../../components/al-component";

function WorkPublishLeftLayout(props) {
  const [title, setTitle] = useState("上传作品");
  return (
    <div>
      <ALFlexBox width={200}
                 height={200}
                 className="al-bg-color-white">
        <ALFlexBox column flexNum={1}>
          <div className="hover-bg-color-primary al-m-bottom-10px"
               onClick={() => {
                 setTitle("上传作品");
                 props.onChange("上传作品");
               }}>
            <ALTitleBox hNum={3}
                        isBeauty={title === "上传作品"}
                        text={"上传作品"}
                        className="hover-bg-color-primary al-cursor-pointer"
            />
          </div>


          <div className="al-cursor-pointer"
               onClick={() => {
                 setTitle("上传素材");
                 props.onChange("上传素材");
               }}>
            <ALTitleBox hNum={3}
                        text={"上传素材"}
                        isBeauty={title === "上传素材"}
                        className="hover-bg-color-primary"
            />

          </div>

        </ALFlexBox>
      </ALFlexBox>
    </div>
  );
}

export default WorkPublishLeftLayout;
