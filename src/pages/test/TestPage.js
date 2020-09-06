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

          <div className="al-box-size-200px al-bg-color-light-blue al-position-rela">
            <div className="al-box-size-200px al-bg-color-light-green al-position-abs">
              <div className="al-width-100 al-height-100 al-flex-container-center-vh">
                <div>haha</div>
              </div>
            </div>
          </div>

        </>
    );
  }
}

export default TestPage;
