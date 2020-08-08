import React from "react";
import {request} from "../../util/network/NetworkRequest";
import {POSTS} from "../../util/network/config/ApiConst";
import qs from "querystring";

class TestNetworkRequest extends React.Component{
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      result: ''
    }
  }

  //渲染函数
  render() {
    return(
      <div>
        <div style={{padding: 20 + 'px', backgroundColor: "#f1f1f1"}}>
          {this.state.result === '' ? '暂无数据' : this.state.result}
        </div>
        <br/>
        <button onClick={this.getRequest}>发起GET请求</button>

        <br/>
        <button onClick={this.postRequest}>发起POST请求</button>

        <br/>
        <button onClick={this.putRequest}>发起PUT请求</button>

        <br/>
        <button onClick={this.deleteRequest}>发起DELETE请求</button>
      </div>
    );
  }

  //GET请求
  getRequest = () => {
    request({
      url: POSTS + "/" + 1,
      method: 'get'
    }).then(res => {
      console.log(res);
      this.setState({
        result: JSON.stringify(res.data)
      });
    }).catch(err => {
      console.log(err);
    })
  }

  //POST请求
  postRequest = () => {
    request({
      url: POSTS,
      method: 'POST',
      data: qs.stringify({
        title: 'test post',
        body: 'test post request',
        userId: 1
      })
    }).then(res => {
      console.log(res);
      this.setState({
        result: JSON.stringify(res.data)
      });
    }).catch(err => {
      console.log(err);
    })
  }


  //PUT请求
  putRequest = () => {
    request({
      url: POSTS + "/" + 101,
      method: 'PUT',
      data: qs.stringify({
        id: 101,
        title: 'test put',
        body: 'test put request',
        userId: 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(res => {
      console.log(res);
      this.setState({
        result: JSON.stringify(res.data)
      });
    }).catch(err => {
      console.log(err);
    })
  }

  //DELETE请求
  deleteRequest = () => {
    request({
      url: POSTS + "/" + 101,
      method: 'DELETE',
    }).then(res => {
      console.log(res);
      this.setState({
        result: JSON.stringify(res.data)
      });
    }).catch(err => {
      console.log(err);
    })
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default TestNetworkRequest;