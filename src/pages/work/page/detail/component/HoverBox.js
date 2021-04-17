import React from "react";
import {Avatar, Tooltip} from "antd";
import PropTypes from "prop-types";
import './style.scss';

function View(props) {
  let {activeColor, selected, num, data, showFloatDot, style} = props;
  const {onClick, handleOnClick, onMouseEnter, onMouseLeave, onMouseDown} = props;

  return (
    <Tooltip title={data.title} color={"blue"} placement="left">
      <div style={style} className="hover-box">
        <div
          className="al-border-capsule al-p-5px al-display-inline-block al-cursor-pointer al-m-bottom-20px al-box-shadow"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onClick={data.num !== undefined ? handleOnClick : onClick}
          style={{backgroundColor: activeColor ? "rgb(225,239,255)" : "rgb(255,255,255)"}}>
          {
            selected ?
              <Avatar src={(selected ? data.icon1 : data.icon0)} size={30}/>
              :
              <Avatar src={(activeColor ? data.icon1 : data.icon0)} size={30}/>
          }
        </div>

        {
          // 右上角的角标
          showFloatDot &&
          <span className="icon-num-box">{num > 99 ? "99+" : num}</span>
        }
      </div>
    </Tooltip>
  );
}

class HoverBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activeColor: false,
      selected: false,
      num: props.data.num,
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      num: nextProps.data.num
    })
  }

  render() {
    return (
      <View {...this.state} {...this.props}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseDown={this.onMouseDown}
            onClick={this.props.onClick}
            handleOnClick={this.handleOnClick}
      />
    )
  }

  onMouseEnter = () => {
    this.setState({activeColor: true});
  }
  onMouseLeave = () => {
    this.setState({activeColor: false});
  }
  onMouseDown = () => {
    this.setState({selected: !this.state.selected});
  }
  handleOnClick = () => {
    let {selected, num} = this.state;
    const {onChange} = this.props;
    if (this.props.isChangeNum){
      this.setState({num: selected ? ++num : --num});
    }
    console.log("num", num);
    onChange && onChange({title: this.props.data.title, num})
  }
}

// 类型
HoverBox.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  data: PropTypes.object,
  showFloatDot: PropTypes.bool,
  isChangeNum: PropTypes.bool
}

// 默认值
HoverBox.defaultProps = {
  id: "",
  style: {},
  className: "",
  onChange: null,
  showFloatDot: false,
  isChangeNum: true
}


export default HoverBox;
