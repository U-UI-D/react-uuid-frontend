import React from "react";
import {Button} from 'antd';


const Son = (props) => {
  // 需要将子组件的数据传递出去
  let value = 2222222;
  return <div>
    <div className="al-box-size-100px al-flex-container-center-vh al-bg-color-green">
      <Button onClick={() => props.onChange(value)}>子组件</Button>
    </div>
  </div>
}

class SonDataToFather extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }
  }

  // 传递的事件
  handleChange = val => {
    console.log(val);
    this.setState({
      value: val
    })
  };

  render() {
    return (
        <>
          <div className="al-box-size-200px al-flex-container-center-vh al-flex-direction-col al-bg-color-blue">
            <h1>父组件</h1>
            <div>{this.state.value}</div>
            <Son onChange={this.handleChange} />
          </div>
        </>
    );
  }
}

export default SonDataToFather;
