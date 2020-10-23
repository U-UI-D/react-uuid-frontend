import React from "react";
import {Input} from "antd";
import {ALFlexBox} from "../../components/al-component";

class SearchPage extends React.Component {
  //构造器
  constructor(props) {
    super(props);

    this.state = {}
  }

  //渲染函数
  render() {
    const {Search} = Input;
    const bgImage = require('../../assets/image/search/bg.jpg');
    return (
      <div className="al-full-screen"
           style={{
             backgroundImage: "url('" + bgImage + "')",
             backgroundSize: "cover",
             backgroundRepeat: "no-repeat",
           }}>

        <div className="content-width al-p-tb-30px">

          <ALFlexBox centerH between className="al-m-tb-50px al-text-align-center">
            <div></div>
            <div className="al-width-60">
              <Search
                placeholder="请输入搜索内容"
                enterButton="搜索"
                size="large"
                onSearch={value => console.log(value)}
              />
            </div>
            <div></div>
          </ALFlexBox>
        </div>
      </div>
    );
  }

  //组件挂载完成时调用
  componentDidMount() {

  }

  //组件卸载前调用
  componentWillUnmount() {

  }

}

export default SearchPage;
