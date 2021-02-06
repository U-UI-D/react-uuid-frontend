import React, {useState} from "react";
import PropTypes from "prop-types";
import {Modal} from "antd";
import {ALFlexBox} from "../al-component";

function ALImage(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const screenWidth = window.innerWidth;
  return (
      <div style={{
        display: "inline-block",
        width: props.circle ? (props.height + 'px') : "",
        height: props.circle ? (props.height + 'px') : "",
        borderRadius: props.circle ? 50 + '%' : props.radius + 'px',
      }} className="al-flex-container-center-vh al-overflow-hide al-bgcolor-transparent">
        <img src={props.src}
             alt={props.alt}
             style={{
               objectFit: props.fit,
               width: (props.size ?? props.width) + 'px',
               height: (props.size ?? props.height) + 'px',
               borderRadius: props.radius + 'px',
               ...props.style
             }}
             className={" " + props.className + props.circle ? "al-img-circle" : ""}
             onClick={!props.previewable ? props.onClick : () => {
               setIsModalVisible(!isModalVisible)
             }}
        />
        <Modal title={null}
               visible={isModalVisible}
               onCancel={() => {
                 setIsModalVisible(!isModalVisible);
               }}
               width={screenWidth - 200}
               footer={null}
               >
          <ALFlexBox centerVH>
            <img src={props.src} alt="" style={{width: "90vw"}}/>
          </ALFlexBox>
        </Modal>
      </div>
  );
}


// prop类型
ALImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
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
  fit: PropTypes.string,
  circle: PropTypes.bool,
  previewable: PropTypes.bool,
  radius: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

// prop默认值
ALImage.defaultProps = {
  src: "",
  alt: "this is an image",
  width: "",
  height: "",
  fit: "cover",
  circle: false,
  radius: 0,
  style: {},
  className: "",
  onClick: null,
  previewable: false,
}

export default ALImage;
