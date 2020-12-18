import React, {useEffect, useState} from "react";
import {Table, Modal} from "antd";
import {ALImage} from "../../../../components/al-component";
import {HttpRequest} from "../../../../util/network/request";
import {connect} from "react-redux";
import DateTimeUtils from "../../../../util/DateTimeUtils";
import {ApiConst} from "../../../../util/network/config/ApiConst";

// 兑换记录Modal
function ExchangeRecordModal(props) {
  const {visible} = props;
  const [exchangeRecordList, setExchangeRecordList] = useState([]);
  const [pagination, setPagination] = useState({current: 1, pageSize: 4, total: 0});

  useEffect(() => {
    getExchangeRecordByUserId(props.userInfo.id);
  }, []);

  const getExchangeRecordByUserId = (userId, pageNum=1, pageSize=4) => {
    HttpRequest.get({
      // url: "http://localhost:9004/order/info-list/user/" + userId,
      url: ApiConst.shop.order.get.GET_EXCHANGE_RECORD_BY_USER_ID + userId,
      data: {
        pageNum,
        pageSize
      }
    }).then(res => {
      if (res.err === null){
        setExchangeRecordList(res.data.data.list);
        let {pageNum, pageSize, total} = res.data.data;
        setPagination({current: pageNum, pageSize, total})
      }
    })
  }

  const handleTableChange = (pagination) => {
    console.log("pagination", pagination);
    getExchangeRecordByUserId(props.userInfo.id, pagination.current, );
  }

  const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      render: text => <span>{text}</span>,
    },
    {
      title: '商品',
      dataIndex: 'title',
      width: 200,
      render: text => <span>{text}</span>,
    },
    {
      title: '图片',
      dataIndex: 'poster',
      render: text => <ALImage src={text} size={60} fit={"contain"} /> ,
    },
    {
      title: '价格',
      dataIndex: 'tradePrice',
      align: 'right',
    },
    {
      title: '时间',
      dataIndex: 'createdTime',
      render: text => DateTimeUtils.getFormatDateTime(text, -8)
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: text => <span>{text === 0 ? <span style={{color: "#41e7af"}}>正常</span> : <span style={{color: "#ff4d4f"}}>异常</span>}</span>
    },
  ];
  return (
    <>
      {/*商品详情Modal*/}
      <Modal visible={visible}
             title={"兑换记录"}
             width={1000}
             onCancel={props.onCancel}
             onOk={props.onOk}
             footer={null}>
        <Table
          columns={columns}
          dataSource={exchangeRecordList}
          pagination={pagination}
          onChange={handleTableChange}
        />

      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    userInfo: state.userInfo,
  }
}

export default connect(mapStateToProps)(ExchangeRecordModal);
