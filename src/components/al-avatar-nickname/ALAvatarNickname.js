import React from "react";
import {ALFlexBox, ALImage} from "../al-component";
import PropTypes from "prop-types";

function ALAvatarNickname(props) {
  return (
    <ALFlexBox centerV className={props.className} style={props.style}>
      <ALImage src={props.avatar} circle size={props.avatarSize} />
      <div className="al-m-left-10px">
        <h3 style={{margin: 0}}>
          {props.nickname}
          {props.tagSlot ?? ""}
        </h3>
        <div className="uuid-text-desc">{props.subTitle}</div>
      </div>
    </ALFlexBox>
  );
}

// prop类型
ALAvatarNickname.propTypes = {
  avatarSize: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  style: PropTypes.object,
  className: PropTypes.string,
}

// prop默认值
ALAvatarNickname.defaultProps = {
  avatarSize: 40,
}


export default ALAvatarNickname;
