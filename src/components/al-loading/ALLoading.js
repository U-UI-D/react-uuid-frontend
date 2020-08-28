import React from "react";
import {Spin} from "antd";

function ALLoading(props) {
  return (
      <div className="al-flex-container-center-vh al-flex-direction-col al-full-screen"
           hidden={props.show ? '' : 'hidden'}
           style={{
             height: props.height + 'px',
             width: props.width+'px',
           }}>
        <Spin size="large"/>
        <div className="al-m-top-20px">
          {props.text ?? "加载中..."}
        </div>
      </div>
  );
}

export default ALLoading;
