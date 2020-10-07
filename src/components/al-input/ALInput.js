import React, {useState} from "react";
import ALFlexBox from "../al-flex-box/ALFlexBox";
import {Input} from "antd";

function ALInput(props) {

  const [empty, setEmpty] = useState(false);
  const [value, setValue] = useState("");

  const styles = {
    dotRed: {
      width: '8px',
      height: '8px',
      backgroundColor: 'orangered',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '20px'
    },

    text: {
      color: 'orangered',
      width: '100px'
    }
  }

  return (
    <ALFlexBox centerV between lineHeight={0}>
      <ALFlexBox centerV flexNum={1}>
        <div style={styles.dotRed}/>
        <div className="al-flex-item-grow-1">
          <Input style={{borderRadius: 5 + 'px', width: '90%'}}
                 size="large"
                 placeholder="请输入作品名称"
                 maxLength={50}
                 allowClear
                 onChange={(e) => {
                   if (e.target.value.length <= 50){
                     setValue(e.target.value);
                   }
                   setEmpty(e.target.value.length <= 0 ? true : false);
                   console.log(value);
                 }}
                 suffix={<span>
                 {
                   value.length >= 50 ? 0 : (50 - value.length)
                 }
               </span>}
          />
        </div>
      </ALFlexBox>
      <div className="al-text-right" style={styles.text}>
        {
          empty ? <span>必填项</span> : <span></span>
        }
      </div>
    </ALFlexBox>
  );
}

export default ALInput;
