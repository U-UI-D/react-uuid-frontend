import React, {useState} from "react";
import {ALFlexBox, ALTitleBox} from "@components/al-component";
import './style.scss';

function WorkPublishLeftLayout(props) {
  const [title, setTitle] = useState("上传作品");
  const handleTitleChange = (title) => {
    setTitle(title);
    props.onChange(title);
  }
  return (
    <div className="new-work-layout-left">
      <ALFlexBox column flexNum={1}>
        <div className="hover-bg-color-primary al-m-bottom-10px" onClick={() => handleTitleChange('上传作品')}>
          <ALTitleBox hNum={3}
                      isBeauty={title === "上传作品"}
                      text={"上传作品"}
                      className="hover-bg-color-primary al-cursor-pointer"/>
        </div>

        <div className="al-cursor-pointer" onClick={() => handleTitleChange('上传素材')}>
          <ALTitleBox hNum={3}
                      text={"上传素材"}
                      isBeauty={title === "上传素材"}
                      className="hover-bg-color-primary"/>
        </div>
      </ALFlexBox>
    </div>
  );
}

export default WorkPublishLeftLayout;
