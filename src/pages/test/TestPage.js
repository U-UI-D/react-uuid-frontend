import React from "react";
import {Pagination, Button} from 'antd';


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
        <>
          <div>
            <Button onClick={() => this.props.history.push('/demo')}>demo页面</Button>
          </div>

          <Pagination defaultCurrent={6} total={500} />

        </>
    );
  }
}

export default TestPage;
