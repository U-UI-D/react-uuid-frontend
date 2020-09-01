import React, {useState} from "react";
import ALLabelBox from "../../../../../components/al-label-box/ALLabelBox";
import {Button, Input} from "antd";
import {getUserInfoFromLocalStorage} from "../../../../../util/util";
import ALFlexBox from "../../../../../components/al-flex-box/ALFlexBox";

function AccountSecurityTabCard(props) {
  let [userInfo, setUserInfo] = useState(getUserInfoFromLocalStorage());

  return (
    <div>
      <h1>账户安全</h1>
      <div>
        <div className="al-m-tb-20px">
          <ALLabelBox label={"用户名"}>
            <ALFlexBox between centerV>
              <div>{userInfo.username}</div>
              <Button type="primary">修改</Button>
            </ALFlexBox>
          </ALLabelBox>
        </div>

        <div className="al-m-tb-30px">
          <ALLabelBox label={"手机帐号"}>
            <ALFlexBox between centerV>
              <div>{userInfo.phone}</div>
              <Button type="primary">修改</Button>
            </ALFlexBox>
          </ALLabelBox>
        </div>

        <div className="al-m-tb-30px">
          <ALLabelBox label={"邮箱帐号"}>
            <ALFlexBox between centerV>
              <div>{userInfo.email}</div>
              <ALFlexBox>
                <Button type="primary" danger>解绑</Button>
                <div style={{width: 20+'px'}}></div>
                <Button type="primary">修改</Button>
              </ALFlexBox>
            </ALFlexBox>
          </ALLabelBox>
        </div>

        <div className="al-m-tb-30px">
          <ALLabelBox label={"登录密码"}>
            <ALFlexBox between centerV>
              <div>密码要求至少包含字母，符号或数字中的两项且长度超过8位，建议您经常修改密码，以保证帐号更加安全。</div>
              <Button type="primary">修改</Button>
            </ALFlexBox>
          </ALLabelBox>
        </div>

      </div>
    </div>
  );
}

export default AccountSecurityTabCard;
