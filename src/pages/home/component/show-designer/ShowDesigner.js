import React from "react";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import {Avatar} from "antd";

function ShowDesigner(props) {
  return (
      <div>
        <ALFlexBox>
          <div className="al-width-30">
            <ALFlexBox>
              <Avatar src={require('../../../../assets/icon/common/UUID2.png')} size={100} />
              <div>
                个人资料
              </div>
            </ALFlexBox>
          </div>
          <div className="al-width-70">
            封面
          </div>
        </ALFlexBox>
      </div>
  );
}

export default ShowDesigner;
