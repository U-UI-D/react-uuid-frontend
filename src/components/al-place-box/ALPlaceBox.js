import React from "react";

function ALPlaceBox(props) {
  return (
      <div style={{
        width: (props.width ?? '') + 'px',
        height: (props.height ?? '') + 'px',
      }}>

      </div>
  );
}

export default ALPlaceBox;
