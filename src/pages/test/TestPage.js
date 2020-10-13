import React from "react";
import {Pagination, Button, Upload} from 'antd';
import ALInlineWidthBox from "../../components/al-inline-width-box/ALInlineWidthBox";
import ALHeader from "../../components/al-header/ALHeader";


class TestPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }
  }


  render() {
    let url = "https://ali.image.hellorf.com/images/682ccd2b82519cde5d416c7c932b1788.jpeg?x-oss-process=image/resize,h_528";

    return (
        <div>
          <div className="al-bg-color-white">
            <ALHeader/>
          </div>

          <div>
            <Button onClick={() => this.props.history.push('/demo')}>demo页面</Button>
          </div>

          <div>
            <Upload>
              <div>
                上传
              </div>
            </Upload>
          </div>

        </div>
    );
  }
}

export default TestPage;
