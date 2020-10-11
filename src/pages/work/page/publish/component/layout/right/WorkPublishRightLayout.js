import React from "react";
import PublishWork from "../../publish-work/PublishWork";
import PublishMaterial from "../../publish-material/PublishMaterial";

function WorkPublishRightLayout(props) {
  return (
    <div style={{width: "960px", padding: "30px", backgroundColor: "#fff"}}>
      {
        props.title === "上传作品" ?
          <PublishWork />
          :
          (props.title === "上传素材" ? <PublishMaterial /> : <PublishWork />)
      }

    </div>
  );
}

export default WorkPublishRightLayout;
