import React from "react";
import PropTypes from "prop-types";

function ALPlaceBox(props) {
  return (
      <div style={{
        width: (props.width ?? '') + 'px',
        height: (props.height ?? '') + 'px',
      }}>

      </div>
  );
}

ALPlaceBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
}

ALPlaceBox.defaultProps = {
  width: 20,
  height: 20
}
export default ALPlaceBox;
