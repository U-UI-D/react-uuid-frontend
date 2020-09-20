import React from "react";
import ALFlexBox from "../al-flex-box/ALFlexBox";
import PropTypes from "prop-types";

function ALTitleBox(props) {

  const hTag = (h) => {
    return React.createElement('h' + h, {}, props.text);
  }

  const getColorMode = (colorMode) => {
    switch (colorMode) {
      case "primary":
        return styleColor.primary;
      case "success":
        return styleColor.success;
      case "warning":
        return styleColor.warning;
      case "danger":
        return styleColor.danger;
      case "info":
        return styleColor.info;
      default:
        return styleColor.primary;
    }
  }

  const styleColor = {
    primary: {
      accent: "#409EFF",
      light: "rgba(64, 158, 255, 0.1)"
    },
    success: {
      accent: "#67c23a",
      light: "rgba(103, 194, 58, 0.1)"
    },
    warning: {
      accent: "#e6a23c",
      light: "rgba(230, 162, 60, 0.1)"
    },
    danger: {
      accent: "#f56c6c",
      light: "rgba(245, 108, 108, 0.1)"
    },
    info: {
      accent: "#909399",
      light: "rgba(144, 147, 153, 0.1)"
    }
  }


  if (!props.isBeauty){
    return (
        <ALFlexBox margin={props.margin}
                   className={props.className}
                   style={{...props.style}}>
          <div style={{width: props.edgeWidth+"px"}} className="al-flex-item-stretch"></div>
          <ALFlexBox padding={props.padding}>
            <div style={{width: props.gap + "px"}} />
            {hTag(props.hNum)}
          </ALFlexBox>
        </ALFlexBox>
    );
  }
  return (
    <ALFlexBox centerV>
      <div style={{
        width: props.edgeWidth+"px",
        backgroundColor: getColorMode(props.colorMode).accent
      }}  className="al-flex-item-stretch"></div>
      <ALFlexBox className={props.className}
                 centerV
                 onClick={props.onClick}
                 flexNum={1}
                 padding={props.padding}
                 style={{
                   backgroundColor: props.showBg ? getColorMode(props.colorMode).light : "",
                   ...props.style
                 }}>
        <div style={{width: props.gap + "px"}} />
        {hTag(props.hNum)}
      </ALFlexBox>
    </ALFlexBox>

  );
}

// 类型
ALTitleBox.propTypes = {
  id: PropTypes.string,
  hNum: PropTypes.number,
  text: PropTypes.string,
  isBeauty: PropTypes.bool,
  showBg: PropTypes.bool,
  showLeftBd: PropTypes.bool,
  edgeWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  className: PropTypes.string,
  lineHeight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  style: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  gap: PropTypes.number,
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  colorMode: PropTypes.string,
}

// 默认值
ALTitleBox.defaultProps = {
  id: "",
  hNum: 2,
  text: "",
  lineHeight: "",
  style: {},
  onClick: null,
  isBeauty: false,
  padding: 6,
  margin: "",
  colorMode: "primary",
  edgeWidth: 3,
  gap: 12,
  showBg: true,
  showLeftBd: true,
  className: ""
}

export default ALTitleBox;
