import React from "react";
import PropTypes from "prop-types";

function ALImage(props) {
  return (
      <div style={{
        display: "inline-block",
        width: props.circle ? (props.height + 'px') : "",
        height: props.circle ? (props.height + 'px') : "",
        lineHeight: props.height + 'px',
        borderRadius: props.circle ? 50 + '%' : "",
      }} className="al-flex-container-center-vh al-overflow-hide al-bgcolor-transparent">
        <img src={props.src}
             alt={props.alt}
             style={{
               objectFit: props.fit,
               width: props.circle ? (100 + '%') : (props.width + 'px'),
               height: props.circle ? (100 + '%') : (props.height + 'px'),
               ...props.style
             }}
             className={" " + props.className}
             onClick={props.onClick}
        />
      </div>
  );
}


// prop类型
ALImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  fit: PropTypes.string,
  circle: PropTypes.bool,
  radius: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

// prop默认值
ALImage.defaultProps = {
  src: "",
  alt: "this is an image",
  width: 480,
  height: 320,
  fit: "cover",
  circle: false,
  radius: 0,
  style: {},
  className: "",
  onClick: null,
}

export default ALImage;
