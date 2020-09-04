import React from "react";

function ALFlexBox(props) {
  const classNames = {
    flex: "al-flex-container",
    between: "al-flex-justify-space-between",
    around: "al-flex-justify-space-around",
    evenly: "al-flex-justify-space-evenly",
    column: "al-flex-direction-col",
    centerV: "al-flex-container-center-v",
    centerH: "al-flex-container-center-h",
    centerVH: "al-flex-container-center-vh",
    wrap: "al-flex-wrap",
  }

  const styles = {
    padding: (props.padding ?? '') + 'px',
    ...props.style
  }
  return (
    <div className={`
      ${classNames.flex} 
      ${props.between ? classNames.between : ""} 
      ${props.around ? classNames.around : ""} 
      ${props.evenly ? classNames.evenly : ""} 
      ${props.column ? classNames.column : ""} 
      ${props.centerV ? classNames.centerV : ""} 
      ${props.centerH ? classNames.centerH : ""} 
      ${props.centerVH ? classNames.centerVH : ""} 
      ` + props.className}
         style={styles} >
      {/*<div className="al-flex-wrap"></div>*/}
      {props.children}
    </div>
  );
}

export default ALFlexBox;
