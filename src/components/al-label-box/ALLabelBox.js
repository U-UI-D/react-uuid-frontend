import React from "react";
import ALFlexBox from "../al-flex-box/ALFlexBox";

function ALLabelBox(props) {
  return <ALFlexBox centerV>
    <div className="al-text-right" style={{width: 80+'px'}}>
      {props.label}
    </div>

    <div style={{width: 20+'px'}}></div>

    <div className="al-flex-item-grow-1">
      {props.children}
    </div>
  </ALFlexBox>
}

export default ALLabelBox;
