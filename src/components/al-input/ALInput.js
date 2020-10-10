import React, {useState} from "react";
import ALFlexBox from "../al-flex-box/ALFlexBox";
import PropTypes from "prop-types";
import {Input, Select} from "antd";
import ALPlaceBox from "../al-place-box/ALPlaceBox";


const handleChangeSelect = (value) => {
  console.log(`selected ${value}`);
}


function ALInput(props) {

  const [isEmpty, setIsEmpty] = useState(false);
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
      width: '150px'
    }
  }

  const input = (
    <Input style={{borderRadius: 5 + 'px'}}
           size="large"
           placeholder="请输入作品名称"
           maxLength={50}
           allowClear
           onChange={(e) => {
             if (e.target.value.length <= 50) {
               setValue(e.target.value);
               props.onChange(e.target.value);
             }
             setIsEmpty(e.target.value.length <= 0 ? true : false);
           }}
           suffix={<span>
                 {
                   value.length >= 50 ? 0 : (50 - value.length)
                 }
               </span>}
    />
  );

  const textarea = (
    <Input.TextArea style={{borderRadius: 5 + 'px'}}
                    autoSize={{minRows: 3}}
                    size="large"
                    placeholder="作品说明"
                    onChange={(e) => {
                      props.onChange(e.target.value);
                      // console.log(e.target.value);
                    }}/>
  );

  const select = (
    <div className="al-display-inline-block">
      <Select
        placeholder="请选择类型"
        style={{width: 120}}
        onChange={handleChangeSelect}>
        <Select.Option value="work">作品</Select.Option>
        <Select.Option value="icon">icon</Select.Option>
        <Select.Option value="image">图片</Select.Option>
      </Select>
    </div>
  );


  return (
    <ALFlexBox centerV between lineHeight={0}>
      <ALFlexBox centerV flexNum={1}>
        {
          props.required ? <div style={styles.dotRed}/> : <ALPlaceBox width={28}/>
        }
        <div className="al-flex-item-grow-1">
          {props.type === "textarea" ? textarea : (props.type === "select" ? select : input)}
        </div>
      </ALFlexBox>
      <div className="al-text-right" style={styles.text}>
        {
          isEmpty ? <span>必填项</span> : <span></span>
        }
      </div>
    </ALFlexBox>
  );
}

ALInput.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
}

// 默认值
ALInput.defaultProps = {
  type: "input",
  required: false,
  onChange: () => {}
}

export default ALInput;
