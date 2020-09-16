import React from "react";
import ALFlexBox from "../al-flex-box/ALFlexBox";
import PropTypes from "prop-types";

function ALTitleBox(props) {

  const hTag = (h) => {
    switch (h) {
      case 1:
        return <h1>{props.text}</h1>
      case 2:
        return <h2>{props.text}</h2>
      case 3:
        return <h3>{props.text}</h3>
      case 4:
        return <h4>{props.text}</h4>
      case 5:
        return <h5>{props.text}</h5>
      case 6:
        return <h6>{props.text}</h6>
      default:
        return <p>{props.text}</p>
    }
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
        <ALFlexBox padding={props.padding} margin={props.margin}>
          {hTag(props.hNum)}
        </ALFlexBox>
    );
  }
  return (
      <ALFlexBox className={props.className}
                 centerV
                 padding={props.padding}
                 style={{
                   borderLeft: props.showLeftBd ? `solid ${props.borderWidth}px ${getColorMode(props.colorMode).accent}`: "",
                   backgroundColor: props.showBg ? getColorMode(props.colorMode).light : "",
                   paddingLeft: props.gap + "px"
                 }}>
        {hTag(props.hNum)}
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
  borderWidth: PropTypes.oneOfType([
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
  padding: 4,
  margin: "",
  colorMode: "primary",
  borderWidth: 3,
  gap: 20,
  showBg: true,
  showLeftBd: true,
}

export default ALTitleBox;
