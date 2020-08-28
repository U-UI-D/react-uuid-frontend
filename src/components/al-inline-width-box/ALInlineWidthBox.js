import React from "react";

function ALInlineWidthBox(props) {
  return (
      <div {...props} style={{
        display: "inline-block",
        width: props.width + 'px',
        height: props.height + 'px'
      }} className={props.className}>
        {props.children}
      </div>
  );

}

export default ALInlineWidthBox;
