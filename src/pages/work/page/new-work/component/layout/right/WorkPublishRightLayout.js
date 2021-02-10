import React from "react";
import NewWork from "../../new-work/NewWork";
import NewMaterial from "../../new-material/NewMaterial";

function WorkPublishRightLayout(props) {
  return (
    <div style={{width: "960px", padding: "30px", backgroundColor: "#fff"}}>
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
