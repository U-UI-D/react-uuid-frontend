import React from "react";
import {Avatar} from "antd";
import "./style.css";
import {connect} from "react-redux";
import {ALFlexBox} from "../al-component";

function ALFooter(props) {
  const {isMobile} = props;
  return (
    <div id="al-footer" className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
      <ALFlexBox centerVH className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
        <div>
          <Avatar size={100} src={require('../../assets/icon/common/UUID2.png')} />
        </div>

        <div>
          <div className="al-flex-container">
            <div>首页</div><div style={{width: 30+'px'}}></div>
            <div>作品</div><div style={{width: 30+'px'}}></div>
            <div>话题</div><div style={{width: 30+'px'}}></div>
            <div>素材</div><div style={{width: 30+'px'}}></div>
            <div>关于我们</div>
          </div>
        </div>
      </ALFlexBox>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    isMobile: state.isMobile
  }
}

export default connect(mapStateToProps)(ALFooter);
