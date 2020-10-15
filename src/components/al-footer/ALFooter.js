import React from "react";
import {Avatar} from "antd";

function ALFooter() {
  return (
    <div style={{backgroundColor: "#282828", color: "#666"}}>
      <div className="al-flex-container al-flex-container-center-v content-width">
        <div>
          <Avatar size={100} src={require('../../assets/icon/common/UUID2.png')} />
        </div>

        <div>
          <div className="al-flex-container">
            <div>首页</div><div style={{width: 30+'px'}}></div>
            <div>发现</div><div style={{width: 30+'px'}}></div>
            <div>学习</div><div style={{width: 30+'px'}}></div>
            <div>关于我们</div><div style={{width: 30+'px'}}></div>
            <div>联系我们</div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ALFooter;
