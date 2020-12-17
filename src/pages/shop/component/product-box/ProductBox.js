import {ALFlexBox, ALImage} from "../../../../components/al-component";
import {Button, Input, Modal} from "antd";
import React, {useState} from "react";
import ProductDetailModal from "../product-detail-modal/ProductDetailModal";

export function ProductBox(props) {
  const {data} = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  return (
    <ALFlexBox column
               padding={10}
               width={177.5}
               className="al-hover-border-color-light-black"
               style={{border: "solid 1px #00000000"}}
               lineHeight={2}>
      <ALImage src={data.poster} size={157.5} fit={"contain"}
               onClick={() => {setIsModalVisible(!isModalVisible);}} />
      <div className="al-text-overflow-show-point " style={{width: 157.5}}>{data.title}</div>
      <ALFlexBox centerV between className="al-m-bottom-5px">
        <ALFlexBox centerV>
          <ALImage src={require("../../../../assets/icon/icon1/collecting.png")} size={16} />
          <span style={{marginLeft: "4px", fontWeight: "bold", color: "#4dd5ff"}}>{data.price}</span>
        </ALFlexBox>

        <span>余量 <span style={{color: data.quantity > 0 ? "#41e7af" : "#ffa55e"}}>{data.quantity}</span></span>
      </ALFlexBox>
      <Button disabled={data.quantity <= 0} onClick={() => {setIsConfirmModalVisible(!isConfirmModalVisible);}}>兑换</Button>

      <ProductDetailModal
        visible={isModalVisible}
        data={data}
        btnDisabled={data.quantity <= 0}
        onCancel={() => {
          setIsModalVisible(!isModalVisible);
        }}/>

      {/*填写收货地址Modal*/}
      <Modal visible={isConfirmModalVisible}
             title="确认兑换"
             cancelText={"取消"}
             okText={"确定"}
             onCancel={() => {
               setIsConfirmModalVisible(!isConfirmModalVisible)
             }}
             onOk={() => {
               props.onBtnClick(data.id, data.price);
               setIsConfirmModalVisible(!isConfirmModalVisible);
             }}
             maskClosable={false}>
        <ALFlexBox centerVH column>
          <ALImage src={data.poster} size={200} fit={"contain"} />
          <h3>{data.title}</h3>
          <p style={{color: "#ff4d4f"}}>确认兑换？</p>
        </ALFlexBox>
      </Modal>
    </ALFlexBox>
  )
}
