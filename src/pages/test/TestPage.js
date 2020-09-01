import React from "react";
import {Button} from 'antd';

class TestPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }
  }


  render() {
    return (
        <>
          <div>
            <Button onClick={() => this.props.history.push('/demo')}>demo页面</Button>
          </div>

        </>
    );
  }
}

export default TestPage;
