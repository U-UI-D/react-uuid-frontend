import React from "react";
import {Space} from "antd";
import "./style.scss";
import {connect} from "react-redux";
import {ALFlexBox} from "../al-component";

function ALFooter(props) {
  const {isMobile} = props;
  return (
    <div id="al-footer" className={`al-p-tb-20px ${isMobile ? "": "content-width"}`}>
      <ALFlexBox centerV className={`al-p-tb-20px ${isMobile ? "": "content-width"}`} wrap={false}>

        <ALFlexBox centerVH>
          <img className="logo" src={require('../../assets/icon/common/UUID2.png')} />
        </ALFlexBox>

        <div>
          <ALFlexBox centerV>
            <Space size="large">
              <div>首页</div>
              <div>作品</div>
              <div>话题</div>
              <div>素材</div>
              <div>关于我们</div>
            </Space>
          </ALFlexBox>
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
