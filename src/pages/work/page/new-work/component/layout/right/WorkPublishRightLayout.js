import React from "react";
import NewWork from "../../new-work/NewWork";
import NewMaterial from "../../new-material/NewMaterial";
import './style.scss';

function WorkPublishRightLayout(props) {
  return (
    <div className="new-work-layout-right">
      {
        props.title === "上传作品" ?
          <NewWork history={props.history} />
          :
          (props.title === "上传素材" ? <NewMaterial /> : <NewWork />)
      }
    </div>
  );
}

export default WorkPublishRightLayout;
