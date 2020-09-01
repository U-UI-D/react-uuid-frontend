import React, {useEffect, useState} from "react";
import ALFlexBox from "../../../../components/al-flex-box/ALFlexBox";
import {Avatar} from "antd";
import {getShowDesigner} from "../../../../util/network/RequestHub";
import ALLoading from "../../../../components/al-loading/ALLoading";

function ShowDesigner(props) {

  const [designerData, setDesignerData] = useState(null);
  useEffect(async () => {
    getShowDesigner().then(res => {
      setDesignerData(res.data)
    })
  }, [])


  return designerData === null ? <ALLoading show height={200} /> : (
      <div className="al-bg-color-white">
        <ALFlexBox>
          <div className="al-width-30">
            <ALFlexBox padding={30}>
              <div>
                {/*头像*/}
                <Avatar src={designerData[0].avatar} size={100} />
              </div>

              {/*个人信息*/}
              <div>
                <h3>{designerData[0].nickname}</h3>
              </div>


            </ALFlexBox>
          </div>
          <div className="al-width-70">
            {
              //封面图
              designerData[0].workPoster.map((item, index) => {
                return <Avatar shape="square"
                               style={{width: 200+'px', height: 150+'px'}}
                               src={item}
                               key={item}/>
              })
            }
          </div>
        </ALFlexBox>
      </div>
  );
}

export default ShowDesigner;
