import React from "react";
import PropTypes from "prop-types";

function ALDot(props) {
  return (
    <div {...props}
         style={{
           borderRadius: '999rem',
           width: props.size + 'px',
           height: props.size + 'px',
           backgroundColor: props.color,
           display: "inline-block"
         }}></div>
  );
}

// prop类型
ALDot.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  gutter: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  color: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

// prop默认值
ALDot.defaultProps = {
  color: "#000",
  size: 8,
  style: {},
  className: "",
  onClick: null,
}
export default ALDot;
