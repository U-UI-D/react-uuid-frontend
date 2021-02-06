import React from "react";
import { createFromIconfontCN } from '@ant-design/icons';
import PropTypes from "prop-types";
import './style.css';
import AppConfig from "../../config/AppConfig";

function ALIcon(props) {
  const IconFont = createFromIconfontCN({
    scriptUrl: AppConfig.iconfontUrl, // 在 iconfont.cn 上生成
  });

  return (<IconFont type={props.type}
                    style={{
                      width: (props.size ? props.size : props.width) + 'px',
                      height: (props.size ? props.size : props.height) + 'px',
                      ...props.style
                    }}
                    {...props} />);
}

export default ALIcon;

// prop类型
ALIcon.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

// prop默认值
ALIcon.defaultProps = {
  type: "",
  style: {},
  className: "",
  onClick: null,
}
