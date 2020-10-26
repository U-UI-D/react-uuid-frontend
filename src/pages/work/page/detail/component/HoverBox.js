import React from "react";
import {Avatar, Tooltip} from "antd";
import PropTypes from "prop-types";

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

    let {activeColor, selected, num} = this.state;

    return (
      <Tooltip title={this.props.data.title} color={"blue"} placement="left">
        <div style={this.props.style} className="al-position-rela">
          <div
            className="al-border-capsule al-p-5px al-display-inline-block al-cursor-pointer al-m-bottom-20px al-box-shadow"
            onMouseEnter={() => {
              this.setState({activeColor: true});
            }}
            onMouseLeave={() => {
              this.setState({activeColor: false});
            }}
            onMouseDown={() => {
              this.setState({selected: !this.state.selected});
            }}
            onClick={this.props.data.num === undefined ? this.props.onClick : () => {
              if (this.props.isChangeNum){
                this.setState({num: selected ? ++num : --num});
              }
              console.log("num", num);
              this.props.onChange({title: this.props.data.title, num})
            }}
            style={{backgroundColor: activeColor ? "rgb(225,239,255)" : "rgb(255,255,255)"}}>
            {
              selected ?
                <Avatar
                  src={(selected ? this.props.data.icon1 : this.props.data.icon0)}
                  size={30}/>
                :
                <Avatar
                  src={(activeColor ? this.props.data.icon1 : this.props.data.icon0)}
                  size={30}/>
            }
          </div>

          {
            // 右上角的角标
            this.props.showFloatDot ?
              (
                <div className="al-position-abs"
                     style={{
                       top: -6,
                       right: 16,
                       width: "20px",
                       height: "20px",
                       padding: "3px",
                       fontSize: ".4rem",
                       borderRadius: "50%",
                       backgroundColor: "rgb(77,183,255, .2)",
                       textAlign: "center"
                     }}
                >
                  {num > 99 ? "99+" : num}
                </div>
              )
              : <></>
          }
        </div>
      </Tooltip>
    );
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
