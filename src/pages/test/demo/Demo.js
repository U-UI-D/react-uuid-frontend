import React from "react";
import SonDataToFather from "./SonDataToFather";

function Demo(props) {
  return (
      <div>
        <div className="al-bg-color-f1f1f1 al-m-40px al-p-20px"
             style={{
               borderRadius: 10+'px',
               border: '1px solid #efefef'
             }}>
          <h1>子传父demo</h1>
          <SonDataToFather />
        </div>
      </div>
  );
}

export default Demo;
