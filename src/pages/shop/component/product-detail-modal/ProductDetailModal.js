import React, {useState} from "react";
import {Button, Col, Modal, Row} from "antd";
import {ALImage} from "../../../../components/al-component";

function ProductDetailModal(props) {
  const {data, visible, btnType} = props;
  return (
    <>
      {/*商品详情Modal*/}
      <Modal visible={visible}
             title={"商品详情"}
             width={800}
             onCancel={props.onCancel}
             onOk={props.onOk}
             footer={null}>
        <h2>{data.title}</h2>
        <Row>
          <Col span={16}>
            <ALImage fit={"contain"} src={data.poster} size={400} />
          </Col>

          <Col span={8}>
            <div>名称：{data.title}</div>
            <div>价格：<span style={{color: "#4dd5ff"}}>{data.price}</span> 积分</div>
            <div>余量：<span style={{color: data.quantity > 0 ? "#41e7af" : "#ffa55e"}}>{data.quantity}</span></div>
            <div>描述：{data.introduction ?? "暂无描述"}</div>

            <p></p>
            <Button danger={btnType === "seckill"} disabled={props.btnDisabled}>{btnType === "seckill" ? "秒杀兑换" : "兑 换"}</Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ProductDetailModal;
