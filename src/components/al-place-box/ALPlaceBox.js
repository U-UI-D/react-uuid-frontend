import React from "react";
import PropTypes from "prop-types";

function ALPlaceBox(props) {
  return (
      <div style={{
        width: props.width,
        height: props.height,
        ...props.style
      }} className={props.className}
           onClick={props.onClick}>
        {props.children}
      </div>
  );
}

ALPlaceBox.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  onClick: PropTypes.func,
}

ALPlaceBox.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
  onClick: null,
}
export default ALPlaceBox;
