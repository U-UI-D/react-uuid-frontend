import React from "react";
import PropTypes from "prop-types";

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
    margin: (props.margin ?? '') + 'px',
    flex: props.flexNum === undefined ? "" :  props.flexNum,
    lineHeight: props.lineHeight + "em",
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
      ${props.wrap ? classNames.wrap : ""} 
      ` + props.className}
         style={styles}
         onClick={props.onClick}>
      {props.children}
    </div>
  );


}

// 类型
ALFlexBox.propTypes = {
  id: PropTypes.string,
  flexNum: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  between: PropTypes.bool,
  around: PropTypes.bool,
  evenly: PropTypes.bool,
  column: PropTypes.bool,
  centerV: PropTypes.bool,
  centerH: PropTypes.bool,
  centerVH: PropTypes.bool,
  wrap: PropTypes.bool,
  className: PropTypes.string,
  lineHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  style: PropTypes.object,
  onClick: PropTypes.func,
}

// 默认值
ALFlexBox.defaultProps = {
  id: "",
  flexNum: "",
  between: false,
  around: false,
  evenly: false,
  column: false,
  centerV: false,
  centerH: false,
  centerVH: false,
  wrap: true,
  lineHeight: "",
  style: {},
  onClick: null,
}



export default ALFlexBox;
