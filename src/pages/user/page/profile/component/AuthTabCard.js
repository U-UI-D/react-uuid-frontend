import React from "react";
import {Avatar, Button} from "antd";
import {ALFlexBox} from "../../../../../components/al-component";

function AuthTabCard(props) {
  return (
      <div>
        <h1>身份认证</h1>
        <div>
          <div className="al-hover-bgcolor-light-white"
               style={{margin: "0 -40px", padding: "0 40px"}}>
            <ALFlexBox between centerV>
              <ALFlexBox centerV>
                <Avatar size={100} src={require('../../../../../assets/icon/common/UUID2.png')}/>
                <ALFlexBox column centerH>
                  <h3>实名认证</h3>
                  <div>填写身份信息，属于自己的身份标志</div>
                </ALFlexBox>
              </ALFlexBox>
              <div>
                <Button type="primary">认证</Button>
              </div>
            </ALFlexBox>
          </div>
        </div>
      </div>
  );
}

export default AuthTabCard;
