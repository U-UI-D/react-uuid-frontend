import React from "react";
import {Avatar, Button, Divider, Input} from "antd";
import ALFlexBox from "../../../components/al-flex-box/ALFlexBox";
import {getUserInfoFromLocalStorage} from "../../../util/util";


function RecordBox1(props) {

  return <div className="al-bg-color-light-blue primary-border-radius al-text-color-white al-p-10px al-m-lr-10px">
    {props.message}
  </div>
}

function RecordBox2(props) {

  return <div className="al-bg-color-light-green primary-border-radius al-text-color-white al-p-10px al-m-lr-10px">
    {props.message}
  </div>
}


class ChatWindow extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
      record: "",
      recordList: ["Hello"],
    }
  }


  //渲染函数
  render() {

    const addRecordToList = (msg) => {
      let list = this.state.recordList;
      list.push(msg);
      this.setState({
        recordList: list,
        record: ""
      })
    }

    return (
      <div className="al-p-lr-30px al-position-rela">
        <ALFlexBox centerV between>
          <Button type="primary"
                  onClick={() => {
                    this.props.onBack("点击了返回按钮")
                  }}>
            返回
          </Button>

          <ALFlexBox centerV>
            <div><Avatar src={this.props.user.avatar}/></div>
            <div className="al-m-left-10px al-font-weight-bold">{this.props.user.nickname}</div>
          </ALFlexBox>

          <div></div>
        </ALFlexBox>

        {/*聊天内容区域*/}
        <div style={{width: 100 + '%', height: 400 + 'px'}}
             className="al-m-tb-20px">
          <ALFlexBox centerV between className="al-m-tb-10px">
            <ALFlexBox centerV>
              <Avatar className="al-m-right-10px" src={this.props.user.avatar}/>
              <RecordBox2 message={"你好！"}/>
            </ALFlexBox>
            <div></div>
          </ALFlexBox>

          {
            this.state.userInfo === null ? <span></span> :
              this.state.recordList.map((item, index) => {
              return (
                <ALFlexBox key={index} centerV between className="al-m-tb-10px">
                  <div></div>
                  <ALFlexBox centerV>
                    <RecordBox1 message={item}/>
                    <Avatar src={this.state.userInfo.avatar}/>
                  </ALFlexBox>
                </ALFlexBox>
              )
            })
          }

        </div>

        <div style={{float: "end"}}>
          <Input.TextArea rows={3}
                          onChange={(e) => {
                            this.setState({record: e.target.value})
                          }}/>
          <div className="al-text-right al-m-tb-20px">
            <Button type="primary" onClick={() => {addRecordToList(this.state.record)}}>发送</Button>
          </div>
        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {
    this.setState({
      userInfo: getUserInfoFromLocalStorage()
    })
  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default ChatWindow;
