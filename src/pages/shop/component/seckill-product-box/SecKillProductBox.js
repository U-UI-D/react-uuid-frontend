import React, {useState} from "react";
import {ALFlexBox, ALImage} from "../../../../components/al-component";
import {Button} from "antd";
import "./style.css";
import PropTypes from "prop-types";
import ProductDetailModal from "../product-detail-modal/ProductDetailModal";

function SecKillProductBox(props) {
  const {data} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <ALFlexBox column
               padding={10}
               width={177.5}
               className="al-hover-border-color-light-red seckill-product-box"
               style={{border: "solid 1px #00000000"}}
               lineHeight={2}>
      <ALImage src={data.poster} width={157.5}
               onClick={() => {setIsModalVisible(!isModalVisible);}}/>
      <div className="al-text-overflow-show-point " style={{width: 157.5}}>{data.title}</div>
      <ALFlexBox centerV between className="al-m-bottom-5px">
        <ALFlexBox centerV>
          <ALImage src={require("../../../../assets/icon/icon1/collecting.png")} size={16}/>
          <span style={{marginLeft: "4px", fontWeight: "bold", color: "#ff4d4f"}}>
          {data.price}
        </span>
          <s style={{
            color: "#aaa",
            marginLeft: "8px",
          }}>{data.originPrice}</s>
        </ALFlexBox>

        <span>余量 <span style={{color: data.quantity > 0 ? "#41e7af" : "#ffa55e"}}>{data.quantity}</span></span>
      </ALFlexBox>
      <Button danger
              disabled={props.disableSecKillBtn}
              onClick={() => {
                props.onBtnClick(data.id, data.price, "seckill")
              }}>
        {props.btnText}
      </Button>


      <ProductDetailModal
        visible={isModalVisible}
        data={data}
        btnDisabled={props.disableSecKillBtn}
        btnType={"seckill"}
        onCancel={() => {
          setIsModalVisible(!isModalVisible);
        }}/>
    </ALFlexBox>
  );
}

// prop类型
SecKillProductBox.propTypes = {
  data: PropTypes.object.isRequired,
  onBtnClick: PropTypes.func,
  disableSecKillBtn: PropTypes.bool,
  btnText: PropTypes.string,
}

// prop默认值
SecKillProductBox.defaultProps = {
  onBtnClick: null,
  disableSecKillBtn: false,
  btnText: "秒杀兑换",
}

export default SecKillProductBox;
